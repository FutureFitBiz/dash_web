<template>
<div class="">
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left"> Goal </th>
          <th class="text-left"> Name </th>
          <th class="text-left"> Progress Indicator </th>
          <th class="text-left"> Score </th>
          <th class="text-left"> Status </th>
          <th class="text-left"> Total Inputs </th>
          <th class="text-left"> Unfinished Inputs </th>
          <th class="text-left"> Excluded Inputs </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in goals" :key="item.name">
          <td>{{ item.goal }}</td>
          <td>{{ item.goal_text }}</td>
          <td>{{ item.progress_indicator_text }}</td>
          <td>{{ item.progress }}%</td>
          <td>
            <v-icon v-if="!item.complete" class="" color="orange" dense>mdi-alert-circle-outline</v-icon>
            <v-icon v-if="item.complete" class="" color="green" dense>mdi-checkbox-blank-circle</v-icon>

          </td>
          <td>{{ item.total }}</td>
          <td>{{ item.total_unfinished }}</td>
          <td>{{ item.total_excluded }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>


</div>
</template>

<script>
export default {
  name: 'Soon',
  mounted: function() {
    this.getItems()
  },
  data: () => ({
    goals: []

  }),
  methods: {
    getItems(initial) {
      this.$http.get(`/progress_summary`).then((response) => {
        this.goals = response.data.goals
      })
    },
  },
}
</script>
