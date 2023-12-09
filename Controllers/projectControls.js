const projects = require("../Models/projectModel");
// const projects = require("../Models/projectModel");
// const projects = require("../Models/projectModel");
const jwt = require("jsonwebtoken");

exports.addProject = async (req, res) => {
  const { title, languages, overView, github, website } = req.body;

  const projectImg = req.file.filename;

  const userId = req.payload;

  try {
    const response = await projects.findOne({ github });
    if (response) {
      res.status(400).json(`${response.title} already exists`);
    } else {
      const newProject = new projects({
        title,
        languages,
        overView,
        github,
        website,
        projectImg,
        userId,
      });
      await newProject.save();
      res.status(200).json(newProject);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getUserProjects = async (req, res) => {
  const { id } = req.params;
  try {
    const projectArr = await projects.find({ userId: id });
    if (projectArr) {
      res.status(200).json({ userProjects: projectArr });
    } else {
      res.status(404).json("no projects uploaded yet");
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.getAllProjects = async (req, res) => {
  const searchQuery = req.query.search;
  try {
    const query = {
      languages: { $regex: searchQuery, $options: "i" },
    };
    const allProjects = await projects.find(query);
    if (allProjects) {
      res.status(200).json({ allProjects });
    } else {
      res.status(400).json("no projects");
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getHomeProjects = async (req, res) => {
  try {
    const homeProjects = await projects.find().limit(3);
    if (homeProjects) {
      res.status(200).json({ homeProjects });
    } else {
      res.status(400).json("no projects");
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.editProject = async (req, res) => {
  const { title, languages, overView, github, website, projectImg } = req.body;
  const { _id } = req.params;
  const uploadImg = req.file ? req.file.filename : projectImg;

  try {
    const updatedProject = await projects.findByIdAndUpdate(
      { _id },
      { title, languages, overView, github, website, projectImg: uploadImg },
      { new: true }
    );

    console.log(updatedProject);
    await updatedProject.save();
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.deleteProject = async (req, res) => {
  const { _id } = req.params;
  try {
    const response = await projects.deleteOne({ _id });
    console.log(response);
    if (response) {
      res.status(200).json("project deleted");
    }
  } catch (err) {
    res.status(401).json("hello");
  }
};
