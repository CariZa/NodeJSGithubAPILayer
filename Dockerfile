# specify the node base image with your desired version node:<version>
FROM node:6

WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN npm install

# replace this with your application's default port
ENV PORT $PORT
ENV GITHUB_API_TOKEN $GITHUB_API_TOKEN
ENV GITHUB_ORGANISATION $GITHUB_ORGANISATION

EXPOSE $PORT

CMD [ "npm", "start" ]
