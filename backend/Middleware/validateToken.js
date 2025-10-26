import { jwtServices } from "../services/index.js";

const validateToken = (req, res, next) => {
  try {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
      // Clear cookie and stop request
      res.cookie("access_token", "", {
        httpOnly: true,
        secure: false,
        expires: new Date(0),
      });
      return res.status(401).json({ message: "Access token missing" });
    }

    // Verify token
    const { user_id, firstname } = jwtServices.verify(accessToken, "secret123");
    req.user = { user_id, firstname };

    next(); // Proceed to next middleware
  } catch (error) {
    console.error(error);
    return next(error); // Pass error to error-handling middleware
  }
};

export default validateToken;
