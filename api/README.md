# Superior Prospects API

[![CircleCI](https://circleci.com/gh/shaunfowler/superior-prospects-api/tree/master.svg?style=svg)](https://circleci.com/gh/shaunfowler/superior-prospects-api/tree/master)

The backend API for http://superiorprospects.com.

### Build

To build the image, run:

```
npm run build:image
```

or

```
docker build -t shaunfowler/superior-prospects-api:latest -f Dockerfile .
```

### Local Development

```diff
diff --git a/docker-compose.yml b/docker-compose.yml
index d056a0c..efba7f9 100644
--- a/docker-compose.yml
+++ b/docker-compose.yml
@@ -19,9 +19,11 @@ services:
                 - "traefik.docker.network=superior_prospects_default"

     api:
         image: shaunfowler/superior-prospects-api:latest
+        command: npm run nodemon
         volumes:
             - ./persistence/uploads:/usr/app/uploads
+            - ./packages/superior-prospects-api/:/usr/app
         secrets:
             - sp_client_id
             - sp_client_secret
```