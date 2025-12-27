## dingtalk-robot 钉钉群机器人

### 钉小弟

&emsp;&emsp;“钉小弟” 是名字，可以发送消息到指定钉钉群，效果如下：

![](https://images-hosting.liuxianyu.cn/posts/aliyun-function-compute/14.gif)

### 启动项目

&emsp;&emsp;参考 <a href="https://liuxianyu.cn/article/aliyun-function-compute.html#%E4%B8%89-%E5%AE%9E%E8%B7%B5" target="_black">函数计算的介绍与实践</a>。

### 机器人设置说明

&emsp;&emsp;钉钉开发文档：<a href="https://developers.dingtalk.com/document/robots/custom-robot-access" target="_black">自定义机器人接入</a>、<a href="https://developers.dingtalk.com/document/robots/custom-robot-access/title-72m-8ag-pqw" target="_black">消息类型及数据格式</a>。

&emsp;&emsp;这个项目涉及钉钉群机器人的安全设置都是`加签`，签名实现可参照 <a href="https://github.com/liuxy0551/dingtalk-robot/blob/master/app/utils/index.js#L6" target="_black">getSignUrl</a>。


### 项目启动

```
npm i
npm run dev
```

浏览器打开：http://localhost:3055

### 生成版本号

```
npm run release -r 1.9.3
```


### 联调

ngrok: https://dashboard.ngrok.com/get-started/setup/macos

先在 http://at-dingtalk-robot.liuxianyu.cn/admin#/robot/index 页面将机器人的推送地址修改为本地 ngrok 转发的地址，艾特机器人时钉钉会将消息推送到本地 ngrok 地址，即可本地调试 dingtalk-robot。


### 项目部署（最新版，docker 部署）

前端页面有变化时先构建前端静态文件，服务端会托管：

```
npm run build:web
```

构建镜像

```
npm run build
```

服务端运行

```
docker run -d -p 3055:3055 --name dingtalk-robot liuxy0551/dingtalk-robot:latest
```



### 项目部署（新，已暂停使用阿里云函数计算）

- [安装Serverless Devs工具及依赖](https://help.aliyun.com/zh/functioncompute/fc-2-0/developer-reference/install-serverless-devs-and-docker)
- [配置Serverless Devs](https://help.aliyun.com/zh/functioncompute/fc-2-0/developer-reference/configure-serverless-devs)

```
s deploy
```

### 项目部署（旧，已废弃）

```
yarn global add @alicloud/fun
```

先将 node_modules 删除，执行以下命令将代码上传，然后在 web IED 的终端执行 `chmod 777 bootstrap`，yarn 安装依赖后部署即可
```
fun deploy -y
```
