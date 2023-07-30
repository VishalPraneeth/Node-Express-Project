const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectdb = require("./config/dbconnection");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
connectdb();
app.use(express.json());
app.use("/api/contacts", require("./routes/contactroute"));
app.use("/api/users", require("./routes/userroute"));
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server running on port ${port}`); 
});