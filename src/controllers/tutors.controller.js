import Tutor from "../models/tutor.js";

export const tutorSignup = async (req, res) => {
    if (!req.body.email || !req.body.firstName || !req.body.lastName || 
        !req.body.description || !req.body.hourlyRate) {
        return res.status(400).json({
            msg: "Por favor. Envie todos los datos requeridos."
        });
    }
    const tutor = await Tutor.findOne({ email: req.body.email });
    if (tutor) {
        return res.status(400).json({
            msg: "El usuario ya existe."
        });
    }
    const newTutor = new Tutor(req.body);
    await newTutor.save();

    return res.status(201).json(newTutor);
};

export const getTutors = async (req, res) => {
    const tutors = await Tutor.find();
    return res.json(tutors);
}

export const deleteTutor = async (req, res) => {
    const tutor = await Tutor.findOneAndDelete(req.params.email);
    return res.json(tutor);
}