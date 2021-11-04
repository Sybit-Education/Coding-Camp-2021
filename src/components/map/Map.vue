<template>
  <div>
    <div class="map">
      <map-action-button :userLocation="userLocation"></map-action-button>
      <l-map ref="map" :center="center" :options="{ zoomControl: false}" :zoom="zoom" class="map">
        <LTileLayer :attribution="attribution" :url="url"/>
        <template v-if="userLocation">
          <l-marker :icon="userIcon" :lat-lng="userLocation"/>
        </template>
        <l-marker v-for="can in trashCans" :key="can.latitude" :icon="pickIcon(can)"
                  :lat-lng="[can.latitude, can.longitude]"
                  @click="openTrashCanPopup(can)">
        </l-marker>
        <l-control-zoom class="map__zoom-buttons"></l-control-zoom>
        <l-control position="topleft">
          <back-button :to="{name:'Home'}" />
        </l-control>
      </l-map>
    </div>

    <v-bottom-sheet v-model="trashCanPopupData.active">
      <v-card class="bottom-sheet__card">
        <v-btn fixed icon right>
          <v-icon large @click="trashCanPopupData.active = false">
            mdi-close
          </v-icon>
        </v-btn>
        <v-row>
          <v-col class="align-self-center">
            <h2 class="bottom-sheet__title">{{ trashCanPopupData.title }}</h2>
          </v-col>
        </v-row>
        <v-row v-if="trashCanPopupData.link">
          <v-col class="align-self-center bottom-sheet__link-wrapper">
            <p class="text-h6">Mehr Informationen gibt es hier:</p>
            <a :href="trashCanPopupData.link" class="bottom-sheet__link">{{ trashCanPopupData.link }}</a>
          </v-col>
        </v-row>
        <div v-if="trashCanPopupData.notes !== '\n'">
          <v-row justify="center">
            <v-col class="d-flex justify-center" cols="9" lg="6" md="8">
              <vue-simple-markdown :source="trashCanPopupData.notes"
                                   class="bottom-sheet__notes"></vue-simple-markdown>
            </v-col>
          </v-row>
        </div>
        <v-row v-if="trashCanPopupData.images.length" justify="center">
          <v-col v-for="img in trashCanPopupData.images" :key="img" cols="auto">
            <v-img :src="img" class="bottom-sheet__image"></v-img>
          </v-col>
        </v-row>
        <v-row align="end" justify="center">
          <v-col cols="11" lg="2" md="4" sm="6">
            <v-btn block class="rounded-xl py-7" color="primary" dark
                   @click="openGoogleMaps(trashCanPopupData.latitude, trashCanPopupData.longitude)">Navigiere mich
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { LControl, LControlZoom, LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import 'leaflet.path.drag'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import MapActionButton from './MapActionButton'
import BackButton from '@/components/navigation/BackButton.vue'

export default {
  name: 'Map',
  components: {
    MapActionButton,
    LMap,
    LTileLayer,
    LMarker,
    LControl,
    LControlZoom,
    BackButton
  },
  props: {
    trashCanType: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      map: null,
      userLocation: null,
      zoom: 13,
      position: null,
      trashCanPopupData: {
        id: '',
        active: false,
        title: '',
        link: '',
        notes: '',
        images: [],
        latitude: '',
        longitude: ''
      },
      center: [47.745236, 8.971745],
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
  mounted () {
    this.getTrashCans()
    this.onReady()
  },
  computed: {
    trashCans () {
      if (this.trashCanType) {
        return this.$store.getters.getTrashCans.filter((trashCan) => trashCan.type === this.trashCanType[0])
      } else {
        return this.$store.getters.getTrashCans
      }
    }
  },
  methods: {
    openGoogleMaps (latitude, longitude) {
      window.open(`https://www.google.com/maps/dir/Current+Location/${latitude},${longitude}`, '_blank')
    },
    pickIcon (trashCan) {
      return L.icon({ iconUrl: require(`@/assets/icons/${trashCan.type}.png`), iconSize: [32, 32], iconAnchor: [16, 32] })
    },
    openTrashCanPopup (trashCan) {
      this.trashCanPopupData.id = trashCan.id
      this.trashCanPopupData.title = trashCan.type
      this.trashCanPopupData.notes = trashCan.notes
      this.trashCanPopupData.link = trashCan.link
      this.trashCanPopupData.latitude = trashCan.latitude
      this.trashCanPopupData.longitude = trashCan.longitude

      if (trashCan.image) {
        this.trashCanPopupData.images = []
        trashCan.image.forEach(img => {
          this.trashCanPopupData.images.push(img.url)
        })
      } else {
        this.trashCanPopupData.images = []
      }
      this.trashCanPopupData.active = true
    },
    getTrashCans () {
      this.$store.dispatch('getTrashCansFromSessionStorage')
    },
    onReady () {
      navigator.geolocation.getCurrentPosition((success) => {
        this.position = success.coords
        if (this.center) {
          this.center = [success.coords.latitude, success.coords.longitude]
          this.registerGeolocationObserver()
        }
      }, error => {
        this.$notify({
          group: 'default',
          type: 'error',
          title: 'Error, keine Änderung der Position erkannt.',
          text: error.message
        })
      }, options => {
        options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      })
    },
    registerGeolocationObserver () {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.watchPosition(position => {
          this.userLocation = [position.coords.latitude, position.coords.longitude]
        }, (error) => {
          this.$notify({
            group: 'default',
            type: 'error',
            title: 'Keine Änderung der Position erkannt.',
            text: error
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'node_modules/vuetify/src/styles/settings/variables';
@import 'src/scss/variables';

.map {
  width: 100vw;
  height: 100vh;
  z-index: 1;
}

.bottom-sheet {
  &__card {
    text-align: center;
    overflow-y: scroll;
    padding: 1rem 1rem 1.75rem 0.75rem;
    height: clamp(60vh, 70vw, 90vh);
    display: grid
  }

  &__title {
    margin: 1rem 0;
    font-size: clamp(2rem, 8vw, 2.5rem);
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  &__link {
    word-break: break-all;
    text-underline-offset: 4px;

    &::before {
      content: '🌐';
      margin-right: 4px;
      text-decoration: none;
      display: inline-block;
    }

    &-wrapper {
      margin:0 0 3rem 0;
    }
  }

  &__notes {
    text-align: center;
    font-size: clamp(1rem, 2vw, 1.25rem);
    word-break: break-word;

    ::v-deep ul li {
      width: fit-content;
      list-style-type: "📆  ";
    }
  }

  &__image {
    border-radius: 20px;
    width: clamp(250px, calc(50vw - 40px), 1600px)
  }
}

::v-deep .leaflet-control-zoom {
  margin-right: 2rem;
  border: 0;
  @media #{map-get($display-breakpoints, 'xs-only')} {
    display: none;
  }
}

::v-deep .leaflet-control-zoom-in {
  @include glassmorphism($color: white, $blur-ammount: 4px, $color-intensity: .4);
}

::v-deep .leaflet-control-zoom-out {
  @include glassmorphism($color: white, $blur-ammount: 4px, $color-intensity: .4);
}
</style>
