const Contact = require("../model/contact-model");

let contactForm = async (req, res) => {
    try {
        let response = req.body;
        await Contact.create(response);
        return res.status(200).json({ message: "Contact form data is stored" });
    } catch (error) {
        return res.status(500).json({ message: "Contact form data is not stored" });
    }
}

module.exports = { contactForm };
