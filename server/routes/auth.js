const router = require("express").Router();
const User = require("../models/User");
const UnverifiedUser = require("../models/UnverifiedUser")
const bcrypt = require("bcrypt");

const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const mailgen = require("mailgen");


dotenv.config();
const weblink = process.env.WEB_LINK;

// generate verification mail
const generateMail = (verificationCode, username, verificationLink) => {
  let mailGenerator = new mailgen({
    theme: "salted",
    product: {
      // Appears in header & footer of e-mails
      name: "Meal Master",
      link: weblink,
      logo: "http://mealmaster.webdtb.tech:8800/images/logo.png",
    },
  });

  const mail = {
    body: {
      name: username,
      intro:
        "Welcome to MeaL Master! We're very excited to have you on board.",
      action: {
        instructions: 'To confirm your Meal Master Account, please click here:',
        button: {
          color: '#22BC66', // Optional action button color
          text: 'Confirm your account',
          link: verificationLink
        }
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  const mailBody = mailGenerator.generate(mail);
  const mailtextBody = mailGenerator.generatePlaintext(mail);
  return { mailBody: mailBody, mailtextBody: mailtextBody };
};
// transpoter

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

//VERIFY  EMAIL
router.get("/verify/:email/:code", async (req, res) => {
  req.params.email = req.params.email.toLowerCase()
  try {
    //verify if user exist
    const existingUser = await UnverifiedUser.findOne({ email: req.params.email, verifCode: req.params.code });
    if (!existingUser) {
      res.status(403).json("Mail not found");
    } else {
      //create new user
      const newUser = new User({
        username: existingUser.username,
        email: existingUser.email,
        password: existingUser.password,
      });

      //save user and respond and delete unverified users

      await UnverifiedUser.deleteMany({ email: req.params.email })
      const savedUser = await newUser.save();
      const { password, updatedAt, ...other } = savedUser._doc;
      res.status(200).json(`Hi ${existingUser.username}, Your Account Verification was succesfull, You can now login`);

    }
  } catch (err) {
    console.log(err);
    res.status(500).json("an error from our side Occured please contact us if error persist");

  }
});

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.email = req.body.email.toLowerCase()

    //verify if user exist
    const existingMail = await User.findOne({ email: req.body.email });
    if (existingMail) {
      res.status(403).json("Mail already registered");
    } else {
      const existingUser = await User.findOne({ username: req.body.username });
      if (existingUser) {
        res.status(403).json("Username already in Use");
      } else {
        //create new user
        const verification = Math.random().toString(36).substring(0, 20) + Math.random().toString(36).substring(0, 20) + Math.random().toString(36).substring(0, 20)
        const newUser = new UnverifiedUser({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          verifCode: verification
        });
        //send code to email
        const verfifcationLink = `${weblink}/auth/verify/${req.body.email}/${verification}`

        const { mailBody, mailtextBody } = generateMail(
          verification,
          req.body.username,
          verfifcationLink
        );
        const mailOptions = {
          from: process.env.MAIL,
          to: req.body.email,
          subject: "Meal Master Account Verification",
          html: mailBody,
          text: mailtextBody,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            //what to do in case of succes
          }
        });

        //save user and respond
        const savedUser = await newUser.save();
        const { password, updatedAt, ...other } = savedUser._doc;
        res.status(200).json(other);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("an error from our side Occured please contact us if error persist");
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  req.body.email = req.body.email.toLowerCase()
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json("This mail is either not registered or not verification in our Database");
    } else {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(400).json("The password is Incorrect");
      } else {
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
      }
    }
  } catch (err) {
    res.status(500).json("an error from our side Occured please contact us if error persist");
  }
});

module.exports = router;
