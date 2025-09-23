const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

//Middleware para hashear contraseña antes de guardar
userSchema.pre('save', async function(next){
    // Solo hashear si la constraseña fue modificada
    if (!this.isModified('password')) return next()
    
    // Hashear contraseña
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

//Metodo para comparar contraseñas
userSchema.methods.comparePassword = async function(CandidatePassword){
    return await bcrypt.compare(CandidatePassword, this.password)
}

module.exports = mongoose.model('User', userSchema)