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
      bookList: [
        { title: '今夜は眠れない', category: 'ミステリー', purchase_date: '2022-08-10', buyer: '山田太郎', review_content: '面白い' },
        { title: 'もものかんづめ', category: 'エッセイ', purchase_date: '2022-09-10', buyer: '佐藤次郎', review_content: '普通' },
        { title: '王さまロボット', category: 'ファンタジー', purchase_date: '2022-10-10', buyer: '鈴木一郎', review_content: '感動した' }
      ],
      dialogBook: { title: '', category: '', purchase_date: '', buyer: '', review_content: '' },
      isShowDialog: false,
      isShowDeleteDialog: false,
      searchTitle: '',
      searchCategory: '',
      isLoading: false,
      isNew: false
    }
  },
  mounted () {
    this.isLoading = true
    // await google.script.run.withSuccessHandler(function(result) {
    //  if (result == null){
    //    app.bookList = []
    //  } else {
    //    app.bookList = result
    //  }
    // }).withFailureHandler(function(){
    //    alert("データを取得出来ません。")
    // }).selectAllRecord()
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
