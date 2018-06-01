#!/bin/bash

# Get Ubuntu machine ready for hn-dot-tech
# update and grab required software
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/testing multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
sudo apt update -y
sudo apt upgrade -y

# install softwarez
sudo apt install -y build-essential git tmux wget mongodb-org nodejs
npm install -g grunt jshint pm2
sudo systemctl start mongod
sudo systemctl enable mongod

# clone our repo and install all the node modules
git clone https://github.com/dataSmugglers/hn-dot-tech
cd ./hn-dot-tech
npm install

# start up node
pm2 start ./server/hn_api_requests/apiRequests.js
pm2 start ./bin/www

# need to start up nginx
