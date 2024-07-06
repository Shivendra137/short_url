const express = require("express");
const URL = require("../models/url");
const { restrictTo} = require("../middlewares/auth");
const staticRouter  = express.Router();
// const {clearSessions} = require('../service/auth')


//staticRouter.get('/', async (req,res) => {  // initially this line was working
staticRouter.get('/',restrictTo(['NORMAL','ADMIN']), async (req,res) => {    /// this route is accessible by both admin and normal
    // clearSessions();

   const allurls = await URL.find({});
    return  res.render("home" , {

        urls : allurls
    });
})


staticRouter.get('/admin/urls',restrictTo(['ADMIN']), async (req,res) => {

    // clearSessions();

   const allurls = await URL.find({});
    return  res.render("home" , {

        urls : allurls
    });
})


staticRouter.get('/signup' , async(req, res) => {

    return res.render('signup');
})


staticRouter.get('/login' , async(req, res) => {

    return res.render('login');
})


staticRouter.get('/logout',async(req,res) => {
    res.clearCookie('token', { httpOnly: true })
    return res.redirect('/');
     
})

module.exports= staticRouter;