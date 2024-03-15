let mongoose = require("mongoose")
let bcrypt = require("bcryptjs")
let jwt = require("jsonwebtoken")

let userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },


        Date: {
            type: Date,
            default: Date.now
        },


        isAdmin: {
            type: Boolean,
            default: false,
        },
       
    }
)




userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next();
})



userSchema.methods.comparePassword = async function (password) {
        return bcrypt.compare(password, this.password);

}

userSchema.methods.generateAuthToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        }, process.env.SECRET_KEY
        )

    } catch (error) {
        console.error("Error in generateAuthToken:", error.message);
        throw error; // Propagate the error
    }
}



let User = new mongoose.model("User", userSchema)

module.exports = User;

