# ng.recipes

## Build in VS Code

1. ng build
1. docker build -t ng.recipes .
1. docker tag ng.recipes craigfoote/ng.recipes:latest
1. docker push craigfoote/ng.recipes:latest

## Deploy on Server

1. docker pull craigfoote/ng.recipes
1. docker ps -a #to get container id of ng.recipes container
1. docker stop [containerId]
1. docker rm [containerId]
1. docker run --name ng.recipes -p 9001:80 -d --restart unless-stopped --memory="1g" --memory-swap="2g" -t craigfoote/ng.recipes:latest
