#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS executive (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR ( 255 ),
    last_name VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS campaign (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    brand VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS type_of_client (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    type VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS assignments (
    executive_id INTEGER NOT NULL,
    campaign_id INTEGER NOT NULL,
    PRIMARY KEY (executive_id, campaign_id),
    CONSTRAINT fk_executive FOREIGN KEY (executive_id) REFERENCES executive(id) ON DELETE CASCADE,
    CONSTRAINT fk_campaign FOREIGN KEY (campaign_id) REFERENCES campaign(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS campaign_type (
    campaign_id INTEGER NOT NULL,
    type_of_client_id INTEGER NOT NULL,
    PRIMARY KEY (campaign_id, type_of_client_id),
    CONSTRAINT fk_campaign FOREIGN KEY (campaign_id) REFERENCES campaign(id) ON DELETE CASCADE,
    CONSTRAINT fk_type_of_client FOREIGN KEY (type_of_client_id) REFERENCES type_of_client(id) ON DELETE CASCADE
);
    
`;

async function main() {
  const DB_URL = process.argv[2];
  if (!DB_URL) {
    console.error("No database url provided.");
    process.exit(1);
  }
  console.log("seeding...");
  const client = new Client({
    connectionString: DB_URL,
    ssl: DB_URL.includes("render.com")
    ? { rejectUnauthorized: false}
    : false,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();