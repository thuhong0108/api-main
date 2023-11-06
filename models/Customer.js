import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    UserID:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        require: true
    },
    StreetAddress: {
        type: String,
        require: true
    },
    City: {
        type: String,
        require: true
    },
    State: {
        type: String,
        require: true
    },
    ZipCode: {
        type: String,
        require: true
    },
    Country: {
        type: String,
        require: true
    },
    DateOfBirth: {
        type: Date,
        require: true
    },
    Gender: {
        type: String,
        enum: ['Nam', 'Nữ'],
        required: true
    },
    RegistrationDate: {
        type: Date,
        require: true
    },
    LastLogin: {
        type: Date,
        require: true
    },
    ProfilePictureURL: {
        type: String,
        require: true
    }
})

const Customer = mongoose.model('Customer', CustomerSchema); 

export default Address
