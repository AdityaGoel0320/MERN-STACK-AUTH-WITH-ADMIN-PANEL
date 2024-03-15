const Contact = require("../model/contact-model");
const User = require("../model/userSchema");


let getAllUser = async (req, res) => {
    try {

        let users = await User.find({}, { password: 0 });

        if (!users || users.length === 0) {
            return res.status(404).send({ message: "user are not found in databse" })
        }

        return res.status(200).json(users)

    } catch (error) {
        console.log(error)
        next(error);
    }

}


const getUserById = async (req, res) => {
    try {
        let id = req.params.id;

        let userData = await User.findOne({ _id: id }, { password: 0 });

        if (!userData) {
            return res.status(404).send({ message: "User not found in the database" });
        }
        console.log(userData)
        return res.status(200).json(userData);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};


let getAllContact = async (req, res) => {
    try {
        let contactData = await Contact.find();

        if (!contactData || contactData.length === 0) {
            return res.status(404).send({ message: "contact form data is not found in databse" })

        }
        return res.status(200).json(contactData)

    } catch (error) {
        // next(error);
        return res.status(500).send({ message: "Admin btn api error" });

    }
}

let becomeAdmin = async (req, res) => {
    try {
        const { userId, isAdmin } = req.body;

        // Assume you have a user model
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Toggle the isAdmin property
        user.isAdmin = !isAdmin;

        // Save the updated user
        await user.save();

        // Send a response indicating the success of the operation
        res.json({ message: `User is now ${user.isAdmin ? 'an admin' : 'not an admin'}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}




let deleteContactById = async (req, res) => {
    try {
        let id = req.params.id;
        console.log("api hit for contact delete")
        await Contact.deleteOne({ _id: id })
        return res.status(200).json({ message: "contact message removed succesfully" })

    } catch (error) {
        console.log(error)

    }
}


let deleteUserById = async (req, res) => {
    try {
        let id = req.params.id;
        console.log(id)

        await User.deleteOne({ _id: id })
        return res.status(200).json({ message: "user removed succesfully" })

    } catch (error) {
        console.log(error)
        // next(error);
    }
}

let updateUserById = async (req, res) => {
    try {
        let id = req.params.id;
        let updatedUserData = req.body;

        let userData = await User.updateOne(
            { _id: id },
            {
                $set: updatedUserData
            }
        );

        if (!userData) {
            return res.status(404).send({ message: 'User not found in the database' });
        }

        return res.status(200).json({ message: "User data updated properly" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}



module.exports = { getAllUser, getAllContact, deleteUserById, getUserById, becomeAdmin, updateUserById, deleteContactById , becomeAdmin  }; 