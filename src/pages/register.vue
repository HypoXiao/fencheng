<template>
  <div class="register">
    <h3 class="title">已在你名下登记尚未购卡用户</h3>
      <Table :loading="loading" :columns="columns" :data="list" width="1000" border ></Table>
      <Page v-if="total > 0" class="page" :total="total" :page-size="page.pageSize" @on-change="change" />
  </div>
</template>
<script>
import { API_register } from "../model/register"

export default {
  data() {
    return {
      total: 0,
      page: {
        pageNo: 1,
        pageSize: 15
      },
      loading: false,
      columns: [
        {
          title: "用户手机号",
          key: "phonenumber",
          align: 'center'
        },
         {
          title: "登记时间",
          key: "awardTime",
          align: 'center'
        }
      ],
      list: []
    };
  },
  created() {
    this.query()
  },
  methods: {
    query() {
      this.loading = true
      API_register.query(this.page)
        .then(data => {
          this.loading = false
          // console.log('data', data)
          const { total, list } = data
          this.total = total
          this.list = list
        })
        .catch(err => {
          this.loading = false          
        })
    },
    change(pageNo) {
      this.page.pageNo = pageNo
      this.query()
    }
  }  
}
</script>
<style scoped>
.title {
  margin-bottom: 20px;
}
.page {
  margin-top: 20px;
  width: 1000px;
  text-align: center;
}
</style>

