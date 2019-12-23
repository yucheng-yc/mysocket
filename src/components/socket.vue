<template>
    <div class="socket"></div>
</template>
<script>
import {mapMutation} from "vuex";
import func from '../../vue-temp/vue-editor-bridge';
export default {
    data(){
        return {
            conUrl:'ws:127.0.0.1:3030'
        }
    },
    methods:{
       ...mapMutation["connect","open","message","send"]
    },
    created(){
        this.connect(new WebSocket(this.conUrl));
    },
    mounted(){
        // 打开链接
        this.open(()=>{
            this.send({code:1,data:{id:10081,pwd:'4654'}});
        })
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