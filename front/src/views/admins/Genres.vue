<template>
  <v-container>
    <div class="display-3 font-weight-medium" align="center">Géneros</div>
    <br>
    <br>
    <div align="center" >
    <v-form ref="form">
        <v-text-field
              outlined
              :rules="[requiredRule, letterRule]"
              v-model="name"
              label="Agregar género"
              style="width: 50%"
        ></v-text-field>
    <v-layout row wrap>
      <v-dialog v-model="dialogSuccess" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">¡Se agrego el género!</v-card-title>
          <v-card-text>Serás reenviado a tu dashboard</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogSuccess = false">Entrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogError" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Error al agregar el género</v-card-title>
          <v-card-text>Por favor, inténtelo más tarde</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialogError = false">Entendido</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-dialog v-model="dialogRepeat" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">El género ya existe</v-card-title>
          <v-card-text>Ingrese un género que no exista dentro de la base de datos</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialogRepeat = false">Entendido</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
        <v-btn @click="create" class="btn btn-indigo">Agregar</v-btn>
    </v-form>
    <br>
      <v-layout row wrap>
          <v-col cols="12" sm="12">
          <h2 class="primary--text">Géneros existentes</h2>
          </v-col>
          <v-col cols="12" sm="3" v-for="genre in genres" :key="genre.name">
              <v-card color="purple">
              <v-card-text><p style="color:white">{{genre.name}}</p></v-card-text>
              </v-card>
          </v-col>
      </v-layout>
    <br>
    <!-- Boton para poblar base de datos -->
    <div align="center" >
        <v-btn @click="fill" class="btn btn-indigo">LLenar géneros</v-btn>
    </div>
    </div>
  </v-container>
</template>

<script>
import {requiredRule, letterRule} from '@/utils/rules';
import { getRequest, postRequest } from "@/utils/requests";

export default {
    data(){
        return {
            name:'',
            requiredRule,
            letterRule,
            dialogSuccess: false,
            dialogError: false,
            dialogRepeat: false,
            genres: []
        }
    },
    async created(){
        //Funcion que se llama al iniciar la vista
        await this.getGenres()
    },
    methods: {
    //Funcion que crea un nuevo genero
    async create() {
      if (!this.$refs.form.validate()) {
        return;
      }
      try {
        //Verificar que no es un genero existente
        if(this.genres.some(genre => genre.name === this.name)){
          this.dialogRepeat = true
          return
        }
        const token = this.$cookies.get('token');
        await postRequest('admins/register/genres', { name: this.name }, token);
        this.dialogSuccess = true
        location.reload();
      } catch (error) {
        this.dialogError = true;
      }
    },
    //Funcion que se utiliza para poblar de generos la base de datos
    async fill(){
      try{
        const token = this.$cookies.get('token');
        await postRequest('admins/fillGenres', { name: this.name }, token);
      } catch (error) {
        this.dialogError = true;
      }
      this.getGenres()
    },
    //Funcion que obtiene todos los generos
    async getGenres(){
        const token = this.$cookies.get('token');
        this.genres = await getRequest('user/genres', token);
        return this.genres;
    }
  }
}
</script>