// backend/models/User.js
import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Adds methods to the User schema for hashing and validating passwords
UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email', // Authenticate using email instead of username
    usernameLowerCase: true, // Convert email to lowercase
    populateFields: 'username' // Automatically populate the username field
});

export default mongoose.model('User', UserSchema);
