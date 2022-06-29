cd app/keys || exit 1
ssh-keygen -t rsa -N '' -b 4096 -m PEM -f jwtRS256.key <<< y
ssh-keygen -e -m PEM -f jwtRS256.key > jwtRS256.key.pub