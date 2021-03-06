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

app.post('/login', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   
   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              // Match the password
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
              if (hashedPassword === dbString) {
                
                // Set the session
                req.session.auth = {userId: result.rows[0].id};
                // set cookie with a session id
                // internally, on the server side, it maps the session id to an object
                // { auth: {userId }}
                
                res.send('credentials correct!');
                
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});

app.get('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
       // Load the user object
       pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].username);    
           }
       });
   } else {
       res.status(400).send('You are not logged in');
   }
});

app.get('/logout', function (req, res) {
   delete req.session.auth;
   res.send('<html><body>Logged out!<br/><br/><a href="/">Back to home</a></body></html>');
});

var pool = new Pool(config);



app.get('/get-blog', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT * FROM blog ORDER BY heading2 DESC', function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});

app.get('/get-comments/:articlename', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT comment.*, "user".username FROM blog, comment, "user" WHERE blog.title = $1 AND article.id = comment.blog_id AND comment.user_id = "user".id ORDER BY comment.timestamp DESC', [req.params.articlename], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});

app.post('/submit-comment/:articlename', function (req, res) {
   // Check if the user is logged in
    if (req.session && req.session.auth && req.session.auth.userId) {
        // First check if the article exists and get the article-id
        pool.query('SELECT * from blog where title = $1', [req.params.articlename], function (err, result) {
            if (err) {
                res.status(500).send(err.toString());
            } else {
                if (result.rows.length === 0) {
                    res.status(400).send('Article not found');
                } else {
                    var articleId = result.rows[0].id;
                    // Now insert the right comment for this article
                    pool.query(
                        "INSERT INTO comment (comment, blog_id, user_id) VALUES ($1, $2, $3)",
                        [req.body.comment, articleId, req.session.auth.userId],
                        function (err, result) {
                            if (err) {
                                res.status(500).send(err.toString());
                            } else {
                                res.status(200).send('Comment inserted!');
                            }
                        });
                }
            }
       });     
    } else {
        res.status(403).send('Only logged in users can comment');
    }
});
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
