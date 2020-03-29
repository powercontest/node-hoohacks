//const express=require("express") //some kind of management server
const request=require("request")
const readline=require("readline")
const { spawn }=require("child_process")
//rtlamr -format=json| node index.js  
//could just spawn

let endpoint="http://35.245.130.207/submitAmrJSON";

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
amr.stderr.on("data",function(d){
    console.log(d.toString())
    console.log("error,killing")
    //amr.kill();
})
r.on('line', (input) => {
    //console.log(input);
    if(input.charAt(0)=="{")
    {   
        console.log(JSON.parse(input))
        request(endpoint+"?name=haverhill&owner=dgramop&id=1&town=herndon&state=va&country=us&json="+encodeURIComponent(input),function(e,res,body){
            console.log(body)
        })
    }
    else console.log(""+input)
})