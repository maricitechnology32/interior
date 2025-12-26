import jwt from 'jsonwebtoken';

// This function signs a new token
const generateToken = (userId, role) => {
  // We sign a new token with the user's ID and role
  // This uses the JWT_SECRET from our .env file
  const token = jwt.sign(
    { userId, role }, // The data we want to store in the token
    process.env.JWT_SECRET, // Our secret key
    {
      expiresIn: '30d', // The token will be valid for 30 days
    }
  );

  return token;
};

export default generateToken;