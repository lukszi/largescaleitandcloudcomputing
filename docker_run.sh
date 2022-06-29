cd database
docker build -t db_chat ./chat
docker build -t db_message ./message
docker build -t db_user ./user
docker build -t database .
cd ../dataService
mvn clean package -DskipTests
docker build -t mimir .
cd ..
docker-compose up -d