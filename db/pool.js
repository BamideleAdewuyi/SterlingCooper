require("dotenv").config();
const { Pool } = require("pg");

let pool;

if (process.env.DATABASE_URL) {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    });
} else {
    pool = new Pool({
        host: "localhost",
        user: process.env.USER,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: 5432,
    });
};


module.exports = pool;