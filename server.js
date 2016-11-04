var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
    'about me':{
    title:'about me',
    heading1:'HIRANANDANI SONALI GHANSHYAM              <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi46Fx8zODM4NygtOjcBCgoKDQ0NDg0NDisZFRk3Ny0rKysrKy0tKystKystNy0tNy0rNzctKzcrLS0rNzctLS0rNy0rLS0tLS0tNy03Lf/AABEIALcBEwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAABAgADBv/EABYQAQEBAAAAAAAAAAAAAAAAAAABEf/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDz0hjYXUc9iysUBJkAE4QBYgxxjgAthAY2EqJbFMgnGxQBLKxsBDKwYCQvAKiiqFQTRVCioFi8TgJoVQCQpgdGhwxWWhjSKkASEw4AOHGwGLSHFQEyHAGNisbAGNisbAThw42AnGxWNiCcGLwYKnBi8GAjAvBYCLEulibBUYLF4LAQKuxNQRQqjBUspgXIcJxWWwyNIZAbCYVQSHDhgDDhw4Aw4cOCJw4rGwBjYrGwE42KxsFTjYrGwE4MXgxBODF4MBGCxeDBUYmx0sTYCLBYuxNgIsFi7BgrnYMXYMQRhUFFyGQyHFZYxsUAwyGQg2Nhw4AkU2KwQYcbDgDDhw4AxsVjYCcbFY2AnGxWNgIxsUwJwYrBiKnBi8FgIsTYuwWCosTYuwWAiwWLxNgIoqrBgqWLAtWMYrLGNhgNFY0hkBjGkIjYcbFAJDhkOAJDhOAMbDjYAxsVjYCcbFY2AjGxWDEE2BacFTgUwIsTV0UEWCqFFRU1dTQTU1dTQSxwgtQMVDDGMBpFSCKEaGRoQYyNhBsLHAYscEZsJwUY2KxsBONisAJwLTUE2BVFBKVpoqbErqaCaKqiqIqauiioqauhBLFlFljIMkxoYBMEVAYtDAJgigYsYAUzCMcYgzMQAqgipYsCKFpoJoxSaCbAqiiooVRQRRVUKqKFVNQALKOhjYZBkwxjAMMCogxaGAYQYBMBBixVGLMgzMwMzMKGIBIqqASmqoBKaupoqamqooJqaqiqJqaqiipYsDrhLYjLYWINFAwDDGhBoWIMWhBiCDMxBmZgDFgApYE0KSAFNFFTU1VFBNTVVNBNFVU1RNFVU0VgWEdixjI0imMBsOMYDGRsKoxjYQZiQBbDgBiwAswMCwAFgTRVJoJoUmiioq6kE1NVQCU1QUTQqhFDFlHYxoWUZUEIGKghEJaEGYsDHGIM2HCAGKYAxYEsWBNCgCRVBRNTV1IJqauxNFRQupoJqV0UEUKoAYxYV1hLIhMZhFQxmBRZgLMwExmAlmBmxmBsZmBsDMAsAZRgzABYzAmixmBNgsZhRYmswBNZgSWYH//Z">',
    content:`
    <p>
        <a href="/">Home</a> |
        <a href="http://hiranandanisonal.imad.hasura-app.io/about me" target="_sameframe">about me</a> |
      
        <a href="http://hiranandanisonal.imad.hasura-app.io/contact me">contact me</a> |
      
        <a href="http://hiranandanisonal.imad.hasura-app.io/blog">blog</a>
       
    </p>
        
    
    <p>
        </hr>
      Profession: Student</br> 
      Course: BE-Information Technology</br>
      Institute:Sarvajanik college of engineering and technology</br>
      Locality:Surat,Gujarat</br>
      Nationality:Indian</br>
      Email ID:hiranandanisonal@gmail.com</br>
      contact no:9727463584
    </p> `
},
    'contact me':{
        title:'contact me',
    heading1:'HIRANANDANI SONALI GHANSHYAM              <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi46Fx8zODM4NygtOjcBCgoKDQ0NDg0NDisZFRk3Ny0rKysrKy0tKystKystNy0tNy0rNzctKzcrLS0rNzctLS0rNy0rLS0tLS0tNy03Lf/AABEIALcBEwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAABAgADBv/EABYQAQEBAAAAAAAAAAAAAAAAAAABEf/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDz0hjYXUc9iysUBJkAE4QBYgxxjgAthAY2EqJbFMgnGxQBLKxsBDKwYCQvAKiiqFQTRVCioFi8TgJoVQCQpgdGhwxWWhjSKkASEw4AOHGwGLSHFQEyHAGNisbAGNisbAThw42AnGxWNiCcGLwYKnBi8GAjAvBYCLEulibBUYLF4LAQKuxNQRQqjBUspgXIcJxWWwyNIZAbCYVQSHDhgDDhw4Aw4cOCJw4rGwBjYrGwE42KxsFTjYrGwE4MXgxBODF4MBGCxeDBUYmx0sTYCLBYuxNgIsFi7BgrnYMXYMQRhUFFyGQyHFZYxsUAwyGQg2Nhw4AkU2KwQYcbDgDDhw4AxsVjYCcbFY2AnGxWNgIxsUwJwYrBiKnBi8FgIsTYuwWCosTYuwWAiwWLxNgIoqrBgqWLAtWMYrLGNhgNFY0hkBjGkIjYcbFAJDhkOAJDhOAMbDjYAxsVjYCcbFY2AjGxWDEE2BacFTgUwIsTV0UEWCqFFRU1dTQTU1dTQSxwgtQMVDDGMBpFSCKEaGRoQYyNhBsLHAYscEZsJwUY2KxsBONisAJwLTUE2BVFBKVpoqbErqaCaKqiqIqauiioqauhBLFlFljIMkxoYBMEVAYtDAJgigYsYAUzCMcYgzMQAqgipYsCKFpoJoxSaCbAqiiooVRQRRVUKqKFVNQALKOhjYZBkwxjAMMCogxaGAYQYBMBBixVGLMgzMwMzMKGIBIqqASmqoBKaupoqamqooJqaqiqJqaqiipYsDrhLYjLYWINFAwDDGhBoWIMWhBiCDMxBmZgDFgApYE0KSAFNFFTU1VFBNTVVNBNFVU1RNFVU0VgWEdixjI0imMBsOMYDGRsKoxjYQZiQBbDgBiwAswMCwAFgTRVJoJoUmiioq6kE1NVQCU1QUTQqhFDFlHYxoWUZUEIGKghEJaEGYsDHGIM2HCAGKYAxYEsWBNCgCRVBRNTV1IJqauxNFRQupoJqV0UEUKoAYxYV1hLIhMZhFQxmBRZgLMwExmAlmBmxmBsZmBsDMAsAZRgzABYzAmixmBNgsZhRYmswBNZgSWYH//Z">',
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
    heading1:'HIRANANDANI SONALI GHANSHYAM                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi46Fx8zODM4NygtOjcBCgoKDQ0NDg0NDisZFRk3Ny0rKysrKy0tKystKystNy0tNy0rNzctKzcrLS0rNzctLS0rNy0rLS0tLS0tNy03Lf/AABEIALcBEwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAABAgADBv/EABYQAQEBAAAAAAAAAAAAAAAAAAABEf/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDz0hjYXUc9iysUBJkAE4QBYgxxjgAthAY2EqJbFMgnGxQBLKxsBDKwYCQvAKiiqFQTRVCioFi8TgJoVQCQpgdGhwxWWhjSKkASEw4AOHGwGLSHFQEyHAGNisbAGNisbAThw42AnGxWNiCcGLwYKnBi8GAjAvBYCLEulibBUYLF4LAQKuxNQRQqjBUspgXIcJxWWwyNIZAbCYVQSHDhgDDhw4Aw4cOCJw4rGwBjYrGwE42KxsFTjYrGwE4MXgxBODF4MBGCxeDBUYmx0sTYCLBYuxNgIsFi7BgrnYMXYMQRhUFFyGQyHFZYxsUAwyGQg2Nhw4AkU2KwQYcbDgDDhw4AxsVjYCcbFY2AnGxWNgIxsUwJwYrBiKnBi8FgIsTYuwWCosTYuwWAiwWLxNgIoqrBgqWLAtWMYrLGNhgNFY0hkBjGkIjYcbFAJDhkOAJDhOAMbDjYAxsVjYCcbFY2AjGxWDEE2BacFTgUwIsTV0UEWCqFFRU1dTQTU1dTQSxwgtQMVDDGMBpFSCKEaGRoQYyNhBsLHAYscEZsJwUY2KxsBONisAJwLTUE2BVFBKVpoqbErqaCaKqiqIqauiioqauhBLFlFljIMkxoYBMEVAYtDAJgigYsYAUzCMcYgzMQAqgipYsCKFpoJoxSaCbAqiiooVRQRRVUKqKFVNQALKOhjYZBkwxjAMMCogxaGAYQYBMBBixVGLMgzMwMzMKGIBIqqASmqoBKaupoqamqooJqaqiqJqaqiipYsDrhLYjLYWINFAwDDGhBoWIMWhBiCDMxBmZgDFgApYE0KSAFNFFTU1VFBNTVVNBNFVU1RNFVU0VgWEdixjI0imMBsOMYDGRsKoxjYQZiQBbDgBiwAswMCwAFgTRVJoJoUmiioq6kE1NVQCU1QUTQqhFDFlHYxoWUZUEIGKghEJaEGYsDHGIM2HCAGKYAxYEsWBNCgCRVBRNTV1IJqauxNFRQupoJqV0UEUKoAYxYV1hLIhMZhFQxmBRZgLMwExmAlmBmxmBsZmBsDMAsAZRgzABYzAmixmBNgsZhRYmswBNZgSWYH//Z">',
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
    res.send(counter.toString());
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
