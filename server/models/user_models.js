import mongoose from 'mongoose';

const usersSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        dob: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const user = mongoose.model('user', usersSchema);