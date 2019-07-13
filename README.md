# Setup

Globally install Lerna project manager (https://github.com/lerna/lerna)
`npm i lerna -g`

Install All Packages/Dependencies
`lerna bootstrap`

Start MySQL and Create Database
`create database ex`
> Note you can modify the database connection details (db name, user and pass) in: `/packages/api/config/config.json`

Start API
`cd packages/api; npm start`

Seed Database with Test Users
`cd packages/api; npm run hydrate`

Test User/Pass:
`test1@gmail.com // test`
`test2@gmail.com // test`

Start Client
`cd packages/client; npm run client`

View Client
http://localhost:4200/login
