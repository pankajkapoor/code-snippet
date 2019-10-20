

exports.login = (req, res, next) =>{
    res.status(200).send({msg: "login successful", meta:{execTime:process.hrtime(req._startAt)[1]/1000000}})

}