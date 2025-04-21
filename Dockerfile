FROM node

WORKDIR /myapp

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "start" ]

