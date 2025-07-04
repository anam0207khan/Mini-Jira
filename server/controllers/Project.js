const Project = require('../models/Project');

// @desc Create a new project
// @route POST /api/projects
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    console.log(req.user._id,"owner id")

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

// @desc Edit an existing project
// @route PUT /api/projects/:id
exports.editProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    console.log(req.user._id);
    

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

// @desc Delete a project
// @route DELETE /api/projects/:id
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

// @desc Get all projects for the current user
// @route GET /api/projects
  exports.getUserProjects = async (req, res) => {
    try {
      const projects = await Project.find({ owner: req.user._id }).sort({ createdAt: -1 });
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch projects', error });
    }
  };

  // @desc Get a project by ID
// @route GET /api/projects/:id
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
