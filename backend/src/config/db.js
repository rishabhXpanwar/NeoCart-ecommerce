const mongoose = require ('mongoose');

const connectDB = async (mongoUri) => {
    try {
        await mongoose.connect(mongoUri , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected Successfully");

    }
    catch (err)
    {
        console.error('Database connection error ', err.message);
        process.exit(1);
    }
};

module.exports= connectDB;