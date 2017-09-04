mongo locations --eval "db.dropDatabase()"
mongo media --eval "db.dropDatabase()"
mongo updates --eval "db.dropDatabase()"
mongo properties --eval "db.dropDatabase()"

mongoimport --host sp_mongo --db media --collection media --type json --file /tmp/media.json
mongoimport --host sp_mongo --db updates --collection updates --type json --file /tmp/updates.json
mongoimport --host sp_mongo --db properties --collection properties --type json --file /tmp/properties.json
mongoimport --host sp_mongo --db locations --collection locations --type json --file /tmp/locations.json