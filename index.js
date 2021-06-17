"use strict";
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config({ path: '.env'});
  console.log(process.env.NODE_ENV);
};

const mongoose = require("mongoose");
const app = require("./app");


mongoose.Promise = global.Promise;
mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.oexw8.mongodb.net/portafoliodb?retryWrites=true&w=majority` || process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Data base connected!");
    const port = process.env.PORT || 8000;
    // CREACION DEL SERVIDOR
    app.listen(port, () => {
      console.log(`Servidor corriendo en puerto: ${port}`);
    });
  })
  .catch((err) => console.log(err));  


