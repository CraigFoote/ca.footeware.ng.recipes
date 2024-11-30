FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist/ca.footeware.ng.recipes /usr/share/nginx/html/browser
RUN mkdir -p /etc/letsencrypt/live/footeware.ca
EXPOSE 9001