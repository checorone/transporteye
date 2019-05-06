echo "********************************************************"
echo "Waiting for the database server to start on port $DATABASE_PORT"
echo "********************************************************"
while ! `nc -z database $DATABASE_PORT`; do sleep 3; done
echo "******** Database Server has started "

echo "********************************************************"
echo "Starting Authentication Service                           "
echo "********************************************************"
java -Djava.security.egd=file:/dev/./urandom -Dserver.port=8901  \
     -Dspring.datasource.url=jdbc:postgresql://localhost:5432/postgres \
     -Dspring.profiles.active=default                            \
     -jar authentication-service-0.0.1-SNAPSHOT.jar
