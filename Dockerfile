FROM node:20-alpine

WORKDIR /pantheon-dashboard

# Copy local files
COPY . .

# Create data directory
RUN mkdir -p public/uploads
RUN mkdir -p src/app/data

# Install dependencies and build
RUN npm install
RUN npm run build

EXPOSE 3000

VOLUME ["/pantheon-dashboard/public", "/pantheon-dashboard/src/app/data"]

CMD ["npm", "start"]