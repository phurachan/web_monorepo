import mongoose, { Schema } from 'mongoose';
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

const RoleSchema = new Schema({
  name: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.ROLE_NAME_REQUIRED],
    unique: true,
    trim: true,
    maxlength: [50, MODEL_VALIDATION_MESSAGES.ROLE_NAME_MAX_LENGTH]
  },
  description: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.ROLE_DESCRIPTION_REQUIRED],
    trim: true,
    maxlength: [200, MODEL_VALIDATION_MESSAGES.ROLE_DESCRIPTION_MAX_LENGTH]
  },
  permissions: [{
    type: String,
    required: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      const { _id, __v, ...roleData } = ret;
      return {
        id: _id.toString(),
        ...roleData
      };
    }
  }
});
RoleSchema.index({ isActive: 1 });
RoleSchema.index({ createdAt: -1 });
const Role = mongoose.models.Role || mongoose.model("Role", RoleSchema);

export { Role as default };
//# sourceMappingURL=Role.mjs.map
