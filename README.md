# Course Project 2: Learned content practicing

This is a project for implementing a web application that is used for repeated practice of learned content, where users can answer multiple-choice questions from different topics provided by the application. Also, the application provides an API for retrieving and answering random questions.

The application uses a three-tier architecture (client, server, database) and a layered architecture with four layers (views, controllers, services, database). The technologies used in the project is: Deno, Oka, flyway database, docker, playwright, etc.

There is an online deployed application in Render, which can be found at:

https://course-project-1-rvx6.onrender.com/

To run the project locally, these steps can be followed:
- Add flyway credentials by creating a project.env file in root folder, content can be found below:

    ```
    # Database configuration for PostgreSQL
    POSTGRES_USER=YOUR_USERNAME
    POSTGRES_PASSWORD=YOUR_PASSWORD
    POSTGRES_DB=YOUR_DB

    # Database configuration for Flyway (used for database migrations)
    FLYWAY_USER=YOUR_USERNAME
    FLYWAY_PASSWORD=YOUR_PASSWORD
    FLYWAY_URL=YOUR_FLYWAY_URL

    # Database configuration for Deno's PostgreSQL driver
    PGUSER=YOUR_USERNAME
    PGPASSWORD=YOUR_PASSWORD
    PGHOST=YOUR_HOST
    PGPORT=YOUR_PORT
    PGDATABASE=YOUR_DB
    ```

- Install docker and run:

    ```
    docker compose up --build
    ```
    to setup docker running, where run-locally.js is the starting point of the application

- Then the project is deployed and can be accessed at:
    ```
    http://localhost:7777/
    ```

- To run e2e tests, run this command:

    ```
    docker-compose run --entrypoint=npx e2e-playwright playwright test & docker-compose rm -sf    
    ```