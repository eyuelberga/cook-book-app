<template>


  <div class="dashboard">
    <h1 class="subheading grey--text ml-4">Dashboard</h1>

     <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition" v-model="dialog">
    <v-card>

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
      <v-stepper-step :complete="e1 > 1" step="1">Title for the recipe</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">What are the ingredients? </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">The steps</v-stepper-step>
       <v-divider></v-divider>

      <v-stepper-step step="4">Add an image</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card flat
         class="mb-5"
         height="200px">
         <v-layout row justify-center>
         <form>
           <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>
         </form>
         </v-layout>
        </v-card>
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
         >
         <v-btn flat color="primary" dark @click="dialog2 = !dialog2"><v-icon medium color="primary">add_circle</v-icon></v-btn>
  <v-layout row justify-center>

      <draggable
      v-model="i_list"
      class="bigger-area"
    >
      <transition-group name="list-complete">
        
        <v-card class ="cards-list cyan lighten-4" min-width="600px" max-height="145px"
v-for="(i,index) in i_list" :key="i.name"
          @dragend="log('a')" > 
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{i.name}}</h3>
            <div> {{ i.ammount }} </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat @click="i_edit(index)"  color="blue">Edit</v-btn>
          <v-btn flat  @click="i_delete(index)" color="red">Delete</v-btn>
        </v-card-actions>
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
         >
         <v-btn flat color="primary" dark @click="add_step_dialog = !add_step_dialog"><v-icon medium color="primary">add_circle</v-icon></v-btn>
  <v-layout row justify-center>
      <draggable
      v-model="s_list"
      class="bigger-area"
    >
      <transition-group name="list-complete">
        
        <v-card class ="cards-list cyan lighten-4" min-width="600px" max-height="115px"
v-for="(s,index) in s_list" :key="s"
          @dragend="log('a')" > 
        <v-card-title primary-title>
          <div>
            <h4 class="headline mb-0">{{index+1}}. {{s}}</h4>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat @click="s_edit(index)"  color="blue">Edit</v-btn>
          <v-btn flat  @click="s_delete(index)" color="red">Delete</v-btn>
        </v-card-actions>
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
         >
  <v-layout row justify-center>
			
    </v-layout>
         </v-card>

        <v-btn
          color="primary"
        >
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


    <v-snackbar v-model="snackbar" top color="warning" flat>
          <span>Are you sure?</span>
          <v-btn flat color="white" @click="snackbar = false; deleteProject()">Yes</v-btn>
          <v-btn flat color="white" @click="snackbar = false; ">No</v-btn>
    </v-snackbar>

    <v-container class="my-2">

      <v-layout row class="mb-3" wrap>
         <v-btn icon @click="openDialog()">
          <v-icon   color="primary">add_circle</v-icon>
        </v-btn>
      </v-layout>

      <v-layout row justify-center v-if="this.projects.length == 0">
        <v-layout column align-center>
          <span :class="{'grey--text display-1': $vuetify.breakpoint.smAndUp, 'display-2 grey--text': $vuetify.breakpoint.xsOnly}">Nothing here 😔</span>
          <v-btn flat color="primary" class="display-1" @click="openDialog"> <v-icon  color="primary">add_circle</v-icon></v-btn>
        </v-layout>
      </v-layout>

      <draggable v-model="projects" @change="saveOrder" handle=".handle" :disabled="!todos" v-if="this.projects.length > 0">
      <v-card flat v-for="(project, index) in projects" :key="project.title">

        <v-layout row wrap :class="`pa-2 project ${project.status}`">
  
          <v-flex xs12 md6>
            <div class="caption grey--text ml-3" v-if="todos">Project Title</div>
            <div class="caption grey--text" v-if="!todos">Project Title</div>
            <div :class="{'mt-0 mb-1': $vuetify.breakpoint.smAndDown}" v-if="!editMode || index != indexToEdit">
              <v-icon size="20" class="handle" v-if="todos">drag_indicator</v-icon>
              {{ project.title }}
            </div>

            <v-form @submit.prevent="updateTitle(index)">
            <v-text-field autofocus :color="`${project.status}s`" v-model="newTitle" v-if="editMode && indexToEdit == index" class="ma-0 pa-0"></v-text-field>
            </v-form>

          </v-flex>

          <v-flex xs5 sm6 md2>
            <div class="caption grey--text">Due by</div>
            <div :class="{'mt-0 mx-0 px-0': $vuetify.breakpoint.smAndDown}">{{ project.due }}</div>
          </v-flex>

          <v-flex xs3 sm3 md2 class="pt-0">
            <div class="mt-0 pt-0">
              <v-btn @click="changeStatus(index)" flat small round :class="`${project.status} white--text px-0 mx-0`">
                {{ project.status }}
              </v-btn>
            </div>
          </v-flex>
          <v-spacer></v-spacer>

          <v-flex xs3 sm3 md2>
            <div class="mt-0 pt-0">
              <v-btn icon :class="`${project.status}`" @click="editMode = !editMode; indexToEdit = index; newTitle = project.title;" class="pa-0 ma-0"><v-icon>edit</v-icon></v-btn>
              <v-btn icon :class="`${project.status}`" @click="snackbar = true; indexToEdit = index;" class="pa-0 ma-0"><v-icon>delete</v-icon></v-btn>
            </div>

          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
      </draggable>
      
    </v-container>


  </div>
</template>

<script>
  import draggable from 'vuedraggable';
import { EventBus } from '@/event-bus.js';

  export default {
     components: {
      draggable
    },
    data() {
      return {
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
        projects: [],
        projectsCopy: [],
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
      EventBus.$on('project-added', () => {
       
      });
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
      }
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
		}
  }
</script>

<style>
.cards-list{
  margin-bottom: 10px;
}
</style>
