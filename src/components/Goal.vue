<template>
<div class="d-flex">
  <v-container>

    <v-row class="ma-1">
      <p class="text-h5">
        <span>
          {{pageInfo.goal}}
        </span>
        <span class="font-weight-thin">
          {{pageInfo.goal_text}}
        </span>
      </p>

    </v-row>
    <v-row class="ma-1">
      <div class="text-h5">
        <span>
          Progress
        </span>
        <span class="font-weight-thin"> {{pageInfo.progress}} % </span>
      </div>
    </v-row>
    <v-row v-if="pageInfo.hidden_sites.length" class="ma-1">
      <span class="font-weight-thin grey--text ">
        {{pageInfo.hidden_sites.length}} Site(s) excluded, as they have no eployees. <v-btn @click="showHidden = !showHidden" depressed elevation="">{{showHidden ? 'Hide' : 'Show'}}</v-btn> </span>

    </v-row>
    <v-row v-if="showHidden" class="ma-1 font-weight-thin grey--text" v-for="item in pageInfo.hidden_sites">
      {{item}}
    </v-row>

    <v-card class="mt-4 pa-5">
      <v-row class="d-flex " justify="space-between">
        <v-col class="" cols="6">
          <v-autocomplete @change="setSearch" :value="$store.state.goalFilters.search" :items="search_items" :label="'Filter ' + pageInfo.input_type_plural" clearable></v-autocomplete>
        </v-col>

        <v-col class="" cols="3">
          <template>
            <div class="text-center">
              <v-dialog v-model="unitDialig" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="grey" outlined v-bind="attrs" v-on="on">
                    Change Unit
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title class="text-h5">
                    Change {{pageInfo.goal}} Unit
                  </v-card-title>

                  <v-card-text>
                    <h5>
                      {{pageInfo.unit}}
                    </h5>
                    <v-select v-model="pageInfo.unit" :items="pageInfo.units" label="Change unit">kWh</v-select>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="saveUnit">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </template>



        </v-col>

      </v-row>
    </v-card>

    <v-row class="mt-5">
      <v-card-title>Questions</v-card-title>
    </v-row>

    <v-card-text v-show="!showQuestions">
      <v-list-item-title>
        <i>No questions to answer</i>
      </v-list-item-title>
    </v-card-text>




    <v-row>
      <v-form ref="form" v-model="valid" :value="valid">
        <v-card class="mt-3" v-if="showQuestions" v-for="(question, key, index) in questions">
          <v-card-text>
            <v-list-item>
              <v-list-item-content>
                <p class="text-subtitle-1">
                  <b>{{ index + 1}}.</b> {{question.text}}
                </p>
                <div class="mt-2">
                  <v-data-table hide-default-footer :headers="headers" :items="filteredAnswers(key)" :search="seachButNotNull">
                    <template v-slot:item.id="{ item }">
                      <div style="width:200px;" v-if="item['type'] === 'number'">
                        <v-row>
                          <v-col cols="9">
                            <v-text-field :disabled="!item.active" v-model="answers[key][item.input_id].value_number" type="number" :rules="numberRules" required> </v-text-field>
                          </v-col>
                          <v-col cols="3">
                            <v-btn class="mt-3" :color="answers[key][item.input_id].active ? '': 'error'" @click="clickIdontKnow(key, item)" elevation="2">Data not available</v-btn>
                          </v-col>
                        </v-row>
                      </div>
                      <div style="width:280px;" v-if="item['type'] === 'number/max'">
                        <v-row>
                          <v-col cols="3">
                            <v-btn class="mt-3" :disabled="!item.active || (answers[key][item.input_id].value_number === answers[key][item.input_id].max)" @click="answers[key][item.input_id].value_number = answers[key][item.input_id].max"
                              elevation="2">All</v-btn>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field :max="answers[key][item.input_id].max" :suffix="'/ ' + item.max" :disabled="!item.active" v-model="answers[key][item.input_id].value_number" type="number" :rules="numberRules" required></v-text-field>
                          </v-col>
                          <v-col cols="3">
                            <v-btn class="mt-3" :color="answers[key][item.input_id].active ? '': 'error'" @click="clickIdontKnow(key, item)" elevation="2">Data not available</v-btn>
                          </v-col>
                        </v-row>

                      </div>
                      <div v-if="item['type'] === 'bool'">
                        <v-switch :disabled="!item.active" v-model="answers[key][item.input_id].value_number" inset></v-switch>
                      </div>
                    </template>
                    <template v-slot:item.active="{ item }">
                      <v-icon :color="item.active ? 'green': '' " v-text="item.active ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline'"></v-icon>

                    </template>
                  </v-data-table>

                </div>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-form>
    </v-row>

    <v-row class="d-flex justify-start">
      <v-btn @click="save" :loading="loading" class="ma-6" color="success">Save</v-btn>
    </v-row>

  </v-container>

</div>
</template>
<script>
import { statusIconText, statusIconColour, capitalise } from '@/utils.js'

export default {
  name: 'Sites',
  watch: {
    '$route': 'init',
  },
  data() {
    return {
      questions: {},
      answers: [],
      valid: true,
      headers: [],
      page_goal: '',
      search_items: [],
      dialog: false,
      unitDialig: false,
      loading: false,
      showInfoDialog: false,
      root_url: '',
      goal_type: '',
      currentItem: {},
      showHidden: false,
      pageInfo: {
        goal: 'BE01',
        goal_text: 'All energy is from renewable sources',
        progress_indicator_text: 'Energy',
        progress: 0,
        context: 0,
        input_type_plural: 'Sites',
        input_type: 'Site',
        questions: [],
        hidden_sites: [],
      },
      price: true,


      numberRules: [
        v => !!v || v === 0 || 'A number is required',
      ],
    }
  },
  mounted: function() {
    this.init()
  },
  computed: {
    showQuestions() {
      return true
    },
    seachButNotNull() {
      let value = this.$store.state.goalFilters.search
      return value ? value : ''
    },

  },
  methods: {
    statusIconText,
    statusIconColour,
    capitalise,
    init() {
      this.loading = false
      this.page_goal = this.$route.params.goal.toUpperCase()
      this.goal_type = this.$route.params.goal_type
      this.search = this.$route.params.search
      this.getItems(true)

    },
    updateSearch() {
      console.log('updateing', this.search === 'undefined')

      this.$store.commit('updateSearch', this.search)

    },

    clickIdontKnow(key, item) {
      let newActive = !this.answers[key][item.input_id].active
      this.answers[key][item.input_id].active = newActive
      if (!newActive) {
        this.answers[key][item.input_id].value_number = 0
      }
    },

    filteredAnswers(key) {
      return Object.values(this.answers[key]).filter((answer, index, arr) => {
        return !answer.hidden
      })
    },

    setInactiveSwitch(value) {
      this.$store.commit('setInactiveSwitch', value)
    },
    setSearch(value) {
      this.$store.commit('setSearch', value)
    },

    getItems(initial) {
      this.$http.get(`/BE/v2/${this.page_goal}/${this.goal_type}`).then((response) => {
        this.questions = response.data.questions
        this.answers = response.data.answers
        this.headers = response.data.headers
        this.pageInfo = response.data
        this.search_items = response.data.search_items
        this.resetForm()
      })
    },
    setCurrentItem(item) {
      this.resetForm()
      this.currentItem = item
    },
    resetForm() {
      if (this.showQuestions && this.$refs.form && Object.keys(this.$refs.form).length) {
        this.$refs.form.resetValidation()
      }
    },
    saveUnit() {
      this.unitDialig = false
      let url = `/BE/unit/${this.page_goal}/${this.goal_type}/${this.pageInfo.unit}`
      this.$http.post(url, {}).then((response) => {
        this.$store.commit('notify', response.data)
        this.getItems()
      })
    },
    save() {
      this.loading = true
      let url = `/BE/v2/${this.page_goal}/${this.goal_type}`

      this.$http.post(url, this.answers).then((response) => {
        this.loading = false
        this.$store.commit('notify', response.data)
        this.getItems()
      }).catch(() => {
        this.$store.commit('notify', { status: 'error', text: 'something went wrong' })
        this.getItems()
        this.loading = false
      })
    }
  }
}
</script>
