const jwt = require("jsonwebtoken");

const getToken = (user) => {
  return jwt.sign(
    { 
        _id: user._id,
         name: user.name,
          email: user.email,
           isAdmin: user.isAdmin },

    "talip",
    {
      expiresIn: "18h",
    }
  );
};
module.exports= { getToken };
