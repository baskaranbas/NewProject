FROM node:latest
COPY ./Bas /app
WORKDIR /app
RUN npm install
EXPOSE 8000
CMD ["npm", "start"]

