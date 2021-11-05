<template>
  <v-app>
    <v-main class="py-0">
      <router-view/>
      <div class="navigation">
      <BottomNavigation class="bottomnav"/>
      </div>
    </v-main>
    <notifications group="default"/>
    <vue-cookie-first :api-key="cookieFirstKey" :banner-style="cookieFirstStyle" />
  </v-app>
</template>

<script>
import BottomNavigation from '@/components/navigation/BottomNavigation'
import VueCookieFirst from 'vue-cookie-first'

export default {
  name: 'App',
  components: { BottomNavigation, VueCookieFirst },
  data () {
    return {
      cookieFirstKey: 'e1cd165b-d382-4e08-acdf-e9467a05f9d8',
      cookieFirstStyle: {
        banner: {
          backgroundColor: '#FF6F00',
          color: '#000'
        },
        acceptButton: {
          backgroundColor: '#fff',
          color: '#000',
          borderColor: '#000',
          borderRadius: '50%',
          borderWidth: '1px',
          borderStyle: 'solid'
        },
        declineButton: {
          backgroundColor: '#fff',
          color: '#000',
          borderColor: '#000',
          borderRadius: '50%',
          borderWidth: '1px',
          borderStyle: 'solid'
        }
      }
    }
  }
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
