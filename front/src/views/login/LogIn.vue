<template>
  <v-container>
    <div class="display-3 font-weight-medium" align="center">
      Iniciar Sesión
    </div>
    <br />
    <br />
    <div align="center">
      <v-form ref="form">
        <v-text-field
          outlined
          :rules="[emailRule]"
          v-model="user.email"
          label="E-mail"
          style="width: 50%"
        ></v-text-field>
        <v-text-field
          outlined
          label="Contraseña"
          :rules="[]"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :type="showPassword ? 'text' : 'password'"
          name="input-10-1"
          v-model="user.password"
          style="width: 50%"
        ></v-text-field>
        <br />
        <v-layout row wrap>
          <v-dialog v-model="dialogSuccess" persistent max-width="290">
            <v-card>
              <v-card-title class="headline"
                >¡Bienvenido a tu sesión!</v-card-title
              >
              <v-card-text>Serás reenviado a tu dashboard</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="dialogSuccess = false"
                  >Entrar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Dialogo de error al iniciar sesion -->
          <v-dialog v-model="dialogError" persistent max-width="290">
            <v-card>
              <v-card-title class="headline"
                >Error al iniciar sesión</v-card-title
              >
              <v-card-text>Por favor, inténtelo más tarde</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="dialogError = false"
                  >Entendido</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
        <!-- Dialogo para datos ingresados incorrectos -->
        <v-dialog v-model="dialogIncorrectInfo" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Datos Incorrectos</v-card-title>
            <v-card-text>La información ingresada no es correcta</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="dialogIncorrectInfo = false"
                >Entendido</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn @click="login" class="btn btn-indigo">Login</v-btn>
        <br />
        <br />
        <p>¿No tienes cuenta?</p>
        <a href="/Registro_Lector" class="button">Registrarme como Lector</a>
        <br />
        <a href="/Registro_Escritor" class="button"
          >Registrarme como Escritor</a
        >
      </v-form>
    </div>
  </v-container>
</template>

<script>
import { emailRule } from "@/utils/rules";
import { postRequest } from "@/utils/requests";
import { setAuthCookies } from "@/utils/cookies";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      showPassword: false,
      emailRule,
      dialogSuccess: false,
      dialogError: false,
      dialogIncorrectInfo: false,
    };
  },
  methods: {
    //Funcion para ingresar sesion
    async login() {
      try {
        const authUser = {
          email: this.user.email,
          password: this.user.password,
        };
        const user = await postRequest("user/authentication", authUser);
        const isSet = setAuthCookies(user);
        if (isSet) {
          this.$router.push("/");
        } else {
          this.dialogIncorrectInfo = true;
        }
      } catch (error) {
        this.dialogError = true;
      }
    },
  },
};
</script>
