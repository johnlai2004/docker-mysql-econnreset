npm install;
docker swarm init;
docker network create --driver overlay app-network;
docker stack deploy -c docker-compose.yml testconnection;
