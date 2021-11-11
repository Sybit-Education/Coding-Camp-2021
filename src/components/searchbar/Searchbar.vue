<template>
  <div>
    <v-autocomplete
        v-model="select"
        :loading="items && items.length < 0"
        :items="items"
        class="rounded-xl"
        solo
        hide-details
        no-data-text="Keine Treffer! Drücke auf das Fragezeichen, um eine Anfrage zu senden."
        label="Tippe zum Suchen"
        :filter="filter"
        @keyup.enter="search()"
        :return-object="true"
    >
      <template slot="item" slot-scope="data">
        {{ data.item.name }}
      </template>
      <template slot="selection" slot-scope="data">
        {{ data.item.name }}
      </template>
      <template v-slot:append>
        <v-btn icon @click="search">
          <v-icon>
            {{ $route.path === "/detail" ? "mdi-magnify" : "mdi-help" }}
          </v-icon>
        </v-btn>
      </template>
    </v-autocomplete>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
        class="rounded-xl"
    >
      <v-card class="pa-5 rounded-xl">
        <v-card-title class="text-h5">
          Anfrage
        </v-card-title>
        <v-form ref="form" v-model="valid" @submit.prevent="addMaterial">
          <v-card-text>
            <v-text-field v-model="material.name" :rules="nameRules" label="Name" required outlined/>
            <v-textarea v-model="material.notes" label="Beschreibung" outlined/>
            <v-alert v-if="message" color="error">
              {{ message }}
            </v-alert>
          </v-card-text>
          <v-card-actions class="px-4">
            <v-spacer></v-spacer>
            <v-btn
                color="secondary"
                class="rounded-xl"
                text
                @click="dialog = false"
            >
              Abbrechen
            </v-btn>
            <v-btn
                :disabled="!valid"
                :loading="$store.state.showLoadingSpinner"
                color="primary"
                type="submit"
                class="rounded-xl"
            >
              Senden
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import materialService from '../../services/material.service'

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  watch: {
    select () {
      this.search()
    },
    dialog () {
      if (!this.dialog) {
        this.message = ''
      }
    }
  },
  data () {
    return {
      select: null,
      dialog: false,
      valid: false,
      nameRules: [
        v => !!v || 'Bitte Name eintragen',
        v => v.length < 50 || 'Der Name darf nicht länger als 50 Zeichen sein.'
      ],
      material: {
        name: '',
        notes: ''
      },
      message: ''
    }
  },
  methods: {
    search () {
      if (this.select?.id) {
        this.$router.push({ name: 'DetailPage', params: { id: this.select.id } })
      } else {
        this.dialog = true
      }
    },
    addMaterial () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('updateShowLoadingSpinner', true)
        materialService.getAllNames().then(names => {
          if (!names.includes(this.material.name)) {
            materialService.addMaterial(this.material)
            this.dialog = false
            this.$notify({
              group: 'default',
              type: 'success',
              title: 'Vielen Dank!',
              text: 'Wir haben deine Anfrage erhalten und werden sie bearbeiten.'
            })
          } else {
            this.message = 'Diesen Eintrag gibt es bereits'
          }
          this.$store.dispatch('updateShowLoadingSpinner', false)
        })
      }
    },
    filter (item, queryText) {
      if (item != null && queryText != null) {
        this.material.name = queryText
        if (item.synonyms) {
          return (
            item.name.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1 ||
              item.synonyms.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)
        } else {
          return item.name.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1
        }
      }
      return -1
    }
  }
}
</script>

<style scoped>
.v-sheet.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: none !important;
}
</style>
