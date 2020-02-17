# superior-prospects

This is a monorepo for [Superior Prospects](https://superiorprospects.com).

- [superior-prospects-client](packages/superior-prospects-client)
- [superior-prospects-api](packages/superior-prospects-api)

## Deployment

### Create secrets

Create two docker secrets called `sp_client_id` and `sp_client_secret`. These, respectively, represent the client ID and secret for [Google](https://console.cloud.google.com/apis/credentials).

```
 echo "xxx" | docker secret create sp_client_id -
 echo "xxx" | docker secret create sp_client_secret -
```

### Deploy the stack

#### Production

```
./deploy.sh
```

#### Local development

To deploy the stack in swarm, run:

```
docker swarm init
DOMAIN=localhost docker stack deploy -c docker-compose.yml superior_prospects
```

#### Mock data

To seed mongo with mock data, run:

```
docker stack deploy -c docker-compose.seed.yml superior_prospects
```

To add an email or user ID to the whitelist:

```
docker exec -it <CONTAINER_ID_OF_MONGO> sh
mongo
use sp
db.users.insert({"email": "id or email"})
```
