FROM node:20-alpine

WORKDIR /pantheon-dashboard

# Copy local files
COPY . .

# Install dependencies and build
RUN npm install
RUN npm run build

EXPOSE 3000
ENV NODE_ENV=production

VOLUME ["/pantheon-dashboard/public", "/pantheon-dashboard/src/app/data"]

CMD ["npm", "start"]