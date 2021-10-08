<template>
<div class="">
  <v-app id="">
    <router-view />
    <template>
      <v-snackbar :top="true" color="error" v-model="error" timeout="3000">
        <v-icon dark class="mr-3"> mdi-alert-circle </v-icon>
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="" text v-bind="attrs" @click="error = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </template>
    <template>
      <v-snackbar :top="true" color="success" v-model="success" timeout="3000">
        <v-icon dark class="mr-3"> mdi-check-circle </v-icon>
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="" text v-bind="attrs" @click="error = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </template>
  </v-app>
</div>
</template>

<script>
export default {
  name: 'MainApp',
  components: {},
  data: () => ({
    text: '',
    error: false,
    success: false,
    rules: {},
  }),
  mounted: function() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'notify') {
        let data = mutation.payload
        this.text = data.message
        if (data.status === 'error') {
          this.error = true
        } else {
          this.success = true
        }
      }
    })
  },

};
</script>


<style>
@font-face {
  font-family: 'Calibri';
  src: url('~@/assets/fonts/Jaldi-Bold.otf');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'Calibri';
  src: url('~@/assets/fonts/Jaldi-Regular.otf');
  font-weight: normal;
  font-style: normal;
}


* {
  text-transform: none !important;
}

.ff-font {
  font-family: 'Calibri' !important;
  font-weight: bold;
  font-size: 120%;
}

.v-card {
  box-shadow: 0px 3px 10px -2px rgba(0, 0, 0, 0.1) !important;
  border-radius: 14px !important;
}

.title-shadow {
  box-shadow: 1px 4px 13px -2px rgba(0, 0, 0, 0.1) !important;
  /* border-radius: 14px !important; */
}

.v-stepper {
  box-shadow: 0px 3px 10px -2px rgba(0, 0, 0, 0.2) !important;
}

.main-box-shadow {
  box-shadow: 0px 9px 9px 1px rgba(0, 0, 0, 0.05) !important;

}

:root {
  --ff-blue-b2: #e1eff4;
  --ff-blue-b3: #c3dfe9;
  --ff-blue-b4: #a6d0de;
  --ff-blue-b5: #4BA4C0;
  --ff-blue-b6: #2f5261;
  --ff-blue-b7: #4d8ca4;
  /* #0880a6 */
}
</style>
