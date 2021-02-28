FROM node:10.13.0-alpine AS builder
COPY . /usr/src/
WORKDIR /usr/src
RUN rm -rf node_modules
RUN npm install
RUN npm run build

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/public /usr/share/nginx/html