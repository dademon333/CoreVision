FROM nginx:1.21-alpine

COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80