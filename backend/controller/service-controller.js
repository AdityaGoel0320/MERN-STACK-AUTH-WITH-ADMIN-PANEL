
const Service = require("../model/service-model");
const services = async (req, res) => {
    try {
        const response = await Service.find();
        if (!response) {
            // Handle the case where no document was found
            return res.status(404).json({ msg: "No service found" });
        }
        return res.status(200).json({ response });
    } catch (error) {
        console.log(`error from the server ${error}`);
    }
};
module.exports = services;