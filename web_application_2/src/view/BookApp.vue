<template>
  <div>
    <search-template
      :bookList="bookList"
      :searchCategory="searchCategory"
      :searchTitle="searchTitle"
      @onClickSearchBtn="onClickSearchBtn"
    >
    </search-template>
    <list-template
      :bookList="bookList"
    >
    </list-template>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"/>
    </v-overlay>
  </div>
</template>

<script>
import List from '../components/List'
import Search from '../components/Search'

export default {
  components: {
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
