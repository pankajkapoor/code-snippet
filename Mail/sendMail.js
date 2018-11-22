var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cmsquiz.5@gmail.com',
    pass: 'QUIZCMS@PIET'
  }
});

var rand_num

    while(1){
        rand_num=parseInt(Math.random()*100000)
        if(rand_num>9999){
            break
         }
        }
var mailOptions = {
  from: 'cmsqiuz.5@gmail.com',
  to: '6991ank@gmail.com',
  subject: 'Sending Email using Node.js',
  text: rand_num.toString()
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

console.log(rand_num)
