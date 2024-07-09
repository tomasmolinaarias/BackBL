# container docker
    docker run --name GestionSistema -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=biblioteca -p 3306:3306 -d mysql:latest
