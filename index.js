//const express=require("express") //some kind of management server
const request=require("request")
const readline=require("readline")
const { spawn }=require("child_process")
//rtlamr -format=json| node index.js  
//could just spawn

let endpoint="http://localhost:9090/submitAmrJSON";

var amr=spawn("/Users/dgramop/go/bin/rtlamr",["-format=json"])
var r=readline.createInterface({
    input: amr.stdout,
  });
amr.on("close",function(){
    amr=spawn("/Users/dgramop/go/bin/rtlamr",["-format=json"]);
    r=readline.createInterface({
        input: amr.stdout,
      });
})
r.on('line', (input) => {
    //console.log(input);
    if(input.charAt(0)=="{")
    {   
        console.log(JSON.parse(input))
        request(endpoint+"?json="+encodeURIComponent(input))
    }
    else console.log(input.charAt(0))
})