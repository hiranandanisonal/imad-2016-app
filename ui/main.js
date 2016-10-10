var button=document.getElementById('counter');

button.onclick=function(){
    var request=new XMLHttpRequest();
    
    request.onreadyrtatechange=function(){
    if(request.readystate == XMLHttpRequest.DONE){
        if(request.status==200){
            var counter=request.responsetext;
        }
    }    
    };
   request.open('GET','http://hiranandanisonal.imad.hasura-app.io/counter',true);
   request.send(null);
};

