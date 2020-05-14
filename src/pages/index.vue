<template>
  <div class="index">
    <v-header></v-header>
    <div class="index-main" :style="{ height: menuHeight + 'px' }">
      <Menu :active-name="menuActiveName" style="height: 100%; min-width: 200px;" @on-select="selectMenu">
        <MenuItem v-for="item in menu" :name="item.name">
          {{item.title}}
        </MenuItem>
      </Menu>
      <div class="index-content" >
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import vHeader from '@/components/header'

export default {
  data () {
    return {
      menuHeight: window.innerHeight - 50,
      menuActiveName: '',
      menu: [
        {
          name: 'statistics',
          title: '推广用户数和今日金额统计'
        },
        // {
        //   name: 'record',
        //   title: '推广用户付费购卡记录'
        // },
        {
          name: 'register',
          title: '登记但尚未购卡用户'
        }
      ]
    }
  },
  created() {
    this.menuActiveName = this.$route.name
  },
  methods: {
    selectMenu(name) {
      if(name === this.menuActiveName) {
        return
      }
      this.menuActiveName = name
      this.$router.push(`/${name === 'statistics' ? '' : name}`)
      // console.log(name)
    }
  },
  components: {
    vHeader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head {
  display: flex;
  height: 50px;
  background-color: #0d2640;
  color: #fff;
  padding: 0 50px;
}
.head h3 {
  line-height: 50px;
}
.index-main {
  display: flex;
}
.index-content {
  flex: 1;
  padding: 20px;
}
</style>
