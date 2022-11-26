<template>
  <v-card-title>
      <v-select
        v-model="searchStatus"
        :items="taskList"
        item-text="status"
        item-value="status"
        label="タスク状態検索"
       />
      <v-btn @click="onClickSearchBtn">検索</v-btn>
  </v-card-title>
</template>

<script>
export default {
  props: [
    'taskList',
    'searchStatus'
  ],
  methods: {
    onClickSearchBtn () {
      this.$emit('onClickSearchBtn', this.searchStatus)
    }
  }
}
</script>
