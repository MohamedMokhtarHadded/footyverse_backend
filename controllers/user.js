const userToken = require('../models/userToken.js');
const { CreateError } = require('../utils/error.js');
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { CreateSuccess } = require('../utils/success.js');
const User = require('../models/User.js');



//    /register
async function register(req, res, next) {
    try {
        const { firstName, lastName, email, password, Role } = req.body;

        if (!email || !password || !firstName || !lastName || !Role) {
            return res.status(400).json({ error: "All input is required" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ error: "User Already Exists. Please Login" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            Role
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_SECRET, // Rename TOKEN_KEY to TOKEN_SECRET
            { expiresIn: "2h" }
        );

        user.token = token;
        await user.save();

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


//     /login
async function login(req, res) {
    try {

        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            return res.status(400).json({ error: "All input is required" });
        }

        const user = await User.findOne({ email });
        console.log(user);

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_SECRET,
                { expiresIn: "2h" }
            );

            user.token = token;
            await user.save();
            console.log("user found");
            res.status(200).json(user);
        } else {
            res.status(400).json({ error: "Invalid Credentials" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//      /users
async function users(req, res) {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        return res.json(deletedUser);
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


async function token(req, res) {
    try {

        // Check if the Authorization header is present
        if (!req.headers.authorization) {
            return res.status(401).json({ error: 'No authorization header' });
        }

        // Get the token from the Authorization header
        const token = req.headers.authorization.split(' ')[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        // Find the user by id
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        // Set req.user to the authenticated user
        req.user = user;


        // Call the next middleware function
        next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


async function sendEmail(req, res, Next) {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
        if (!user) {

        return next(CreateError(404, "User Not Found To ResetThe Email!"));
    }

    const payload = {
        email: user.email
    }
    const expiryTime = 300;
    const token = "azerty";
    //jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiryTime });


    /*const newToken = new userToken({
        userId: user_id,
        token: token
    });*/

    const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "ichrakghalia@gmail.com",
            pass: "evrkhbitdijbxons"
        }
    });

    let mailDetails = {
        from: "ichrakghalia@gmail.com",
        to: email,
        subject: "Reset Password!",
        html: `
    <html>
    <head>
            <title> Password Reset Request </title>
    </head>
    <body>
    <h1>Password Reset Request</h1>
    <p> We have received a request to reset your password for your account with FootyVerse. To comlete the password reset process, please click on the button below :</p>
    <a href=${process.env.LIVE_URL}/reset/${token}><button style="background-color: #4CAF50; color: white; padding: 14px 20px; border: none; cursor: pointer; border-radius: 4px; "> Reset Password </button>
    <p> Please note thas this link is only valid for a 5mins. If you did not request a password reset, please disregard this message.</p>
    <p>thank you </p>
    <p>FootyVerse Team</p>
    </body>
    </html>`,
    };
    mailTransporter.sendMail(mailDetails, async (err, data) => {
        if (err) {
            console.log(err);
            return next(CreateError(500, "Something went wrong while sending the email"))
        } else {
            await newToken.save();
            return next(CreateSuccess(200, "Email sent successfully!"))
        }
    })
}

const resetPassword = async (req, res) => {
  try {
    // const { filename } = req.file;
    // console.log('filename',req.file.filename);
    // console.log('debut',req.body);
    const { email, password } = req.body;
    console.log(req.body);
    const { id } = req.params;
    // const checkIfusertExists = await userModel.findById(id);
    // if (!checkIfusertExists) {
    //   throw new Error("user not found !");
    // }
    updated_at = new Date();
    updateUser = await userModel.findByIdAndUpdate(
      id,
      {
        $set: {
          email,
          password,
        },
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/*const resetPassword = (req, res, next) => {
    const token = req.body.token;
    const newPassword = req.body.password;

    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            return next(CreateError(500, "Reset Link is Expired!"));
        } else {
            const response = data;
            const user = await User.findOne({ email: { regex: '^' + response.email + '$', $options: 'i' } });
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(newPassword, salt);
            user.password = encryptedPassword;
            try {
                const updateUser = await User.findOneAndUpdate(
                    { _id: user._id }
                    , { $set: user },
                    { new: true });

                return next(CreateSuccess(200, "password reset success!"));
            } catch (error) {
                return next(CreateError(500, "something went wrong while reseting the password"))
            }


        }
    })

    
};*/

exports.getuserById = async (req, res) => {

    const userId = req.params.id; // Get user ID from request parameter
  
    try {
      const user = await User.findById(userId); // Find user by ID using Mongoose
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user); // Send user data as JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving user' });
    }
  };

/*
const updateUser =  async (req, res) => {
  const { email, userName, newPassword, role } = req.body;

  try {
    const user = await User.findById(req.userId); // Replace with appropriate user ID retrieval
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.email = email;
    user.userName = userName;
    if (newPassword) {
      // Hash new password before saving (using bcrypt or a similar library)
      user.password = hashPassword(newPassword);
    }
    user.role = role;

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};*/




const updateUser = async (req, res, next) => {
    //   if (req.isAuthenticated()) {
    try {
      // const { filename } = req.file;
      const {
        email, userName, newPassword, role
      } = req.body;
      console.log(req.body);
      const { userId } = req.params;
      const checkIfusertExists = await userModel.findById(userId);
      if (!checkIfusertExists) {
        throw new Error("user not found !");
      }
      updated_at = new Date();
      updateedUser = await userModel.findByIdAndUpdate(
        id,
        {
          $set: {
            email, userName, newPassword, role,updated_at /*,image_user:filename*/,
          },
        },
        { new: true }
      );
      res.status(200).json(updateedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    //   } else {
    //     res.status(401).json({ message: "Unauthorized" });
    //   }
  };

  const forgetpwd = async (req, res) => {
    const { email } = req.body;
    const URL = "http://localhost:3000/resetpwd";
  
    try {
      res.status(200).json({ message: "Welcome" });
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: email,
        from: "ichrakghalia@gmail.com",
        subject: "Welcome to Footyverse Project",
        html: `
                  <h2>Click the link to reset your password</h2>
                  <p>${URL}</p>
              `,
        //templateId: 'd-e09cf57a0a0e45e894027ffd5b6caebb',
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };



  const resetpwd = async (req, res) => {
    try {
      // const { filename } = req.file;
      // console.log('filename',req.file.filename);
      // console.log('debut',req.body);
      const { email, password } = req.body;
      console.log(req.body);
      const { id } = req.params;
      // const checkIfusertExists = await userModel.findById(id);
      // if (!checkIfusertExists) {
      //   throw new Error("user not found !");
      // }
      updated_at = new Date();
      updateedUser = await userModel.findByIdAndUpdate(
        id,
        {
          $set: {
            email,
            password,
          },
        },
        { new: true }
      );
      res.status(200).json(updateedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = {
    register,
    login,
    users,
    token,
    sendEmail,
    resetpwd,
    deleteUser,
    updateUser,
    forgetpwd
}