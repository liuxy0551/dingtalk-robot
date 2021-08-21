#!/bin/bash

echo -e "yarn --production\n"
yarn --production

echo "fun deploy -y"
fun deploy -y

echo "yarn"
yarn
