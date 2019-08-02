<template>
  <div>
    <form v-if="!isReg">
      <div>用户名:</div>
      <input type="text" v-model="name">
      <div>密码:</div>
      <input type="password" v-model="password">
      <button type="button" @click="login()">登录</button>
      <button type="button" @click="reg()">注册</button>
    </form>
    <form v-else>
      <div>用户名:</div>
      <input type="text" v-model="name">
      <div>密码:</div>
      <input type="password" v-model="password">
      <div>再次输入密码:</div>
      <input type="password" v-model="repeat">
      <button type="button" @click="addUser()">确定</button>
      <button type="button" @click="cancel()">取消</button>
    </form>
  </div>
</template>
 
<script>
import HelloWorld from '@/components/HelloWorld'
import axios from 'axios'
import qs from 'qs'
export default {

  data() {
    return {
      isReg: false,
      name: "",
      password: "",
      repeat: ""
    };
  },
  methods: {
    login() {  
       // 组件中使用get方法
        this.axios.get('api/user/login', {
                params: {
                   name: this.name,
            password: this.password
                }
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            }) 
    },
    reg() {
      this.isReg = true;
    },
    cancel() {
      this.isReg = false;
    },
    addUser() {
      var user={name: this.name,
            password: this.password};     
            user =qs.stringify(user);   
      //验证两次输入密码是否一致
      if (this.password === this.repeat) {
        var url='api/user/addUser'   
        //组件中使用post方法
          axios.post(url, 
          {data:user}
           )
          .then(res => {
                    console.log("111")
          }, res => {
            // 错误回调
                    console.log("222")
          })
     

      

      } else {
        alert("两次密码不一致");
      }
    }
  }
};
</script>
 
<style scoped>
</style>