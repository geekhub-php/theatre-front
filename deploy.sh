#!/bin/bash
set -euo
SSH_HOST="deploybot@104.248.253.61"

cp ./deploy/branch.conf ./dist/
cp ./deploy/index.html ./dist/
cd dist/ && tar -zcvf ../dist.tar.gz * && cd -

ssh -i ./deploy/.ssh/staging $SSH_HOST "pwd"
scp -i ./deploy/.ssh/staging dist.tar.gz $SSH_HOST:~/theatre-front/$BRANCH.tar.gz
ssh $SSH_HOST "rm -rf ~/theatre-front/$BRANCH && mkdir ~/theatre-front/$BRANCH"
ssh $SSH_HOST "tar -xf ~/theatre-front/$BRANCH.tar.gz -C ~/theatre-front/$BRANCH"
ssh $SSH_HOST "sed -e 's/{{branch}}/$BRANCH/g' ~/theatre-front/$BRANCH/branch.conf > ~/nginxconf/$BRANCH.conf"

echo "Deployed to $DOMAIN"