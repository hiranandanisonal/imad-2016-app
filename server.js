var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var about_us={
    title:'about us',
    heading1:'HIRANANDANI HOME REMEDIES',
    heading2:'<img src="http://www.feminiya.com/wp-content/uploads/2013/06/bad-breath-home-remedies-mint-leaves2.jpg">',
    content:`
        <p>
        <a href="http://hiranandanisonal.imad.hasura-app.io/article1" target="_sameframe">about us</a> |
      
        <a href="http://hiranandanisonal.imad.hasura-app.io/article2">say hello</a> |
      
        <a href="shop">shop</a>
       
    </p>
        
    
      
    <p>
      Hello all we are family.We are here to serve you the most effective cum natural home made products.Beauty is for sure inside.But using natural products gives an inner satisfaction and confidence.Here we are with those products.
    </p>
    
    <p>
    We are Surat based and running our natural produce in our home and selling those ones.You are surely gonna love these!!    
    </p> `
};
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
    <h1>
    
        ${heading1}
    
    </h1>
    
    <h2>
    
       ${heading2}
    
    </h2>
    
    
    
    <div class="y">
    ${content}
    </div>
    
    </div>
</body>



</html>`;
return htmlTemplate;
}   


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
}); 

app.get('/article1',function(req,res){
res.send(createTemplate(about_us));
});

app.get('/article2',function(req,res){
res.sendFile(path.join(__dirname, 'ui', 'article2.html'));
});

app.get('/article3',function(req,res){
res.send('artcle 3 will be served here');
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log('IMAD course app listening on port 8080!');
});
