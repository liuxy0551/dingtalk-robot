#!/bin/bash

echo "start build web\n"
cd app/public/web
yarn build
cd ../../../

echo -e "\nyarn --production\n"
yarn --production

echo "\nfun deploy -y\n"
fun deploy -y

echo "yarn"
yarn
