const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((con) => {
      console.log(`MongoDB Database connect with host: ${con.connection.host} 
    `);
    });
};

module.exports= connectDatabase