const Nexmo = require('nexmo');
const nexmo = new Nexmo({
 apiKey: YOUR_API_KEY,
 apiSecret: YOUR_API_SECRET
});
const number=8818029153
const text="hello ankur"

nexmo.message.sendSms(
    '',number,text, {type:'unicode'},
      (err,data)=>{
          if(err){
              console.log(err)
          }else{
              console.log(data)
          }
      }
)