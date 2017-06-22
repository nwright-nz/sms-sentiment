FROM node:alpine
RUN mkdir -p /src/app
COPY ./code/ /src/app/
WORKDIR /src/app
RUN npm install
EXPOSE 8000
CMD ["node" , "index.js"]

