<template>
  <div>
    <search-template
      :taskList="taskList"
      :searchStatus="searchStatus"
      @onClickSearchBtn="onClickSearchBtn"
     />
    <v-btn @click="onClickAddBtn">新規登録</v-btn>
    <list-template
      :taskList="taskList"
      @onClickEditIcon="onClickEditIcon"
      @onClickDeleteIcon="onClickDeleteIcon"
     />
    <v-dialog v-model="isShowDialog" max-width="500px">
      <form-template
        :isNew="isNew"
        :dialogTask="dialogTask"
        @closeDialog="closeDialog"
       />
    </v-dialog>
    <v-dialog v-model="isShowDeleteDialog" max-width="500px">
      <delete-template
        :dialogTask="dialogTask"
        @closeDeleteDialog="closeDeleteDialog"
       />
    </v-dialog>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"/>
    </v-overlay>
  </div>
</template>

<script>
import Delete from '../components/Delete'
import Form from '../components/Form'
import List from '../components/List'
import Search from '../components/Search'

export default {
  components: {
    'delete-template': Delete,
    'form-template': Form,
    'list-template': List,
    'search-template': Search
  },
  data () {
    return {
      taskList: [
        { name: 'aaa', status: '完了' },
        { name: 'bbb', status: '完了' },
        { name: 'ccc', status: '未完了' },
        { name: 'ddd', status: '完了' },
        { name: 'eee', status: '未完了' }
      ],
      dialogTask: { name: '', status: '' },
      isShowDialog: false,
      isShowDeleteDialog: false,
      isLoading: false,
      isNew: false
    }
  },
  async mounted () {
    // this.isLoading = true
    // const result = await this.promiseSelectAllRecord()
    // this.taskList = result
    // this.isLoading = false
  },
  methods: {
    onClickEditIcon (dialogTask) {
      this.isNew = false
      this.dialogTask = dialogTask
      this.isShowDialog = true
    },
    onClickDeleteIcon (dialogTask) {
      this.dialogTask = dialogTask
      this.isShowDeleteDialog = true
    },
    onClickAddBtn () {
      this.isNew = true
      this.dialogTask = {}
      this.isShowDialog = true
    },
    closeDialog () {
      this.isShowDialog = false
    },
    closeDeleteDialog () {
      this.isShowDeleteDialog = false
    }
    // async onClickSearchBtn (searchStatus) {
    //   this.isLoading = true
    //   const result = await this.promiseSelectSearchRecord(searchStatus)
    //   this.taskList = result
    //   this.isLoading = false
    // },
    // promiseSelectSearchRecord (searchStatus) {
    //   const google = window.google
    //   const app = this
    //   return new Promise((resolve) => {
    //     google.script.run
    //       .withSuccessHandler((result) => resolve(result))
    //       .withFailureHandler(function () {
    //         alert('DB接続確立エラー')
    //         app.isLoading = false
    //       }).selectSearchRecord(searchStatus)
    //   })
    // },
    // promiseSelectAllRecord () {
    //   const google = window.google
    //   const app = this
    //   return new Promise((resolve) => {
    //     google.script.run
    //       .withSuccessHandler((result) => resolve(result))
    //       .withFailureHandler(function () {
    //         alert('DB接続確立エラー')
    //         app.isLoading = false
    //       }).selectAllRecord()
    //   })
    // }
  }
}
</script>
