<template>
  <v-app>
    <v-main class="py-0">
      <router-view/>
      <div class="navigation">
        <BottomNavigation class="bottomnav"/>
      </div>
    </v-main>
    <cookie-law :buttonText=buttonText :message="message" theme="royal"></cookie-law>
    <notifications group="default"/>
  </v-app>
</template>

<script>
import BottomNavigation from './components/navigation/BottomNavigation'
import CookieLaw from 'vue-cookie-law'

export default {
  name: 'App',
  components: { BottomNavigation, CookieLaw },
  data () {
    return {
      message: 'Diese Website verwendet Cookies 🍪, um Ihnen die bestmögliche Nutzung unserer Website zu ermöglichen.',
      buttonText: 'Ja, ich akzeptiere'
    }
  }
}
</script>
<style lang="scss">
@import 'src/scss/scrollbar.scss';

.Cookie--royal .Cookie__button {
  background-color: #212121 !important;
  border-radius: 20px !important;

  &:hover {
    background-color: #E91E63 !important;
    transition-duration: 0.4s;
  }
}

.navigation {
  position: relative;
}

.bottomnav {
  position: absolute;
  bottom: 0;
}
</style>
