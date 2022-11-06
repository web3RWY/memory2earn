import mongoose, { mongo } from "mongoose";

const { Schema, model } = mongoose;

const pageSchema = new Schema({
    user: String,
    createdAt: Date,
    article: String
});

export default mongoose.models.Page || mongoose.model('Page', pageSchema);