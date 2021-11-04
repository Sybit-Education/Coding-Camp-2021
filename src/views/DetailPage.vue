<template>
  <v-container>
    <v-card class="mx-auto rounded-xl"
      v-if="material && material.name && image">
      <v-btn
        @click="$router.go(-1)"
        fab
        small
        top
        left
        absolute
        class="mt-3"
        style="margin-left: -12px"
      >
        <v-icon style="font-size:25px">
          mdi-arrow-left
      </v-icon>
      </v-btn>
      <share-button
        :title="share.title"
        :text="share.text"
        :url="$route.path"
      />
    <v-card-text elevation="20" class="black--text"  style="font-size:20px">
    <div class="d-flex justify-center mb-7 mt-5">
    <h1 style="font-size:30px">{{material.name}}</h1>
    </div>
    <v-img contain height="125"  class="mb-10" :src="image"></v-img>
    <p class="d-flex justify-center mx-5">
      <v-list>
        <v-list-item v-for="target in material.targets" :key="target.id">
          <v-list-content>
            <v-chip outlined :color="target.color">{{ target.name }}</v-chip>
          </v-list-content>
        </v-list-item>
      </v-list>
    </p>
    <div v-if="material.notes.length >= 300" style="max-height: 250px; overflow: scroll;">
      <vue-simple-markdown :source="material.notes" />
    </div>
    <div v-else>
      <vue-simple-markdown :source="material.notes" />
    </div>
    </v-card-text>
    </v-card>
    <v-skeleton-loader v-else type="card" />
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
  mounted () {
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
