const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const testimonialsSchema = new Schema({
    client_name: {
        type: String,
        required: true,
        default: 0,
    },
    client_image: {
        type: String,
        required: true,
        default: 0,
    },
    client_company: {
        type: String,
        required: true,
        default: 0,
    },
    client_rating: {
        type: Number,
        required: true,
        default: 0,
    },
    testimonial: {
        type: String,
        required: true,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model("testimonials", testimonialsSchema); 
