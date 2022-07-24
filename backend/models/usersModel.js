// Require connection to Mongodb
const mongoose = require('mongoose');

// Users Schema 
const UserSchema = new mongoose.Schema({
// Create the two fields and assign an  object to them 
fName: {
 type: String, 
 required: [true, 'your first name is required'],
  },
lName: {
    type: String, 
    required: [true, 'your last name is required'],
    },

email: {
type: String, 
required: [true, 'your email is required'],
unique: [true, 'this email is taken by another user'],
},

pwd: {
    type: String,
    required: [true, 'your password is required'],
    unique: false,
},
acctVerificationCode: {
    type: Number,
    required: true
},
acctVerified: {
    type: Boolean,
    required: true,
    default: false,
},
termsAgreement:{
    type: Boolean,
    required: true
},
optCode:{
    type: Number,
    required: false,
    default: null

},
otpVerified:{
    type: Boolean,
    required: false,
    default: false
}

});

// Export the userSchema 
//create a user table or collection if there is no table with that name already
module.exports = mongoose.model.Users || mongoose.model('Users', UserSchema);