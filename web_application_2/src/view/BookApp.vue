<template>
  <div class="list">
    <v-card-title>
      <v-text-field v-model="searchTitle" append-icon="mdi-magnify" label="タイトルの文字列検索" />
      <v-select
        v-model="searchCategory"
        :items="bookList"
        item-text="category"
        item-value="category"
        label="ジャンル検索"
       />
      <v-btn @click="onClickSearchBtn">検索</v-btn>
      <v-btn @click="onClickAddBtn">新規登録</v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="bookList"
      class="elevation-1"
    >
      <template v-slot:top>
          <v-dialog v-model="isShowDialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">登録／編集</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field v-model="dialogBookList.title" label="タイトル" />
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model="dialogBookList.category" label="ジャンル" />
                    </v-col>
                    <v-col cols="6">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="pickerDate"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template #activator="{ on, attrs }" >
                          <v-text-field
                            v-model="dialogBookList.purchase_date"
                            label="購入日"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on" />
                        </template>
                          <v-date-picker
                            v-model="pickerDate"
                            no-title
                            scrollable
                            @input="dialogBookList.purchase_date = pickerDate
                            $refs.menu.save(pickerDate)
                            menu = false
                            "
                           />
                      </v-menu>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model="dialogBookList.buyer" label="購入者" />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="dialogBookList.review_content" label="レビュー内容" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="closeDialog">閉じる</v-btn>
                <v-btn @click="onClickInsertUpdateBtn">保存</v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
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
      </template>
      <template v-slot:[`item.edit-action`]="{ item }">
        <v-icon @click="onClickEditIcon(item)">mdi-pencil</v-icon>
      </template>
      <template v-slot:[`item.delete-action`]="{ item }">
        <v-icon @click="onClickDeleteIcon(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"/>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: 'list',
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
      bookList: [
        { title: '今夜は眠れない', category: 'ミステリー', purchase_date: '2022-08-10', buyer: '山田太郎', review_content: '面白い' },
        { title: 'もものかんづめ', category: 'エッセイ', purchase_date: '2022-09-10', buyer: '佐藤次郎', review_content: '普通' },
        { title: '王さまロボット', category: 'ファンタジー', purchase_date: '2022-10-10', buyer: '鈴木一郎', review_content: '感動した' }
      ],
      dialogBookList: {},
      isShowDialog: false,
      isShowDeleteDialog: false,
      searchTitle: '',
      searchCategory: '',
      menu: false,
      pickerDate: '',
      isLoading: false
    }
  },
  mounted () {
    // await google.script.run.withSuccessHandler(function(result) {
    //  if (result == null){
    //    app.bookList = {}
    //  } else {
    //    app.bookList = result
    //  }
    // }).withFailureHandler(function(){
    //    alert("データを取得出来ません。")
    // }).selectAllRecord()
  },
  methods: {
    onClickEditIcon (book) {
      this.dialogBookList = Object.assign({}, book)
      this.isShowDialog = true
    },
    onClickDeleteIcon (book) {
      this.dialogBookList = Object.assign({}, book)
      this.isShowDeleteDialog = true
    },
    onClickAddBtn () {
      this.dialogBookList = {}
      this.isShowDialog = true
    },
    closeDialog () {
      this.dialogBookList = {}
      this.isShowDialog = false
    },
    closeDeleteDialog () {
      this.dialogBookList = {}
      this.isShowDeleteDialog = false
    },
    onClickInsertUpdateBtn () {
      // await google.script.run.withSuccessHandler(function () {
      //  alert('更新しました。')
      // }).withFailureHandler(function () {
      //  alert('更新に失敗しました。')
      // }).insertUpdateRecord(this.dialogBookList)
      this.closeDialog()
    },
    onClickDeleteBtn () {
      // await google.script.run.withSuccessHandler(function () {
      //  alert('削除しました。')
      // }).withFailureHandler(function () {
      //  alert('削除に失敗しました。')
      // }).DeleteRecord(this.dialogBookList)
      this.closeDeleteDialog()
    },
    onClickSearchBtn () {
      // await google.script.run.withSuccessHandler(function () {
      //  alert('更新しました。')
      // }).withFailureHandler(function () {
      //  alert('検索に失敗しました。')
      // }).selectRecord(searchTitle,searchCategory)
    }
  }
}
</script>
