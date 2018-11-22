const express=require('express')
const router=express.Router();
const multer=require('multer');
const imageUpload=require('./app')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now()+'-'+file.originalname)
    }
});
// const fileFilter=(req, file, cb)=>{
//     if(file.mimetype=='image/jpeg'||file.mimetype == 'image/png'){
//         cb(null, true);
//     }else{
//         cb(new Error('sorry'),true);
//     }
// }
const upload=multer({
    storage: storage,
    limits: {
    fileSize: 1024 * 1024 * 5
    }
    //,
    // fileFilter:fileFilter
});

router.post("/",upload.single('image'),imageUpload.imageUpload)
//product image: req.file.path
module.exports=router;