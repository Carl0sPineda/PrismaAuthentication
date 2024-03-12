import jwt from "jsonwebtoken";
interface User {
  id: string;
  email: string;
  name: string;
  otp_enabled: boolean;
}

const SECRET_KEY = "your_secret_key";

function generateToken(user: User): string {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    otp_enabled: user.otp_enabled,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  return token;
}

export { generateToken };
