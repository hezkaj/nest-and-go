FROM node:latest
WORKDIR /app/auth
COPY package*.json ./
RUN npm install
COPY . .
COPY ./dist ./dist
CMD ["npm"," run", "start"]