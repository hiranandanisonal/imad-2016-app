var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var session=require('express-session');

var config={
user:'hiranandanisonal',
database:'hiranandanisonal',
host:'db.imad.hasura-app.io',
port:'5432',
password:process.env.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret:'someRandomSecretValue',
    cookie:{maxAge: 1000*60*60*24*30}
}));

function createTemplate(data){
    var title=data.title;
    var heading1=data.heading1;
    var heading2=data.heading2;
    var content=data.content;

var htmlTemplate=
    `<!doctype html>

<html>

<head>


<link href="/ui/style.css" rel="stylesheet"/>

<title>

${title}

</title>

</head>

<body>



    <div class="x">
    <center>
    <h1>
    
        ${heading1}
    
    </h1>
    
    <h2>
        ${heading2}
    </h2>
    </center>
    
    <div class="y">
    ${content}
    </div>
    </div>
    </div>
</body>



</html>`;
return htmlTemplate;
}   


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
  
});

function hash (input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ['pbkdf2','10000',salt,hashed.toString('hex')].join('$');
}

app.get('/hash/:input',function(req,res)
{
    var hashedString=hash(req.params.input,'this-is-same-random-string');
    res.send(hashedString);
});

app.post('/create-user',function(req,res)
{
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
   var dbString=hash(password,salt); 
   pool.query('INSERT INTO "user"(username,password)VALUES($1,$2)',[username,dbString],function(err,result){
       if(err) {
      res.status(500).send(err.toString());
  }
  else{
      res.send('user successfully created'+username);
  }
   });
});

app.post('/login',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    
   pool.query('SELECT * FROM "user" WHERE username=$1',[username],function(err,result){
       if(err) {
      res.status(500).send(err.toString());
  }
  else{
      if(result.rows.length===0){
          res.send(403).send('username/password is in invalid');
          
      }
      else
      {
       var dbString=result.rows[0].password;
       var salt=dbString.split('$')[2];
       var hashedPassword=hash(password,salt);
       if(hashedPassword===dbString){
           req.session.auth={userId:result.rows[0].id};
           
           
           res.send('credentials are correct!');
           
       }else{
           res.send(403).send('username/password is in invalid');
       }
      
      res.send('user successfully created'+username);
      }
      }
   });
});

app.get('/check-login',function(req,res){
    if(req.session && req.session.auth && req.session.auth.userId){
        res.send('you are logged in:' + req.session.auth.userId.toString());
    }
    else{
        res.send('you are not logged in');
    }
});

app.get('/logout',function(req,res){
    delete req.session.auth;
    res.send('you are logged in');
});
var pool=new Pool(config);
app.get('/test-db',function(req,res)
{
  pool.query('SELECT * FROM test',function(err,result){
 if(err) {
      res.status(500).send(err.toString());
  }
  else{
      res.send(JSON.stringify(result.rows));
  }
  });  
});

var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});

app.get('/pages/:articlename',function(req,res){
    
    pool.query("SELECT * FROM article WHERE title=$1",[req.params.articlename],function(err,result)
    {
        if(err)
        {
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length===0){
                res.status(404).send('Article not found');
            }else{
                var articledata=result.rows[0];
                res.send(createTemplate(articledata));
            }
        }
    });
});



//tp

app.get('/pages/blog/:articlename',function(req,res){
    
    pool.query("SELECT * FROM blog WHERE title=$1",[req.params.articlename],function(err,result)
    {
        if(err)
        {
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length===0){
                res.status(404).send('blog not found');
            }else{
                var articledata=result.rows[0];
                res.send(createTemplate(articledata));
            }
        }
    });
});







app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/blogger.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'blogger.png'));
});
app.get('/ui/googleplus.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'googleplus.jpg'));
});
app.get('/ui/twitter_bird_icon.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'twitter.ico'));
});
app.get('/ui/sonalb.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'sonalb.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log('IMAD course app listening on port 8080!');
});
