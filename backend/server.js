const express = require('express');

const connectDB = require('./src/config/db');

const authroutes = require('./src/routes/authroutes');
const productroutes = require ('./src/routes/productroutes')
const cartroutes = require('./src/routes/cartroutes');
const orderroutes = require('./src/routes/orderroutes');
const { notFound , errorHandler } = require ('./src/middlewares/errorMiddleware');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());


connectDB(process.env.MongoURI);


// For URL encoded forms 
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth' , authroutes);
app.use('/api/cart' , cartroutes);
app.use('/api/orders' , orderroutes);
app.use('/api/products' , productroutes);

//health check time 
app.get('/api/health', (req,res) => {
    res.send('Server is up and running');
});

// Error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, () => {
    console.log(`Server is up on Port : ${PORT}`);
});

