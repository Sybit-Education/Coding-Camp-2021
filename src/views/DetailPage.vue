<template>
  <v-container>
    <v-btn
        @click="$router.go(-1)"
        fab
        small
        top
        left
        dark
        fixed
    >
      <v-icon>
        mdi-arrow-left
      </v-icon>
    </v-btn>
    <v-btn
        v-if="isShareable"
        @click="shareDetails"
        fab
        small
        top
        right
        fixed
    >
      <v-icon color="blue">
        mdi-share
      </v-icon>
    </v-btn>
    <v-card class="mx-auto rounded-xl mt-10"
            style="overflow: scroll;"
            v-if="material && material.name && image" height="540">
      <v-card-text elevation="20" class="black--text">
        <div class="d-flex justify-center mb-7 mt-5">
          <h1 style="line-height: 2rem;">{{ material.name }}</h1>
        </div>
        <v-img contain height="125" class="mb-5" :src="image"/>
        <v-row class="mb-3">
          <v-col cols="12" v-for="target in material.targets" :key="target.id" align="center">
            <v-chip class="ml-2 elevation-3 white--text" :color="target.color" large>{{ target.name }}</v-chip>
          </v-col>
        </v-row>
        <div class="mt-10" v-if="material.notes.length >= 300">
          {{ material.notes }}
        </div>
        <div v-else>
          <vue-simple-markdown :source="material.notes"/>
        </div>
      </v-card-text>
    </v-card>
    <v-skeleton-loader v-else type="card"/>
    <div class="d-flex justify-center mb-7 mt-5">
    </div>
  </v-container>

</template>

<script>
export default {
  computed: {
    image () {
      if (this.material && this.material.targets && this.material.targets[0]?.images) {
        return this.material.targets[0].images[0].url
      }
      return 'required(\'https://via.placeholder.com/150?text=placeholder\')'
    },
    material () {
      return this.$store.getters.getMaterialById(this.$route.params.id)
    },
    isShareable () {
      return (this.material && ('share' in navigator))
    }
  },
  created () {
    this.getMaterial()
  },
  methods: {
    getMaterial () {
      if (this.material === !undefined) return
      this.$store.dispatch('getRecordsFromSessionStorage', [
        'material',
        'targets'
      ])
    },
    shareDetails () {
      if (!this.isShareable) {
        return
      }
      const data = {
        title: `Details zu ${this.material.name}`,
        text: `So kannst du den Müll fachgerecht entsorgen:
        (${this.material.targets[0].description})`,
        url: window.location.href
      }
      navigator.share(data)
    }
  }
}
</script>
