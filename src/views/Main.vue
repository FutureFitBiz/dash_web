<template>
<div class="fill-height d-flex">

  <v-navigation-drawer class="main-box-shadow" floating width="320" v-model="sidebar" :clipped="$vuetify.breakpoint.lgAndUp" app>


    <v-list dense nav>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item :disabled="disabledMenus" class="mt-3" to="/">
          <v-list-item-icon>
            <v-icon v-text="'mdi-dots-grid'"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="">Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/getting-started">
          <v-list-item-icon>
            <v-icon v-text="'mdi-apple-safari'"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="">Getting started</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader>SETUP</v-subheader>
        <v-list-item to="/risk-profile" @click="closeSidebar">
          <v-list-item-icon>
            <v-icon v-text="'mdi-traffic-light'"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="">Create Risk Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader>INPUTS</v-subheader>
        <v-list-item :disabled="disabledMenus" to="/inputs/sites">
          <v-list-item-icon>
            <v-icon v-text="'mdi-office-building-marker'"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="">Sites</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :disabled="disabledMenus" to="/inputs/purchases">
          <v-list-item-icon>
            <v-icon v-text="'mdi-credit-card-outline'"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="">Purchases</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :disabled="disabledMenus" to="/inputs/natural_resources">
          <v-list-item-icon>
            <v-icon v-text="'mdi-earth'"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="">Natural Resources</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader>GOAL ASSESSMENT</v-subheader>
        <v-list-group disabled color="grey" prepend-icon="mdi-alpha-b-circle">
          <template v-slot:activator>
            <v-list-item-title style="color:rgba(0, 0, 0, 0.38) !important;" class="">Business inputs</v-list-item-title>
          </template>
          <v-list-group no-action sub-group> </v-list-group>
        </v-list-group>
        <v-list-group disabled color="grey" prepend-icon="mdi-alpha-o-circle">
          <template v-slot:activator>
            <v-list-item-title style="color:rgba(0, 0, 0, 0.38) !important;" class="">Operations</v-list-item-title>
          </template>
          <v-list-group no-action sub-group> </v-list-group>
        </v-list-group>
        <v-list-group disabled color="grey" prepend-icon="mdi-alpha-e-circle">
          <template v-slot:activator>
            <v-list-item-title style="color:rgba(0, 0, 0, 0.38) !important;" class="">Employees</v-list-item-title>
          </template>
          <v-list-group no-action sub-group> </v-list-group>
        </v-list-group>
        <v-list-group disabled color="grey" prepend-icon="mdi-alpha-p-circle">
          <template v-slot:activator>
            <v-list-item-title style="color:rgba(0, 0, 0, 0.38) !important;" class="">Products and customers </v-list-item-title>
          </template>
          <v-list-group no-action sub-group> </v-list-group>
        </v-list-group>
        <v-list-group disabled color="grey" prepend-icon="mdi-alpha-s-circle">
          <template v-slot:activator>
            <v-list-item-title style="color:rgba(0, 0, 0, 0.38) !important;" class=""> Broader society </v-list-item-title>
          </template>
          <v-list-group no-action sub-group> </v-list-group>
        </v-list-group>
        <v-subheader>REPORTING</v-subheader>
        <v-list-item :disabled="disabledMenus" to="/progress">
          <v-list-item-icon>
            <v-icon :disabled="disabledMenus" v-text="'mdi-chart-bar'"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="">Progress Summary</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar class="main-box-shadow title-shadow" :clipped-left="$vuetify.breakpoint.lgAndUp" app color="nav-bg" dark dense>
    <v-app-bar-nav-icon @click.stop="sidebar = !sidebar"></v-app-bar-nav-icon>
    <v-toolbar-title class="">
      <v-btn icon disabled>
        <v-avatar size="26px">
          <v-img src="@/assets/FF-Logo-White.png" alt="FF"></v-img>
        </v-avatar>
      </v-btn>
    </v-toolbar-title>
    <div style="font-size:1.6em;" class=" ff-font align-start">Dashboard</div>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-cog-outline</v-icon>
    </v-btn>
  </v-app-bar>
  <v-main class="">
    <router-view class="pa-6 " />
  </v-main>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="ma-4 pa-1 black--text" color="white" dark bottom fixed right fab>
          <v-icon>mdi-help</v-icon>
        </v-btn>
      </template>
    </v-menu>
  </div>
</div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data: () => ({
    selectedItem: 0,
    dialog: false,
    sidebar: true,
    disabledMenus: true,

    cruds: [
      ['Create', 'mdi-plus-outline', '/goal/1'],
      ['Read', 'mdi-file-outline', '/goal/2'],
      ['Update', 'mdi-update', '/goal/3'],
      ['Delete', 'mdi-delete', '/goal/4'],
    ],

  }),
  methods: {
    closeSidebar() {
      if (process.env.VUE_APP_DEBUG === 'true') {
        return
      }
      this.sidebar = false
    },
  },

};
</script>

<style >
.nav-bg {
  background: #50a5c0 !important;
}

.be-badge {
  border-radius: 20px;
  font-size: 12px;
  padding-left: 4px;
  padding-right: 4px;
  padding: 2px 8px 2px 8px;
  background: #d9d9d9;
  opacity: 0.7;
}


.title-colour {
  color: rgba(8, 128, 166, 0.71) !important;
  font-family: 'Calibri' !important;
  font-size: 25px !important;
  font-weight: bold;

}

.full-height {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  max-width: 100%;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}
</style>
