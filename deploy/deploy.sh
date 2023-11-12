#!/usr/bin/env bash
set -e
while getopts "m:v:b:d:;" opt; do
  case "$opt" in
  v) version="$OPTARG" ;;
  esac
done
if [ -z "$version" ]; then
  echo "ERROR! Please input the version number for package. E.g.: 3.0.0"
  exit
fi
# Build frontend
yarn --cwd ./web docs:build
mv ./web/docs-dist/* ./src/main/resources/public
rm -r ./web/docs-dist/
## Build backend
mvn package -Dmaven.test.skip

ip="43.134.83.189"

scp -r thirdparty/ target/blog-"$version".jar deploy/start_server.sh root@"$ip":/root
# shellcheck disable=SC2029
ssh root@"$ip" "bash start_server.sh -v $version && exit"
echo "Check your result at https://$ip:443. Update CDN resources at https://console.cloud.tencent.com/cdn/refresh?tab=dir if the check passed."
