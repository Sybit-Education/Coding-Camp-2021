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
    <share-button
        :title="share.title"
        :text="share.text"
        :url="$route.path"
    />
    <v-card class="mx-auto rounded-xl mt-10"
            style="overflow: scroll;"
            v-if="material && material.name && image" height="540">
      <v-card-text elevation="20" class="black--text">
        <div class="d-flex justify-center mb-7 mt-5">
          <h1 class="material-name">{{ material.name }}</h1>
        </div>
        <v-img contain height="125" class="mb-5" :src="image"/>
        <v-row class="mb-3">
          <v-col v-for="target in material.targets" :key="target.id" align="center">
            <v-chip class="ml-2 elevation-3" outlined :color="target.color">{{ target.name }}</v-chip>
          </v-col>
        </v-row>
        <div class="mt-10" v-if="material.notes && material.notes.length <=300 && material.notes.length >5">
          <vue-simple-markdown :source="material.notes"/>
        </div>
        <div class="mt-10" v-else>
          <vue-simple-markdown :source="material.targets[0].description"></vue-simple-markdown>
        </div>
      </v-card-text>
    </v-card>
    <v-skeleton-loader v-else type="card"/>
  </v-container>

</template>

<script>
import ShareButton from '../components/navigation/ShareButton.vue'

export default {
  components: { ShareButton },
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
    share () {
      return {
        title: `Mülli: ${this.material.name} entsorgen 👉 ${this.material.targets[0].name}`,
        text: `${this.material.name} entsorgen: ${this.material.targets[0].name}
        ${this.material.notes}`
      }
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
    }
  }
}
</script>
<style lang="scss" scoped>
.material-name {
  moz-hyphens: auto;
  o-hyphens: auto;
  webkit-hyphens: auto;
  ms-hyphens: auto;
  hyphens: auto;
  font-size:30px;
  line-height: 2rem;
}

</style>
