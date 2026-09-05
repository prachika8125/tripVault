const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // 1. Look for the "Authorization" header in the incoming request
  const authHeader = req.header('Authorization');

  // 2. If it is completely missing, reject the request
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // 3. The header is typically formatted as "Bearer <token>". We split it by the space and grab the second part.
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Token format invalid' });
  }

  try {
    // 4. Mathematically verify the token using your secret key from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. The token is valid! Extract the userId from the payload and attach it to the request object
    req.userId = decoded.userId;

    // 6. Pass control to the next function in the chain (your actual route)
    next();
  } catch (err) {
    // If the token is fake, altered, or expired, reject the request
    res.status(401).json({ message: 'Token is not valid or has expired' });
  }
};