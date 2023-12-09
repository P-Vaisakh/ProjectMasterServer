const users = require("../Models/userModals");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const userExists = await users.findOne({ email });
    if (userExists) {
      res.status(400).json("User Already exists ");
    } else {
      const newUser = new users({
        userName,
        email,
        password,
        github: "",
        linkedin: "",
        profile: "",
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json(`register api failed ${err}`);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await users.findOne({ email });
    if (user) {
      const existUser = await users.findOne({ email, password });
      if (existUser) {
        const token = jwt.sign({ id: existUser._id }, "secretkey123");
        res.status(200).json({ user: existUser, token });
      } else {
        res.status(400).json("incorrect email or password");
      }
    } else {
      res.status(400).json("user doesnt exist");
    }
  } catch (err) {
    res.status(401).json("register api failed");
  }
};

exports.editProfile = async (req, res) => {
  const { userName, github, linkedin, profile } = req.body;
  const { _id } = req.params;
  const profile1 = req.file ? req.file.filename : profile;
  try {
    const selectedUser = await users.findOne({ _id });
    if (selectedUser) {
      selectedUser.userName = userName;
      selectedUser.github = github;
      selectedUser.linkedin = linkedin;
      selectedUser.profile = profile1;

      await selectedUser.save();
      res.status(200).json(selectedUser);
    } else {
      res.status(404).json(`${userName} is not present`);
    }
  } catch (err) {
    res.status(401).json(`edit failed ${err}`);
  }
};

// exports.getProfile = async (req, res) => {
//   const { _id } = req.params;
//   try {
//     const response = await users.findOne({ _id });
//     if (response) {
//       res.status(200).json({ user: response });
//     } else {
//       res.status(404).json("user not found");
//     }
//   } catch (err) {
//     res.status(404).json(err);
//   }
// };
