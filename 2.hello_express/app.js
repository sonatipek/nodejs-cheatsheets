// Required
const express = require('express');

// Variables
const PORT = 3000; 
// Create instance
const app = express()

app.use((req, res) => {

    res.end("Hello express")
});



app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
})