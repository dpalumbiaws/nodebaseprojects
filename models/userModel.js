import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const addressSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  postCode: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const userSchema = new mongoose.Schema({
  phonenumber: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  address: {
    type: [addressSchema]
  }
}, {
  timestamps: true
}
)

userSchema.methods.matchPassword = async function (passToValidate) {
  return await bcrypt.compare(passToValidate, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
