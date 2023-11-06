import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    CustomerID:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    StreetAddress: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true,
    },
    State: {
        type: String,
        required: true
    },
    ZipCode: {
        type: String,
        require: true
    },
    Country: {
        type: String,
        require: true
    },
    defaut: {
        type: Boolean,
        require: true
    }
})

const Address = mongoose.model('Address', AddressSchema); 

export default Address
