FROM node:lts as compile-image

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli
RUN npm install

COPY . .

EXPOSE 443

CMD [ "ng", "serve", "--host", "0.0.0.0", "--port", "443"]