<template>
  <v-container>
    <v-card
      class="mx-auto rounded-xl"
      v-if="material && material.name && image"
    >
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
        <v-icon style="font-size: 25px"> mdi-arrow-left </v-icon>
      </v-btn>
      <v-card-text elevation="20" class="black--text" style="font-size: 20px">
        <div class="d-flex justify-center mb-7">
          <h1 style="font-size: 40px">{{ material.name }}</h1>
        </div>
        <v-img contain height="125" class="mb-10" :src="image"></v-img>
        <p class="d-flex justify-center mx-5">
          <v-list>
            <v-list-item v-for="target in material.targets" :key="target.id">
              <v-list-content>
                <v-chip outlined :color="target.color">{{
                  target.name
                }}</v-chip>
              </v-list-content>
            </v-list-item>
          </v-list>
        </p>
        <div
          v-if="material.notes.length >= 300"
          style="max-height: 250px; overflow: scroll"
        >
          {{ material.notes }}
        </div>
        <div v-else>
          {{ material.notes }}
        </div>
      </v-card-text>
    </v-card>
    <v-skeleton-loader v-else type="card" />
    <div class="d-flex justify-center mb-7 mt-5">
      <v-btn v-if="isShareable" @click="shareDetails" elevation="2"
        >Teilen</v-btn
      >
    </div>
  </v-container>
</template>
<script>
export default {
  computed: {
    image() {
      if (
        this.material &&
        this.material.targets &&
        this.material.targets[0]?.images
      ) {
        return this.material.targets[0].images[0].url;
      }
      return "required('https://via.placeholder.com/150?text=placeholder')";
    },
    material() {
      return this.$store.getters.getMaterialById(this.$route.params.id);
    },
    isShareable() {
      return this.material && "share" in navigator;
    },
  },
  mounted() {
    this.getMaterial();
    this.isShareable();
  },
  methods: {
    getMaterial() {
      if (this.material === !undefined) return;
      this.$store.dispatch("getRecordsFromSessionStorage", [
        "material",
        "targets",
      ]);
    },
    shareDetails() {
      if (!this.isShareable) {
        return;
      }
      const data = {
        title: `Details zu ${this.material.name}`,
        text: `So kannst du den Müll fachgerecht entsorgen:
        (${this.material.targets[0].description})`,
        url: window.location.href,
      };
      navigator.share(data);
    },
  },
};
</script>
