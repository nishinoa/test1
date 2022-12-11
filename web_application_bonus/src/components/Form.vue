<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">登録／編集</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field v-if="isNew" v-model="getName" label="タスク名" />
              <v-text-field v-else v-model="getName" label="タスク名" disabled />
            </v-col>
            <v-col cols="6">
              <v-combobox
                v-model="getStatus"
                :items="statusList"
                label="タスク状態"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="closeDialog">閉じる</v-btn>
        <v-btn @click="onClickSaveBtn">保存</v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
    <v-overlay :value="isSaveLoading">
      <v-progress-circular indeterminate size="64"/>
    </v-overlay>
  </div>
</template>

<script>
export default {
  props: [
    'isNew',
    'dialogTask'
  ],
  data () {
    return {
      isSaveLoading: false,
      statusList: ['完了', '未完了'],
      formTask: { name: '', status: '' }
    }
  },
  computed: {
    getName () {
      this.setTask()
      return this.formTask.name
    },
    getStatus () {
      this.setTask()
      return this.formTask.status
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    },
    setTask () {
      this.formTask = this.dialogTask
    }
    // async onClickSaveBtn () {
    //   if (!this.formTask.name ||
    //       !this.formTask.status
    //   ) {
    //     alert('未入力項目があります')
    //     return
    //   }
    //   this.isSaveLoading = true
    //   if (this.isNew) {
    //     const result = await this.promiseInsertRecord()
    //     if (result == null) {
    //       alert('既に登録済みのデータです')
    //       this.isSaveLoading = false
    //       return
    //     }
    //     alert('登録しました。')
    //   } else {
    //     await this.promiseUpdateRecord()
    //     alert('更新しました。')
    //   }
    //   this.closeDialog()
    //   this.isSaveLoading = false
    // },
    // promiseInsertRecord () {
    //   const google = window.google
    //   const app = this
    //   return new Promise((resolve) => {
    //     google.script.run
    //       .withSuccessHandler((result) => resolve(result))
    //       .withFailureHandler(function () {
    //         alert('DB接続確立エラー')
    //         app.isSaveLoading = false
    //       }).insertRecord(this.formTask)
    //   })
    // },
    // promiseUpdateRecord () {
    //   const google = window.google
    //   const app = this
    //   return new Promise((resolve) => {
    //     google.script.run
    //       .withSuccessHandler((result) => resolve(result))
    //       .withFailureHandler(function () {
    //         alert('DB接続確立エラー')
    //         app.isSaveLoading = false
    //       }).updateRecord(this.formTask)
    //   })
    // }
  }
}
</script>
