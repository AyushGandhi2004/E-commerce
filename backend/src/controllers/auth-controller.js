const mongoose = require('mongoose');
const User = require('../modules/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { username, email, password , role } = req.body;
        // Check if user already exists
        const doExist = await User.findOne({ $or: [{ username }, { email }] });
        if (doExist) {
            return res.status(400).json({ message: 'Username or Email already exists' });
        }
        //Validate Password has min 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character:
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.' });
        }
        //Creating salt:
        const salt = await bcrypt.genSalt(10);
        //Hashing password:
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create new user
        if(!role) {
            req.body.role = 'user'; // Default role if not provided
        }
        const newUser = new User({username, email, password: hashedPassword , role});
        await newUser.save();
        res.status(201).json({ 
            message: 'User registered successfully',
            data : newUser
        });
    } catch (error) {
        console.log('Error in registerUser:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const checkUser = await User.findOne({ username : username });
        if (!checkUser) {
            return res.status(400).json({ message: 'No such user exists' });
        }
        // Check if password matches
        const isPasswordValid = await bcrypt.compare(password, checkUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        // Create JWT token
        const accessToken = jwt.sign(
            { userId: checkUser._id, username: checkUser.username, role : checkUser.role },
            process.env.JWT_SECRET
        );
        //setting cookie in res:
        res.cookie("accessToken",accessToken,{
            httpOnly: true,
            secure: true,       // must be true on HTTPS (Render gives HTTPS)
            sameSite: "None",   // allow cross-site cookies (frontend + backend are diff domains)
        })

        res.status(200).json({
            message : "Login successful",
            user : checkUser
        });

    } catch (error) {
        console.log('Error in loginUser:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const logoutUser = async (req,res)=>{
    try {
        res.clearCookie("accessToken",{
            httpOnly: true,
            secure: true,       // must be true on HTTPS (Render gives HTTPS)
            sameSite: "None",   // allow cross-site cookies (frontend + backend are diff domains)
        });
        return res.status(200).json({message : "Logges out successfully"})
    } catch (error) {
        console.log('Error in logoutUser:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const checkLogin = async (req, res) => {
  try {
    const user = req.userInfo; 
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    return res.status(200).json({
      success: true,
      user, // send user info to frontend
    });
  } catch (error) {
    console.error("Error in checkLogin:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


module.exports = {registerUser , loginUser , logoutUser , checkLogin};