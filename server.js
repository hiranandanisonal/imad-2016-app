var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;


var config={
user:'hiranandanisonal',
database:'hiranandanisonal',
host:'db.imad.hasura-app.io',
port:'5432',
password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles={
    'about me':{
    title:'about me',
    heading1:'<img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi46Fx8zODM4NygtOjcBCgoKDQ0NDg0NDisZFRk3Ny0rKysrKy0tKystKystNy0tNy0rNzctKzcrLS0rNzctLS0rNy0rLS0tLS0tNy03Lf/AABEIALcBEwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAABAgADBv/EABYQAQEBAAAAAAAAAAAAAAAAAAABEf/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDz0hjYXUc9iysUBJkAE4QBYgxxjgAthAY2EqJbFMgnGxQBLKxsBDKwYCQvAKiiqFQTRVCioFi8TgJoVQCQpgdGhwxWWhjSKkASEw4AOHGwGLSHFQEyHAGNisbAGNisbAThw42AnGxWNiCcGLwYKnBi8GAjAvBYCLEulibBUYLF4LAQKuxNQRQqjBUspgXIcJxWWwyNIZAbCYVQSHDhgDDhw4Aw4cOCJw4rGwBjYrGwE42KxsFTjYrGwE4MXgxBODF4MBGCxeDBUYmx0sTYCLBYuxNgIsFi7BgrnYMXYMQRhUFFyGQyHFZYxsUAwyGQg2Nhw4AkU2KwQYcbDgDDhw4AxsVjYCcbFY2AnGxWNgIxsUwJwYrBiKnBi8FgIsTYuwWCosTYuwWAiwWLxNgIoqrBgqWLAtWMYrLGNhgNFY0hkBjGkIjYcbFAJDhkOAJDhOAMbDjYAxsVjYCcbFY2AjGxWDEE2BacFTgUwIsTV0UEWCqFFRU1dTQTU1dTQSxwgtQMVDDGMBpFSCKEaGRoQYyNhBsLHAYscEZsJwUY2KxsBONisAJwLTUE2BVFBKVpoqbErqaCaKqiqIqauiioqauhBLFlFljIMkxoYBMEVAYtDAJgigYsYAUzCMcYgzMQAqgipYsCKFpoJoxSaCbAqiiooVRQRRVUKqKFVNQALKOhjYZBkwxjAMMCogxaGAYQYBMBBixVGLMgzMwMzMKGIBIqqASmqoBKaupoqamqooJqaqiqJqaqiipYsDrhLYjLYWINFAwDDGhBoWIMWhBiCDMxBmZgDFgApYE0KSAFNFFTU1VFBNTVVNBNFVU1RNFVU0VgWEdixjI0imMBsOMYDGRsKoxjYQZiQBbDgBiwAswMCwAFgTRVJoJoUmiioq6kE1NVQCU1QUTQqhFDFlHYxoWUZUEIGKghEJaEGYsDHGIM2HCAGKYAxYEsWBNCgCRVBRNTV1IJqauxNFRQupoJqV0UEUKoAYxYV1hLIhMZhFQxmBRZgLMwExmAlmBmxmBsZmBsDMAsAZRgzABYzAmixmBNgsZhRYmswBNZgSWYH//Z">',     
    heading2:'HIRANANDANI SONALI GHANSHYAM',
    content:`
    <p>
        <a href="/">Home</a> |
        
        
        
        <a href="http://hiranandanisonal.imad.hasura-app.io/about me" target="_sameframe">about me</a> |
    
      
         
        <a href="http://hiranandanisonal.imad.hasura-app.io/contact me">contact me</a> |
    
         
       
        <a href="http://hiranandanisonal.imad.hasura-app.io/blog">blog</a> |
      
    </p>
        
    
    <p>
        </hr>
      Profession: Student</br> 
      Course: BE-Information Technology</br>
      Institute:Sarvajanik college of engineering and technology</br>
      Locality:Surat,Gujarat</br>
      Nationality:Indian</br>
      Email ID:hiranandanisonal@gmail.com</br>
      contact no:9727463584</br> </br>
      
      follow me on 
      </br> 
      <div align="right">
      
   <iframe src="https://www.facebook.com/plugins/follow.php?href=https%3A%2F%2Fwww.facebook.com%2Fdvirus.sh&width=450&height=100&layout=standard&size=small&show_faces=true&appId" width="450" height="100" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
      
      <a href="https://twitter.com/hiranandanison1/media"><img src="data:image/jpeg;base64,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" width="80px" height="75px" /></a>
      
      <a href="https://hsonali97.blogspot.in/2016_10_01_archive.html"><img src="data:image/png;base64,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" height="75px" width="80px" /></a>
      
      <a href="https://plus.google.com/106015111898465232878"><img src="https://lh3.googleusercontent.com/N-AY2XwXafWq4TQWfua6VyjPVQvTGRdz9CKOHaBl2nu2GVg7zxS886X5giZ9yY2qIjPh=w300"  height="80px" width="80px" /></a>
    </div>
    </p> `
},
    'contact me':{
        title:'contact me',
    heading1:'<img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi46Fx8zODM4NygtOjcBCgoKDQ0NDg0NDisZFRk3Ny0rKysrKy0tKystKystNy0tNy0rNzctKzcrLS0rNzctLS0rNy0rLS0tLS0tNy03Lf/AABEIALcBEwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAABAgADBv/EABYQAQEBAAAAAAAAAAAAAAAAAAABEf/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDz0hjYXUc9iysUBJkAE4QBYgxxjgAthAY2EqJbFMgnGxQBLKxsBDKwYCQvAKiiqFQTRVCioFi8TgJoVQCQpgdGhwxWWhjSKkASEw4AOHGwGLSHFQEyHAGNisbAGNisbAThw42AnGxWNiCcGLwYKnBi8GAjAvBYCLEulibBUYLF4LAQKuxNQRQqjBUspgXIcJxWWwyNIZAbCYVQSHDhgDDhw4Aw4cOCJw4rGwBjYrGwE42KxsFTjYrGwE4MXgxBODF4MBGCxeDBUYmx0sTYCLBYuxNgIsFi7BgrnYMXYMQRhUFFyGQyHFZYxsUAwyGQg2Nhw4AkU2KwQYcbDgDDhw4AxsVjYCcbFY2AnGxWNgIxsUwJwYrBiKnBi8FgIsTYuwWCosTYuwWAiwWLxNgIoqrBgqWLAtWMYrLGNhgNFY0hkBjGkIjYcbFAJDhkOAJDhOAMbDjYAxsVjYCcbFY2AjGxWDEE2BacFTgUwIsTV0UEWCqFFRU1dTQTU1dTQSxwgtQMVDDGMBpFSCKEaGRoQYyNhBsLHAYscEZsJwUY2KxsBONisAJwLTUE2BVFBKVpoqbErqaCaKqiqIqauiioqauhBLFlFljIMkxoYBMEVAYtDAJgigYsYAUzCMcYgzMQAqgipYsCKFpoJoxSaCbAqiiooVRQRRVUKqKFVNQALKOhjYZBkwxjAMMCogxaGAYQYBMBBixVGLMgzMwMzMKGIBIqqASmqoBKaupoqamqooJqaqiqJqaqiipYsDrhLYjLYWINFAwDDGhBoWIMWhBiCDMxBmZgDFgApYE0KSAFNFFTU1VFBNTVVNBNFVU1RNFVU0VgWEdixjI0imMBsOMYDGRsKoxjYQZiQBbDgBiwAswMCwAFgTRVJoJoUmiioq6kE1NVQCU1QUTQqhFDFlHYxoWUZUEIGKghEJaEGYsDHGIM2HCAGKYAxYEsWBNCgCRVBRNTV1IJqauxNFRQupoJqV0UEUKoAYxYV1hLIhMZhFQxmBRZgLMwExmAlmBmxmBsZmBsDMAsAZRgzABYzAmixmBNgsZhRYmswBNZgSWYH//Z">',
    heading2:'HIRANANDANI SONALI GHANSHYAM',
    content:`
    <p>
        <a href="/">Home</a> |
        <a href="http://hiranandanisonal.imad.hasura-app.io/about me" target="_sameframe">about me</a> |
      
        <a href="http://hiranandanisonal.imad.hasura-app.io/contact me">contact me</a> |
      
        <a href="http://hiranandanisonal.imad.hasura-app.io/blog">blog</a>
       
    </p>
        
    <p>
      For any type of query or grievances, contact me on<br>
      Ph no:9727463584<br>
      or<br>
      email:123@abc.com
    </p>`},
    
     'blog':{
        title:'blog',
    heading1:'<img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi46Fx8zODM4NygtOjcBCgoKDQ0NDg0NDisZFRk3Ny0rKysrKy0tKystKystNy0tNy0rNzctKzcrLS0rNzctLS0rNy0rLS0tLS0tNy03Lf/AABEIALcBEwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAABAgADBv/EABYQAQEBAAAAAAAAAAAAAAAAAAABEf/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDz0hjYXUc9iysUBJkAE4QBYgxxjgAthAY2EqJbFMgnGxQBLKxsBDKwYCQvAKiiqFQTRVCioFi8TgJoVQCQpgdGhwxWWhjSKkASEw4AOHGwGLSHFQEyHAGNisbAGNisbAThw42AnGxWNiCcGLwYKnBi8GAjAvBYCLEulibBUYLF4LAQKuxNQRQqjBUspgXIcJxWWwyNIZAbCYVQSHDhgDDhw4Aw4cOCJw4rGwBjYrGwE42KxsFTjYrGwE4MXgxBODF4MBGCxeDBUYmx0sTYCLBYuxNgIsFi7BgrnYMXYMQRhUFFyGQyHFZYxsUAwyGQg2Nhw4AkU2KwQYcbDgDDhw4AxsVjYCcbFY2AnGxWNgIxsUwJwYrBiKnBi8FgIsTYuwWCosTYuwWAiwWLxNgIoqrBgqWLAtWMYrLGNhgNFY0hkBjGkIjYcbFAJDhkOAJDhOAMbDjYAxsVjYCcbFY2AjGxWDEE2BacFTgUwIsTV0UEWCqFFRU1dTQTU1dTQSxwgtQMVDDGMBpFSCKEaGRoQYyNhBsLHAYscEZsJwUY2KxsBONisAJwLTUE2BVFBKVpoqbErqaCaKqiqIqauiioqauhBLFlFljIMkxoYBMEVAYtDAJgigYsYAUzCMcYgzMQAqgipYsCKFpoJoxSaCbAqiiooVRQRRVUKqKFVNQALKOhjYZBkwxjAMMCogxaGAYQYBMBBixVGLMgzMwMzMKGIBIqqASmqoBKaupoqamqooJqaqiqJqaqiipYsDrhLYjLYWINFAwDDGhBoWIMWhBiCDMxBmZgDFgApYE0KSAFNFFTU1VFBNTVVNBNFVU1RNFVU0VgWEdixjI0imMBsOMYDGRsKoxjYQZiQBbDgBiwAswMCwAFgTRVJoJoUmiioq6kE1NVQCU1QUTQqhFDFlHYxoWUZUEIGKghEJaEGYsDHGIM2HCAGKYAxYEsWBNCgCRVBRNTV1IJqauxNFRQupoJqV0UEUKoAYxYV1hLIhMZhFQxmBRZgLMwExmAlmBmxmBsZmBsDMAsAZRgzABYzAmixmBNgsZhRYmswBNZgSWYH//Z">',
    heading2:'HIRANANDANI SONALI GHANSHYAM',
    content:`
    <p>
        <a href="/">Home</a> |
        <a href="http://hiranandanisonal.imad.hasura-app.io/about me" target="_sameframe">about me</a> |
      
        <a href="http://hiranandanisonal.imad.hasura-app.io/contact me">contact me</a> |
      
        <a href="http://hiranandanisonal.imad.hasura-app.io/blog">blog</a>
       
    </p>
        
    <p>
   My blogs will release soon!
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

app.get('/articles/:articlename',function(req,res){
    
    pool.query("SELECT * FROM article WHERE title="+req.params.artclename,function(err,result)
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
