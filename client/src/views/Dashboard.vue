<template>


  <div class="dashboard">
    <h1 class="subheading grey--text ml-4">Dashboard</h1>

     <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition" v-model="dialog">
    <v-card flat>

      <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Add a new Recipe</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" editable step="1">Title for the recipe</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" editable step="2">What are the ingredients? </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 3" editable step="3">The steps</v-stepper-step>
       <v-divider></v-divider>

      <v-stepper-step editable step="4">Add an image</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content  step="1">
         <v-layout align-end justify-center row fill-height>
        <v-card flat
         class="mb-5"
         min-height="400px"  width="500px">
        
         <div>
         <form >
           <v-text-field  
      v-model="name"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>
         </form>
         </div>
         
        </v-card>
        </v-layout>
        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Continue
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card flat 
        class="mb-5"
         min-height="400px"
         >
         <v-btn flat icon color="primary" dark @click="dialog2 = !dialog2"><v-icon large color="orange">add_circle</v-icon></v-btn>
  <v-layout row justify-center>

      <draggable
      v-model="i_list"
      class="bigger-area"
    >
      <transition-group name="list-complete">
        
        <v-card class ="cards-list  blue-grey lighten-4" min-width="600px" max-height="90px"
v-for="(i,index) in i_list" :key="i.name"
          @dragend="log('a')" > 
          <v-layout align-center justify-space-between row fill-height>
        <v-card-title primary-title>
          <div>
            <h3 class="title mb-0">{{i.name}}</h3>
            <p class="brown--text">{{ i.ammount }} </p>
          </div>
        </v-card-title>
        <v-spacer></v-spacer>
         <v-btn flat icon @click="i_edit(index)"  color="green"><v-icon>edit</v-icon></v-btn>
          <v-btn flat  icon @click="i_delete(index)" color="red"><v-icon>delete</v-icon></v-btn>
          </v-layout>
      </v-card>
    
      </transition-group>
    </draggable>
    </v-layout>
         </v-card>

        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card flat 
        class="mb-5"
         min-height="400px"
         >
         <v-btn flat color="primary"  icon dark @click="add_step_dialog = !add_step_dialog"><v-icon large color="orange">add_circle</v-icon></v-btn>
  <v-layout row justify-center>
      <draggable
      v-model="s_list"
      class="bigger-area"
    >
      <transition-group name="list-complete">
        
        <v-card class ="cards-list blue-grey lighten-4" min-width="600px" max-height="80px"
v-for="(s,index) in s_list" :key="s"
          @dragend="log('a')" > 
          <v-layout align-center justify-space-between row fill-height>
<v-card-text><h4 class="subheading mb-0">{{index+1}}. {{s}}</h4></v-card-text>
<v-spacer></v-spacer> 
<v-btn flat @click="s_edit(index)"   icon color="green"><v-icon>edit</v-icon></v-btn>
          <v-btn flat  @click="s_delete(index)"  icon color="red"><v-icon>delete</v-icon></v-btn>
            </v-layout>
      </v-card>
    
      </transition-group>
    </draggable>
    </v-layout>
         </v-card>

        <v-btn
          color="primary"
          @click="e1 = 4"
        >
          Continue
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card flat 
        class="mb-5"
         min-height="400px"
         >
  <v-layout column justify-center>
    <v-text-field label="Select Image" v-model="imageName" prepend-icon="attach_file" @click="pickFile"></v-text-field>
    <v-img :src="imageUrl" contain height="350px" width="350px" v-if="imageUrl"></v-img>
			
      <input type="file" style="display:none" ref="image" accept="image/*" @change="onFilePicked"/>
    </v-layout>
         </v-card>

        <v-btn
          color="primary" @click="saveRecipe"
        :loading="loading">
          Save Recipe
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>

    </v-card>
  </v-dialog>

<v-dialog v-model="dialog2"  max-width="600px">
      <v-card>
      <v-card-title>
        <h2>Add Ingredient</h2>
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field label="Ingredient Name" v-model="i_name" prepend-icon="edit"></v-text-field>
          <v-text-field label="Ammount" v-model="i_ammount" prepend-icon="edit"></v-text-field>
          <v-spacer></v-spacer>

          <v-btn flat class="success mx-0 mt-3" @click="addToIList" :loading="loading">Add</v-btn>
        </v-form>
      </v-card-text>

    </v-card>
    </v-dialog>


    <v-dialog v-model="dialog3"  max-width="600px">
      <v-card>
      <v-card-title>
        <h2>Edit Ingredient</h2>
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field label="Ingredient Name" v-model="i_name" prepend-icon="edit"></v-text-field>
          <v-text-field label="Ammount" v-model="i_ammount" prepend-icon="edit"></v-text-field>
          <v-spacer></v-spacer>

          <v-btn flat class="success mx-0 mt-3" @click="updateIList" :loading="loading">Update</v-btn>
        </v-form>
      </v-card-text>

    </v-card>
    </v-dialog>
  <v-dialog v-model="add_step_dialog"  max-width="600px">
      <v-card>
      <v-card-title>
        <h2>Add Step</h2>
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field label="Step" v-model="s_step" prepend-icon="edit"></v-text-field>
          <v-spacer></v-spacer>

          <v-btn flat class="success mx-0 mt-3" @click="addToSList" :loading="loading">Add</v-btn>
        </v-form>
      </v-card-text>

    </v-card>
    </v-dialog>
    <v-dialog v-model="edit_step_dialog"  max-width="600px">
      <v-card>
      <v-card-title>
        <h2>Edit Step</h2>
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field label="Step" v-model="s_step" prepend-icon="edit"></v-text-field>
          <v-spacer></v-spacer>
          <v-btn flat class="success mx-0 mt-3" @click="updateSList" :loading="loading">Update</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" top color="red" flat>
          <span>Are you sure?</span>
          <v-btn flat color="white" @click="deleteConfirm">Yes</v-btn>
          <v-btn flat color="white" @click="snackbar = false; ">No</v-btn>
    </v-snackbar>

    <v-container>

      <v-layout row class="mb-3" wrap>
         <v-btn icon @click="openDialog()">
          <v-icon   x-large color="orange">add_circle</v-icon>
        </v-btn>
      </v-layout>

       <v-layout>
    <v-flex xs12 sm6 offset-sm3 v-if="allRecipesByUser != undefined || allRecipesByUser !== null || allRecipesByUser !== []">
      <v-card   class="cards-list" v-for="recipe in allRecipesByUser" :key="recipe.id" >
        <v-img
          :src="recipe.imageUrl"
          aspect-ratio="4"
        ></v-img>

        <v-card-title primary-title>
            <v-layout align-center justify-space-between row fill-height>
            <h3 class="title mb-0">{{recipe.name}}</h3>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon flat color="orange" @click="goToDetails(recipe.id)"><v-icon>detail</v-icon></v-btn>
              <v-btn icon flat color="green" @click="editRecipe(recipe.id)"><v-icon>edit</v-icon></v-btn>
          <v-btn icon flat color="red" @click="deleteRecipe(recipe.id)" ><v-icon>delete</v-icon></v-btn></div>
          </v-layout>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
      
    </v-container>


  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { EventBus } from '@/event-bus.js';
import axios from'axios';
import { Promise } from 'q';

  export default {
     components: {
      draggable
    },
    data() {
      return {
        allRecipesByUser:[],
        dialog: false,
        dialog2: false,
        add_step_dialog: false,
        edit_step_dialog: false,
        dialog3: false,
        index_to_update:null,
        e1: 0,
        name: '',
        imageName: '',
		    imageUrl: '',
		    imageFile: '',
      nameRules: [
        v => !!v || 'Name is required'
      ],
        i_list: [],
        s_list: [],
        s_step: '',
        i_name: '',
        i_ammount: '',
        loading: false,
        userId: '',
        btnColor: '',
        snackbar: false,
        editMode: false,
        newTitle: "",
        indexToEdit: 0,
      }
    },
    mounted() {
      this.getAllRecipesByUser()
    },
     methods: {
      openDialog() {
        var access_token = localStorage.getItem('access_token');
        console.log(access_token);
        // EventBus.$emit('dialog', true);
        this.dialog = true;
      },
      addToIList() {
        this.i_list.push(
        {name:this.i_name,
        ammount:this.i_ammount});
        this.dialog2 = false;
        this.i_name = '';
        this.i_ammount = '';
      },
       addToSList() {
        this.s_list.push(this.s_step);
        this.add_step_dialog = false;
        this.s_step = '';
      },
      updateIList() {
        this.i_list[this.index_to_update] = {name:this.i_name, ammount:this.i_ammount};
        this.dialog3 = false;
        this.i_name = '';
        this.i_ammount = '';
        this.index_to_update = null;
        this.index_to_delete = null;
      },
      updateSList() {
        this.s_list[this.index_to_update] = this.s_step;
        this.edit_step_dialog = false;
        this.s_step = '';
        this.index_to_update = null;
      },
      i_delete(index){
        this.i_list.splice(index,1)
      },
       s_delete(index){
        this.s_list.splice(index,1)
      },
      i_edit(index){
        this.i_name = this.i_list[index].name;
        this.i_ammount = this.i_list[index].ammount;
        this.dialog3 = true;
        this.index_to_update = index;
      },
       s_edit(index){
        this.s_step= this.s_list[index];
        this.edit_step_dialog = true;
        this.index_to_update = index;
      },
         pickFile () {
            this.$refs.image.click ()
        },
		
		onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
    },
    saveRecipe(){
      this.loading = true
      // step 1 save the recipe data without the image
      axios.post('http://localhost:3000/api/Recipes?access_token='+localStorage.getItem('access_token'),
      {
        name: this.name,
        steps: this.s_list,
        ingredients:this.i_list
      })
           .then(res=>{
             let id = res.data.id;
             // step 2 upload the image and get the uploaded file name
             if(this.imageFile !==''){
               this.uploadImage().then(result=>{
                 // step 3 update recipe with the uploaded image
                 console.log(result);
                  axios.patch('http://localhost:3000/api/Recipes/'+id+'?access_token='+localStorage.getItem('access_token'),{
                    imageUrl:'http://localhost:3000/api/Attachments/images/download/'+result
                      })
                      .then(res=>{
                        this.loading = false;
                        this.resetValues();
                        this.getAllRecipesByUser();
                        this.dialog = false;

                      })
                      .catch(err=>{
                        this.loading = false
                        console.log(err);
                      })
               });
             }
           })
           .catch(err=>{
             this.loading = false
             console.log(err);
           });
      
     

    },
    async uploadImage(){
      console.log(this.imageFile);
      let formData = new FormData();
      formData.append('image',this.imageFile)
      return axios.post('http://localhost:3000/api/Attachments/images/upload?access_token='+localStorage.getItem('access_token'),formData,
        {
          headers:{
                  'Content-Type':'multipart/form-data'
                  }
        })
        .then(res=>{
          //console.log(res);
          return res.data.result.files.image[0].name;
        })
        .catch(err=>{
          console.log(err);
        });
    },
    resetValues(){
      this.el = 1;
      this.i_list= [];
      this.s_list= [];
      this.s_step= '';
      this.i_name= '';
      this.i_ammount= '';
      this.imageName = ''
			this.imageFile = ''
      this.imageUrl = ''
      this.name = ''
    },
    getAllRecipesByUser(){
      axios.get('http://localhost:3000/api/Recipes/?access_token='+localStorage.getItem('access_token'),{where:{ownerId:localStorage.getItem('user_id')}})
           .then(res=>{
             let arr = [];
             arr = res.data;
             this.allRecipesByUser = arr.reverse();
           })
           .catch(err=>{
             console.log(err);
           });

    },
    deleteRecipe(index){
      this.snackbar = true;
      this.index_to_delete = index;

    },
    deleteConfirm(){
      console.log(this.index_to_delete);
       axios.delete('http://localhost:3000/api/Recipes/'+this.index_to_delete+'?access_token='+localStorage.getItem('access_token'),{})
           .then(res=>{
             this.snackbar = false;
             console.log(this.index_to_delete);
             this.index_to_delete = null;
             console.log(res);
             this.getAllRecipesByUser();
           })
           .catch(err=>{
             console.log(err);
           });

    },
    editRecipe(index){

    },
    goToDetails(index){
      console.log(index)
      EventBus.$emit('details',index);

    }
  }
  }
</script>

<style>
.cards-list{
  margin-bottom: 10px;
}
</style>
