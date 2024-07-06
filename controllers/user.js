const {v4 : uuidv4} = require('uuid');  // v4 is a method that generates a version 4 uuid where a version 4 uuid is a randomly generated uuid
const User = require("../models/user");
const {setUser} = require('../service/auth');


async function handleUsersignup(req, res) {


    const {name , email , password} = req.body;

    await User.create({

        name,
        email,
        password,

    })

    return res.render("home");
}


async function handleUserlogin(req, res) {


    const { email , password} = req.body;

     
    const user = await User.findOne({email, password});
    if (!user){

        return res.render('login', {
             error:  "Invalid Username or Password",

        })
    }
        // const sessionId = uuidv4();
        // setUser(sessionId ,user);
        // res.cookie('uid', sessionId);
        // return res.redirect("/");
        //////////////////these lines are required only in the statefull authentication





        const token = setUser(user) ;
        // res.cookie("uid" , token);  for uid 
        res.cookie("token" , token);   //for token

        return res.redirect('/');
        ////////////// in these lines the token is sent in the cookies




       // from the below lines the token will be sent in json form 
        // const token= setUser(user);
        // return res.json({
        //     token,
        // })



}

module.exports= {
    handleUsersignup,
    handleUserlogin
}