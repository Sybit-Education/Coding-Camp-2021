<template>
  <v-app>
    <v-main class="py-0">
      <router-view/>
      <div class="navigation">
        <BottomNavigation class="bottomnav"/>
      </div>
    </v-main>
    <notifications group="default"/>
  </v-app>
</template>

<script>
import BottomNavigation from '@/components/navigation/BottomNavigation'

export default {
  name: 'App',
  components: { BottomNavigation },
  data () {}
}
</script>
<style lang="scss">
@import 'src/scss/scrollbar.scss';
.navigation {
  position: relative;
}

.bottomnav {
  position: absolute;
  bottom: 0;
}
</style>
