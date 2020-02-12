# superior-prospects

This is a monorepo for [Superior Prospects](http://superiorprospects.com).

- [superior-prospects-client](packages/superior-prospects-client)
- [superior-prospects-api](packages/superior-prospects-client)

## Deployment

### Create secrets

Create two docker secrets called `sp_client_id` and `sp_client_secret`. These, respectively, represent the client ID and secret for [Facebook](https://developers.facebook.com/).

### Deploy the stack

## Local development

To deploy the stack in swarm, run:

```
docker swarm init
docker stack deploy -c docker-compose.yml superior_prospects
```

## Production

```
./deploy.sh
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
