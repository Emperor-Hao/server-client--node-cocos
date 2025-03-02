'use strict';
var express = require("express");
var path = require("path");
var app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT  || 3000

const cors = require('cors');

// 使用 cors 中间件，允许所有来源的请求
app.use(cors());

app.listen(PORT,(err) => {
    if(err)
    {
       console.log("连接出错！");
    }
    console.log("连接正常","http://127.0.0.1:" + PORT);
    } );

    
app.use("/",express.static(path.join(process.cwd(),"www_root")));
app.use(bodyParser.json());

var fs = require("fs");
app.put("/UploadImgFile",function(req,res){
    var fd = fs.openSync("./upload/unity2022.gif","w");
    req.on("data",function(data){
        fs.write(fd,data,0,data.length,function(){});
    });
    req.on("end",function(){
        res.send("UploadSucess!");
        fs.close(fd,function(){});
    });
});

// 处理POST请求并接收参数
app.post('/uploadDataResult', function (req, res) {
    // 获取请求体中的数据
    const name = req.body.name;
    const age = req.body.age;

    //写一个返回值的JSON响应给客户端
    res.json({
        message: 'Received data successfully',
        data: {
            name: name,
            age: age
        }
    });

    // 打印接收到的数据
    console.log(`Received data: name=${name}, age=${age}`);

    // // 返回响应给客户端
    // res.send(`Hello Unity, you sent name=${name} and age=${age}`);
});

//处理get请求并接收数据
app.get("/submitData",function(req,res){
    res.setHeader('Content-Type', 'text/plain');
    const id = req.query.Id;
    console.log(id);
    res.send(`Hello Unity, you sent Id=${id}`);
    res.send("hello unity",id);
});

//处理get请求并接收数据
app.get("/fetch",function(req,res){
    res.setHeader('Content-Type', 'text/plain');
    //写一个json
    const json = {
        name:"cocos",
        age:18
    }
    res.send(json);
});