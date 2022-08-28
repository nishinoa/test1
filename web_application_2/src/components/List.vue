<template>
  <div>
    <v-btn @click="onClickAddBtn">新規登録</v-btn>
    <v-data-table
      :headers="headers"
      :items="bookList"
      class="elevation-1"
    >
      <template v-slot:top>
        <form-template
          :dialogBook="dialogBook"
          :isShowDialog="isShowDialog"
          :isShowDeleteDialog="isShowDeleteDialog"
          @closeDialog="closeDialog"
          @closeDeleteDialog="closeDeleteDialog"
          @onClickInsertUpdateBtn="onClickInsertUpdateBtn"
          @onClickDeleteBtn="onClickDeleteBtn"
        >
        </form-template>
      </template>
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
import Form from './Form'

export default {
  props: [
    'bookList'
  ],
  components: {
    'form-template': Form
  },
  data () {
    return {
      headers: [
        { text: 'タイトル', align: 'center', value: 'title' },
        { text: 'ジャンル', align: 'center', value: 'category' },
        { text: '購入日', align: 'center', value: 'purchase_date' },
        { text: '購入者', align: 'center', value: 'buyer' },
        { text: '編集', align: 'center', value: 'edit-action' },
        { text: '削除', align: 'center', value: 'delete-action' }
      ],
      dialogBook: {},
      isShowDialog: false,
      isShowDeleteDialog: false
    }
  },
  methods: {
    onClickEditIcon (book) {
      this.dialogBook = Object.assign({}, book)
      this.isShowDialog = true
    },
    onClickDeleteIcon (book) {
      this.dialogBook = Object.assign({}, book)
      this.isShowDeleteDialog = true
    },
    onClickAddBtn () {
      this.dialogBook = {}
      this.isShowDialog = true
    },
    closeDialog () {
      this.dialogBook = {}
      this.isShowDialog = false
    },
    closeDeleteDialog () {
      this.dialogBook = {}
      this.isShowDeleteDialog = false
    },
    onClickInsertUpdateBtn (dialogBook) {
      // await google.script.run.withSuccessHandler(function () {
      //  alert('更新しました。')
      // }).withFailureHandler(function () {
      //  alert('更新に失敗しました。')
      // }).insertUpdateRecord(dialogBook)
      this.closeDialog()
    },
    onClickDeleteBtn (dialogBook) {
      // await google.script.run.withSuccessHandler(function () {
      //  alert('削除しました。')
      // }).withFailureHandler(function () {
      //  alert('削除に失敗しました。')
      // }).DeleteRecord(dialogBook)
      this.closeDeleteDialog()
    }
  }
}
</script>
