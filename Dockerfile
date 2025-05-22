FROM node:22.11.0-slim

WORKDIR /data-manager-service

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npx", "prisma", "generate"]
CMD ["npm", "run", "start"]
