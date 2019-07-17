<template>
  <div class="dashboard">
    <h1 class="subheading grey--text ml-4">Dashboard</h1>

    <v-snackbar v-model="snackbar" top color="warning" flat>
          <span>Are you sure?</span>
          <v-btn flat color="white" @click="snackbar = false; deleteProject()">Yes</v-btn>
          <v-btn flat color="white" @click="snackbar = false; ">No</v-btn>
    </v-snackbar>

    <v-container class="my-2">

      <v-layout row class="mb-3" wrap>

        <v-btn icon @click="projects = projectsCopy; todos = true">
          <v-icon color="primary">dashboard</v-icon>
        </v-btn>

        <v-btn icon @click="filterProjects('complete'); todos = false">
          <v-icon color="success">check_circle</v-icon>
        </v-btn>
        
        <v-btn icon @click="filterProjects('ongoing'); todos = false">
          <v-icon color="warning">work</v-icon>
        </v-btn>
        
        <v-btn icon @click="filterProjects('overdue'); todos = false">
          <v-icon color="error">watch_later</v-icon>
        </v-btn>

        <v-spacer></v-spacer>
         <v-btn icon @click="openDialog()">
          <v-icon color="primary">add_circle</v-icon>
        </v-btn>
      
      </v-layout>

      <v-layout row justify-center v-if="this.projects.length == 0">
        <v-layout column align-center>
          <span :class="{'grey--text display-3': $vuetify.breakpoint.smAndUp, 'display-1 grey--text': $vuetify.breakpoint.xsOnly}">Nothing here 😔</span>
          <v-btn flat color="primary" class="display-1" @click="openDialog">Add new Project</v-btn>
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



  export default {
    data() {
      return {
        projects: [],
        projectsCopy: [],
        todos: true,
        userId: '',
        btnColor: '',
        snackbar: false,
        editMode: false,
        newTitle: "",
        indexToEdit: 0,
        drag: true
      }
    },
  }

</script>

<style>

  .project.complete {
    border-left: 4px solid #3cd1c2;
  }

  .project.ongoing {
    border-left: 4px solid #ffaa2c;
  }

  .project.overdue {
    border-left: 4px solid #f83e70;
  }

  .theme--light.v-btn:not(.v-btn--icon).complete {
    background-color: #3cd1c2;
  }

  .theme--light.v-btn:not(.v-btn--icon).ongoing {
    background-color: #ffaa2c;
  }

  .theme--light.v-btn:not(.v-btn--icon).overdue {
    background-color: #f83e70;
  }

  .theme--light.v-btn.complete {
    color: #3cd1c2;
  }

  .theme--light.v-btn.ongoing {
    color: #ffaa2c;
  }

  .theme--light.v-btn.overdue {
    color: #f83e70;
  }

  .handle {
    cursor: move;
  }

</style>
