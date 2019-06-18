FROM nginx:alpine
COPY default.conf /etc/nginx/conf.d
COPY web /usr/share/nginx/html
COPY Staticfile /usr/share/nginx/html
ADD run.sh run.sh
RUN chmod +x run.sh
CMD ./run.sh
CMD ["nginx", "-g", "daemon off;"]