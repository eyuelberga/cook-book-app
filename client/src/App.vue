<template>
  <v-app class="grey lighten-4">
    
    <Navbar v-if="show"/>

    <v-content class="mb-4" v-if="show">
      <router-view></router-view>
    </v-content>
    <Details v-if="show"/>
    <v-content class="ma-0" v-if="!show">
      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Details from '@/components/Details'
export default {
  name: 'App',
  components: { Navbar, Details},

  data () {
    return {
      //
    }
  },
  computed: {
    show () {
      return this.$route.path != '/auth'; 
    }
  }
}
</script>