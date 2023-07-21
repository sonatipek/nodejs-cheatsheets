// Requirements
const express = require('express');
const db = require('../data/db');

// Create Router
const router = express.Router();

// Blogs by Category
router.use('/blogs/category/:categoryid', async (req, res) => {
    try {
        const categoryid = req.params.categoryid;
        const [blogs, ] = await db.execute("select * from blogs where category = ?", [categoryid]);
        const [categories, ] = await db.execute('select * from category')
        
        

        res.render("pages/category-list", {blogs: blogs, categories: categories, selectedCategory: categoryid}) 
    } catch (err) {
        console.log(err);
    }
});

// Blog Detail
router.use("/blogs/:blogid",async (req, res) => {
    try {
        const [blogs, ] = await db.execute('select * from blogs');
        const [categories, ] = await db.execute('select * from category')
     
        
        if (blogs.length >= req.params.blogid && req.params.blogid > 0) {
            res.render('pages/blog-detail', {blogs: blogs, categories: categories, blogid: req.params.blogid});
        }else{
            res.render("pages/errors/404.ejs");
        }
    } catch (error) {
        console.log(error);
    }

});

// All Blogs
router.use("/blogs", async (req, res) => {

    try {
        const [blogs, ] = await db.execute('select * from blogs');
        const [categories, ] = await db.execute('select * from category')
       
    
        res.render('pages/blog', {
            blogs: blogs,
            categories: categories
        })
        
    } catch (err) {
        console.log(err);
    }

});

// Homepage
router.use("/",async (req, res) => {
    try {
        const [blogs, ] = await db.execute('select * from blogs');
        const [categories, ] = await db.execute('select * from category')
        
        res.render('pages/index', {
            blogs:blogs,
            categories: categories
        })
        
    } catch (err) {
        console.log(err);
    }

    
});

module.exports=router;