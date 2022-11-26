<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="taskList"
      class="elevation-1"
    >
        <template v-slot:[`item.edit-action`]="{ item }">
          <v-icon @click="onClickEditIcon(item)">mdi-pencil</v-icon>
        </template>
        <template v-slot:[`item.delete-action`]="{ item }">
          <v-icon @click="onClickDeleteIcon(item)">mdi-delete</v-icon>
        </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: [
    'taskList'
  ],
  data () {
    return {
      headers: [
        { text: 'タスク名', align: 'center', value: 'name' },
        { text: 'タスク状態', align: 'center', value: 'status' },
        { text: '編集', align: 'center', value: 'edit-action' },
        { text: '削除', align: 'center', value: 'delete-action' }
      ]
    }
  },
  methods: {
    onClickEditIcon (task) {
      this.$emit('onClickEditIcon', Object.assign({}, task))
    },
    onClickDeleteIcon (task) {
      this.$emit('onClickDeleteIcon', Object.assign({}, task))
    }
  }
}
</script>
