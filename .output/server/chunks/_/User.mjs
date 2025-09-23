import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { M as MODEL_VALIDATION_MESSAGES } from './mongodb.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.USER_NAME_REQUIRED],
    trim: true,
    maxlength: [100, MODEL_VALIDATION_MESSAGES.USER_NAME_MAX_LENGTH]
  },
  email: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.USER_EMAIL_REQUIRED],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, MODEL_VALIDATION_MESSAGES.USER_EMAIL_INVALID_FORMAT]
  },
  password: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.USER_PASSWORD_REQUIRED],
    minlength: [6, MODEL_VALIDATION_MESSAGES.USER_PASSWORD_MIN_LENGTH]
  },
  role: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.USER_ROLE_REQUIRED],
    enum: ["admin", "user"],
    default: "user"
  },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: "Role"
  }],
  department: {
    type: String,
    trim: true,
    maxlength: [50, MODEL_VALIDATION_MESSAGES.USER_DEPARTMENT_MAX_LENGTH]
  },
  position: {
    type: String,
    trim: true,
    maxlength: [50, MODEL_VALIDATION_MESSAGES.USER_POSITION_MAX_LENGTH]
  },
  avatar: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, MODEL_VALIDATION_MESSAGES.USER_PHONE_MAX_LENGTH]
  },
  website: {
    type: String,
    trim: true,
    maxlength: [100, MODEL_VALIDATION_MESSAGES.USER_WEBSITE_MAX_LENGTH]
  },
  lastLogin: {
    type: Date
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  passwordResetToken: {
    type: String
  },
  passwordResetExpires: {
    type: Date
  },
  emailVerificationToken: {
    type: String
  },
  deletedAt: {
    type: Date
  },
  deletedBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      const { _id, __v, password, passwordResetToken, passwordResetExpires, emailVerificationToken, ...userData } = ret;
      return {
        id: _id,
        ...userData
      };
    }
  },
  toObject: { virtuals: true }
});
UserSchema.index({ email: 1, isActive: 1 });
UserSchema.index({ isActive: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ name: "text", email: "text" });
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password") || !this.password) return next();
  try {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});
UserSchema.methods.comparePassword = async function(candidatePassword) {
  if (!candidatePassword || !this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};
UserSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomUUID();
  this.passwordResetToken = resetToken;
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1e3);
  return resetToken;
};
UserSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase(), isActive: true });
};
UserSchema.virtual("fullName").get(function() {
  return this.name;
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export { User as default };
//# sourceMappingURL=User.mjs.map
