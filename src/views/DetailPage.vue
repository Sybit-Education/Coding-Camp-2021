<template>
  <v-container>
    <div class="d-flex justify-center mb-7">
    <h1>Jogurtbecher</h1>
    </div>
    <v-img contain height="125"  class="mb-10" :src="image"></v-img>
    <p class="mx-5" align="center"> Text ajshdgfajhsgfhjasghfjghasghfgajhsgfhaghjfsg asjhgdhjas  hgasg ghj hj ghg hgh ghj g hg hgh g hghj gh g hg hjg hg </p>
  </v-container>

</template>
<script>
export default {
  computed: {
    image () {
      return require("@/assets/img/gelber_sack.png")
    }
  }
}
</script>
<style>
h1 {color:rgb(36, 36, 36)}
</style>
