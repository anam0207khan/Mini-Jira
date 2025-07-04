const express = require('express');
const router = express.Router();
const {
  createProject,
  editProject,
  deleteProject,
  getUserProjects,
  getProjectById
} = require('../controllers/Project');

const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', createProject);
router.get('/', getUserProjects);
router.put('/:id', editProject);
router.delete('/:id', deleteProject);
router.get('/:id', getProjectById);

module.exports = router;