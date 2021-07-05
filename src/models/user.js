const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Cart = require("./cart");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is invalid");
                }
            },
        },
        password: {
            type: String,
            required: true,
            minlength: 7,
            trim: true,

            validate(value) {
                if (value.toLowerCase().includes("password")) {
                    throw new Error('password cannot contain "password"');
                }
            },
        },
        age: {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0) {
                    throw new Error("Age cannot be negative");
                }
            },
        },
        address: {
            type: String,
            default: "",
            required: true,
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
        avatar: {
            type: Buffer,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject(); // removes extra mongoose stuff from the user object

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;

    const token = jwt.sign(
        { _id: user._id.toString() },
        process.env.JWT_SECRET
    );

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("unable to login");
    }
    return user;
};

//hash the password before saving
userSchema.pre("save", async function (next) {
    const user = this; //gets the current user

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

//delete user task when user task is removed
userSchema.pre("remove", async function (next) {
    const user = this;

    // await Task.deleteMany({ owner: user._id });
    await Cart.deleteMany({ email: user.email });

    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
