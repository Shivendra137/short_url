
 const {getUser} = require('../service/auth');
function checkForAuthentication(req, res, next) {
   
    // const authorizationHeaderValue = req.headers['authorization']
       const tokenCookie = req.cookies?.token;

    req.user = null;
    if(!tokenCookie)
   { return next();}

   const token= tokenCookie;
   const user = getUser(token);

   req.user = user ;
   return next();
}


function restrictTo(roles=[]) {  // the roles are given as an array becoz there can be a routen possible which can be accessed by both the admin and the normal user

     return function (req,res,next) {

        if ( !req.user) {
            return res.redirect('/login');
        }

        if (!roles.includes(req.user.role)){
            return res.end(
               'unauthorized'
            )
        }

         
        return next();// if everything is fine( user is present and is having a role) , then next
     }
}

// function logOut(req,res,next) {

//     req.user = null;
//     restrictTo(['NORMAL', 'ADMIN']);
//     return next();
// }


// async function restrictToLoggedInUserOnly(req,res, next){

//     const userUid = req.cookies?.uid;

//     if( !userUid ) 
        
//       { 
        
//         return res.redirect('/login');
    
//     }
//     const user = getUser(userUid);

//     if ( !user) {

//         return res.redirect('/login');

//     }

//     req.user = user;
//     next();



    //===============================================================================


    // /// now when the token is sent in json form
    // const userUid = req.headers["Authorization"]  // req ke upr authorization nam ka header ayega
    // if(!userUid) 
        
    //   { 
        
    //     return res.redirect('/login');
        
    // }

    // // here userUid is like -- Bearer <token> or with an example -- "Bearer [52972rjsj572985]"
    // const token= userUid.split('Bearer ')[1];
    // const user = getUser(token);

    // if ( !user) {

    //     return res.redirect('/login');

    // }

    // req.user = user;
    // next();

// }






module.exports= {

    // restrictToLoggedInUserOnly,
    checkForAuthentication,
    restrictTo,
    // logOut
}