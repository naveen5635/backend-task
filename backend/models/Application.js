const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
    job_id: { type: String, required: true }, // save-job_id-as-a-str
    applicant_name: { type: String, required: true },
    applicant_email: { type: String, required: true },
    cover_letter: { type: String, required: true },
    submitted_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Application", ApplicationSchema);
