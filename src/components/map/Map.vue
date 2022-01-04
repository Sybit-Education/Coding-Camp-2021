<template>
  <div class="map">
    <map-action-button :userLocation="userLocation"></map-action-button>
    <l-map
      ref="map"
      :center="currentCenter"
      :options="{ zoomControl: false }"
      :max-bounds="maxBounds"
      :min-zoom="9"
      :max-zoom="18"
      :zoom="currentZoom"
      class="map"
      @update:zoom="updateZoom"
      @update:center="updateCenter"
    >
      <l-tile-layer
        :attribution="attribution"
        :url="url"
        :max-bounds="maxBounds"
      />
      <l-geo-json
        v-if="geojson"
        layerType="boundary"
        :options-style="styleFunction"
        :geojson="geojson"
      />
      <template v-if="userLocation">
        <l-marker :icon="userIcon" :lat-lng="userLocation" />
      </template>
      <l-marker
        v-for="loc in locations"
        :key="loc.id"
        :icon="getPin(loc)"
        :lat-lng="[loc.latitude, loc.longitude]"
        @click="openPopup(loc)"
      />
      <l-control-zoom class="map__zoom-buttons" />
      <l-control position="topleft">
        <back-button />
      </l-control>
    </l-map>
    <v-bottom-sheet v-model="showPopup">
      <map-navigation-card :location="popupLocation" @close="closePopup" />
    </v-bottom-sheet>
  </div>
</template>

<script>
import {
  LControl,
  LControlZoom,
  LGeoJson,
  LMap,
  LMarker,
  LTileLayer
} from 'vue2-leaflet'
import 'leaflet.path.drag'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import MapActionButton from './MapActionButton'
import BackButton from '@/components/navigation/BackButton.vue'
import MapNavigationCard from './MapNavigationCard.vue'

export default {
  name: 'Map',
  components: {
    MapActionButton,
    LMap,
    LTileLayer,
    LMarker,
    LControl,
    LControlZoom,
    LGeoJson,
    BackButton,
    MapNavigationCard
  },
  props: {
    locationTypes: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      map: null,
      geojson: null,
      userLocation: null,
      currentZoom: 10,
      currentCenter: { lat: 47.78707377527543, lng: 8.8828643076576 },
      position: null,
      locations: [],
      showPopup: false,
      popupLocation: null,
      maxBounds: {
        _southWest: {
          lat: 47.54918891696502,
          lng: 8.474666027343236
        },
        _northEast: {
          lat: 47.99957120189105,
          lng: 9.365931896483863
        }
      },
      userIcon: L.icon({
        iconUrl: require('@/assets/icons/crosshairs-gps.png'),
        iconSize: [12, 12],
        iconAnchor: [6, 12]
      }),
      url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  created () {
    this.loadDistrictPolygons()
    this.loadLocations()
  },
  mounted () {
    this.onReady()
    this.currentZoom = this.$route.query.zoom
      ? this.$route.query.zoom
      : this.currentZoom
    this.currentCenter.lat = this.$route.query.clat
      ? this.$route.query.clat
      : this.currentCenter.lat
    this.currentCenter.lng = this.$route.query.clng
      ? this.$route.query.clng
      : this.currentCenter.lng
  },
  methods: {
    loadDistrictPolygons () {
      fetch('/landkreis-konstanz.geojson').then((response) => {
        response.json().then((data) => {
          this.geojson = data
        })
      })
    },
    loadLocations () {
      this.$store
        .dispatch('getLocationsFromSessionStorage')
        .then((locations) => {
          if (this.locationTypes) {
            const list = []
            this.locationTypes.forEach((type) => {
              const filteredList = this.$store.getters.getLocations.filter(
                (loc) => {
                  return loc.type === type
                }
              )
              list.push(...filteredList)
            })
            this.locations = list
          } else {
            this.locations = this.$store.getters.getLocations
          }
        })
    },
    getPin (location) {
      try {
        return L.icon({
          iconUrl: require(`@/assets/icons/${location.type}.png`),
          iconSize: [32, 32],
          iconAnchor: [16, 32]
        })
      } catch (e) {
        console.log(
          `No icon associated to this location type '${location.type}'`
        )
        return null
      }
    },
    openPopup (location) {
      this.popupLocation = location
      this.showPopup = true
    },
    closePopup () {
      this.popupLocation = null
      this.showPopup = false
    },
    onReady () {
      navigator.geolocation.getCurrentPosition(
        (success) => {
          this.position = success.coords
          if (this.center) {
            this.currentCenter = [
              success.coords.latitude,
              success.coords.longitude
            ]
            this.registerGeolocationObserver()
          }
        },
        (error) => {
          this.$notify({
            group: 'default',
            type: 'error',
            title: 'Keine Änderung der Position erkannt.',
            text: error.message
          })
        },
        (options) => {
          options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        }
      )
    },
    registerGeolocationObserver () {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.watchPosition(
          (position) => {
            this.userLocation = [
              position.coords.latitude,
              position.coords.longitude
            ]
          },
          (error) => {
            this.$notify({
              group: 'default',
              type: 'error',
              title: 'Keine Änderung der Position erkannt.',
              text: error
            })
          }
        )
      }
    },
    styleFunction () {
      return {
        weight: 2,
        color: '#FF6F00'
      }
    },
    updateZoom (zoom) {
      if (zoom !== this.currentZoom) {
        this.currentZoom = zoom
        this.$router.replace({
          query: {
            zoom: this.currentZoom,
            clat: this.currentCenter ? this.currentCenter.lat : null,
            clng: this.currentCenter ? this.currentCenter.lng : null
          }
        })
      }
    },
    updateCenter (center) {
      if (
        center.lat !== this.currentCenter.lat ||
        center.lng !== this.currentCenter.lng
      ) {
        this.currentCenter = center
        this.$router.replace({
          query: {
            zoom: this.currentZoom,
            clat: this.currentCenter ? this.currentCenter.lat : null,
            clng: this.currentCenter ? this.currentCenter.lng : null
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "node_modules/vuetify/src/styles/settings/variables";
@import "src/scss/variables";

.map {
  width: 100vw;
  height: 100vh;
  z-index: 1;
}

::v-deep .leaflet-control-zoom {
  margin-right: 2rem;
  border: 0;
  @media #{map-get($display-breakpoints, 'xs-only')} {
    display: none;
  }
}

::v-deep .leaflet-control-zoom-in {
  @include glassmorphism(
    $color: white,
    $blur-ammount: 4px,
    $color-intensity: 0.4
  );
}

::v-deep .leaflet-control-zoom-out {
  @include glassmorphism(
    $color: white,
    $blur-ammount: 4px,
    $color-intensity: 0.4
  );
}
</style>
