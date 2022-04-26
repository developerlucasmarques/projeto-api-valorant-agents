import mongoose from 'mongoose';

const AgentsSchema = new mongoose.Schema({
    name: { type: String, minlength: 4, maxlength: 9, required: true },
    function: { type: String, minlength: 8, maxlength: 11, required: true },
    biography: { type: String, minlength: 40, required: true },
    skills: { type: Object, required: true },
    image: { type: String, minlength: 10, maxlength: 500, required: true },
});

export const Agents = mongoose.model('agents', AgentsSchema);
