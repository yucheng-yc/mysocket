<template>
  <div class="home">
    <div class="left">
      <mean/>
    </div>
    <div class="center">
      <list/>
    </div>
    <div class="right">
      <chat/>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
import chat from "@/components/chat";
import list from "@/components/list";
import mean from "@/components/mean";
export default {
  name: 'home',
  components:{
    chat,
    list,
    mean
  },
  data(){
    return {
    }
  },
  methods:{
    ...mapMutations(["createClient","message","send"])
  },
  created(){
    // 当软件启动时自动建立连接
    this.createClient({
      client:new WebSocket("ws://172.16.139.1:3300"),
      open:()=>{
        console.log('打开链接成功');
      }
    });
    // this.send({code:1,data:{id:10081,pwd:'4654'}});
    this.message((message)=>{
        message=JSON.parse(message.data);
        console.log(message)
        switch(message.code){
            // 当501表示登录成功
            case 501:
                console.log('登录成功');
                // 发送请求用来获取在线人员列表
                this.send({code:2,data:{}})
                break;
            case 502:
            console.log('在线列表返回');
            console.log(message);

        }

        })
  }
}
</script>

<style scoped>
.home {
  display: flex;
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

}
.left,.center,.right {
  position: relative;
}
.left {
  min-width: 60px;
  background-color: rgb(45,42,41);
}
.center {
  min-width: 250px;
  background-color: rgb(221, 221, 222);
}
.right {
  flex-grow: 1;
  background-color: rgb(245, 245, 245);
  min-width: 400px;
}
</style>
