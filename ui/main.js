var submit=document.getElementById('submit_btn');

submit.onclick=function(){
    var request=new XMLHttpRequest();
    
    request.onreadystatechange=function()
    {
    if(request.readyState == XMLHttpRequest.DONE)
    {
        if(request.status==200)
        {
            var names=request.responseText;
            names=JSON.parse(names);
            var list='';
            for(var i=0;i<names.length;i++){
            var span=document.getElementById('count');
            span.innerHTML=counter.toString();
        }
    }    
    };
   request.open('GET','http://hiranandanisonal.imad.hasura-app.io/counter',true);
   request.send(null);
};

