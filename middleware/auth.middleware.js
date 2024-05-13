const jwt = require("jsonwebtoken")
const User = require('../model/user_model'); 

require('dotenv')





let verifyToken = async (req, res, next)=>{

    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    
    jwt.verify(
        token, process.env.JWT_SECRET_KEY, 
        (err, decoded) => {
            if (err) {
              return res.status(401).send({
                message: "Unauthorized!",
              });
            }
            console.log(decoded)
            req.userId = decoded.user_id;

            

            next();
          })


}

let isAdmin = async (req, res, next) => {
 
  const user = await User.findById(req.userId)

  if (user && user.roles.includes('admin')) {
    
      next(); 
  } else {
      res.status(403).json({ error: "You don't have permission to perform this action." }); 
  }
}
let auth = {
    verifyToken,
    isAdmin
}

module.exports = auth