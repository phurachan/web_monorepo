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

const PermissionSchema = new Schema({
  name: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.PERMISSION_NAME_REQUIRED],
    unique: true,
    trim: true,
    maxlength: [100, MODEL_VALIDATION_MESSAGES.PERMISSION_NAME_MAX_LENGTH]
  },
  description: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.PERMISSION_DESCRIPTION_REQUIRED],
    trim: true,
    maxlength: [200, MODEL_VALIDATION_MESSAGES.PERMISSION_DESCRIPTION_MAX_LENGTH]
  },
  module: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.PERMISSION_MODULE_REQUIRED],
    trim: true,
    maxlength: [50, MODEL_VALIDATION_MESSAGES.PERMISSION_MODULE_MAX_LENGTH]
  },
  action: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.PERMISSION_ACTION_REQUIRED],
    enum: ["create", "read", "update", "delete", "access", "hr_view", "approve", "reject", "balance_manage", "export", "submit", "reports"],
    trim: true
  },
  resource: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.PERMISSION_RESOURCE_REQUIRED],
    trim: true,
    maxlength: [50, MODEL_VALIDATION_MESSAGES.PERMISSION_RESOURCE_MAX_LENGTH]
  },
  type: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.PERMISSION_TYPE_REQUIRED],
    enum: ["menu", "action", "input"],
    default: "action"
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      const { _id, __v, ...permissionData } = ret;
      return {
        id: _id.toString(),
        ...permissionData
      };
    }
  }
});
PermissionSchema.index({ module: 1 });
PermissionSchema.index({ action: 1 });
PermissionSchema.index({ resource: 1 });
PermissionSchema.index({ type: 1 });
PermissionSchema.index({ isActive: 1 });
const Permission = mongoose.models.Permission || mongoose.model("Permission", PermissionSchema);

export { Permission as default };
//# sourceMappingURL=Permission.mjs.map
