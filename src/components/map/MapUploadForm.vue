<template>
  <div>
    <v-dialog v-model="$parent.showUploadForm" fullscreen transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="secondary">
          <v-btn icon @click="$parent.showUploadForm = false">
            <v-icon dark>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title class="pl-2">Erstellen einer Wegwerfmöglichkeit</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-row class="mt-3">
          <v-col class="d-flex justify-center" cols="12">
            <p class="text-h6 text-sm-h5 text-md-h4 text-center">Formular zum Erstellen einer neuen
              Wegwerfmöglichkeit</p>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="px-md-13" cols="start">
            <v-list>
              <v-list-item>
                <p>* Bitte beachten Sie, dass Ihre eingegebenen Daten korrekt eingetragen sind.</p>
              </v-list-item>
              <v-list-item>
                <p>* Außerdem bitten wir Sie um Geduld, jeder Mülleimer wird von einem unserer Moderatoren überprüft und
                  freigeben.</p>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <v-form ref="form" v-model="formDataIsValid" class="px-4 px-md-14" lazy-validation>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="name" :rules="nameRules" label="Name der Wegwerfmöglichkeit"
                            outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="type" :items="types" :rules="typeRules" label="Typ der Wegwerfmöglichkeit" outlined>
              </v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="description" :rules="descriptionRules" label="Beschreibung der Wegwerfmöglichkeit"
                          outlined>
              </v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-checkbox color="secondary" v-model="useGPSData" :disabled="denyGPSTracking"
                          :value="userLocation === null ? false :userLocation.length > 0"
                          label="Momentane GPS Position Benutzen? (Für Computer nicht empfohlen)">
              </v-checkbox>
            </v-col>
          </v-row>
          <v-row v-if="!useGPSData">
            <v-col cols="12" md="6">
              <v-text-field v-model="latitude" :rules="latitudeRules" hint="Hier die Latitude Geo Koordinaten eintragen"
                            label="Breitengrad"
                            outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="longitude" :rules="longitudeRules"
                            hint="Hier die Longitude Geo Koordinaten eintragen" label="Längengrad"
                            outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-file-input v-model="image" label="Bilder" outlined placeholder="Wählen sie ein Bild aus"
                            prepend-icon="" prepend-inner-icon="mdi-camera">
              </v-file-input>
            </v-col>
          </v-row>
          <v-row justify="center" justify-sm="end">
            <v-col cols="12" md="3" lg="2">
              <v-btn
                  :disabled="!formDataIsValid"
                  :loading="$store.state.showLoadingSpinner"
                  block
                  class="white--text py-6"
                  color="primary"
                  @click="submit"
              >
                Erstellen
                <v-icon
                    dark
                    right
                >
                  mdi-cloud-upload
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import * as trashcanService from '../../services/trashcan.service'

export default {
  props: {
    userLocation: {
      type: Array,
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
        v => (v.length === 9 && this.useGPSData === false) || 'Bitte geben Sie hier Koordinaten ein.'
      ],
      longitude: '',
      longitudeRules: [
        v => (v.length === 8 && this.useGPSData === false) || 'Bitte geben Sie hier Koordinaten ein.'
      ],
      name: '',
      nameRules: [
        v => !!v || 'Bitte geben Sie hier einen Namen ein.',
        v => (v && v.length >= 5) || 'Bitte wählen Sie einen Namen mit 5 oder mehr Zeichen.'
      ],
      description: '',
      descriptionRules: [
        v => (v.length >= 10 || v.length === 0) || 'Bitte wählen Sie eine Beschreibung, die mindestens 10 Zeichen lang oder komplett leer ist.'
      ],
      types: [
        'Wertstoffhof',
        'Glas-Container'
      ],
      type: '',
      typeRules: [
        v => !!v || 'Bitte wählen Sie einen Typ aus.'
      ],
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
        trashcanService.checkImageAndCreateTrashCan(trashCan).then(() => {
          this.$parent.showUploadForm = false
          this.$refs.form.reset()
          this.$notify({
            group: 'default',
            type: 'success ',
            title: 'Wegwerfmöglichkeit wurde erstellt.',
            text: 'Bitte haben Sie etwas Geduld. Wir prüfen Ihre Einsendung.'
          })
        }).catch((error) => {
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
      if (newValue.length > 0 && oldValue === null) {
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
