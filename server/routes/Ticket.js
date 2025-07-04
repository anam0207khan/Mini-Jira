 const express = require('express');
const router = express.Router();
const {
    createTicket,
    editTicket,
    deleteTicket,
    getTicketsByProject,
    getTicket
} = require('../controllers/Ticket');
const auth = require('../middlewares/authMiddleware');

router.use(auth);

router.post('/', createTicket);                    
router.put('/:id', editTicket);                       
router.delete('/:id', deleteTicket);                  
router.get('/project/:projectId', getTicketsByProject); // All tickets in a project
router.get('/:id', getTicket);                          // Single ticket
router.get('/project/:projectId/tickets', getTicketsByProject);

 module.exports = router;