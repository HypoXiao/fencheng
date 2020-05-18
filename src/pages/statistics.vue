<template>
  <div class="statistics">
    <Card class="card" style="width: 1100px;">
      <div class="card-list">
        <div class="card-item">
          <h2 class="card-num">{{statistics.todayPromoteUser}}</h2>
          <h3 class="card-title">今日推广用户数</h3>
        </div>
        <!-- xx -->
        <div class="card-item">
          <h2 class="card-num" style="color: #00cc66;">{{statistics.todayBuyUser}}</h2>
          <h3 class="card-title">今日购卡用户数</h3>
        </div>
        <div class="card-item">
          <h2 class="card-num" style="color: #ff9900;"><span class="yan">￥</span>{{statistics.todayPromoteFee}}</h2>
          <h3 class="card-title">今日推广分成金额</h3>
        </div>
        <div class="card-item">
          <h2 class="card-num">{{statistics.addUpPromoteUser}}</h2>
          <h3 class="card-title">总推广用户数</h3>
        </div>
        <!-- xx -->
        <div class="card-item">
          <h2 class="card-num" style="color: #00cc66;">{{statistics.addUpBuyUser}}</h2>
          <h3 class="card-title">总的购卡用户数</h3>
        </div>
        <div class="card-item">
          <h2 class="card-num" style="color: #ff9900;"><span class="yan">￥</span>{{statistics.addUpPromoteFee}}</h2>
          <h3 class="card-title">总推广分成金额</h3>
        </div>
        <!-- xx -->
        <div class="card-item">
          <h2 class="card-num" style="color: #ff6600;"><span class="yan">￥</span>{{statistics.shareFeeByMon}}</h2>
          <h3 class="card-title">月结待分成金额</h3>
        </div>
      </div>
    </Card>
    <v-record></v-record>
  </div>
</template>
<script>
import vRecord from '@/components/record'

import { API_statistics } from "../model/statistics"
import { changeFee } from '@/libs/util'

export default {
  data() {
    return {
      statistics: {
        todayPromoteUser: '-',
        todayBuyUser: '-',
        todayPromoteFee: '-',
        addUpPromoteUser: '-',
        addUpBuyUser: '-',
        addUpPromoteFee: '-',
        shareFeeByMon: '-'
      }
    };
  },
  created() {
    this.queryStatistics()
  },
  methods: {
    queryStatistics() {
      API_statistics.query()
        .then(data => {
          // console.log('data', data)
          const { todayPromoteUser, todayPromoteFee, addUpPromoteUser, addUpPromoteFee, todayBuyUser, addUpBuyUser, shareFeeByMon } = data
          this.statistics.todayPromoteUser = todayPromoteUser || 0
          this.statistics.todayBuyUser = todayBuyUser || 0
          this.statistics.todayPromoteFee = changeFee(todayPromoteFee)
          this.statistics.addUpPromoteUser = addUpPromoteUser || 0
          this.statistics.addUpBuyUser = addUpBuyUser || 0
          this.statistics.addUpPromoteFee = changeFee(addUpPromoteFee)
          this.statistics.shareFeeByMon = changeFee(shareFeeByMon)
        })
    },
    change(pageNo) {
      this.page.pageNo = pageNo
      this.queryRecord()
    }
  },
  components: {
    vRecord
  }
}
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
  height: 40px;
  font-size: 24px;
}
.card-title {
  font-size: 15px;
}
</style>

