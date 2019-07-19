<template>
  <v-layout row justify-center>
    <v-dialog v-model="detailsDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
          <v-toolbar dark color="primary">
          <v-btn icon dark @click="detailsDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{data.name}}</v-toolbar-title>
        </v-toolbar>

      <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md4>
        <v-card flat>
          
          <v-img
          :src="data.imageUrl"
          aspect-ratio="1.75"
        ></v-img>
        <v-card-title primary class="title">{{data.name}}</v-card-title>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md8>
        <v-layout row wrap>
          <v-flex  xs4 d-flex v-for="i in data.ingredients"
                :key="i.name">
            <v-card color="amber darken-3" dark>
              <v-card-title primary-title>
          <div>
            <h3 class="title mb-0">{{i.name}}</h3>
            <p class="subheading ">{{i.ammount}}</p>
          </div>
        </v-card-title>
            </v-card>
          </v-flex>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex
                v-for="(index,s) in data.steps"
                :key="s"
                d-flex
                xs12
              >
                <v-card>
                  <v-card-text>{{s+1}}. {{index}}</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
import axios from'axios';
import { EventBus } from '@/event-bus.js';
export default {
  data() {
    return {
    detailsDialog:false,
    data:''
    }
  },
  mounted(){
     EventBus.$on('details', (value) => {
        this.showDetails(value);
      });
  },
  methods: {
      showDetails(index) {
    this.detailsDialog = true;
      axios.get('http://localhost:3000/api/Recipes/'+index+'?access_token='+localStorage.getItem('access_token'))
           .then(res=>{
             this.data = res.data;
           })
           .catch(err=>{
             console.log(err);
           });
  }
  },
  

}
</script>
