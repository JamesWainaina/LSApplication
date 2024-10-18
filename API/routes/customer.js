const express = require('express');
const router = express.Router();
const { Customer } = require('../models');



// create a new customer
router.post('/', async (req, res) => {
    console.log("Received request body:", req.body); // Log the incoming request body
    try {
        const customer = await Customer.create(req.body);
        res.status(201).json(customer);
    } catch (error) {
        console.error("Error creating customer:", error); // Log error details
        res.status(400).json({ error: error.message });
    }
});

// get all customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Update a customer by ID
router.put('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        const updatedCustomer = await customer.update(req.body);
        res.status(200).json(updatedCustomer);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message }); // Return 400 for validation errors
    }
});

// Delete a customer by ID
router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        await customer.destroy();
        console.log(`Customer with ID ${req.params.id} deleted successfully.`);
        res.status(204).send(); // 204 No Content
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
