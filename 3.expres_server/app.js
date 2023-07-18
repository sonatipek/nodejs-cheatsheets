// Required
const express = require('express');
const productRoutes = require('./routes/products');

// Variables
const PORT = 3000; 

// Create instance
const app = express()


// !Routers
app.use(productRoutes);


app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
})