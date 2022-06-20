cd database
docker build -t database .
cd ../dataService
mvn clean package -DskipTests
docker build -t mimir .
cd ..
docker-compose up -d