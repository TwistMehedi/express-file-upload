const express =require("express");
const path = require("path");
const app = express();

const multer  = require('multer')
 

app.config={port:3000};

app.use(express.json());

const uploadFolder="./uploads/";

const storage =multer.diskStorage({
    destination: (req, file, cb)=>{
          cb(null, uploadFolder);
    },
    filename: (req, file, cb)=>{
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("_")+"_"+Date.now();
        cb(null, fileName + fileExt);
    }
});


const upload = multer({ 
     storage:  storage,
    limits:{
        fileSize: 1000000,
    },
    fileFilter: (req, file, cb)=>{
        console.log(file)
        if(file.fieldname==="avatar"){
            if(
                file.mimetype === "image/jpeg" ||
                file.mimetype === "image/jpg"  ||
                file.mimetype === "image/png"
            ){
                cb(null, true)
            }else{
                cb(new Error('only /jpeg/jpg/png allow'))
            }
        }else{
            if(file.fieldname==="gallery"){
                if(
                    file.mimetype === "application/pdf"
                    
                ){
                    cb(null, true)
                }else{
                    cb(new Error('only pdf allow'))
                }
            }
        }
        } 
});

// single fille upload
// app.post('/', upload.single('avatar'), async (req, res)=> {
//       res.send("hello j")
// })

app.use((err, req, res, next)=>{
if(err.message){
    res.status(500).send(err.message)
}else{
    res.send("success")
}
})

// multiple file upload
app.post('/',upload.fields([
    { name: 'avatar', maxCount: 1 },
     { name: 'gallery', maxCount: 3 }
    ]
),(req, res)=>{
    res.send('dddd')
})

app.get('/', (req, res)=>{
        res.send("err.message")
})
 app.listen(app.config.port,()=>{
     console.log(`your server in running port number ${app.config.port}`)
 })