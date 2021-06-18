#!/bin/bash

echo -e "rm -rf node_modules\n"
rm -rf node_modules

echo -e "yarn --production\n"
yarn --production

echo "fun deploy -y"
fun deploy -y
