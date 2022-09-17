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
              <v-text-field v-if="Object.keys(beforeDialogBook).length === 0" v-model="dialogBook.title" label="タイトル" />
              <v-text-field v-else v-model="dialogBook.title" label="タイトル" disabled />
            </v-col>
            <v-col cols="6">
              <v-text-field v-if="Object.keys(beforeDialogBook).length === 0" v-model="dialogBook.category" label="ジャンル" />
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
                    v-if="Object.keys(beforeDialogBook).length === 0"
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
              <v-text-field v-if="Object.keys(beforeDialogBook).length === 0" v-model="dialogBook.buyer" label="購入者" />
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
    'beforeDialogBook',
    'dialogBook',
    'insertResult'
  ],
  data () {
    return {
      menu: false,
      isShowErrorDialog: false,
      isShowKeyDuplicateErrorDialog: false,
      isSaveLoading: false
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    },
    closeErrorDialog () {
      this.isShowErrorDialog = false
    },
    closeKeyDuplicateErrorDialog () {
      this.isShowKeyDuplicateErrorDialog = false
    },
    async onClickSaveBtn () {
      if (!this.dialogBook.title || !this.dialogBook.category ||
          !this.dialogBook.purchase_date || !this.dialogBook.buyer ||
          !this.dialogBook.review_content
      ) {
        window.alert('未入力項目があります')
        return
      }
      this.isSaveLoading = true
      await this.$emit('onClickSaveBtn', this.dialogBook)
      if (this.insertResult == null) {
        window.alert('既に登録済みのデータです')
      }
      this.isSaveLoading = false
    }
  }
}
</script>
