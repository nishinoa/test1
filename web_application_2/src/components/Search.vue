<template>
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
  </v-card-title>
</template>

<script>
export default {
  props: [
    'bookList',
    'searchTitle',
    'searchCategory'
  ],
  methods: {
    onClickSearchBtn () {
      this.$emit('onClickSearchBtn', this.searchTitle, this.searchCategory)
    }
  }
}
</script>
