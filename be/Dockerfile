FROM node:lts-alpine

RUN mkdir -p /backend
WORKDIR /backend

COPY package*.json ./


RUN npm install


COPY . .

RUN npm install -g nodemon

# RUN chmod +x /node_modules/.bin/nodemon

EXPOSE 3031

CMD [ "npm", "start" ]
