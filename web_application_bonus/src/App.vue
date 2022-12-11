<template>
  <v-app id="app-root">
    <v-app-bar
      app
      dark
      color="primary"
    >
      <v-toolbar-title>
        タスク管理アプリ
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <task-app />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="js">
import Vue from 'vue'
import TaskApp from '@/view/TaskApp'

export default Vue.extend({
  components: {
    TaskApp
  },
  data () {
    return {}
  },
  created () {}
})
</script>
