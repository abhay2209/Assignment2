const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var app=express();
const { Pool } = require('pg');
var pool;
pool = new Pool({

  connectionString: process.env.DATABASE_URL,
  ssl: true
});
var http=require('http');
const bodyParser=require('body-parser');
//app.use(bodyParser.urlencoded({extended: true}));

app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM test_table');
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})
//hi
  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.get('/', (req, res) => res.render('pages/tokemon'))
  app.get('/tokemon', (req, res) => res.render('pages/tokemon'))
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
  app.use(express.urlencoded({extended:false}))
  app.get('/display', (req,res) => {

    var getUsersQuery = `SELECT * FROM tokemon;`;
    console.log(getUsersQuery);

    pool.query(getUsersQuery, (error, result) => {
      if (error)
        res.end(error);
      var results = {'rows': result.rows };
      console.log(result);
      res.render('pages/display', results)
    });

  });

app.get('/newTokemon',(req,res) => res.render('pages/newTokemon'))

app.post('/newTokemon',(req,res)=>{
  var name=req.body.name;
  var trainerName =req.body.trainerName;
  var weight=req.body.weight;
  var height=req.body.height;
  var fly=req.body.fly;
  var fight=req.body.fight;
  var fire=req.body.fire;
  var water=req.body.water;
  var electric=req.body.electric;
  var  frozen=req.body.frozen;
  var total=1*weight+1*height+1*fly+1*fight+1*fire+1*water+1*electric+1*frozen;
  var myQuery="INSERT INTO tokemon (trainer,name,weight,height,fly,fight,fire,water,electric,frozen,total) VALUES ('"+trainerName+"','"+name+"',"+weight+","+height+","+fly+","+fight+","+fire+","+water+","+electric+","+frozen+","+total+")";
  pool.query(myQuery,function(err,result){
    if(err)
throw err;
console.log("success");
  });
console.log(total);
  console.log(name);

  res.writeHead(500,{"Content-type":"text/plain"});
  res.write('Added Tokemon press back to continue.');
  res.end();
});

app.get('/updateTokemon',(req,res) => res.render('pages/updateTokemon'))

app.post('/updateTokemon',(req,res)=>{
  var name=req.body.name;
  var trainerName =req.body.trainerName;
  var weight=req.body.weight;
  var height=req.body.height;
  var fly=req.body.fly;
  var fight=req.body.fight;
  var fire=req.body.fire;
  var water=req.body.water;
  var electric=req.body.electric;
  var  frozen=req.body.frozen;
  var total=1*weight+1*height+1*fly+1*fight+1*fire+1*water+1*electric+1*frozen;
  var myQuery="UPDATE tokemon SET weight="+weight+",height="+height+",fly="+fly+",fight="+fight+",fire="+fire+",water="+water+",electric="+electric+",frozen="+frozen+",total="+total+" WHERE name='"+name+"' AND trainer='"+trainerName+"'";
  pool.query(myQuery,function(err,result){
    if(err)
throw err;
console.log("success");
  });
console.log(total);
  console.log(name);

  res.writeHead(250,{"Content-type":"text/plain"});
  res.write('Updated Tokemon, press back to continue.');
  res.end();
});
app.get('/deleteTokemon',(req,res) => res.render('pages/deleteTokemon'))

app.post('/deleteTokemon',(req,res)=>{
  var name=req.body.name;
  var trainerName =req.body.trainerName;
  var myQuery="DELETE FROM tokemon WHERE trainer='"+trainerName+"' AND name='"+name+"'";
  pool.query(myQuery,function(err,result){
    if(err)
throw err;
console.log("Tokemon deleted, Press back to continue.");
  });

  console.log(name);

  res.writeHead(250,{"Content-type":"text/plain"});
  res.write('Tokemon deleted, Press back to continue.');
  res.end();
});
app.get('/display/:id', (req,res) => {
  console.log(req.params.id);
  var getUsersQuery = `SELECT * FROM tokemon WHERE name = '${req.params.id}'`;

  console.log(getUsersQuery);

  pool.query(getUsersQuery, (error, result) => {
    if (error)
      res.end(error);
    var results = {'rows': result.rows };
    console.log(result);
    res.render('pages/display', results)
});
});
