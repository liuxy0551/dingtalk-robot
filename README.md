## dingtalk-robot 钉钉群机器人

### 钉小弟

&emsp;&emsp;“钉小弟” 是名字，可以发送消息到指定钉钉群，效果如下：

![](https://liuxy0551.gitee.io/image-hosting/posts/aliyun-function-compute/14.gif)

### 启动项目

&emsp;&emsp;参考 <a href="https://liuxianyu.cn/article/aliyun-function-compute.html#%E4%B8%89-%E5%AE%9E%E8%B7%B5" target="_black">函数计算的介绍与实践</a>。

### 机器人设置说明

&emsp;&emsp;钉钉开发文档：<a href="https://developers.dingtalk.com/document/robots/custom-robot-access" target="_black">自定义机器人接入</a>、<a href="https://developers.dingtalk.com/document/robots/custom-robot-access/title-72m-8ag-pqw" target="_black">消息类型及数据格式</a>。

&emsp;&emsp;这个项目涉及钉钉群机器人的安全设置都是`加签`，签名实现可参照 <a href="https://github.com/liuxy0551/dingtalk-robot/blob/master/app/utils/index.js#L6" target="_black">getSignUrl</a>。


### 项目启动

```
yarn
yarn dev
```

浏览器打开：http://localhost:9003

### 项目部署

```
yarn deploy
```
