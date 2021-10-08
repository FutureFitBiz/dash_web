<template>
<div class="">
  <div class="">
    <h2 class=" pl-2  pb-3 font-weight-light">
      Create Risk Profile
    </h2>
  </div>

  <v-row v-if="loading" class="pa-8">
    <div class="mx-auto">
      Loading..
    </div>
    <v-progress-linear color="primary accent-4" indeterminate rounded height="6"></v-progress-linear>
  </v-row>
  <v-row v-if="!loading" class="">
    <v-col cols="4">
      <!-- {{selectedItem}} -->
      <v-list rounded>
        <div v-for="(item, index) in sidebarItems" :key="index">
          <v-list-item class="mt-1" :style="{ background: selectedItem === index ? '#e1f0f4' : '',  }" :disabled="statuses.items[item.key].disabled" @click="changeTab(item, index)">
            <v-list-item-icon>

              <v-icon v-if="item.key === 'intro'" :disabled="!statuses.finished" class="" color="blue" dense>mdi-information-outline</v-icon>
              <v-icon v-else-if="item.key === 'results' && !statuses.finished" class="" color="" dense>mdi-list-status</v-icon>
              <v-icon v-else-if="item.key === 'results'" class="" color="green" dense>mdi-checkbox-blank-circle</v-icon>
              <v-icon v-else-if="statuses.items[item.key].finished" class="" color="green" dense>mdi-check</v-icon>
              <v-icon v-else-if="statuses.items[item.key].saved" class="" color="green" dense>mdi-circle-half-full</v-icon>
              <v-icon v-else class="" color="" dense>mdi-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-col>

    <v-col cols="8">
      <v-card class="pa-3 pl-3">
        <div v-if="selectedItem === 0" class="">
          <v-row>
          </v-row>
          <v-row class="mt-8 ml-3 mb-5">
            <p>
              This section of the tool will help determine where your biggest negative impacts on people and planet are likely to be based on your business activities.
            </p>
            <p>
              This is done through a Q&A based approach which will assign a risk level of 'High',
              'Moderate', 'Low' or 'Unlikely' to each Break-Even Goal.
              Start the assessment to find out where your business should be focusing its attention.
            </p>
          </v-row>





          <v-row justify="center">
            <!-- <v-dialog v-model="helpDialog"> -->
            <v-dialog v-model="helpDialog" width="700px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark rounded v-bind="attrs" v-on="on">
                  User guidance
                </v-btn>
              </template>
              <v-card class="pa-6">
                <v-card-title>
                  <span class="text-h5">User guidance</span>
                  <!-- <h1> User guidance </h1> -->
                </v-card-title>
                <v-card-text>

                  <h2 class="mt-3">
                    How to determine what business activities are 'in scope'
                  </h2>

                  <p class="mt-1">
                    The aim of the Risk profiler is to identify where a company's risk of impact is greatest, based on the *typical* types of activities it undertakes.
                  </p>
                  <p>
                    Before starting the analysis, it is important to consider which activities should be within scope of the risk assessment. In general the focus should be on activities which reflect the majority of the day-to-day operations
                    undertaken by a company. It should not reflect absolutely *everything* the business is doing, just the activities which are integral to revenue-generation.
                  </p>
                  <p>
                    In cases where a business can split its activities into two or more very distinct categories, it may be worth undertaking a separate risk assessment for each. In general it is not advisable to have more than two risk profiles,
                    since it complicates the onward communication.
                  </p>




                  <h2 class="mt-6">
                    How to determine if a characteristic is applicable
                  </h2>

                  <p class="mt-1">
                    Each characteristic is accompanied by help text which provides more detail on when a user should select 'yes'. Nonetheless, there will be characteristics that require a judgement call.
                  </p>

                  <p>
                    Below are some general pointers as to when a user should select 'yes' for a characteristic:
                  </p>

                  <h3>
                    A characteristic is applicable when...
                  </h3>

                  <ul class="mt-2">
                    <li>
                      It applies to a defining business process or product, central to revenue-generation.
                    </li>
                    <li>
                      It applies to several processes or products, even if its relevance varies across geographies, product lines etc.
                    </li>
                    <li>
                      It applies to a small subset of the business activity, but the impact from that activity is expected to be significant (i.e. impact may be sustained or severe).
                    </li>
                    <li>
                      It applies to a business process or product that is expected expected to grow and become significant to revenue generation in the future.
                    </li>
                  </ul>

                  <h3 class="mt-3">
                    A characteristic is not applicable when...
                  </h3>

                  <ul class="mt-2">
                    <li>
                      It applies only to a small subset of business processes or products, which are not 'typical' or central to revenue-generation.
                    </li>
                    <li>
                      It applies to several processes, but it is reasonable to expect impact to be insignificant (e.g. because impact-generating activity is temporary and not severe).
                    </li>
                  </ul>



                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="darken-1" text @click="helpDialog = false">
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>










          <v-row v-if="!statuses.started" class="mt-8 ml-3 mb-5">
            <v-btn class="mx-auto" rounded color="success" @click="start">
              Start
            </v-btn>
          </v-row>

          <div v-show="statuses.started" class="pa-5">

            <v-row>
              <b class="ml-5">
                Progress
              </b>
            </v-row>
            <v-container class="mt-2">
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr v-if="item.show_intro" v-for="item in sortedByOrder(statuses.items)" :key="item.name">
                      <td>{{ item.name }}</td>
                      <td>
                        <div class="" v-if="!item.finished">
                          {{item.max - item.count}} left
                        </div>
                        <div class="" v-else>
                          <v-icon class="" color="green" dense>mdi-check</v-icon>
                        </div>
                      </td>

                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-container>
          </div>


        </div>
        <div v-if="selectedItem > 0 && selectedItem < sidebarItems.length -1 && this.items" class="">
          <div class="pa-3">

            <h3>
              {{statuses.items[sidebarItems[selectedItem].key].name}}
            </h3>
            <h3>
              <span class="text--secondary mt-2">
                {{statuses.items[sidebarItems[selectedItem].key].count}} / {{statuses.items[sidebarItems[selectedItem].key].max}} questions answered
              </span>
            </h3>
            <span>
            </span>
            <div class="mt-2"> {{statuses.items[sidebarItems[selectedItem].key].description}} </div>
          </div>
          <div class="" v-for="(question, index) in items">
            <v-row v-if="question.group_title" class="mt-3 pa-3 ml-1">
              <h3>{{question.group_title}}</h3>
            </v-row>

            <v-list-item>
              <v-row class="mt-3">
                <v-col cols="9">
                  <div class="text-body-1"> <b>{{index + 1}}.</b> {{question.title}} <span v-if="question.help_text" @click="showHelptext(question.code)" class="click text--secondary">more info</span> </div>
                </v-col>
                <v-col cols="3">
                  <v-btn-toggle class="no-active" rounded>
                    <v-btn @click="question.value = question.value ? null : true" class="no-active" :color="question.value ? 'secondary': ''" style="height: 36px;"> Yes </v-btn>
                    <v-btn @click="question.value = question.value === false ? null : false" class="no-active" :color="question.value === false ? 'secondary': ''" style="height: 36px;"> No </v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
            </v-list-item>
            <v-row v-show="activeHelptexts.includes(question.code)" class="pa-6 text--secondary">
              {{question.help_text}}
            </v-row>
          </div>

          <v-row class="mt-8 ml-3 mb-5">
            <v-btn :disabled="disableSave" rounded color="success" @click="saveQuestions">
              Save & Continue
            </v-btn>
          </v-row>
        </div>

        <v-container class="pa-4" v-if="selectedItem === sidebarItems.length -1">
          <h2>Risk Profile</h2>
          <v-row class="mt-3">
            <v-col v-for="(value, index) in series">
              <v-card>
                <v-card-text class="text-center">
                  <div style="min-width:137px;">
                    <span style="font-size:12px;">
                      {{ riskLabelsProgress[index].toUpperCase() }}
                    </span>
                  </div>
                  <div class="">
                    <vue-ellipse-progress :legendValue="value" :thickness="10" :size="70" :color="riskColours[index]" :progress="Math.round((value * 100) / 23)">
                    </vue-ellipse-progress>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="mt-5 ">
            <v-col class="d-flex">
              <v-select v-model="valuewebFilter" label="Value web" :items="filtersForValueweb" clearable dense outlined></v-select>
              <v-select v-model="riskFilter" :items="riskLabelsAll" label="Risk" class="ml-1" clearable dense outlined></v-select>
            </v-col>
            <v-col class="d-flex">
            </v-col>
          </v-row>
          <v-row class=" ">


            <v-container class="" v-if="filteredResults">
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr v-for="item in filteredResults" :key="item.name">
                      <td>{{ item.goal }} {{item.goal_short_name}}</td>
                      <td>
                        <v-tooltip right small>
                          <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">
                              <v-chip class="ml-3" :outlined="item.risk === 'Not answered'" :color="riskColour(item.risk)">
                                {{item.risk}}
                              </v-chip>
                            </span>
                          </template>
                          <span>
                            {{riskInfoObject[item.risk]}}
                          </span>
                        </v-tooltip>
                      </td>
                      <td class="pa-3">
                        <v-row class="" v-for="question in item.questions">
                          <div class="" v-if="item.risk === 'Not answered'">
                          </div>
                          <div class="" v-else-if="question === 'default'">
                            {{item.default_title}}
                          </div>
                          <div class="mt-2" v-else>
                            <span>
                              {{question.title}}
                            </span>
                          </div>
                        </v-row>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-container>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
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
    let riskLabels = ["High", "Moderate", "Low", "Unlikely"]
    let riskLabelsAll = ["High", "Moderate", "Low", "Unlikely", "Not answered"]
    let riskLabelsProgress = ["High risk", "Moderate risk", "Low risk", "Unlikely risk", "Not answered"]
    // let riskColours = ['#e1eff4', '#c3dfe9', '#a6d0de', '#4BA4C0', '#9E9E9E']
    let riskColours = ['#4BA4C0', '#a6d0de', '#c3dfe9', '#e1eff4', '#9E9E9E']
    // let riskColours = ['#FF5722', '#FFC107', '#4CAF50', '#9E9E9E']

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
      missingInfoColour: 'rgb(158, 158, 158)',
      series: [],
      riskColours,
      sidebarIndex: 0,
      activeHelptexts: [],
      // filtere
      riskLabels,
      riskLabelsAll,
      riskLabelsProgress,
      valuewebFilter: '',
      riskFilter: '',
      helpDialog: false,

      riskInfoObject: {
        'High': 'Impact is highly likely and potentially severe',
        'Moderate': 'Impact is likely and may be severe',
        'Low': 'Impact is less likely and not severe',
        'Unlikely': 'Impact is unlikely to occur',
        'Not answered': 'There is missing information',
      },
      loading: false,
      chartOptions: {
        colors: riskColours,
        // fill: {
        // colors: ['red', 'green', 'orange']
        // },
        // markers: {
        //   colors: ['#F44336', '#E91E63', '#9C27B0']
        // },
        // chart: {
        //   type: 'donut',
        // },
        labels: riskLabels,
        dataLabels: {
          formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex]
            return [name]
          },
          // style: {
          // colors: ['red', 'green', 'orange']
          // }
        },
      },

      // new names:
      //       business_inputs
      // operations
      // employees
      // products_and_customers
      // broader_society

      sidebarItems: [{
          'key': 'intro',
          'name': 'Introduction',
        },
        {
          'key': 'basic_info',
          'name': 'Basic Information',
        },
        {
          'key': 'business_inputs',
          'name': 'Business Inputs',
        },
        {
          'key': 'operations',
          'name': 'Operations',
        },
        {
          'key': 'employees',
          'name': 'Employees',
        },
        {
          'key': 'products_and_customers',
          'name': 'Products and Customers',
        },
        {
          'key': 'broader_society',
          'name': 'Broader Society',
        },
        {
          'key': 'results',
          'name': 'Results',
        },
      ],

      items: {},
      results: {},
      step: 1,
      is_product: null,
      selectedItem: 0,
      statuses: {},
    }
  },
  created: function() {
    this.init()
  },
  computed: {
    rowClass(item) {
      return ''
    },
    disableSave() {
      if (this.sidebarItems[this.selectedItem].key === 'basic_info') {
        if (!this.items) {
          return true
        }
        for (let item of this.items) {
          if (item.value != false && item.value != true) {
            return true
          }
        }
      }
      return false
    },
    disableMainQuestions() {

    },
    filteredResults() {
      if (this.results.items) {
        let res = JSON.parse(JSON.stringify(this.results.items))
        if (this.valuewebFilter) {
          res = res.filter(obj => { return obj.valueweb === this.valuewebFilter })
        }
        if (this.riskFilter && res) {
          // res = res.filter((item, i) => {
          res = res.filter(obj => { return obj.risk === this.riskFilter })
          // return item.items.length
          // })
        }
        return res
      }

    },
    // filteredResults_asValueweb() {
    //   if (this.results.items) {
    //     let res = JSON.parse(JSON.stringify(this.results.items))
    //     if (this.valuewebFilter) {
    //       res = res.filter(obj => { return obj.name === this.valuewebFilter })
    //     }
    //     if (this.riskFilter && res) {
    //       res = res.filter((item, i) => {
    //         item.items = item.items.filter(obj => { return obj.risk === this.riskFilter })
    //         return item.items.length
    //       })
    //     }
    //     return res
    //   }
    //
    // },
    filtersForValueweb() {
      return this.results.valuewebs
      // let res = []
      // if (this.results.items) {
      //   res = this.results.items.map((item, i) => {
      //     return item.name
      //   })
      // }
      // return res
    },

  },
  methods: {
    statusIconText,
    statusIconColour,

    init() {
      this.loading = true
      // this.getAssessmentStatus()
      this.$http.get(`/risk-profile/status`).then((response) => {
        this.statuses = response.data
        if (response.data.finished) {
          this.selectedItem = this.sidebarItems.length - 1
          this.sidebarIndex = this.sidebarItems.length - 1
          this.getResults()
        }
        this.loading = false
      })
    },
    sortedByOrder(items) {
      return Object.values(items).sort((a, b) => {
        return a.order - b.order
      });
    },

    riskColour(risk) {
      if (risk === 'High') {
        return this.riskColours[0]
      } else if (risk === 'Moderate') {
        return this.riskColours[1]
      } else if (risk === 'Low') {
        return this.riskColours[2]
      } else if (risk === 'Unlikely') {
        return this.riskColours[3]
      } else {
        return this.missingInfoColour
      }
    },

    start() {
      this.selectedItem = 1
      let item = this.sidebarItems[this.selectedItem]
      this.getQuestionSet(item)

    },

    changeTab(item, index) {
      if (index === this.selectedItem) {
        return
      }

      this.selectedItem = index

      if (index === 0) {
        return
      } else if (index < this.sidebarItems.length - 1) {
        this.getQuestionSet(item)
      } else {
        this.getResults()
      }
    },

    getQuestionSet(item) {
      this.items = []
      this.$http.get(`/risk-profile/questions/${item.key}`).then((response) => {
        this.items = response.data
      })
    },
    getAssessmentStatus() {
      this.$http.get(`/risk-profile/status`).then((response) => {
        this.statuses = response.data
      })
    },
    getResults() {
      // this.$http.get(`/risk-profile/results`).then((response) => {
      this.$http.get(`/risk-profile/results/goals`).then((response) => {
        this.results = response.data
        this.series = response.data.counts
      })
    },
    saveQuestions() {
      let group = this.sidebarItems[this.selectedItem].key

      this.$http.post(`/risk-profile/questions/${group}`, this.items).then((response) => {
        this.getAssessmentStatus()
        this.nextQuestionSet()
      })
    },
    nextQuestionSet() {
      this.selectedItem += 1
      if (this.selectedItem < this.sidebarItems.length - 1) {
        this.getQuestionSet(this.sidebarItems[this.selectedItem])
      } else {
        this.getResults()
      }
    },
    showHelptext(id) {
      let exists = this.activeHelptexts.includes(id)

      if (exists) {
        this.activeHelptexts = this.activeHelptexts.filter((item) => { return item !== id })
      } else {
        this.activeHelptexts.push(id)
      }
    },

  }
}
</script>

<style>
.v-btn--active.no-active::before {
  opacity: 0 !important;
}

.click {
  cursor: pointer;
}

.v-btn--active::before {
  opacity: 0 !important;
}

.v-btn--active:hover::before {
  opacity: 0.18 !important;
}
</style>
