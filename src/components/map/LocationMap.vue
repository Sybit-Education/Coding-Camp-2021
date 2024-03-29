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
      @ready="onReady"
      @locationfound="onLocationFound"
    >
      <l-geo-json
        v-if="geojson"
        --layer-type="boundary"
        :options-style="styleFunction"
        :geojson="geojson"
      />
      <l-tile-layer
        :attribution="attribution"
        :url="url"
      />
      <l-marker
        v-if="userLocation"
        --:icon="userIcon"
        :lat-lng="userLocation"
      />
      <v-marker-cluster
        v-bind="{ showCoverageOnHover: false, maxClusterRadius: 40 }"
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
        zoom-in-title="Vergrößern"
        zoom-out-title="Verkleinern"
      />
    </l-map>
    <v-bottom-sheet v-model="showPopup">
      <v-sheet>
        <map-navigation-card
          :location="popupLocation"
          @close="closePopup"
        />
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import {
  LControlZoom,
  LGeoJson,
  LMap,
  LMarker,
  LTileLayer
} from '@vue-leaflet/vue-leaflet'
import { LMarkerClusterGroup } from 'vue-leaflet-markercluster'
import 'leaflet.path.drag'

import 'leaflet/dist/leaflet.css'
import 'vue-leaflet-markercluster/dist/style.css'

import L from 'leaflet'
import MapNavigationCard from './MapNavigationCard.vue'
import locationService from '@/services/location.service'
import { useLocationStore } from '@/store/location.store'
import type Location from '@/types/location'
import { mapState } from 'pinia'

export default {
  name: 'LocationMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControlZoom,
    LGeoJson,
    'v-marker-cluster': LMarkerClusterGroup,
    MapNavigationCard
  },
  inject: [ 'L'],
  props: {
    locationTypes: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      geojson: null,
      userLocation: undefined as { lat: number; lng: number } | undefined,
      userIcon: L.icon({
        iconUrl: '@/assets/icons/user-location.svg',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      }),
      currentZoom: 10,
      currentCenter: {lat: 47.78707377527543, lng: 8.8828643076576 } as any,
      position: null,
      showPopup: false,
      popupLocation: undefined as Location | undefined,
      bounds: L.latLngBounds([
        [47.54918891696502, 8.474666027343236],
        [47.99957120189105, 9.365931896483863]
      ]) as L.LatLngBounds | undefined,
      maxBounds: L.latLngBounds([
        [47.54918891696502, 8.474666027343236],
        [47.99957120189105, 9.365931896483863]
      ]) as L.LatLngBounds | undefined,
      url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  computed: {
    ...mapState(useLocationStore, {
      locations: store =>  store.locationList
    })
  },
  created () {

  },
  mounted () {
    this.currentZoom = this.$route.query.zoom
      ? Number.parseInt(this.$route.query.zoom as string, 10)
      : this.currentZoom
    this.currentCenter.lat = this.$route.query.clat
      ? Number.parseFloat(this.$route.query.clat as string)
      : this.currentCenter.lat
    this.currentCenter.lat = this.$route.query.clng
      ? Number.parseFloat(this.$route.query.clng as string)
      : this.currentCenter.lat
    this.loadDistrictPolygons()
    },
  methods: {
    loadDistrictPolygons () {
      fetch('/landkreis-konstanz.geojson').then((response) => {
        response.json().then((data) => {
          this.geojson = data
        })
      })
    },
    getPin (location: Location) {
      return L.icon({
        iconUrl: locationService.getLocationTypeImage(location),
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      })
    },
    openPopup (location: Location) {
      this.popupLocation = location
      this.showPopup = true
    },
    closePopup () {
      this.popupLocation = undefined
      this.showPopup = false
    },
    styleFunction () {
      return {
        weight: 2,
        color: '#FF6F00'
      }
    },
    updateZoom (zoom: number) {
      if (zoom !== this.currentZoom) {
        this.currentZoom = zoom
        this.$router.replace({
          query: {
            zoom: this.currentZoom,
            clat: this.currentCenter ? this.currentCenter.x : null,
            clng: this.currentCenter ? this.currentCenter.y : null
          }
        })
      }
    },
    updateCenter (center: L.LatLng) {
      if (center) {
        this.currentCenter = center
        this.$router.replace({
          query: {
            zoom: this.currentZoom,
            clat: this.currentCenter ? this.currentCenter.lat : null,
            clng: this.currentCenter ? this.currentCenter.lng : null
          }
        })
      }
    },
    onReady(mapObject: { locate: () => void }) {
      mapObject.locate()
    },
    onLocationFound(locationEvt: L.LocationEvent){
      this.updateCenter(locationEvt.latlng)
    }
  }
}
</script>

<style lang="scss" scoped>
@use 'vuetify/settings' as v;
@import "leaflet/dist/leaflet.css";
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
@import "leaflet.markercluster/dist/MarkerCluster.css";
@import "leaflet.markercluster/dist/MarkerCluster.Default.css";

.map {
  width: 100%;
  height: 100%;
  z-index: 1;
}

:deep(.leaflet-touch) .leaflet-bar a {
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
:deep(.leaflet-touch) .leaflet-bar a:first-child {
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
}

:deep(.leaflet-touch) .leaflet-bar a:last-child {
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
}

:deep(.leaflet-control-zoom) {
  margin-top: 28px;
  margin-right: calc(1.25rem + env(safe-area-inset-right));
  border: 0;
  @media #{map-get(v.$display-breakpoints, 'xs')} {
    display: none;
  }
}

:deep(.leaflet-control-locate) {
  margin-right: calc(1.25rem + env(safe-area-inset-right));
  @media #{map-get(v.$display-breakpoints, 'xs')} {
    margin-right: calc(1.25rem + env(safe-area-inset-right));
    bottom: calc(0.5 * #{$bottom-navigation-height} - 18px + env(safe-area-inset-bottom)) ;
  }
}

:deep(.leaflet-control-attribution) {
  margin-right: calc(1.25rem + env(safe-area-inset-right));
  @media #{map-get(v.$display-breakpoints, 'xs')} {
    margin-right: env(safe-area-inset-right);
    margin-bottom: 0;
  }
}

:deep(.map-action-button) {
  margin-bottom: calc(0.25 * #{$bottom-navigation-height} + 4px);

  @media #{map-get(v.$display-breakpoints, 'xs')} {
    margin-bottom: calc(0.5 * #{$bottom-navigation-height} + env(safe-area-inset-bottom));
  }
}
</style>
