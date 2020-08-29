#!/bin/bash
echo "Starting spring boot server"
cd mysolar
mvn spring-boot:run
cd ..
echo "Starting react application"
cd mysolar_client
yarn start

