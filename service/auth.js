// const sessionIdToUserMap = new Map(); // it is a hashmap and it is used in statefull authentication ,here it stores a uid with a particular user

const jwt = require("jsonwebtoken"); // for stateless authentication
const secretKey = "Shiv%34#23"; // it is used in stateless authentication and remember it as a stamp

// function setUser( id ,user) {   // this func is used in statefull authentication
//     sessionIdToUserMap.set(id , user) ;
// }

function setUser(user) {
  /// this function is  used in stateless authentication and it will create a token for a user
  return jwt.sign(
    
    { 
      _id : user._id ,
      email: user.email,
      role: user.role
    }
    
    
    , secretKey);
}

// function getUser( id) {   /// this function is for statefull auth
//   return  sessionIdToUserMap.get(id) ;
// }


  function getUser(token) {
    // if(!token) {
    //   return null;
    // }

    try{
      return jwt.verify(token ,secretKey);
    }
    catch(error) {
      return null;
    }
    
  }
// function clearSessions() {
//   sessionIdToUserMap.clear();
// }

module.exports = {
  setUser,
  getUser,
  // clearSessions
};
