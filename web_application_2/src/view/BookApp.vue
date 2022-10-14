<template>
  <div>
    <search-template
      :bookList="bookList"
      :searchCategory="searchCategory"
      :searchTitle="searchTitle"
      @onClickSearchBtn="onClickSearchBtn"
     />
    <v-btn @click="onClickAddBtn">新規登録</v-btn>
    <list-template
      :bookList="bookList"
      @onClickEditIcon="onClickEditIcon"
      @onClickDeleteIcon="onClickDeleteIcon"
     />
    <v-dialog v-model="isShowDialog" max-width="500px">
      <form-template
        :isNew="isNew"
        :dialogBook="dialogBook"
        @closeDialog="closeDialog"
       />
    </v-dialog>
    <v-dialog v-model="isShowDeleteDialog" max-width="500px">
     <v-card>
       <v-card-title class="text-h5">削除しますか?</v-card-title>
       <v-card-actions>
         <v-spacer />
         <v-btn @click="closeDeleteDialog">キャンセル</v-btn>
         <v-btn @click="onClickDeleteBtn">削除</v-btn>
         <v-spacer />
       </v-card-actions>
     </v-card>
    </v-dialog>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"/>
    </v-overlay>
  </div>
</template>

<script>
import Form from '../components/Form'
import List from '../components/List'
import Search from '../components/Search'

export default {
  components: {
    'form-template': Form,
    'list-template': List,
    'search-template': Search
  },
  data () {
    return {
      bookList: [],
      dialogBook: { title: '', category: '', purchase_date: '', buyer: '', review_content: '' },
      isShowDialog: false,
      isShowDeleteDialog: false,
      searchTitle: '',
      searchCategory: '',
      isLoading: false,
      isNew: false
    }
  },
  async mounted () {
    this.isLoading = true
    const result = await this.promiseSelectAllRecord()
    this.bookList = result
    this.isLoading = false
  },
  methods: {
    onClickEditIcon (dialogBook) {
      this.isNew = false
      this.dialogBook = dialogBook
      this.isShowDialog = true
    },
    onClickDeleteIcon (dialogBook) {
      this.dialogBook = dialogBook
      this.isShowDeleteDialog = true
    },
    onClickAddBtn () {
      this.isNew = true
      this.dialogBook = {}
      this.isShowDialog = true
    },
    closeDialog () {
      this.isShowDialog = false
    },
    closeDeleteDialog () {
      this.isShowDeleteDialog = false
    },
    onClickDeleteBtn (deleteDialogBook) {
      // await google.script.run.withSuccessHandler(function () {
      //  alert('削除しました。')
      // }).withFailureHandler(function () {
      //  alert('削除に失敗しました。')
      // }).DeleteRecord(deleteDialogBook)
      this.closeDeleteDialog()
    },
    async onClickSearchBtn (searchTitle, searchCategory) {
      this.isLoading = true
      const result = await this.promiseSelectSearchRecord(searchTitle, searchCategory)
      this.bookList = result
      this.isLoading = false
    },
    promiseSelectSearchRecord (searchTitle, searchCategory) {
      const google = window.google
      const app = this
      return new Promise((resolve) => {
        google.script.run
          .withSuccessHandler((result) => resolve(result))
          .withFailureHandler(function () {
            alert('DB接続確立エラー')
            app.isLoading = false
          }).selectSearchRecord(searchTitle, searchCategory)
      })
    },
    promiseSelectAllRecord () {
      const google = window.google
      const app = this
      return new Promise((resolve) => {
        google.script.run
          .withSuccessHandler((result) => resolve(result))
          .withFailureHandler(function () {
            alert('DB接続確立エラー')
            app.isLoading = false
          }).selectAllRecord()
      })
    }
  }
}
</script>
