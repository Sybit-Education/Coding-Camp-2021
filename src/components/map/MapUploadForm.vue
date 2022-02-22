<template>
  <div>
    <v-dialog
      v-model="$parent.showUploadForm"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary" dense flat>
          <v-toolbar-title>
            Wegwerfmöglichkeit erstellen
          </v-toolbar-title>
          <v-spacer />
          <v-btn icon @click="$parent.showUploadForm = false">
            <v-icon dark>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-row>
          <v-col>
            <ul>
              <li>
                Bitte achten Sie darauf, dass Ihre eingegebenen Daten korrekt sind.
              </li>
              <li>
                Außerdem bitten wir Sie um Geduld: Jede Meldung wird von
                Moderator:innen überprüft und freigeben.
              </li>
            </ul>
          </v-col>
        </v-row>
        <v-form
          ref="form"
          v-model="formDataIsValid"
          class="px-4"
          lazy-validation
        >
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Name der Wegwerfmöglichkeit"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="type"
                :items="types"
                :rules="typeRules"
                label="Typ der Wegwerfmöglichkeit"
                outlined
              >
              </v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="description"
                :rules="descriptionRules"
                label="Beschreibung der Wegwerfmöglichkeit"
                outlined
              >
              </v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-checkbox
                v-model="useGPSData"
                :disabled="denyGPSTracking"
                :value="userLocation"
                label="Momentane GPS Position verwenden? (Für Computer nicht empfohlen)"
              >
              </v-checkbox>
            </v-col>
          </v-row>
          <v-row v-if="!useGPSData">
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="latitude"
                :rules="latitudeRules"
                hint="Hier die Latitude Geo Koordinaten eintragen"
                label="Breitengrad"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="longitude"
                :rules="longitudeRules"
                hint="Hier die Longitude Geo Koordinaten eintragen"
                label="Längengrad"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-file-input
                v-model="image"
                label="Bilder"
                outlined
                placeholder="Wählen sie ein Bild aus"
                prepend-icon=""
                prepend-inner-icon="mdi-camera"
              >
              </v-file-input>
            </v-col>
          </v-row>
          <v-row justify="center" justify-sm="end">
            <v-col cols="6" md="3" lg="2">
              <v-btn
                :disabled="!formDataIsValid"
                :loading="$store.state.showLoadingSpinner"
                block
                class="white--text"
                color="primary"
                @click="submit"
              >
                <v-icon dark left> mdi-cloud-upload </v-icon>
                Erstellen
              </v-btn>
            </v-col>
            <v-col cols="6" md="3" lg="2">
              <v-btn
                block
                @click="$parent.showUploadForm = false"
              >
                Abbrechen
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import locationService from '@/services/location.service'

export default {
  props: {
    userLocation: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      formDataIsValid: false,
      denyGPSTracking: true,
      useGPSData: null,
      latitude: '',
      latitudeRules: [
        (v) =>
          (v.length === 9 && this.useGPSData === false) ||
          'Bitte geben Sie hier Koordinaten ein.'
      ],
      longitude: '',
      longitudeRules: [
        (v) =>
          (v.length === 8 && this.useGPSData === false) ||
          'Bitte geben Sie hier Koordinaten ein.'
      ],
      name: '',
      nameRules: [
        (v) => !!v || 'Bitte geben Sie hier einen Namen ein.',
        (v) =>
          (v && v.length >= 5) ||
          'Bitte wählen Sie einen Namen mit 5 oder mehr Zeichen.'
      ],
      description: '',
      descriptionRules: [
        (v) =>
          v === null ||
          v.length >= 10 ||
          v.length === 0 ||
          'Bitte wählen Sie eine Beschreibung, die mindestens 10 Zeichen lang oder komplett leer ist.'
      ],
      types: ['Altkleider-Container', 'Glas-Container', 'Wertstoffhof'],
      type: '',
      typeRules: [(v) => !!v || 'Bitte wählen Sie einen Typ aus.'],
      image: null
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        const trashCan = {
          name: this.name,
          description: this.description,
          type: this.type,
          image: this.image,
          latitude: this.latitude,
          longitude: this.longitude
        }

        if (this.userLocation) {
          trashCan.latitude = this.userLocation[0]
          trashCan.longitude = this.userLocation[1]
        }
        this.$store.dispatch('updateShowLoadingSpinner', true)
        locationService
          .checkImageAndCreateLocation(trashCan)
          .then(() => {
            this.$parent.showUploadForm = false
            this.$refs.form.reset()
            this.$notify({
              group: 'default',
              type: 'success ',
              title: 'Wegwerfmöglichkeit wurde erstellt.',
              text: 'Bitte haben Sie etwas Geduld. Wir prüfen Ihre Einsendung.'
            })
          })
          .catch((error) => {
            this.$notify({
              group: 'default',
              type: 'error ',
              title: 'Entschuldigen Sie bitte, etwas hat nicht geklappt'
            })
            return error
          })
      }
    }
  },
  watch: {
    userLocation (newValue, oldValue) {
      if (newValue !== null) {
        this.denyGPSTracking = false
        this.useGPSData = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .v-dialog--fullscreen {
  overflow-x: hidden;
}

::v-deep .v-input__prepend-inner {
  margin-right: 6px !important;
}
</style>
