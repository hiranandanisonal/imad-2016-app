var express = require('express');
var morgan = require('morgan');
var path = require('path');

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
      
   <iframe src="https://www.facebook.com/plugins/follow.php?href=https%3A%2F%2Fwww.facebook.com%2Fdvirus.sh&width=450&height=80&layout=standard&size=small&show_faces=true&appId" width="450" height="100" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
      
      <a href="https://twitter.com/hiranandanison1/media"><img src="http://www.iconarchive.com/download/i58879/dakirby309/windows-8-metro/Web-Twitter-alt-2-Metro.ico" width="80px" height="75px" /></a>
      
      <a href="https://hsonali97.blogspot.in/2016_10_01_archive.html"><img src="data:image/png;base64,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" height="75px" width="80px" /></a>
      
      <a href="https://plus.google.com/106015111898465232878"><img src="https://freeiconshop.com/files/edd/google-plus-flat.png"  height="80px" width="80px" /></a>
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
