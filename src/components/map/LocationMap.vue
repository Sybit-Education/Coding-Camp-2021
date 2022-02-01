<template>
  <div class="map">
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
      <l-geo-json
        v-if="geojson"
        layerType="boundary"
        :options-style="styleFunction"
        :geojson="geojson"
      />
      <l-tile-layer :attribution="attribution" :url="url" />
      <l-marker v-if="userLocation" :icon="userIcon" :lat-lng="userLocation" />
      <v-marker-cluster
        :options="{ showCoverageOnHover: false, maxClusterRadius: 40 }"
      >
        <l-marker
          v-for="loc in locations"
          :key="loc.id"
          :icon="getPin(loc)"
          :lat-lng="[loc.latitude, loc.longitude]"
          @click="openPopup(loc)"
        />
      </v-marker-cluster>
      <l-control-zoom
        class="map__zoom-buttons"
        position="topright"
        zoomInTitle="Vergrößern"
        zoomOutTitle="Verkleinern"
      />
      <l-control position="topleft">
        <back-button />
      </l-control>
      <l-control class="map__action-button" position="bottomleft">
        <map-action-button :userLocation="userLocation" />
      </l-control>
      <v-locate-control
        class="map__locate-button"
        :options="{ position: 'bottomright' }"
      />
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
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import 'leaflet.path.drag'
import 'leaflet/dist/leaflet.css'
import L, { latLngBounds } from 'leaflet'
import MapActionButton from './MapActionButton'
import BackButton from '@/components/navigation/BackButton.vue'
import MapNavigationCard from './MapNavigationCard.vue'
import locationService from '@/services/location.service'

export default {
  name: 'LocationMap',
  components: {
    MapActionButton,
    LMap,
    LTileLayer,
    LMarker,
    LControl,
    LControlZoom,
    LGeoJson,
    'v-locate-control': Vue2LeafletLocatecontrol,
    'v-marker-cluster': Vue2LeafletMarkerCluster,
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
      bounds: latLngBounds([
        [47.54918891696502, 8.474666027343236],
        [47.99957120189105, 9.365931896483863]
      ]),
      maxBounds: latLngBounds([
        [47.54918891696502, 8.474666027343236],
        [47.99957120189105, 9.365931896483863]
      ]),
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
    async loadLocations () {
      await this.$store.dispatch('Location/getLocationRecords')
      const locations = this.$store.getters['Location/getLocationList']
      if (this.locationTypes) {
        const list = []
        this.locationTypes.forEach((type) => {
          const filteredList = locations.filter((loc) => {
            return loc.type === type
          })
          list.push(...filteredList)
        })
        this.locations = list
      } else {
        this.locations = locations
      }
    },
    getPin (location) {
      return L.icon({
        iconUrl: locationService.getLocationTypeImage(location),
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      })
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
@import "~leaflet/dist/leaflet.css";
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";

.map {
  width: 100vw;
  height: 100vh;
  z-index: 1;
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
  margin-top: 28px;
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
    bottom: calc(1.5 * #{$bottom-navigation-height} - 18px);
  }
}

::v-deep .leaflet-control-attribution {
  margin-right: 1.25rem;
  @media #{map-get($display-breakpoints, 'xs-only')} {
    margin-right: 0;
    margin-bottom: 0;
  }
}

::v-deep .map-action-button {
  margin-bottom: calc(0.25 * #{$bottom-navigation-height} + 4px);

  @media #{map-get($display-breakpoints, 'xs-only')} {
    margin-bottom: calc(1.5 * #{$bottom-navigation-height});
  }
}
</style>
