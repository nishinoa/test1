<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="bookList"
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
    'bookList'
  ],
  data () {
    return {
      headers: [
        { text: 'タイトル', align: 'center', value: 'title' },
        { text: 'ジャンル', align: 'center', value: 'category' },
        { text: '購入日', align: 'center', value: 'purchase_date' },
        { text: '購入者', align: 'center', value: 'buyer' },
        { text: '編集', align: 'center', value: 'edit-action' },
        { text: '削除', align: 'center', value: 'delete-action' }
      ]
    }
  },
  methods: {
    onClickEditIcon (book) {
      this.$emit('onClickEditIcon', Object.assign({}, book))
    },
    onClickDeleteIcon (book) {
      this.$emit('onClickDeleteIcon', Object.assign({}, book))
    }
  }
}
</script>
