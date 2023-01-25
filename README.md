# ca.footeware.ng.recipes

1. ng build
1. docker build -t ca.footeware.ng.recipes .
1. docker tag ca.footeware.ng.recipes craigfoote/ca.footeware.ng.recipes:latest
1. docker push craigfoote/ca.footeware.ng.recipes:latest
1. docker run 
--name ca.footeware.ng.recipes 
-p 9001:80 
-d 
--restart unless-stopped 
--memory="1g" 
--memory-swap="2g" 
-t craigfoote/ca.footeware.ng.recipes:latest