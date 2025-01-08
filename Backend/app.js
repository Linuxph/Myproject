const express = require('express')
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser')
const notFound = require('./middleware/not-found')
const authRoute = require('./routes/auth');
const movieRoute = require('./routes/movies');
const bookingRoute = require('./routes/booking');
const adminRoute = require('./routes/admin');
const connect = require('./DataBase/connectDB');
const auth = require('./middleware/authentication')
const cors = require('cors');
const errorHandlerMiddleware = require('./middleware/error-handler');
const multer = require('multer');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
const path = require('path');


const _dirname = path.resolve();

//middleware
app.set('trust proxy',1);
app.use(rateLimiter({
  windowMs:15*60*1000, //15 minutes
  max:100,
}));
app.use(cors());
app.use(helmet());
app.use(xss());


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
// app.use('/uploads', express.static('uploads'));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null,  uniqueSuffix+file.originalname)
  }
})

const upload = multer({ storage: storage });
  
//routes
app.use('/api/v1',authRoute);
app.use('/api/v1',auth,upload.single('image'),adminRoute);
app.use('/api/v1',auth,movieRoute);
app.use('/api/v1',auth,bookingRoute);

// app.use(express.static(path.join(_dirname,"/Frontend/dist")));

// app.use('*',(_,res)=>{
//     res.sendFile(path.resolve(_dirname,"Frontend", "dist", "index.html"));
// })

app.use(notFound);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connect(process.env.MONGO_URL)
        app.listen(port , ()=>{
            console.log(`CONNECTED TO THE DB ... AT PORT ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()