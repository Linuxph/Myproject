const express = require('express')
const app = express();
require('dotenv').config();
// const session = require('express-session')
// const cookieParser = require('cookie-parser')
const notFound = require('./middleware/not-found')
const authRoute = require('./routes/auth');
const movieRoute = require('./routes/movies');
const bookingRoute = require('./routes/booking');
const connect = require('./DataBase/connectDB');
const auth = require('./middleware/authentication')
const cors = require('cors');
const errorHandlerMiddleware = require('./middleware/error-handler');


//middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use(cookieParser());

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false, httpOnly: true, maxAge: 600000}
// }));

//routes
app.use('/api/v1',authRoute);
app.use('/api/v1',auth,movieRoute);
app.use('/api/v1',auth,bookingRoute);

app.use(notFound);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connect(process.env.MONGO_URL)
        app.listen(port , ()=>{
            console.log(`Server is listening on ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()