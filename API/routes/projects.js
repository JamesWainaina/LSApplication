const express = require('express');
const router = express.Router();
const { Project } = require('../models');

// Create a new project
router.post('/', async (req, res) => {
    console.log("Received request to create a project:", req.body);
    try {
        if (!req.body.customerId) {
            return res.status(400).json({ error: 'customerId is required' });
        }
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(400).json({ error: error.message });
    }
});


// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Update a project by ID
router.put('/:id', async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        await project.update(req.body);
        const updatedProject = await Project.findByPk(req.params.id);
        res.status(200).json(updatedProject); // Return the updated project
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a project by Id
router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        await project.destroy();
        console.log(`Project with ID ${req.params.id} deleted successfully.`);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;