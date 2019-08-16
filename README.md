## 微信网页授权 demo

## 介绍

用于调用微信 api 获取授权用户信息的 demo,用于微信网页需要授权的场景，本 demo 只是演示获取用户信息流程，具体使用要根据自己项目来实现，可以基于此编写一个 node 中间件来处理授权。其中 index.js 为使用 ES6 的 async,await 解决异步回调地狱问题的优化，使用 ES6 语法好代码清晰很多。

## 使用方法

### 1. 微信测试号申请

因为是微信授权，所以必须要在微信环境下使用，首先安装微信开发者工具，然后在[微信公众平台](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login)申请接口测试号,登陆后可以查看自己的 appId 和 appsecret 信息，将 JS 接口安全域名修改为 127.0.0.1:8800 即本机地址，将体验接口权限表里的网页服务的网页授权获取用户基本信息修改为 127.0.0.1:8800，最后扫码关注该测试号即可,如下图所示
![](https://github.com/Xuhengfeng/wxAuthorize/tree/master/images/appId信息.PNG)

![](https://github.com/Xuhengfeng/wxAuthorize/tree/master/images/修改回调页面域名.PNG)

![](https://github.com/Xuhengfeng/wxAuthorize/tree/master/images/关注测试号.PNG)

### 2. 启动项目

```
npm install
node index
微信开发者工具输入： localhost:8800/login
```

### 3. 运行

<p>进入页面后点击按钮跳转到授权页面


![](https://github.com/Xuhengfeng/wxAuthorize/tree/master/images/微信授权页面.PNG)<br />
点击确认登陆即可获取个人信息

![](https://github.com/Xuhengfeng/wxAuthorize/tree/master/images/个人信息.PNG)</p>

### 发送模板消息前提条件

#### 1.必须是域名，且端口必须是 80 端口，本地开发不能设置 80 端口， 但是可以利用花生壳进行免费的内网穿透(将内网映射成外网)变成 80 端口

#### 2.新建模板消息，得到模板消息 id

#### 参考博客地址 https://blog.csdn.net/lihefei_coder/article/details/81907638
