var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
    'about us':{
    title:'about us',
    heading1:'HIRANANDANI HOME REMEDIES',
    heading2:'<img src="http://www.feminiya.com/wp-content/uploads/2013/06/bad-breath-home-remedies-mint-leaves2.jpg">',
    content:`
        <p>
        <a href="/">Home</a> |
        <a href="http://hiranandanisonal.imad.hasura-app.io/about us" target="_sameframe">about us</a> |
      
        <a href="http://hiranandanisonal.imad.hasura-app.io/say hello!">say hello</a> |
      
        <a href="http://hiranandanisonal.imad.hasura-app.io/shop">shop</a>
       
    </p>
        
    
      
    <p>
      Hello all we are family.We are here to serve you the most effective cum natural home made products.Beauty is for sure inside.But using natural products gives an inner satisfaction and confidence.Here we are with those products.
    </p>
    
    <p>
    We are Surat based and running our natural produce in our home and selling those ones.You are surely gonna love these!!    
    </p> `
},
    'say hello!':{
        title:'say hello!',
    heading1:'HIRANANDANI HOME REMEDIES',
    heading2:'<img src="http://www.feminiya.com/wp-content/uploads/2013/06/bad-breath-home-remedies-mint-leaves2.jpg">',
    content:`
    <p>
        <a href="/">Home</a> |
        <a href="http://hiranandanisonal.imad.hasura-app.io/about us" target="_sameframe">about us</a> |
      
        <a href="http://hiranandanisonal.imad.hasura-app.io/say hello!">say hello</a> |
      
        <a href="http://hiranandanisonal.imad.hasura-app.io/shop">shop</a>
       
    </p>
        
    <p>
      For any type of query or grievances, contact us on<br>
      Ph no:123456789<br>
      or<br>
      email:123@abc.com
    </p>`},
    
     'shop':{
        title:'shop',
    heading1:'HIRANANDANI HOME REMEDIES',
    heading2:'<img src="http://www.feminiya.com/wp-content/uploads/2013/06/bad-breath-home-remedies-mint-leaves2.jpg">',
    content:`
    <p>
        <a href="/">Home</a> |
        <a href="http://hiranandanisonal.imad.hasura-app.io/about us" target="_sameframe">about us</a> |
      
        <a href="http://hiranandanisonal.imad.hasura-app.io/say hello!">say hello</a> |
      
        <a href="http://hiranandanisonal.imad.hasura-app.io/shop">shop</a>
       
    </p>
        
    <p>
   Our products will be released soon!!
    </p>`},
    
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

var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter,toString());
});

app.get('/:articlename',function(req,res){
    var articlename=req.params.articlename;
res.send(createTemplate(articles[articlename]));
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


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log('IMAD course app listening on port 8080!');
});
