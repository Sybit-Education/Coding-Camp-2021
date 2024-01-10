<template>
  <div>
    <v-autocomplete
      v-model="select"
      class="flex-full-width"
      :loading="items && items.length < 0"
      :items="items"
      append-inner-icon="mdi-magnify"
      eager
      hide-no-data
      variant="solo"
      hide-details="auto"
      label="Tippe zum Suchen"
      :custom-filter="filter"
      return-object
      auto-select-first
      item-title="name"
      item-value="id"
      rounded
      @keyup.enter="search()"
    >
      <template #no-data>
        <div class="px-3">
          Leider keine Treffer!<br>
          Stelle eine <a
            class="link"
            @click="dialog = true"
          >Anfrage</a>.
        </div>
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
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="addMaterial"
        >
          <v-card-text>
            <v-text-field
              v-model="material.name"
              :rules="nameRules"
              label="gesuchter Abfall"
              required
              variant="outlined"
            />
            <v-textarea
              v-model="material.notes"
              label="Beschreibung"
              variant="outlined"
            />
            <v-text-field
              v-model="material.requester.name"
              :rules="nameRules"
              label="Name"
              required
              variant="outlined"
            />
            <v-text-field
              v-model="material.requester.email"
              :rules="emailRules"
              label="E-Mail"
              type="email"
              variant="outlined"
            />
            <v-text-field
              v-model="material.requester.city"
              label="Ort"
              type="text"
              variant="outlined"
            />
            <v-alert
              v-if="message"
              color="error"
            >
              {{ message }}
            </v-alert>
          </v-card-text>
          <v-card-actions class="px-4">
            <v-spacer />
            <v-btn
              color="grey"
              class="rounded-xl"
              variant="text"
              @click="dialog = false"
            >
              Abbrechen
            </v-btn>
            <v-btn
              :disabled="!valid"
              :loading="showLoadingSpinner"
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

<script lang="ts">
import { toast } from 'vuetify-sonner'
import type Material from '@/types/material'
import materialService from '@/services/material.service'
import { useLoadingStore } from '@/store/loading.store'
import { mapState } from 'pinia'
import MaterialRequest from '@/types/material-request'

export default {
  props: {
    items: {
      type: Array<Material>,
      required: true
    }
  },
  data () {
    return {
      select: null as Material | null,
      dialog: false,
      valid: false,
      nameRules: [
        (v: string) => !!v || 'Bitte Name eintragen',
        (v: string) =>
          v.length < 50 || 'Der Name darf nicht länger als 50 Zeichen sein.'
      ],
      emailRules: [
        (v: string) =>
          (v.length ? /\S+@\S+\.\S+/.test(v) : true) ||
          'Bitte eine korrekte E-Mail eintragen'
      ],
      material: {} as MaterialRequest,
      message: ''
    }
  },
  computed: {
    ...mapState(useLoadingStore, {
      showLoadingSpinner: (state) => state.showLoadingSpinner
    })
  },
  watch: {
    dialog () {
      if (!this.dialog) {
        this.message = ''
      }
    },
    select () {
      if (this.select) {
        this.search()
      }
    }
  },
  methods: {
    compare (a: Material, b: Material) {
      if (a.name === b.name) {
        return true
      }
      return false
    },
    search () {
      if (this.select?.id) {
        this.$router.push({
          name: 'DetailPage',
          params: { id: this.select.id }
        })
      } else {
        this.dialog = true
      }
    },
    addMaterial () {
      if ((this.$refs.form as any).validate()) {
        useLoadingStore().updateShowLoadingSpinner(true)
        materialService.getAllNames().then((names) => {
          if (!names.includes(this.material.name)) {
            materialService.addMaterial(this.material)
            this.dialog = false
            toast('Wir haben deine Anfrage erhalten und werden sie bearbeiten.')
          } else {
            this.message = 'Diesen Eintrag gibt es bereits'
          }
          useLoadingStore().updateShowLoadingSpinner(false)
        })
      }
    },
    filter (itemTitle: string, queryText: string, item?: any): boolean {
      if (item != null && queryText != null) {
        this.material.name = queryText

        const query = queryText.toLocaleLowerCase()
        const valueName = item.raw.name.toLocaleLowerCase()

        if (item.raw.synonyms) {
          return valueName.indexOf(query) > -1 ||
            item.raw.synonyms.toLocaleLowerCase().indexOf(query) > -1
        } else {
          return  valueName.indexOf(query) > -1
        }
      }
      return false
    }
  }
}
</script>
<style scoped>
.v-sheet.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: none !important;
}
.link {
  color: rgb(var(--v-theme-primary));
  cursor: pointer;
}
</style>
