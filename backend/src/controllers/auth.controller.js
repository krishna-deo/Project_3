const router =  require('../Routes/auth.routes');
const userModel =  require("../Models/user.model");
const jwt= require('jsonwebtoken');
const bcrypt= require("bcryptjs")



async function registerUser(req,res){
    const {username, email, password, role='user'} = req.body;
    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if (isUserAlreadyExist){
        return res.status(409).json({
            message: 'User already exist'
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
        role
    })
    
    const token = jwt.sign({
        id : user._id,
        role: user.role
    }, process.env.JWT_SECRET);

    res.cookie("token", token)
    return res.status(201).json({
        message: "User register successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        },

    })

}

async function loginUser(req, res) {
    const {username, email, password} = req.body;
    const user = await userModel.findOne({
        $or: [
        {username},
        {email}
    ]
    })
    if(!user){
        return res.status(401).json({
            message: 'Invalid User'
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return res.status(401).json({
            message:'Invaild Credentials'
        })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("tokem", token);

    res.status(200).json({
        message:'USer logged in successfully',
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })
}

module.exports= {registerUser, loginUser}