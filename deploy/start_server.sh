echo "Server deploy starts!"
set -e
while getopts "m:v:d:" opt; do
  case "$opt" in
  m) mode="$OPTARG" ;;
  v) version="$OPTARG" ;;
  d) docker_version="$OPTARG" ;;
  esac
done

if [ -z "$version" ]; then
  echo "ERROR! Please input the version number for package. E.g.: 3.0.0"
  exit
fi

if ! [ "$mode" == "test" ] && ! [ "$mode" == "prod" ]; then
  echo "ERROR! Only support test and prod mode."
  exit
fi

sysctl_start() {
  systemctl is-active --quiet "$1"
  code=$?
  if [ "$code" == 0 ]; then
    echo "$1 is active."
    return 0
  else
    echo "$1 is inactive. Will start $1."
    systemctl start redis
    echo "Start $1 is done."
    return 1
  fi
}

stop_container() {
  echo "name: "$1
  container_id=$(docker ps -a | awk "/$1/ {print \$1}")
  if [ -z "$container_id" ]; then
    echo "Container does not exists."
    return
  fi
  docker rm -f "$container_id"
  echo "Removed container $container_id"
}
mkdir -p meta
# Start redis
systemctl start redis

## Start MJ docker service
systemctl start docker
container_name="midjourney-proxy"
stop_container $container_name
echo "Starting docker $container_name"
container_id=$(docker run -d --name $container_name \
  -p 8081:8080 \
  -v "$(pwd)/mjconfig/$mode":/home/spring/config \
  tiangeng66/midjourney-proxy:"$docker_version")
echo "Current container_id: $container_id"
docker_log_path=$(docker inspect "$container_name" --format '{{.LogPath}}')
#Track log of MJ server
tail -fn0 $docker_log_path |
  while read line; do
    echo $line
    if [[ $line == *"Connected to websocket"* ]]; then
      echo "MJ docker launching was successful!"
      pkill -P $$ tail
      break
    fi
  done

# Start server
pid=$(ps -ef | grep main | grep -v grep | awk '{print $2}')
echo "Start checking $pid aliveness."
while [[ -n $pid ]]; do
  kill "$pid"
  echo "Killing succeeded!"
  echo "$pid is alive. Will recheck after 3s."
  sleep 3
  pid=$(ps -ef | grep main | grep -v grep | awk '{print $2}')
done
echo "$pid was dead!"
sleep 2 # In case the port is not fully released.
echo "Start launching server."
rm be.log
nohup java -Dfile.encoding=UTF-8 -jar main-"$version".jar --spring.profiles.active="$mode" >>be.log 2>&1 &
echo $! >nohup_pid.txt
sleep 2
# track the log file
tail -fn0 be.log |
  while read line; do
    echo $line
    if [ "$line" = "Let's go! TEAM!" ]; then
      echo "Java server launching was successful!"
      pkill -P $$ tail
      break
    fi
  done

echo "Deploy was successful. Congrats!"
