<template>
  <div class="statistics">
    <Card class="card" style="width: 1000px;">
      <div class="card-list">
        <div class="card-item">
          <h2 class="card-num">{{statistics.todayPromoteUser}}</h2>
          <h3 class="card-title">今日推广用户数</h3>
        </div>
        <div class="card-item">
          <h2 class="card-num" style="color: #00cc66;">{{statistics.todayPromoteFee || 0}}</h2>
          <h3 class="card-title">今日推广分成金额</h3>
        </div>
        <div class="card-item">
          <h2 class="card-num" style="color: #ff9900;">{{statistics.addUpPromoteUser}}</h2>
          <h3 class="card-title">总推广用户数</h3>
        </div>
        <div class="card-item">
          <h2 class="card-num" style="color: #ff6600;">{{statistics.addUpPromoteFee}}</h2>
          <h3 class="card-title">总推广分成金额</h3>
        </div>
      </div>
    </Card>
    <div class="record">
      <h3 class="record-title">推广用户付费购卡记录</h3>
      <Table :loading="loading" :columns="columns" :data="list" width="1000" border ></Table>
      <Page v-if="recordTotal > 0" class="page" :total="recordTotal" :page-size="page.pageSize" @on-change="change" />
    </div>
  </div>
</template>
<script>
import { API_statistics } from "../model/statistics"
import { API_record } from "../model/record"

export default {
  data() {
    return {
      statistics: {},
      recordTotal: 0,
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
          title: "类型",
          key: "cardTypeName",
          align: 'center'
        },
        {
          title: "支付时间",
          key: "payTime",
          align: 'center'
        },
        {
          title: "支付金额",
          key: "pay",
          align: 'center'
        },
        {
          title: "分成金额",
          key: "promoteFee",
          align: 'center'
        }
      ],
      list: []
    };
  },
  created() {
    this.queryStatistics()
    this.queryRecord()
  },
  methods: {
    queryStatistics() {
      API_statistics.query()
        .then(data => {
          // console.log('data', data)
          this.statistics = data
        })
    },
    queryRecord() {
      this.loading = true
      API_record.query(this.page)
        .then(data => {
          this.loading = false
          // console.log('data', data)
          const {total, list} = data
          this.recordTotal = total
          list.forEach(val => {
            switch (val.cardType) {
              case 'member':
                val.cardTypeName = '字幕卡'
                break;
              case 'game':
                val.cardTypeName = '语训卡'
                break;
              default:
                val.cardTypeName = ''
                break;
            }
          });
          this.list = list
        })
        .catch(err => {
          this.loading = false          
        })
    },
    change(pageNo) {
      this.page.pageNo = pageNo
      this.queryRecord()
    }
  }
};
</script>
<style scoped>
.card-list {
  display: flex;
}
.card-item {
  border-right: 2px solid #efefef;
  text-align: center;
  width: 250px;
}
.card-item:last-child {
  border-right: none;
}
.card-num {
  color: #3399ff;
  height: 42px;
  font-size: 28px;
}

.record {
  margin-top: 40px;
}
.record-title {
  margin-bottom: 20px;
}
.page {
  margin-top: 20px;
  text-align: center;
}
</style>

