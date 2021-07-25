import jwt from "jsonwebtoken";

//user clicks on like button -> auth middleware confirms or denies (NEXT) => like controller

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //extracting token

    //we have two types of token, google and our own
    const isCustomAuth = token.length < 500; //our token
    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test"); //gives username and id, second param is secret string

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub; //google's id to differentiate user
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
