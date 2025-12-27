#!/bin/bash

# 项目部署（旧，已废弃）

yarn

echo "start build web\n"
cd app/public/web
yarn
yarn build
cd ../../../

echo -e "\nyarn --production\n"
yarn --production

echo "\nfun deploy -y\n"
fun deploy -y

echo "yarn"
yarn
