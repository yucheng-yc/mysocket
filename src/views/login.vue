<template>
    <div class="login">
        <Layout class="content">
            <h2 class="title">登录</h2>
            <Content>
                <div>
                    <Divider orientation="left">账号</Divider>
                    <Input placeholder="请输入账号" autofocus v-model="userid" clearable/>
                </div>
                <div>
                    <Divider orientation="left">密码</Divider>
                    <Input type="password" password placeholder="请输入密码" v-model="userpwd" />
                </div>
                <br>
                <div>
                    <Button type="success" long @click="loginBtn">
                        <span v-if="btnTG">登录中...</span>
                        <span v-else>登录</span>
                    </Button>
                </div>
            </Content>
        </Layout>
    </div>
</template>

<style scoped>
    .content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 8rem 2rem;
    }
    .title {
        text-align:center;
        padding: .4rem 0;
    }
</style>


<script>
import {mapMutations} from "vuex";
export default {
    data(){
        return {
            userid:null,
            userpwd:null,
            btnTG:false
        }
    },
    methods:{
        ...mapMutations(["createClient","message","send"]),
        loginBtn(){
            if(this.userid&&this.userpwd){
                this.btnTG=true;
                new Promise((resolve,reject)=>{
                try {
                        this.send({code:1,data:{id:this.userid,pwd:this.userpwd}});
                        resolve();
                }
                catch(e){
                    reject()
                }
                })
                .then(()=>{
                    this.message((message)=>{
                        message=JSON.parse(message.data);
                        if(message.code===501){
                            this.$Message.success('登录成功');
                            this.$router.push('/home');
                        }else{
                            this.btnTG=false;
                            this.$Message.error('登录失败')
                        }
                    })
                }) 
            }else{
                this.$Message['error']({
                    background: true,
                    content: '账号或密码不为空'
                });
            }
        }
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
