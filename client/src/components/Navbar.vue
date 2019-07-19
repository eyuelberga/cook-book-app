<template>
  <nav>
    <v-toolbar flat app>

      <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title class="text-uppercase grey--text">
        <span>My Cook Book</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn flat color="grey" @click="signout">
        <span>Sign out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>

    </v-toolbar>   


    <!-- Drawer -->
    <v-navigation-drawer v-model="drawer" app class="primary">

      <v-layout column align-center>
        <v-flex class="mt-5 text-xs-center">
          <p class="white--text subheading mt-1 text-xs-center">
            {{name}}
          </p>
        </v-flex>
      </v-layout>

      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>
      </v-list>
      
    </v-navigation-drawer>


  </nav>

</template>


<script>
import axios from'axios';
import { EventBus } from '@/event-bus.js';
export default {
  data() {
    return {
      name: '',
      photoURL: '',
      drawer: false,
      links: [
        { icon: 'dashboard', text: 'Dashboard', route: '/dashboard'},
      ],  
      snackbar: false,
    }
  },
  mounted(){
  },
  methods: {

    signout() {
      //TODO handle signout
        axios.post('http://localhost:3000/api/AppUsers/logout?access_token='+localStorage.getItem('access_token'),{})
         .then(res =>{
          localStorage.removeItem('access_token');
          localStorage.removeItem('user_id');
          this.$router.replace({path:'/auth'})
         })
         .catch(err =>{
        console.log(err);
         });
    }

  },
  created() {
    //TODO display current logged in user name 
  }

}
</script>
