# Successive Shopping Cart

### Steps to run the API

Move into to directory
```sh
$ cd shopping-cart
```

First install the dependencies which mentioned in package.json

```sh
$ npm install
```
Start the dev server.

```sh
$ npm run dev
```
OR

Start the production server.

```sh
$ npm run start
```

Before usage, seed basic data in db.

```sh
$ npm run seed

Output:
Starting Seed for 3 files
Running seed for category
Running seed for product
Running seed for user
Success seed
```
Above command will seed dummy products, categories and users in the db.

List of commands:
| Command | Purpose |
| ------ | ------ |
| npm run seed | Seed dummy data into database |
| npm run dev | Start the dev server |
| npm run start | Start the production server |
| npm run test | Run the test cases |

### Features

Below are the list of features along with the API Endpoints.

| Plugin | README |
| ------ | ------ |
| Product | /api/v1/products |
| Category | /api/v1/categories |
| User Login | /api/v1/login |
| Cart | /api/v1/cart |

Below are the dummy users.

| EmailAddress | Password |
| ------ | ------ |
| nitesh@gmail.com | admin |
| kartik@gmail.com | admin |

> API Documentation and useses

http://localhost:3000/api/v1/documentation

```
