FROM node:latest AS build

RUN mkdir -p /app
COPY package.json /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build:ssr


FROM nginx AS rommanel-users
COPY --from=build /app/dist/rommanel-users/browser/ /usr/share/nginx/html
COPY /conf/angular-server.nginx.conf /etc/nginx/nginx.conf


FROM node:latest AS ssr-server
COPY --from=build /app/dist /app/dist/
COPY package.json /app/package.json
WORKDIR /app
EXPOSE 4000
CMD npm run serve:ssr
