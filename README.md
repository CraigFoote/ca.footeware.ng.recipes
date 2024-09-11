# ng.recipes

<style>
    code {
        background-color: transparent;
        color: #ff9154
    }
</style>

## Preparation

1. ng update
1. `docker network create recipes-network`
1. `sudo mkdir -p /opt/mongodb/data`
1. `sudo chmod 777 /opt/mongodb/data`
1. `docker run -d --name mongodb -p 27017:27017 --network recipes-network -v /opt/mongodb/data:/data/db mongo:latest`
1. populate mongodb using Mongo Compass
1. `docker run -d --name rest.recipes -p 9000:9000 --network recipes-network -v /opt/rest.recipes/logs:/opt/rest.recipes/logs -t craigfoote/rest.recipes:latest`
1. `curl -v -u craig -i 'http://localhost:9000/recipes?pageNumber=0&pageSize=10'`

## Development

1. change app version number in `package.json`
1. `ng build`
1. `ng serve`
1. <http://localhost:4200>
1. `docker build -t ng.recipes .`
1. `docker run -d --name ng.recipes -p 9001:9001 --network recipes-network -t ng.recipes`
1. <http://localhost:9001>

## Deployment

1. commit changes to git and create tag [version]
1. `docker tag ng.recipes craigfoote/ng.recipes:[version]`
1. `docker tag ng.recipes craigfoote/ng.recipes:latest`
1. `docker push craigfoote/ng.recipes:[version]`
1. `docker push craigfoote/ng.recipes:latest`
