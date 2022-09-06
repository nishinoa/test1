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
        <v-btn @click="onClickSaveBtn">保存</v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
    <v-dialog v-model="isShowErrorDialog" max-width="500px">
     <v-card>
       <v-card-title class="text-h5">未入力項目があります</v-card-title>
       <v-card-actions>
         <v-spacer />
         <v-btn @click="closeErrorDialog">閉じる</v-btn>
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
export default {
  props: [
    'dialogBook'
  ],
  data () {
    return {
      menu: false,
      isShowErrorDialog: false,
      isLoading: false
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    },
    closeErrorDialog () {
      this.isShowErrorDialog = false
    },
    onClickSaveBtn () {
      if (!this.dialogBook.title || !this.dialogBook.category ||
          !this.dialogBook.purchase_date || !this.dialogBook.buyer ||
          !this.dialogBook.review_content
      ) {
        this.isShowErrorDialog = true
      } else {
        this.$emit('onClickSaveBtn', this.dialogBook)
        this.isLoading = true
      }
    }
  }
}
</script>
