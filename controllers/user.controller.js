// var jwt = require("jsonwebtoken");
const common = require("../config/common");
const general = require("../config/general");
const {
  checkApprovedToken,
  generateToken,
  passwordHashing,
} = require("../middlewares/auth.middleware");
const User = require("../models/user.schema");
const Setting = require("../models/setting.model");
const { OAuth2Client } = require("google-auth-library");
const {
  transactionalEmails,
  sendMail,
  sendOTPMail,
  sendContactMail,
  sendInvoiceMail,
} = require("../utils/mails");
const { emailTypes, valayDetails } = require("../utils/params");
const client = new OAuth2Client(general.GOOGLE_CLIENT_ID);
//userlogin
const userLogin = async (req, res) => {
  // console.log(req.body);

  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user.status !== 1) {
      res.status(401).send({
        statuscode: 401,
        success: false,
        status: false,
        token: null,
        message:
          req.body.email + " has not been onboarded by the administration",
      });
      return;
    }
    const isMatch = await common.passwordComparing(
      req.body.password,
      user.password
    );
    if (isMatch) {
      const token = await common.generateToken({
        id: user._id.toString(),
        email: user.email,
      });
      res.status(200).send({
        status: true,
        userId: user._id,
        email: user.email,
        userName: user.fullname,
        phoneno: user.phoneno,
        role: user.role,
        statuscode: 200,
        message: "Login successfully",
        token: token,
        expireTokenTime: new Date().getTime() + 60 * 24 * 60 * 60 * 1000,
      });
    } else {
      res.status(401).send({
        message: "password didn't match",
      });
    }
  } catch (error) {
    res.status(400).send({ error: error, message: "User not Found" });
  }
};

const googleSignUp = async (req, res, next) => {
  try {
    // console.log({ verified: verifyGoogleToken(req.body.credential) });
    if (req.body.credential) {
      const verificationResponse = await common.verifyGoogleToken(
        client,
        req.body.credential
      );

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }
      req.body.username;
      req.body.fullname;
      req.body.email;
      req.body.password;
      req.body.phoneno;
      req.body.address;
      req.body.role;
      req.body.status;
      req.body.image;
      await addUser(req, res, next);
      const profile = verificationResponse?.payload;
      res.status(201).json({
        message: "Signup was successful",
        user: {
          profile: profile,
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, JWT_SECRET, {
            expiresIn: "1d",
          }),
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred. Registration failed.",
    });
  }
};
//addusers
const addUser = async (req, res, next, signUpGoogle = false) => {
  try {
    const exitingUser = await User.find({ email: req.body.email }).maxTimeMS(
      20000
    );
    console.log("the registration process has been started");
    if (exitingUser.length > 0) {
      console.log(exitingUser);
      res.status(503).send({
        message: "unable to signup, email already exit",
        statuscode: 503,
        success: false,
      });
      console.log("unable to signup, email already exit");
      return;
    }
    const {
      username,
      fullname,
      email,
      password,
      phoneno,
      address,
      role,
      status,
      image,
    } = req.body;
    const hashPassword = await common.passwordHashing(password);
    const user = new User({
      username: username,
      fullname: fullname,
      email: email,
      password: hashPassword,
      phoneno: phoneno,
      address: address,
      role: role,
      status: status,
      image: image,
    });
    const data = await user.save();
    console.log("the registration process has been completed");
    const token = await common.generateToken({
      id: data._id.toString(),
      email: data.email,
    });
    await sendMail(
      {
        fullname: fullname,
        fromEmail: email,
        toEmail: [valayDetails.email, "rozerbagh@gmail.com"],
        text: fullname + " with email " + email + " has to be on board or not",
        subject: email + " Registration",
        token: token,
      },
      false
    );
    try {
      const setting1 = new Setting({
        user: data._id,
        markup: 20,
        rebate: 20,
        labour_hour_rate: 35,
        container_cost: 2,
        delivery_fee: 30,
        setting_name: "compound",
      });
      const setting2 = new Setting({
        user: data._id,
        markup: 20,
        rebate: 20,
        labour_hour_rate: 35,
        container_cost: 2,
        delivery_fee: 30,
        setting_name: "capsule",
      });
      await setting1.save();
      await setting2.save();
    } catch (err) {}
    res.status(200).send({
      requestStatus: 200,
      status: 0,
      success: true,
      token: null,
      message: email + " has to be on boarded by the administration",
    });
    return;
  } catch (error) {
    console.log("sign up error", error);
    res
      .status(501)
      .send({ message: "Unable to signup", statuscode: 500, success: false });
  }
};
//getallusers
const getallUser = async (req, res) => {
  const admin = parseInt(req.query.admin);
  try {
    const users = await User.find({});
    if (admin === 1) {
      res.status(200).send(users);
    } else {
      res.status(200).send({
        status: "success",
        statuscode: 200,
        message: "get all users",
        data: users,
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "failed",
      statuscode: "500",
      error: error,
      message: "unable to get users",
    });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const admin = parseInt(req.query.admin);
    const user = await User.findById({ _id: req.params.id });
    if (admin === 1) {
      res.status(200).send(user);
    } else {
      res.status(200).send({
        status: "success",
        statuscode: 200,
        message: "get user details",
        data: [user],
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "failed",
      statuscode: "500",
      error: error,
      message: "unable to get user details",
    });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    const getuser = await User.findById({ _id: req.params.id });
    if (!getuser)
      return res.status(400).send({
        status: "failed",
        statuscode: 400,
        message: "unable to updated",
      });

    return res.status(200).send({
      status: "susccess",
      statuscode: 200,
      message: "user updated",
      data: [getuser],
    });
  } catch (error) {
    return res.status(500).send({
      status: "failed",
      statuscode: 500,
      message: "unable to updated",
      error: error,
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const admin = parseInt(req.query.admin);
    const user = await User.findByIdAndDelete({ _id: req.params.id });
    if (admin === 1) {
      res.status(200).send({
        status: "success",
        statuscode: 200,
        message: "deleted succesfully",
        data: user,
      });
    } else {
      res.status(200).send({
        status: "success",
        statuscode: 200,
        message: "deleted succesfully",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "success",
      statuscode: "500",
      error: error,
      message: "unable to delete users",
    });
  }
};

const approvedUser = async (req, res, next) => {
  try {
    const { usertoken } = req.body;
    const user = await checkApprovedToken(usertoken);
    await User.findByIdAndUpdate(user.data._id, {
      status: 1,
    });
    console.log("approvedUser", user.data);
    await sendMail(
      {
        fullname: user.data.fullname,
        fromEmail: valayDetails.email,
        toEmail: user.data.email,
        subject: "Ypu has been on boarded to the https://yegcompounding.com",
        text: "You have been approved by administration suppoprt to make out your orders",
        token: token,
      },
      true
    );
    res.send({
      success: true,
      approved: true,
      message: user.data?.email + " has been on boarded",
    });
  } catch (error) {
    res.send({
      success: false,
      approved: false,
      message: "Not able to approve",
    });
  }
};

const declinedUser = async (req, res, next) => {
  try {
    const { usertoken } = req.body;
    const user = await checkApprovedToken(usertoken);
    await User.findByIdAndDelete(user.data._id);
    res.send({
      success: true,
      approved: true,
      message: user.data?.email + " has been deleted",
    });
  } catch (error) {
    res.send({
      success: false,
      approved: false,
      message: "Not able to delete",
    });
  }
};

function generateOTP(length) {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

const sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    const otp = generateOTP(6);
    const user = await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          otp: otp,
        },
      }
    );
    if (!user) {
      res.send({
        success: false,
        message: "user not found",
      });
      return;
    }
    await sendOTPMail(
      {
        fromEmail: valayDetails.email,
        toEmail: email,
        OTP: otp,
      },
      true
    );
    res.send({
      success: true,
      approved: true,
      message: "OTP has been send to your email",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      approved: false,
      message: "Internal Server error",
    });
  }
};

const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await User.find({ email: email });
    console.log(user);
    if (!user) {
      res.send({
        success: false,
        message: "user not found",
      });
      return;
    } else if (otp != user[0].otp) {
      res.status(402).send({
        success: false,
        message: "In valid OTP",
      });
      return;
    }
    const token = await generateToken(user[0]);
    res.status(200).send({
      success: true,
      approved: true,
      token: token,
      message: "OTP Verified",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      approved: false,
      message: "Internal Server error",
    });
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const user = req.payload;
    console.log(user);
    const hashPassword = await passwordHashing(password);
    await User.findOneAndUpdate(
      { email: user.email },
      { $set: { password: hashPassword } }
    );
    if (!user) {
      res.send({
        success: false,
        message: "user not found",
      });
      return;
    }
    res.status(200).send({
      success: true,
      approved: true,
      message: "Password Reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server error",
    });
  }
};

const sendContactForm = async (req, res) => {
  try {
    const { email, fullname, subject, message } = req.body;
    await sendContactMail({
      fullname: fullname,
      fromEmail: email,
      toEmail: valayDetails.email,
      subject: subject,
      message: message,
    });
    res.status(200).send({
      success: true,
      message: "Thanks for contacting will get back to u shortly !",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal Server error",
    });
  }
};

const sendInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { invoicedata } = req.body;
    const user = User.findById({ _id: id });
    const data = await sendInvoiceMail({
      fromEmail: valayDetails.email,
      toEmail: invoicedata.user.email,
      subject: "Invoice Mail",
      text: "The Inoivce has been attached below",
      data: invoicedata,
    });
    if (data === null) {
      res.status(400).send({
        success: false,
        message: "Invoice mail is unable to send!",
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: "Invoice mail is sent!",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal Server error",
    });
  }
};

module.exports = {
  userLogin,
  getallUser,
  deleteUser,
  updateUserDetails,
  getUserDetails,
  addUser,
  googleSignUp,
  approvedUser,
  declinedUser,
  sendOTP,
  verifyOTP,
  resetPassword,
  sendContactForm,
  sendInvoice,
};
