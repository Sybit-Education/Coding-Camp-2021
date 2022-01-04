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
      <l-locate-control
        class="map__locate-button"
        :options="{ position: 'bottomright' }"
      />
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
import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol'
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
    'l-locate-control': Vue2LeafletLocatecontrol,
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
      url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  created () {
    this.loadDistrictPolygons()
  },
  mounted () {
    this.currentZoom = this.$route.query.zoom
      ? Number.parseInt(this.$route.query.zoom, 10)
      : this.currentZoom
    this.currentCenter.lat = this.$route.query.clat
      ? this.$route.query.clat
      : this.currentCenter.lat
    this.currentCenter.lng = this.$route.query.clng
      ? this.$route.query.clng
      : this.currentCenter.lng

    this.loadLocations()
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
    styleFunction () {
      return {
        weight: 2,
        color: '#FF6F00'
      }
    },
    updateZoom (zoom) {
      if (zoom !== this.currentZoom) {
        this.currentZoom = Number.parseInt(zoom, 10)
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
@import "~leaflet/dist/leaflet.css";
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";

.map {
  width: 100vw;
  height: 100vh;
  z-index: 1;
}
::v-deep .leaflet-bottom {
  @media #{map-get($display-breakpoints, 'xs-only')} {
    bottom: calc(1.5 * #{$bottom-navigation-height});
  }
}

::v-deep .leaflet-touch .leaflet-bar a {
  @include glassmorphism(
    $color: white,
    $blur-ammount: 4px,
    $color-intensity: 0.4
  );
  width: 40px;
  height: 40px;
  font-size: 28px;
  font-weight: 700;
}
::v-deep .leaflet-touch .leaflet-bar a:first-child {
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
}

::v-deep .leaflet-touch .leaflet-bar a:last-child {
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
}

::v-deep .leaflet-control-zoom {
  margin-right: 1.25rem;
  border: 0;
  @media #{map-get($display-breakpoints, 'xs-only')} {
    display: none;
  }
}

::v-deep .leaflet-control-locate {
  margin-right: 1.25rem;
  @media #{map-get($display-breakpoints, 'xs-only')} {
    margin-right: 0.75rem;
    margin-bottom: 0;
  }
}
</style>
