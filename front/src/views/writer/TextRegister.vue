<template>
  <v-container>
    <div class="display-3 font-weight-medium" align="center">Agregar Escrito</div>
    <br>
    <v-form ref="form">
      <h2 class="primary--text">Datos del Escrito</h2>
      <v-layout row wrap>
          <v-col cols="12" sm="5">
            <v-text-field
              outlined
              label="Título"
              :rules="[requiredRule]"
              v-model="text.title"
            ></v-text-field>
          </v-col>
<<<<<<< HEAD
<<<<<<< HEAD
          <v-col cols="12" sm="3">
            <v-select
                outlined
                label="Género"
                :items="genres"
                :rules="[requiredRule]"
                v-model="text.genre"
            ></v-select>
           </v-col>
=======
>>>>>>> 98da2a378369edebacd9dd2ca238571ed1830c4f
=======
>>>>>>> d37eb47a1d182a8dd90de2ab57ef7b3d55ac4eac
          <v-col cols="12" sm="2">
            <v-text-field
                outlined
                label="ID de Registro"
                :rules="[requiredRule]"
                v-model="text.registerNumber"
            ></v-text-field>
           </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              outlined
              label="# de páginas"
              :rules="[requiredRule, numericRule]"
              v-model="text.numberOfPages"
            ></v-text-field>
          </v-col>
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d37eb47a1d182a8dd90de2ab57ef7b3d55ac4eac
          <v-col cols="12" sm="3">
            <v-select
                outlined
                label="Rango edad"
                :items="ageRanges"
                :rules="[requiredRule]"
                v-model="text.ageRange"
            ></v-select>
           </v-col>
      </v-layout>
      <p>Seleccionar géneros (Máximo 3)</p>
      <v-layout row wrap>
      <v-col cols="12" sm="3" v-for="genres in genres" :key="genres.name">
            <v-switch
              v-model="text.genres"
              :label="genres.name"
              :value="genres._id"
              color="success"
            ></v-switch>
        </v-col>
<<<<<<< HEAD
>>>>>>> 98da2a378369edebacd9dd2ca238571ed1830c4f
=======
>>>>>>> d37eb47a1d182a8dd90de2ab57ef7b3d55ac4eac
      </v-layout>
      <v-layout row wrap class="justify-center">
          <v-col cols="12" sm="12">
            <v-textarea
              outlined
              label="Descripción"
              :rules="[requiredRule]"
              v-model="text.description"
            ></v-textarea>
          </v-col>
      </v-layout>
      <p>Los archivos deberán subirse con el formato de Common Mark.</p>
      <a href="https://commonmark.org/help/">Presiona aquí para más información</a>
      <v-layout row wrap>
          <v-col cols="12" sm="4">
<<<<<<< HEAD
<<<<<<< HEAD
            <v-file-input 
                label="Subir Archivo"
                :rules="[requiredRule]"
                v-model="text.documentPath"
=======
            <v-file-input accept=".md" 
                label="Subir Archivo"
                :rules="[requiredRule]"
                v-model="document"
>>>>>>> 98da2a378369edebacd9dd2ca238571ed1830c4f
=======
            <v-file-input accept=".md" 
                label="Subir Archivo"
                :rules="[requiredRule]"
                v-model="document"
>>>>>>> d37eb47a1d182a8dd90de2ab57ef7b3d55ac4eac
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="4">
            
        <v-dialog v-model="dialog" width="800px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on" @click="previewData">Vista Previa</v-btn>
            </template>

            <v-card>
            <v-card-title>Previa visualización del escrito</v-card-title>
            <v-card-text v-html="data"></v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
          </v-col>
        </v-layout>
    </v-form>    
    
    <v-layout row wrap>
      <v-dialog v-model="dialogSuccess" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Escrito Registrado!</v-card-title>
          <v-card-text>Tu escrito ya se encuentra registrado</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
<<<<<<< HEAD
<<<<<<< HEAD
            <v-btn color="green darken-1" text @click="dialogSuccess = false" href="/dashboard">Entendido</v-btn>
=======
            <v-btn color="green darken-1" text @click="dialogSuccess = false" href="/">Entendido</v-btn>
>>>>>>> 98da2a378369edebacd9dd2ca238571ed1830c4f
=======
            <v-btn color="green darken-1" text @click="dialogSuccess = false" href="/">Entendido</v-btn>
>>>>>>> d37eb47a1d182a8dd90de2ab57ef7b3d55ac4eac
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogError" persistent max-width="290">
        <v-card>
<<<<<<< HEAD
<<<<<<< HEAD
          <v-card-title class="headline">Error en el registro de escrito</v-card-title>
          <v-card-text>Por favor inténtelo más tarde</v-card-text>
=======
          <v-card-title class="headline">{{errorMessage.title}}</v-card-title>
          <v-card-text>{{errorMessage.text}}</v-card-text>
>>>>>>> 98da2a378369edebacd9dd2ca238571ed1830c4f
=======
          <v-card-title class="headline">{{errorMessage.title}}</v-card-title>
          <v-card-text>{{errorMessage.text}}</v-card-text>
>>>>>>> d37eb47a1d182a8dd90de2ab57ef7b3d55ac4eac
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialogError = false">Entendido</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-layout row wrap>
      <v-col align="end">
        <v-btn @click="create" color="success">Registrar</v-btn>
      </v-col>
    </v-layout>
  </v-container>
</template>


<script>
import axios from 'axios';
import commonmark from 'commonmark';
import {requiredRule, numericRule} from '@/utils/rules';
<<<<<<< HEAD
<<<<<<< HEAD
import { genres } from "@/utils/constants"
=======
import {errorGenresRange, errorServerRegister, errorDescriptionRange, ageRanges} from '@/utils/constants';
>>>>>>> 98da2a378369edebacd9dd2ca238571ed1830c4f
=======
import {errorGenresRange, errorServerRegister, errorDescriptionRange, ageRanges} from '@/utils/constants';
>>>>>>> d37eb47a1d182a8dd90de2ab57ef7b3d55ac4eac

export default{
  components: {
    
  },
  data(){
    return {
      text: {
<<<<<<< HEAD
<<<<<<< HEAD
        writer:'',
=======
        writer:this.$cookies.get('user_id'),
>>>>>>> d37eb47a1d182a8dd90de2ab57ef7b3d55ac4eac
        title:'',
        registerNumber:'',
        description:'',
        genres:[],
        numberOfPages:'',
        ageRange: '',
        phase:1,
<<<<<<< HEAD
        documentPath: null
=======
        writer:this.$cookies.get('user_id'),
        title:'',
        registerNumber:'',
        description:'',
        genres:[],
        numberOfPages:'',
        ageRange: '',
        phase:1,
=======
>>>>>>> d37eb47a1d182a8dd90de2ab57ef7b3d55ac4eac
        documentPath: ''
      },
      errorMessage: {
        title:'',
        text:''
<<<<<<< HEAD
>>>>>>> 98da2a378369edebacd9dd2ca238571ed1830c4f
=======
>>>>>>> d37eb47a1d182a8dd90de2ab57ef7b3d55ac4eac
      },
      dialogSuccess: false,
      dialogError: false,
      requiredRule,
<<<<<<< HEAD
<<<<<<< HEAD
      numericRule,
      genres,
=======
      document: null,
      genres: [],
      ageRanges,
      numericRule,
>>>>>>> 98da2a378369edebacd9dd2ca238571ed1830c4f
=======
      document: null,
      genres: [],
      ageRanges,
      numericRule,
>>>>>>> d37eb47a1d182a8dd90de2ab57ef7b3d55ac4eac
      data: null,
      dialog: false
    };
  },
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d37eb47a1d182a8dd90de2ab57ef7b3d55ac4eac
  asyncComputed: {
      async getGenres(){
        const token = this.$cookies.get('token');
        const responseGenres = await axios.get("http://localhost:3000/api/user/genres", { headers: {"Authorization" : 'Bearer ' + token} });
        console.log(responseGenres.data)
        return this.genres = responseGenres.data
      }
  },
<<<<<<< HEAD
>>>>>>> 98da2a378369edebacd9dd2ca238571ed1830c4f
=======
>>>>>>> d37eb47a1d182a8dd90de2ab57ef7b3d55ac4eac
  methods: {
    async create() {
      if (!this.$refs.form.validate()) {
        return;
      }
<<<<<<< HEAD
<<<<<<< HEAD
=======
      if (this.text.genres.length < 1 || this.text.genres.length > 3 ){
        this.errorMessage = errorGenresRange
        this.dialogError = true
        return;
      }
      if (this.text.description.length < 20  || this.text.description.length > 200 ){
        this.errorMessage = errorDescriptionRange
        this.dialogError = true
        return;
      }
>>>>>>> d37eb47a1d182a8dd90de2ab57ef7b3d55ac4eac
      try {
        const token = this.$cookies.get('token');

        const responseCreate = await axios.post('http://localhost:3000/api/texts', this.text, {
            headers: {
                  'content-type': 'application/json',
                  "Authorization" : 'Bearer ' + token, 
            },
        });
        const id = responseCreate.data._id;
        console.log(id)
        
        let formData = new FormData();
        formData.append('document', this.document);

        console.log('>> formData >> ', formData);
        console.log(formData.get('text'))

        const responseUpload = await axios.post(`http://localhost:3000/api/texts/${id}/uploads`, formData, {
            headers: {
                  "Authorization" : 'Bearer ' + token, 
                  'Content-Type': 'multipart/form-data'
            },
        });
        console.log(responseUpload)

        this.dialogSuccess = true;
      } catch (error) {
<<<<<<< HEAD
=======
      if (this.text.genres.length < 1 || this.text.genres.length > 3 ){
        this.errorMessage = errorGenresRange
        this.dialogError = true
        return;
      }
      if (this.text.description.length < 20  || this.text.description.length > 200 ){
        this.errorMessage = errorDescriptionRange
        this.dialogError = true
        return;
      }
      try {
        const token = this.$cookies.get('token');

        const responseCreate = await axios.post('http://localhost:3000/api/texts', this.text, {
            headers: {
                  'content-type': 'application/json',
                  "Authorization" : 'Bearer ' + token, 
            },
        });
        const id = responseCreate.data._id;
        console.log(id)
        
        let formData = new FormData();
        formData.append('document', this.document);

        console.log('>> formData >> ', formData);
        console.log(formData.get('text'))

        const responseUpload = await axios.post(`http://localhost:3000/api/texts/${id}/uploads`, formData, {
            headers: {
                  "Authorization" : 'Bearer ' + token, 
                  'Content-Type': 'multipart/form-data'
            },
        });
        console.log(responseUpload)

        this.dialogSuccess = true;
      } catch (error) {
        console.log(error.response.data)
        this.errorMessage = errorServerRegister
>>>>>>> 98da2a378369edebacd9dd2ca238571ed1830c4f
=======
        console.log(error.response.data)
        this.errorMessage = errorServerRegister
>>>>>>> d37eb47a1d182a8dd90de2ab57ef7b3d55ac4eac
        this.dialogError = true;
      }
    },
    previewData() {
<<<<<<< HEAD
<<<<<<< HEAD
      
      if (!this.text.documentPath) {
          this.data = "No se ha seleccionado ningún archivo"
        } else {
            var reader = new FileReader();
            reader.readAsText(this.text.documentPath);
=======
      if (!this.document) {
          this.data = "No se ha seleccionado ningún archivo"
        } else {
            var reader = new FileReader();
            reader.readAsText(this.document);
>>>>>>> 98da2a378369edebacd9dd2ca238571ed1830c4f
=======
      if (!this.document) {
          this.data = "No se ha seleccionado ningún archivo"
        } else {
            var reader = new FileReader();
            reader.readAsText(this.document);
>>>>>>> d37eb47a1d182a8dd90de2ab57ef7b3d55ac4eac
            reader.onload = () => {
                var readerCM = new commonmark.Parser();
                var writerCM = new commonmark.HtmlRenderer();
                var parsed = readerCM.parse(reader.result);
                this.data = writerCM.render(parsed); // result is a String
            }
        }
  }
}
}
</script>

<style scoped></style>