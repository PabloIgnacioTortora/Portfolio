"use strict";
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config({ path: '.env'});
  console.log(process.env.NODE_ENV);
};

const mongoose = require("mongoose");
const app = require("./app");


mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URI, {
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


