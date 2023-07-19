// Requirements
const express = require('express');

// Create Router
const router = express.Router();

// !Data
const data = {
    categories: ["Art", "Tech", 'Software'],
    blogs: [
        {
            blogid: 1,
            title: "Art History",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quos molestias quo, excepturi voluptatem labore.",
            img: "1.jpg",
            isShownOnHome: false,
            category: "Art"
        },
        {
            blogid: 2,
            title: "Windows 14 Features",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quos molestias quo, excepturi voluptatem labore.",
            img: "2.jpg",
            isShownOnHome: false,
            category: "Tech"
        },
        {
            blogid: 3,
            title: "Node.js vs PHP",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quos molestias quo, excepturi voluptatem labore.",
            img: "3.jpg",
            isShownOnHome: true,
            category: "Software"

        },
        {
            blogid: 4,
            title: "How Can I Learn Software",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quos molestias quo, excepturi voluptatem labore.",
            img: "4.jpg",
            isShownOnHome: true,
            category: "Software"
        }
    ],

    homepage: {
        title: "My Featured Blog Posts",
    },

    blog: {
        title: "My Blog Posts"
    },
};

// Blog Detail
router.use("/blogs/:blogid",(req, res) => {
    
    res.render('pages/blog-detail', {data: data, blogid: req.params.blogid});
});

// All Blogs
router.use("/blogs",(req, res) => {
    res.render('pages/blog', data);
});

// Homepage
router.use("/",(req, res) => {
    res.render('pages/index', data);
});

module.exports=router;