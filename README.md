# To-Do List of Duties API

This project is an API that handles CRUD requests for duties in a To-Do List. It is built using Node and Express.js and is intended to be used with a PostgreSQL database.

## Key Dependencies

- Express.js
- Jest

## Running the Project Locally

1. **Clone the Project**:
```shell
git clone git@github.com:fernandocieri/to_do_list-back.git
cd to_do_list-back
```

2. **Set Up PostgreSQL Database**: Create a local PostgreSQL database and configure the credentials in a `.env` file with the following structure:
    ```plaintext
    DB_NAME=""
    DB_HOST=""
    DB_USER=""
    DB_PASSWORD=""
    ```

3. **Initialize the Database**: Run the SQL script located at `src/config/initdb.sql` to create the necessary tables in the database.

4. **Install Dependencies and Start the Server**:
```shell
npm install
npm run dev
```

Once the server is running, you can start making requests to the API.

### Making Requests with Postman

You can access the documentation for each endpoint using Postman. Import the `DIGITAL55.postman_collection.json` file into Postman and start making requests.

## Testing the API

1. **Set Up Test Database**: Create a local PostgreSQL database for testing and configure the credentials in a `.env.test` file with the following structure:
    ```plaintext
    DB_NAME=""
    DB_HOST=""
    DB_USER=""
    DB_PASSWORD=""
    ```

2. **Run Test suites**:
```shell
npm run test
```