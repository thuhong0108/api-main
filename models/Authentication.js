import mongoose from "mongoose";

const AuthenticationSchema = new mongoose.Schema({
    UserID:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Token: {
        type: String,
        required: true
    },
    ExpirationTime: {
        type: Date,
        required: true
    }
})

const Authentication = mongoose.model('Authentication', AuthenticationSchema); 

export default Authentication
