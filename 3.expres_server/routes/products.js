const express = require('express');
const router = express.Router();

// Product Detail
router.use("/products/:productid",(req, res) => {
    res.send("Product: " + req.params.productid)
});

// All Products
router.use("/products",(req, res) => {
    res.send("Products")
});

// Homepage
router.use("/",(req, res) => {
    res.send("Homepage")
});

module.exports = router;