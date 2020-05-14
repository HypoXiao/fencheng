<template>
<div class="login">
    <h2>{{title}}</h2>
    <Form ref="formData" :model="formData" :rules="ruleInline">
        <FormItem prop="user">
            <Input type="text" v-model="formData.username" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formData.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" long @click="handleSubmit('formData')"  :loading="loading">登陆</Button>
        </FormItem>
    </Form>
  </div>
</template>
<script>
import { API_user } from "../model/user"
import { mapState } from "vuex"

export default {
  data() {
    return {
      formData: {
        username: "",
        password: ""
      },
      ruleInline: {
        username: [{ required: true, message: "请填写用户名", trigger: "blur" }],
        password: [{ required: true, message: "请填写密码", trigger: "blur" }]
      },
      loading: false
    };
  },
  computed: mapState(["title"]),

  mounted() {
    window.addEventListener("keyup", this.enterSubmit);
  },
  destroyed() {
    window.removeEventListener("keyup", this.enterSubmit);
  },
  methods: {
    enterSubmit(e) {
      const code = e.charCode || e.keyCode;
      if (code === 13) {
        this.handleSubmit("formData");
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          return
        }

        this.loading = true

        API_user.login(this.formData)
          .then(data => {
            this.loading = false
             this.$Message.success('登陆成功');
            setTimeout(() => {
              let { redirect } = this.$route.query;
              if (redirect) {
                this.$router.push(redirect);
              } else {
                this.$router.push("/");
              }
            }, 300);
          })
          .catch(({ code, message }) => {
            this.loading = false

            if (code === 30001) {
              this.$Message.error('用户名或密码错误')
            } else {
              this.$Message.error('系统出错了')
            }
          })
      })
    }
  }
};
</script>
<style>
.login {
  width: 400px;
  margin: 200px auto;
}
.login h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>

