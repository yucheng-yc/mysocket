const express=require('express')();
express.listen(8078,()=>{
    console.log('server is running')
})

// 在线的数组
const onlineArr=[];
const WebSocket=require("ws");
const ws=new WebSocket.Server({
    port:3300
})
ws.on('connection',(client)=>{
    client.on('message',(message)=>{
        message=JSON.parse(message);
        switch(message.code) {
            // 1为登录操作
            case 1:
                // 这里进行数据库查询操作
                console.log(message.data)
                // 如果成功 加入在线列表
                onlineArr.push({[message.data.id]:client})
                client.send(JSON.stringify({code:501,data:'success'}))
                break;
            // 获取好友列表操作
            case 2:
                client.send(JSON.stringify({code:502,data:{onlineArr}}))
                break;
            case 3:
                client.send(JSON.stringify({code:502,data:{onlineArr}}))
                break;
            // 其他操作
            default:
                break;
        }
    })
    
})
ws.on('listening',(e)=>{
    console.log('ws is listening');
})
ws.on('error',()=>{
    process.exit(1);
})
