<template>
  <div>
    <v-dialog v-model="isShowDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">登録／編集</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="dialogBook.title" label="タイトル" />
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="dialogBook.category" label="ジャンル" />
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
                      v-model="dialogBook.purchase_date"
                      label="購入日"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on" />
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
                <v-text-field v-model="dialogBook.buyer" label="購入者" />
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
  </div>
</template>

<script>
export default {
  props: [
    'dialogBook',
    'isShowDialog',
    'isShowDeleteDialog'
  ],
  data () {
    return {
      menu: false
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    },
    closeDeleteDialog () {
      this.$emit('closeDeleteDialog')
    },
    onClickInsertUpdateBtn () {
      this.$emit('onClickInsertUpdateBtn', this.dialogBook)
    },
    onClickDeleteBtn () {
      this.$emit('onClickDeleteBtn', this.dialogBook)
    }
  }
}
</script>
