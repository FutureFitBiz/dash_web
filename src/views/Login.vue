<template>
<v-app id="inspire grey blue-grey lighten-5">
  <div class="blobs">
    <div class="blob-1">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path style="z-index:5"
          d="M49.9,-64.5C62.3,-59.6,68.3,-41.9,68.6,-25.9C68.8,-9.9,63.2,4.4,55.8,15.4C48.5,26.3,39.3,33.9,29.7,39.4C20.1,45,10.1,48.4,0,48.3C-10,48.3,-20,44.8,-31.8,40C-43.6,35.2,-57.1,29.1,-61.2,19.2C-65.4,9.4,-60,-4.2,-56.4,-19.2C-52.8,-34.3,-50.9,-50.8,-41.8,-56.8C-32.6,-62.8,-16.3,-58.2,1.2,-59.9C18.7,-61.6,37.5,-69.4,49.9,-64.5Z"
          transform="translate(100 100)" />
      </svg>

    </div>
    <div class="blob-2">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M34.7,-55.5C45.5,-47,55.2,-38.3,62.4,-27.2C69.5,-16,74.1,-2.4,71.8,10C69.5,22.4,60.4,33.4,50,40.7C39.6,48,27.9,51.6,15.4,57.6C2.9,63.5,-10.3,71.9,-21.9,70.4C-33.6,69,-43.6,57.7,-54.4,46.4C-65.1,35.2,-76.7,23.9,-75.6,12.6C-74.4,1.3,-60.6,-10,-52,-21.6C-43.4,-33.2,-40,-45.1,-32.2,-55C-24.4,-65,-12.2,-73,-0.1,-72.7C11.9,-72.5,23.8,-64.1,34.7,-55.5Z"
          transform="translate(100 100)" />
      </svg>

    </div>
    <div class="blob-3">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M50.1,-64.2C59.9,-51.4,59.4,-30.9,60,-12.8C60.6,5.3,62.2,21.1,57.5,36.9C52.8,52.7,41.8,68.6,26.4,75.3C11.1,82,-8.5,79.6,-27,73.3C-45.5,67,-62.9,56.7,-67.6,42.1C-72.3,27.6,-64.3,8.9,-56.3,-5.3C-48.3,-19.5,-40.3,-29,-30.9,-41.9C-21.6,-54.7,-10.8,-70.8,4.7,-76.4C20.1,-82,40.2,-77,50.1,-64.2Z"
          transform="translate(100 100)" />
      </svg>
    </div>

  </div>
  <v-container style="z-index:100;" class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">

        <v-card v-show="!signup" class="">
          <v-toolbar color="" flat>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <div class="mb-3">
              Welcome back, please login to continue. <a><u class="text-primary">Forgot password?</u></a>
            </div>
            <v-form>
              <v-text-field :rules="[rules.required]" v-model="user.email" class="" label="Email" name="email" placeholder="Email" filled dense append-inner-icon="mdi-account-outline" type="text"></v-text-field>
              <v-text-field :rules="[rules.required]" v-model="user.password" class="" id="password" label="Password" name="password" filled dense append-inner-icon="mdi-lock-outline" type="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="pa-5">
            <v-btn @click="signup = true" elevation="1" color="">Sign up</v-btn>
            <v-spacer></v-spacer>
            <v-btn depressed @click="login" class="primary">Login</v-btn>
          </v-card-actions>
        </v-card>

        <v-card v-show="signup" class="">
          <v-toolbar color="" flat>
            <v-toolbar-title>Sign up</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="validSignup" :value="validSignup">
              <v-text-field v-model="newUser.company_name" :counter="80" class="pt-3 mt-4" :rules="[rules.required, rules.max]" label="Company name" name="text" placeholder="Company name" apppend-icon="mdi-card-text-outline" type="text">
              </v-text-field>

              <v-text-field v-model="newUser.email" :rules="emailRules" label="Email" name="email" placeholder="Email" append-icon="mdi-email-outline" required></v-text-field>
              <v-text-field v-model="newUser.name" :counter="80" class="pt-3" :rules="[rules.required, rules.max]" label="Your name" name="text" placeholder="Your Name" apppend-icon="mdi-card-text-outline" type="text"></v-text-field>
              <v-text-field v-model="newUser.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min, rules.max]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password"
                hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="pa-5">
            <v-btn @click="signup = false" elevation="1" plain color="">Back</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="signupUser" :disabled="!validSignup" class="info">Signup</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</v-app>
</template>

<script>
export default {
  name: 'Login',
  components: {},
  mounted: function() {
    if (process.env.VUE_APP_DEBUG === 'true') {
      this.user.email = 'tester@futurefitbusiness.org'
      this.user.password = '123456'
    }
  },

  data: () => ({
    show1: false,
    selectedItem: 0,
    error: false,
    messageText: '',
    signup: false,
    dialog: false,
    drawer: null,
    validSignup: false,
    user: {
      email: '',
      password: '',
    },
    newUser: {
      email: '',
      password: '',
      company_name: '',
    },
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      max: v => (v && v.length <= 80) || 'Max 80 characters',
    },
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 80) || 'Max 80 characters',
    ],
    emailRules: [
      v => !!v || 'Required',
      v => /.+@.+\..+/.test(v) || 'Must be a valid Email',
      v => (v && v.length <= 80) || 'Max 80 characters',
    ],
  }),

  methods: {
    login: function() {
      if (this.user.email === '' || this.user.password === '') {
        return
      }
      this.$http.post('login', this.user).then((response) => {
        if (Object.keys(response.data).length && response.data.token) {
          this.$store.dispatch('login', response.data)
        } else {
          this.$store.commit('notify', response.data)
        }
        this.loading = false
      })
    },
    signupUser: function() {
      this.loading = true
      this.$http.post('signup', this.newUser).then((response) => {
        if (Object.keys(response.data).length && response.data.token) {
          this.$store.dispatch('signup', response.data)
        } else {
          this.$store.commit('notify', response.data)
        }
        this.loading = false
      })
    },

  }

};
</script>

<style >
.blobs {
  z-index: 10;
  position: fixed;
  background: var(--ff-blue-b2);
  height: 100%;
  width: 100%;
}

.blob-1 {
  position: fixed;
  fill: var(--ff-blue-b3);
  top: -400px;
  left: -600px;
  opacity: 0.2
}

.blob-2 {
  position: fixed;
  fill: var(--ff-blue-b3);
  opacity: 0.4;
  top: 400px;
  right: -200px;
}

.blob-3 {
  position: fixed;
  fill: var(--ff-blue-b4);
  opacity: 0.08;
  top: -10px;
  right: -150px;
  width: 500px;
}

.login-nav-bg {
  background: hsla(194, 56%, 62%, 1);
  background: linear-gradient(135deg, hsla(194, 56%, 62%, 1) 0%, hsla(194, 48%, 52%, 1) 98%);
}
</style>
