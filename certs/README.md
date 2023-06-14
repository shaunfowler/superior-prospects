Add certs here, named as:
* `server.crt`
* `server.key`

### Self-signed:

cd certs/local1
sudo openssl genrsa -out local1.key 2048
sudo openssl req -new -x509 -key local1.key -out local1.crt -days 3650 -subj /CN=local1.com
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain local1.crt
cp local1.crt ../server.crt && cp local1.key ../server.key
..

➜  certs git:(master) ✗ ll
total 24
-rw-r--r--  1 shaun  staff   360B Jun 13 18:52 README.md
drwxr-xr-x  4 shaun  staff   128B Jun 13 19:26 local1
-rw-r--r--  1 shaun  staff   981B Jun 13 19:27 server.crt
-rw-r--r--  1 shaun  staff   1.6K Jun 13 19:27 server.key