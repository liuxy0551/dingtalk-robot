#!/bin/bash

echo -e "rm -rf node_modules\n"
rm -rf node_modules

echo -e "npm i --production\n"
npm i --production

echo "fun deploy -y"
fun deploy -y
