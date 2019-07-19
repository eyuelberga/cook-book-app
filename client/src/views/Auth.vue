<template>
  
<div id="app" >
  <v-app id="inspire" >

    <v-snackbar v-model="snackbar" :timeout="4000" top color="error">
      <span>{{snackbarText}}</span>
      <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
       <v-snackbar v-model="snackbar_success" :timeout="4000" top color="success">
      <span>{{snackbar_successText}}</span>
      <v-btn flat color="white" @click="snackbar_success = false">Close</v-btn>
    </v-snackbar>

  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>

          <v-card class="elevation-10">
            <v-toolbar dark color="primary">
              <v-toolbar-title v-if="login">Sign In</v-toolbar-title>
              <v-toolbar-title v-if="!login">Welcome</v-toolbar-title>         
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="login? signin() : signup()" id="login-form">
                  <v-text-field prepend-icon="person" name="name" v-model="name" label="Name" type="text" :rules="nameRules" v-if="!login" ></v-text-field>
                  <v-text-field prepend-icon="email" name="email" v-model="authBody.email" label="Email" type="text" :rules="emailRules" ></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" v-model="authBody.password" label="Password" id="password" type="password" :rules="passwordRules" ></v-text-field>
                </v-form>
                <p class="text-xs-center primary--text" @click="login=true;" v-if="!login"><a>Already have an account? Sign in</a></p>
                <p class="text-xs-center primary--text" @click="login=false" v-if="login"><a>Don't have an account? Sign up</a></p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" v-if="login" type="submit" form="login-form" :loading="loading">Login</v-btn>
                <v-btn color="primary" v-if="!login" type="submit" form="login-form" :loading="loading">Sing up</v-btn>
              </v-card-actions>
            </v-card>

          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</div>

</template>

<script>
import axios from'axios';
export default {
  data() {
    return {
      authBody:{
          email: '',
          password: ''
      },
      name: '',
      loading: false,
      login: true,
      nameRules: [ v => { 
          return v.length >= 2 || 'Too short'
          
        }
      ],
      emailRules: [
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid email.';
        }
      ],
      passwordRules: [
        value => {

            return value.length >= 5 || 'Too short.';
          }
      ],
      snackbar: false,
      snackbarText: '',
      snackbar_success: false,
      snackbar_successText: '',
    }
  },

  methods: {
    signup() {
      if(this.name.length >= 2) {
        this.loading = true;
    axios.post('http://localhost:3000/api/AppUsers/',{
      name:this.name,
      email:this.authBody.email,
      password:this.authBody.password

    })
         .then(res =>{
         this.snackbar_successText = 'Registered Sucessfully';
         this.snackbar_success = true;
         this.loading = false;
         this.login =true;
         })
         .catch(err =>{
        this.snackbarText = 'Error occured Try again!';
         this.snackbar = true;
         this.loading = false;
         this.authBody.password = '';

         });
      } else {
        this.snackbarText = 'Name too short'
        this.snackbar = true;
      }
    },

  signin() {
    this.loading = true;
    axios.post('http://localhost:3000/api/AppUsers/login/',this.authBody)
         .then(res =>{
          localStorage.setItem('access_token',res.data.id);
          localStorage.setItem('user_id',res.data.userId);
          console.log( localStorage.getItem('access_token'));
         this.$router.replace({path:'/dashboard'})
         this.loading = false;
         })
         .catch(err =>{
        this.snackbarText = 'Error occured Try again!';
        console.log(err);
         this.snackbar = true;
         this.loading = false;
          this.authBody.username = '';
         this.authBody.password = '';

         });
  }
}
}
</script>
<style>

  @media only screen and (max-width: 768px) {
    .v-content {
      margin: 0;
    }
  }

</style>