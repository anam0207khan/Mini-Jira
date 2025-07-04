const Ticket = require('../models/Ticket');

exports.createTicket = async (req, res) => {
    try {
        const { title, description, project, assignee, status, priority, dueDate } = req.body;

        const newTicket = await Ticket.create({
            title,
            description,
            project,
            assignee,
            status,
            priority,
            dueDate,
            createdBy: req.user._id
        });
       console.log(newTicket,"newTicket");
       
        res.status(201).json(newTicket);
    } catch (error) {
        console.log(error,"error")
        res.status(500).json({ message: 'Failed to create ticket', error });
    }
};

exports.editTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedTicket = await Ticket.findByIdAndUpdate(
            id,
            { ...updates, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update ticket', error });
    }
};


exports.deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Ticket.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete ticket', error });
    }
};


exports.getTicketsByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status, priority } = req.query;

    const validStatuses = ['To Do', 'In Progress', 'Done'];
    const validPriorities = ['Low', 'Medium', 'High'];

    // Validate status
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status: '${status}'. Valid options are ${validStatuses.join(', ')}`,
      });
    }

    // Validate priority
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({
        message: `Invalid priority: '${priority}'. Valid options are ${validPriorities.join(', ')}`,
      });
    }

    const query = { project: projectId };
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const tickets = await Ticket.find(query).populate('assignee', 'name');

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tickets', error });
  }
};


exports.getTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate('assignee', 'name');
         
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.json(ticket);
    } catch (error) {
        console.log(error,"error");
        
        res.status(500).json({ message: 'Failed to fetch ticket', error });
    }
};
