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
              <v-text-field v-if="isNew" v-model="dialogBook.title" label="タイトル" />
              <v-text-field v-else v-model="dialogBook.title" label="タイトル" disabled />
            </v-col>
            <v-col cols="6">
              <v-text-field v-if="isNew" v-model="dialogBook.category" label="ジャンル" />
              <v-text-field v-else v-model="dialogBook.category" label="ジャンル" disabled />
            </v-col>
            <v-col cols="6">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="dialogBook.purchase_date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }" >
                  <v-text-field
                    v-if="isNew"
                    v-model="dialogBook.purchase_date"
                    label="購入日"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on" />
                  <v-text-field
                    v-else
                    v-model="dialogBook.purchase_date"
                    label="購入日"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    disabled />
                </template>
                  <v-date-picker
                    v-model="dialogBook.purchase_date"
                    no-title
                    scrollable
                    @input="$refs.menu.save(dialogBook.purchase_date)
                    menu = false
                    "
                  />
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-text-field v-if="isNew" v-model="dialogBook.buyer" label="購入者" />
              <v-text-field v-else v-model="dialogBook.buyer" label="購入者" disabled />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="dialogBook.review_content" label="レビュー内容" />
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
    'dialogBook'
  ],
  data () {
    return {
      menu: false,
      isSaveLoading: false
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    },
    async onClickSaveBtn () {
      if (!this.dialogBook.title || !this.dialogBook.category ||
          !this.dialogBook.purchase_date || !this.dialogBook.buyer ||
          !this.dialogBook.review_content
      ) {
        alert('未入力項目があります')
        return
      }
      this.isSaveLoading = true
      if (this.isNew) {
        const result = await this.promiseInsertRecord()
        if (result == null) {
          alert('既に登録済みのデータです')
          this.isSaveLoading = false
          return
        }
        alert('登録しました。')
        this.closeDialog()
      } else {
        await this.promiseUpdateRecord()
        alert('更新しました。')
        this.closeDialog()
      }
      this.isSaveLoading = false
    },
    promiseInsertRecord () {
      const google = window.google
      const app = this
      return new Promise((resolve) => {
        google.script.run
          .withSuccessHandler((result) => resolve(result))
          .withFailureHandler(function () {
            alert('DB接続確立エラー')
            app.isSaveLoading = false
          }).insertRecord(this.dialogBook)
      })
    },
    promiseUpdateRecord () {
      const google = window.google
      const app = this
      return new Promise((resolve) => {
        google.script.run
          .withSuccessHandler((result) => resolve(result))
          .withFailureHandler(function () {
            alert('DB接続確立エラー')
            app.isSaveLoading = false
          }).updateRecord(this.dialogBook)
      })
    }
  }
}
</script>
