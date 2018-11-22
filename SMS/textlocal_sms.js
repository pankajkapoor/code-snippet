// var validOptions = { apikey: 'xEliio3MBt0-xGWHs7EkGgwGvBddI1n04avVOkPkJK' };
// // var validOptions = { usernameclear: 'sourav.sharma9693@gmail.com', password: 'Sourav9693' };


// // const number='8818029153'
// // const text="hello ankur"

// var tl = require('TextLocal')(validOptions);
//  tl.sendSMS('8818029153', 'this is a test message', 'Sender', function (err, data) {
//      if(err){
//          console.log(err)
//      }else{
//          console.log(data)
//      }
//  });
//--------------------------------------------------------for random number
var http=require('http')

var rand_num
var username='sourav.sharma9693@gmail.com'
var hash='21ca9ac56c40b420583ea731b15f817229d43773e81ffa7caebec4b38f41e543'
var sender='txtlcl'

exports.sendOtp=(toNumber)=>{

    while(1){
        rand_num=parseInt(Math.random()*100000)
        if(rand_num>9999){
            console.log(rand_num)
            break
         }
        }
            
var data='username='+username+'&hash='+hash+'&sender='+sender+'&numbers='+toNumber+'&message='+rand_num;
var options={
    host:'api.textlocal.in',
    path:'/send?'+data
}

callback=function(response){
    var str=''
    response.on('data',function(chunk){
        str+=chunk
    })
    response.on('end',function(){
        console.log(str);
    })
}
http.request(options,callback).end()
return rand_num
}