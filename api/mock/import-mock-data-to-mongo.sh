### ➜  superior-prospects git:(monolith) ✗ docker exec -it f6 sh
### # ls
### bin  boot  data  dev  docker-entrypoint-initdb.d  etc  home  js-yaml.js  lib  media  mnt  mock	opt  proc  root  run  sbin  srv  sys  tmp  usr	var
### # cd mock
### # ls
### import-mock-data-to-mongo.sh  locations.json  media.json  properties.json  updates.json  users.json
### # ./import-mock-data-to-mongo.sh

mongoimport --host mongo:27017 --db sp --collection users      --type json --file /mock/users.json      --jsonArray --drop
mongoimport --host mongo:27017 --db sp --collection media      --type json --file /mock/media.json      --jsonArray --drop
mongoimport --host mongo:27017 --db sp --collection updates    --type json --file /mock/updates.json    --jsonArray --drop
mongoimport --host mongo:27017 --db sp --collection properties --type json --file /mock/properties.json --jsonArray --drop
mongoimport --host mongo:27017 --db sp --collection locations  --type json --file /mock/locations.json  --jsonArray --drop