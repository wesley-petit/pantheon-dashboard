# Pantheon Dashboard

A simple React.js dashboard that organizes your web services in one place using iframes. Manage and access all your apps easily from a single interface.

- [Pantheon Dashboard](#pantheon-dashboard)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Deployment](#deployment)

## Features

    - Add, edit, and delete web services
    - Sort services to customize your dashboard
    - View services embedded via iframe
    - Backup your database for safety

## Prerequisites

    - Node 24
    - npm

## Installation

1. Clone the repository :

    ```bash
    git clone https://github.com/wesley-petit/pantheon-dashboard
    ```

2. Change your directory :

    ```bash
    cd pantheon-dashboard/
    ```

3. Install all dependencies :

    ```bash
    npm install
    ```

4. Run the application :

    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

1. Clone the repository :

    ```bash
    git clone https://github.com/wesley-petit/pantheon-dashboard
    ```

2. Change your directory :

    ```bash
    cd pantheon-dashboard/
    ```

3. Create an `.env` file with your configuration :

    ```conf
    NEXT_PUBLIC_API_BASE=<YOUR_URL>              # Base URL for API requests used by the Next.js app (e.g. http://localhost:3000)
    ```

4. Deploy your container :

    ```bash
    sudo docker-compose up -d
    ```

5. Launch your browser and open the app.
