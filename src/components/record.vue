<template>
  <div class="record">
      <Tabs :value="tabValue" :animated="false" @on-click="changeTab" type="card">
        
        <TabPane label="本月推广用户购卡记录" name="now">
          <Table :loading="nowLoading" :columns="nowColumns" :data="nowList" width="1000" border ></Table>
          <Page v-if="nowTotal > 0" class="page" :total="nowTotal" :page-size="nowPage.pageSize" @on-change="changePage" />
        </TabPane>

        <TabPane label="过往购卡用户情况" name="old">
          <Table :loading="oldLoading" :columns="oldColumns" :data="oldList" width="1000" border ></Table>
          <Page v-if="oldTotal > 0" class="page" :total="oldTotal" :page-size="oldPage.pageSize" @on-change="changePage" />
        </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { API_record } from "../model/record";
import { API_passRecord } from "../model/passRecord";
import { changeFee } from "@/libs/util";

export default {
  data() {
    return {
      tabValue: "now",
      hasClickTab: false,
      nowTotal: 0,
      nowPage: {
        pageNo: 1,
        pageSize: 15
      },
      nowLoading: false,
      nowColumns: [
        {
          title: "用户手机号",
          key: "phonenumber",
          align: "center"
        },
        {
          title: "类型",
          key: "cardTypeName",
          align: "center"
        },
        {
          title: "支付时间",
          key: "payTime",
          align: "center"
        },
        {
          title: "支付金额/元",
          key: "pay",
          align: "center"
        },
        {
          title: "待分成金额/元",
          key: "promoteFee",
          align: "center"
        }
      ],
      nowList: [],
      // old
      oldTotal: 0,
      oldPage: {
        pageNo: 1,
        pageSize: 15
      },
      oldLoading: false,
      oldColumns: [
        {
          title: "用户手机号",
          key: "phonenumber",
          align: "center"
        },
        {
          title: "类型",
          key: "cardTypeName",
          align: "center"
        },
        {
          title: "支付时间",
          key: "payTime",
          align: "center",
          width: 200
        },
        {
          title: "支付金额/元",
          key: "pay",
          align: "center"
        },
        {
          title: "待分成金额/元",
          key: "promoteFee",
          align: "center"
        },
        {
          title: "购卡状态",
          key: "cardStatusName",
          align: "center",
          width: 200,
        } 
      ],
      oldList: []
    };
  },
  created() {
    this.queryNow();
  },
  methods: {
    queryNow() {
      this.nowLoading = true;
      API_record.query(this.nowPage)
        .then(data => {
          this.nowLoading = false;
          const { total, list } = data;
          this.nowTotal = total
          list.forEach(val => {
            val.cardTypeName = this.getTypeName(val.cardType)
            val.pay = changeFee(val.pay);
            val.promoteFee = changeFee(val.promoteFee);
          });
          this.nowList = list;
          console.log('nowList', this.nowList)
        })
        .catch(err => {
          this.nowLoading = false;
        });
    },
    queryOld() {
      this.oldLoading = true;
      API_passRecord.query(this.oldPage)
        .then(data => {
          this.oldLoading = false;
          const { total, list } = data;
          this.oldTotal = total
          list.forEach(val => {
            val.cardTypeName = this.getTypeName(val.cardType)
            val.cardStatusName = this.getStatusName(val.cardStatus)
            val.pay = changeFee(val.pay);
            val.promoteFee = changeFee(val.promoteFee);
          });
          this.oldList = list;
          console.log('oldList', this.oldList)
        })
        .catch(err => {
          this.oldLoading = false;
        });
    },
    getTypeName(type) {
      let name = ''
      switch (type) {
        case "member":
         name = "字幕卡";
          break;
        case "game":
         name = "语训卡";
          break;
        default:
          break;
      }
      return name
    },
    getStatusName(status) {
      let name = ''
      switch (status) {
        case "0":
         name = "上月所购卡尚未到期";
          break;
        case "1":
         name = "过往购卡到期本月未购买";
          break;
        default:
          break;
      }
      return name
    },
    changePage(pageNo) {
      if (this.tabValue === 'old') {
        this.oldPage.pageNo = pageNo;
        this.queryOld()
      } else {
        this.nowPage.pageNo = pageNo;
        this.queryNow()
      }
    },
    changeTab(name) {
      // console.log(name)
      this.tabValue = name;
      if (name === "old" && !this.hasClickTab) {
        this.hasClickTab = true;
        this.queryOld();
      }
    }
  }
};
</script>
<style scoped>
.record {
  margin-top: 25px;
}
.record-title {
  margin-bottom: 20px;
}
.page {
  width: 1000px;
  margin-top: 20px;
  text-align: center;
}
.yan {
  color: #515a6e;
  font-size: 16px;
  font-weight: normal;
}
</style>

