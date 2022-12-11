<template>
  <div>
    <v-card>
       <v-card-title class="text-h5">削除しますか?</v-card-title>
       <v-card-actions>
         <v-spacer />
         <v-btn @click="closeDeleteDialog">キャンセル</v-btn>
         <v-btn @click="onClickDeleteBtn">削除</v-btn>
         <v-spacer />
       </v-card-actions>
     </v-card>
    <v-overlay :value="isDeleteLoading">
      <v-progress-circular indeterminate size="64"/>
    </v-overlay>
  </div>
</template>

<script>
export default {
  props: [
    'dialogTask'
  ],
  data () {
    return {
      isDeleteLoading: false
    }
  },
  methods: {
    closeDeleteDialog () {
      this.$emit('closeDeleteDialog')
    }
    // async onClickDeleteBtn () {
    //   this.isDeleteLoading = true
    //   await this.promiseDeleteRecord()
    //   alert('削除しました。')
    //   this.closeDeleteDialog()
    //   this.isDeleteLoading = false
    // },
    // promiseDeleteRecord () {
    //   const google = window.google
    //   const app = this
    //   return new Promise((resolve) => {
    //     google.script.run
    //       .withSuccessHandler((result) => resolve(result))
    //       .withFailureHandler(function () {
    //         alert('DB接続確立エラー')
    //         app.isLoading = false
    //       }).deleteRecord(this.dialogTask)
    //   })
    // }
  }
}
</script>
