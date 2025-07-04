const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newProject = await Project.create({
      name,
      description,
      owner: req.user._id 
    });
   
    res.status(201).json(newProject);
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);
    res.status(500).json({ message: 'Failed to create project', error });
  }
};


exports.editProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    

    const project = await Project.findOneAndUpdate(
      { _id: id, owner: req.user._id },  
      { name, description, updatedAt: Date.now() },
      { new: true }
    );
     console.log(project, "project")
    if (!project) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update project', error });
  }
};  


exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findOneAndDelete({
      _id: id,
      owner: req.user._id
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete project', error });
  }
};

  exports.getUserProjects = async (req, res) => {
    try {
      const projects = await Project.find({ owner: req.user._id }).sort({ createdAt: -1 });
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch projects', error });
    }
  };


exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findOne({
      _id: id,
      owner: req.user._id
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    res.json({ project }); 
  } catch (error) {
    console.error("GET PROJECT ERROR:", error);
    res.status(500).json({ message: 'Failed to fetch project', error });
  }
};
