# ca.footeware.ng.recipes

1. ng build
1. docker build -t ng.recipes .
1. docker tag ng.recipes craigfoote/ng.recipes:latest
1. docker push craigfoote/ng.recipes:latest
1. (on server) docker run 
--name ng.recipes 
-p 9001:80 
-d 
--restart unless-stopped 
--memory="1g" 
--memory-swap="2g" 
-t craigfoote/ng.recipes:latest