const pg = require('pg');
const client = new pg.Client('postgres://localhost/movie-list');
const express = require('express');
const app = express();
const path = require('path');
app.use(express.json())

const homePage = path.join(__dirname, 'index.html');
app.get('/', (req, res)=> res.sendFile(homePage));

const reactApp = path.join(__dirname, 'dist/main.js');
app.get('/dist/main.js', (req, res)=> res.sendFile(reactApp));

const reactSourceMap = path.join(__dirname, 'dist/main.js.map');
app.get('/dist/main.js.map', (req, res)=> res.sendFile(reactSourceMap));

const styleSheet = path.join(__dirname, 'styles.css');
app.get('/styles.css', (req, res)=> res.sendFile(styleSheet));

//GET route /api/movies
app.get('/api/movies', async(req,res,next)=>{
  try {
    const SQL = `
    SELECT * FROM movies
    `
    const response = await client.query(SQL)
    res.send(response.rows)
  } catch(error){
    next(error)
  }
})

//Put /api/movies/:id
app.put('/api/movies/:id', async(req,res,next)=>{
  try {
    const SQL = `
      UPDATE movies
      SET title = $1, stars = $2
      WHERE id = $3
      RETURNING *
    `
    const response = await client.query(SQL, [req.body.title, req.body.stars, req.params.id])
  } catch(error){
    next(error)
  }
})

const init = async()=> {
  await client.connect();
  console.log('connected to database');
  const SQL = `
    DROP TABLE IF EXISTS movies;
    CREATE TABLE movies(
      id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      stars INT
    );
    INSERT INTO movies (title, stars) VALUES ('28 Days Later', 5);
    INSERT INTO movies (title, stars) VALUES ('The Mist', 1);
    INSERT INTO movies (title, stars) VALUES ('Repo Man', 3);
    INSERT INTO movies (title, stars) VALUES ('Tombstone', 5);
    INSERT INTO movies (title, stars) VALUES ('Barbie', 4);
  `;
  await client.query(SQL)
  console.log('create your tables and seed data');

  const port = process.env.PORT || 3100;
  app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
  });
}

init();
