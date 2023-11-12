**Run project:**
***----------- New Deployment Method ----------------***

`bash ./deploy/deploy.sh --m test --v $your_verion --b false/true`

set `--b true, if you want to build docker.`

IMPORTANT! Docker building usually takes long. You don't have to build it if you changed nothing on MJ proxy.

***----------- Old Deployment Method (Don't run it unless you konw what you are doing) ----------***

`mvn spring-boot:run`

Change the callback ip of application-dev.yml to your own.

**Pack up project (skip tests):**

1. Build frontend (if necessary):

   Test env: `yarn --cwd ./web build:test`
   Prod env: `yarn --cwd ./web build:prod`

2. Build whole package:

   `mvn package -Dmaven.test.skip`

**Deploy project:**

1. Send the .jar to server:
   Test env:
   `scp -r thirdparty/ target/main-3.0.0.jar root@43.134.83.189:/root`
   Prod env:
   `scp -r thirdparty/ target/main-3.0.0.jar root@43.156.132.114:/root`
   Set up SSH connection to the server before you run.

2. Run project server:
   Test env:
   `nohup java -jar main-3.0.0.jar --spring.profiles.active=test > be.log 2>&1 &`
   Prod env:
   `nohup java -jar main-3.0.0.jar --spring.profiles.active=prod > be.log 2>&1 &`
3. Run MJ server:
   `docker run -d --name midjourney-proxy \
   -p 8081:8080 \
   -v $(pwd)"/mjconfig":/home/spring/config \
   tiangeng66/midjourney-proxy`
   3.1. Build the server if you've changed something in proxy:
   `cd midjourney-proxy
   docker buildx build --platform linux/amd64,linux/arm64 -t tiangeng66/midjourney-proxy --push .
   docker push tiangeng66/midjourney-proxy`
4. IMPORTANT! Submit CDN pre-deploy before Prod env's
   publish at https://console.cloud.tencent.com/cdn/refresh?tab=prefetch.
   Otherwise, users will not get the most updated version of page on time, and it might produce errors!
   Check the pre-deploy files at web/refreshUrl.txt. Please note that file names of web/refreshUrl.txt is not always up
   to date. Please check network in Chrome dev tool to update the file names. 

