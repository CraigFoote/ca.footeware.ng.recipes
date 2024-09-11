FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/ca.footeware.ng.recipes /usr/share/nginx/html
EXPOSE 9001