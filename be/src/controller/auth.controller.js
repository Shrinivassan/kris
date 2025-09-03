import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
const registerController = async (req,res) => {
    const  { name,email,password, roles} = req.body;

    try {
        const newUser = new User({
            name,
            email,
            password,
            roles
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: newUser
        });
    } catch (error) {
        res.status(500).json({
            message: "Error registering user",
            error: error.message
        });
      }
}
  const login= async(req,res)=>{
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ id: user._id, roles: user.roles, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 3600000 });
        res.status(200).json({
            message: "Login successful",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error logging in",
            error: error.message
        });
    }
  }

const getrole = (req, res) => {
    const { userRoles } = req;
    res.status(200).json({
        message: "User roles retrieved successfully",
        roles: userRoles
    });
};

export default { registerController, login, getrole };