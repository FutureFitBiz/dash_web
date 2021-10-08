<template>
<div class="">
  <h2 class=" pl-2  pb-3">
    <v-icon v-text="'mdi-office-building-marker'"></v-icon>
    {{$store.state.inputInfo.name}}
  </h2>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>

      <v-btn class="ml-6 mx-2" fab dark color="primary" @click="addNew">
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-card-title>
    <v-data-table :item-class="rowClass" :headers="$store.state.inputInfo.headers" :items="$store.state.inputInfo.items" :search="search">
      <template v-slot:item.status="{ item }">
        <v-btn class="pa-2 ma-1" outlined rounded v-for="status in item.goal_statuses" color="grey" small>
          {{ status.name }}
          <v-icon class="" v-text="statusIconText(status.status)" :color="statusIconColour(status.status)" dense></v-icon>
        </v-btn>
      </template>

      <template class="mt-3" v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:item.active="{ item }">
        <v-icon :color="item.active ? 'green': '' " v-text="item.active ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline'"></v-icon>
      </template>

    </v-data-table>


  </v-card>

  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline mt-3">{{currentId === '' ? 'Add a' : 'Edit'}} {{$store.state.inputInfo.name_singular}}</span>
          <span class="ml-2 mt-3 grey--text">(2020-2021)</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" :value="valid">
            <v-container v-if="type === 'sites'">
              <v-row>

                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model="editingItem.name" :rules="nameRules" counter="max" label="Name*" required></v-text-field>
                </v-col>

                <v-alert border="left" type="info" text>
                  Employee count is critical to several parts of the assessment.
                  Please estimate an average number of employees that were present during the assessment year.
                </v-alert>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model.number="editingItem.employees" label="Employees (during assessment year)*" type="number" :rules="numberRules" required></v-text-field>
                </v-col>
                <v-alert v-if="editingItem.employees === 0" border="left" type="warning" text>
                  Employee Goals will be hidden for this site, as the employee count is zero.
                </v-alert>
                <v-col cols="12" sm="12">
                  <v-autocomplete v-model="editingItem.country" :items="countryList" label="Country*" required></v-autocomplete>
                </v-col>

              </v-row>
            </v-container>
            <v-container v-if="type === 'purchases'">
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model="editingItem.name" label="Name*" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select v-model="editingItem.type" :items="['Product input', 'Outsourced core function', 'Ancillary spend',]" label="Type*" required></v-select>
                </v-col>

                <v-row cols="12" sm="12" md="12">
                  <v-list-item>
                    <v-list-item-title class="pa-3">
                      Is it traceable?
                    </v-list-item-title>
                    <v-switch label="Is it traceable" v-model="editingItem.traceable" inset :label="editingItem.traceable ? 'Yes': 'No'" required></v-switch>
                  </v-list-item>
                </v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model="editingItem.cost" label="Cost*" type="number" :rules="numberRules" required></v-text-field>
                </v-col>

              </v-row>
            </v-container>
            <v-container v-if="type === 'natural_resources'">
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model="editingItem.name" label="Name*" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select v-model="editingItem.type" :items="['Non-renewable resource', 'Renewable natural resource', 'Animal',]" label="Type*" required></v-select>
                </v-col>

                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model="editingItem.value" label="Value*" type="number" :rules="numberRules" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-autocomplete v-model="editingItem.country" :items="countryList" label="Country*" required></v-autocomplete>
                </v-col>

              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-spacer></v-spacer>
          <v-btn color="" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn :loading="loading" class="success" color="" text @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>


  <v-row justify="center">
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">
          Delete {{name}}?
        </v-card-title>
        <v-card-text>
          <p></p>
          <v-alert outlined text type="warning">This will also delete <b> all </b> input data related to this {{type}} </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="" text @click="deleteDialog = false">
            Cancel
          </v-btn>
          <v-btn color="error" text @click="deleteCurrentItem">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

</div>
</template>
<script>
import { countryList, statusIconText, statusIconColour } from '../utils.js'

export default {
  name: 'Inputs',
  watch: {
    '$route': 'init',
  },
  data() {
    return {
      numberRules: [
        v => !!v || v === 0 || 'A number is required',
      ],
      numberRulesGreaterThanZero: [
        v => (!!v && v > 0) || 'A number greater than 0 is required',
      ],
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 180 || 'Name must be less than 180 characters',
      ],
      countryList: countryList,
      loading: true,
      valid: false,
      deleteDialog: false,
      name: '',
      type: '',
      input_type: '',
      currentId: '',
      editingItem: {},

      crumbs: [{
          text: 'Dashboard',
          disabled: false,
        },
        {
          text: 'Link 1',
          disabled: false,
        },
        {
          text: 'Link 2',
          disabled: true,
        },
      ],
      search: '',
      dialog: false,
    }
  },
  created: function() {
    this.init()
  },
  computed: {
    rowClass(item) {
      return ''
    }
  },
  methods: {
    statusIconText,
    statusIconColour,

    init() {
      this.type = this.$route.params.input_type
      this.editingItem = {}
      this.loading = false
      this.$store.dispatch('getInputs', this.type)
    },

    editItem(item) {
      this.editingItem = { ...item }
      this.currentId = item.id
      this.dialog = true
    },

    deleteItem(item) {
      this.name = item.name
      this.country = item.location
      this.currentId = item.id
      this.deleteDialog = true
    },
    deleteCurrentItem() {
      this.$http.get(`/inputs/delete/${this.type}/${this.currentId}`).then((response) => {
        this.$store.dispatch('getInputs', this.type)
        this.$store.commit('notify', response.data)
        this.loading = false
        this.deleteDialog = false
      })
    },
    addNew() {
      this.editingItem = {}
      this.dialog = true
      this.editingItem.active = true
      this.$refs.form.resetValidation()
    },
    save() {
      this.loading = true
      this.$http.post(`/inputs/${this.type}`, this.editingItem).then((response) => {
        if (response.data.status == 'error') {
          this.$store.commit('notify', response.data)
        } else {
          this.$store.dispatch('getInputs', this.type)
          this.$store.commit('notify', response.data)

          this.dialog = false
        }
        this.loading = false
      }).catch((response) => {
        this.loading = false
        this.$store.commit('notify', { status: 'error', message: 'Something went wrong. Check input data' })
      })
    }
  }
}
</script>
