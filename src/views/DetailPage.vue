<template>
  <v-container>
    <div class="d-flex justify-center mb-7">
    <h1 style="font-size:40px">{{material.name}}</h1>
    </div>
    <v-img contain height="125"  class="mb-10" src="https://via.placeholder.com/150?text=placeholder"></v-img>
    <p class="mx-5" align="center" style="font-size:26px"> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </p>
  </v-container>

</template>
<script>
export default {
  computed: {
    image () {
      if (this.material?.targets[0]?.images){
        return this.material.targets[0].images[0].url
      }
      return("")
    },
    material (){
      return this.$store.getters.getMaterialById(this.$route.params.id)
    }
  },
  mounted (){
    this.getMaterial()
    console.log(this.material)
  },
  methods:{
    getMaterial() {
      if (this.material ==! undefined) return
      this.$store.dispatch('getRecordsFromSessionStorage', [
        'material',
        'targets'
      ])
      }
  }
}
</script>
<style>
p {color:rgb(0, 0, 0)}
</style>
