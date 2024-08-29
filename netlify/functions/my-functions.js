﻿const { Client } = require('pg');

exports.handler = async function (event, context) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    const res = await client.query('SELECT NOW()');
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ time: res.rows[0].now }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Database connection failed' }),
    };
  }
};
