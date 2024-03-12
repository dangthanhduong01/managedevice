FROM node:lts-alpine
# make the 'app' folder the current working directory
RUN mkdir /frontend
WORKDIR /frontend

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./


# install project dependencies
RUN yarn install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# Ensure vue-cli-service has execute permission
RUN chmod +x ./node_modules/.bin/vue-cli-service

# build app for production with minification
RUN yarn build

EXPOSE 8080
CMD [ "yarn", "serve" ]