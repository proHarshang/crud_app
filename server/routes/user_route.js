import express from 'express';
import { user } from '../models/user_models.js';

const router = express.Router();

// Route for Save a new User
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.email ||
            !request.body.dob
        ) {
            return response.status(400).json({
                status: 'failed',
                status_code: '400',
                message: 'Send all required fields: name, email, dob',
            });
        }
        const newUser = {
            name: request.body.name,
            email: request.body.email,
            dob: request.body.dob,
        };

        const User = await user.create(newUser);

        return response.status(201).json({
            status: 'success',
            status_code: '201',
            message: User,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).json({
            status: 'failed',
            status_code: '500',
            message: 'User not inserted!',
        });
    }
});

// Route for Get All Users from database
router.get('/', async (request, response) => {
    try {
        const users = await user.find({});

        return response.status(200).json({
            status: 'success',
            status_code: '200',
            message: users,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).json({
            status: 'failed',
            status_code: '500',
            message: 'Users not found!',
        });
    }
});

// Route for Get One Users from database by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request?.params;

        const User = await user.findById(id);

        return response.status(200).json({
            status: 'success',
            status_code: 200,
            message: User,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).json({
            status: 'failed',
            status_code: 500,
            message: 'User not found!',
        });
    }
});

// Route for Update a User
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.email ||
            !request.body.dob
        ) {
            return response.status(400).json({
                status: 'failed',
                status_code: '400',
                message: 'Send all required fields: name, email, dob',
            });
        }

        const { id } = request?.params;

        const result = await user.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({
                status: 'failed',
                status_code: 404,
                message: 'User not found!',
            });
        }

        return response.status(200).json({
            status: 'success',
            status_code: 200,
            message: 'User updated successfully',
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).json({
            status: 'failed',
            status_code: 500,
            message: 'Something went wrong!',
        });
    }
});

// Route for Delete a user
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await user.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({
                status: 'failed',
                status_code: 404,
                message: 'User not found!',
            });
        }

        return response.status(200).json({
            status: 'success',
            status_code: 200,
            message: 'User deleted successfully',
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).json({
            status: 'failed',
            status_code: 500,
            message: 'Something went wrong!',
        });
    }
});

export default router;