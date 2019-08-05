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
       <div>真实姓名:</div>
       <input type="text" v-model="trueName">

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
      repeat: "",
      trueName:""
    };
  },
  methods: {
    login() {  
       // 组件中使用get方法
       var url='api/user/login';
        axios({ method: "get",
                        url: url,
                        params: {
                          name: this.name,
                          password: this.password,          
                          }
                        }                                  
            ).then((response) => {
               console.log(response)
                this.$message({ message: "登录成功", type: 'success' });
                    //将后台返回的token和user存在store
                this.$store.commit('SET_TOKEN', res.data.data.token)
                this.$store.commit('GET_USER', JSON.stringify(res.data.data))
               if(response.data.data){ this.$router.push({name:'HelloWorld',params:{name: this.name}});}
               else{
                 this.password="";
                 alert("账号或者密码出错,请重新输入")
               }
             
               
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
            password: this.password,
             truename:this.trueName};     
            
      //验证两次输入密码是否一致
      if (this.password === this.repeat) {
        var url='api/user/addUser'   
        //组件中使用post方法
          axios(
          {
                        method: "POST",
                        url: url,
                        data:user,
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8',  //指定消息格式
                        },
                    }
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