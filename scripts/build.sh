#!/bin/sh

# 检查环境、安装依赖
npm run checkEnv
npm i

# amd64
docker buildx build --platform linux/amd64 -f Dockerfile -t liuxy0551/dingtalk-robot .

docker tag liuxy0551/dingtalk-robot registry.cn-hangzhou.aliyuncs.com/liuxy0551/dingtalk-robot:latest
docker push registry.cn-hangzhou.aliyuncs.com/liuxy0551/dingtalk-robot:latest
