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
       :dialogBook="dialogBook"
       @closeDialog="closeDialog"
       @onClickSaveBtn="onClickSaveBtn"
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
    <v-dialog v-model="isShowErrorDialog" max-width="500px">
     <v-card>
       <v-card-title class="text-h5">未入力項目があります</v-card-title>
       <v-card-actions>
         <v-spacer />
         <v-btn @click="closeErrorDialog">閉じる</v-btn>
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
      bookList: [
        { title: '今夜は眠れない', category: 'ミステリー', purchase_date: '2022-08-10', buyer: '山田太郎', review_content: '面白い' },
        { title: 'もものかんづめ', category: 'エッセイ', purchase_date: '2022-09-10', buyer: '佐藤次郎', review_content: '普通' },
        { title: '王さまロボット', category: 'ファンタジー', purchase_date: '2022-10-10', buyer: '鈴木一郎', review_content: '感動した' }
      ],
      beforeDialogBook: {},
      dialogBook: { title: '', category: '', purchase_date: '', buyer: '', review_content: '' },
      isShowDialog: false,
      isShowDeleteDialog: false,
      isShowErrorDialog: false,
      searchTitle: '',
      searchCategory: '',
      isLoading: false
    }
  },
  mounted () {
    // await google.script.run.withSuccessHandler(function(result) {
    //  if (result == null){
    //    app.bookList = []
    //  } else {
    //    app.bookList = result
    //  }
    // }).withFailureHandler(function(){
    //    alert("データを取得出来ません。")
    // }).selectAllRecord()
  },
  methods: {
    onClickEditIcon (dialogBook) {
      if (this.isShowDialog === false) {
        this.beforeDialogBook = dialogBook
      }
      this.dialogBook = dialogBook
      this.isShowDialog = true
    },
    onClickDeleteIcon (dialogBook) {
      this.dialogBook = dialogBook
      this.isShowDeleteDialog = true
    },
    onClickAddBtn () {
      this.beforeDialogBook = {}
      this.dialogBook = {}
      this.isShowDialog = true
    },
    closeDialog () {
      this.beforeDialogBook = {}
      this.isShowDialog = false
    },
    closeDeleteDialog () {
      this.isShowDeleteDialog = false
    },
    closeErrorDialog () {
      this.isShowErrorDialog = false
    },
    async onClickSaveBtn (dialogBook) {
      this.dialogBook = dialogBook
      if (this.dialogBook.title === undefined || this.dialogBook.title === '' ||
          this.dialogBook.category === undefined || this.dialogBook.category === '' ||
          this.dialogBook.purchase_date === undefined || this.dialogBook.purchase_date === '' ||
          this.dialogBook.buyer === undefined || this.dialogBook.buyer === '' ||
          this.dialogBook.review_content === undefined || this.dialogBook.review_content === ''
      ) {
        this.isShowErrorDialog = true
      } else {
        const google = window.google
        if (Object.keys(this.beforeDialogBook).length === 0) {
          await google.script.run.withSuccessHandler(function () {
            alert('登録しました。')
          }).withFailureHandler(function () {
            alert('登録に失敗しました。')
          }).insertRecord(this.dialogBook)
        } else {
          await google.script.run.withSuccessHandler(function () {
            alert('更新しました。')
          }).withFailureHandler(function () {
            alert('更新に失敗しました。')
          }).updateRecord(this.beforeDialogBook, this.dialogBook)
        }
        this.closeDialog()
      }
    },
    onClickDeleteBtn (deleteDialogBook) {
      // await google.script.run.withSuccessHandler(function () {
      //  alert('削除しました。')
      // }).withFailureHandler(function () {
      //  alert('削除に失敗しました。')
      // }).DeleteRecord(deleteDialogBook)
      this.closeDeleteDialog()
    },
    onClickSearchBtn (searchTitle, searchCategory) {
      // await google.script.run.withSuccessHandler(function () {
      //  alert('更新しました。')
      // }).withFailureHandler(function () {
      //  alert('検索に失敗しました。')
      // }).selectRecord(searchTitle, searchCategory)
    }
  }
}
</script>
