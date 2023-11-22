import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface CompanyUserDocument extends Document {
  first_name: string;
  last_name: string;
  email: string;
  isd_code: string;
  phone_number: string;
  company_id: mongoose.Schema.Types.ObjectId;
  password: string;
  role: string;
  user_type: string;
  is_deleted: boolean;
  isPasswordMatched: (userPassword: string) => Promise<boolean>;
}

const CompanyUserSchema: Schema<CompanyUserDocument> = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'Please provide firstname'],
    },
    last_name: {
      type: String,
      required: [true, 'Please provide lastname'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide email'],
    },
    isd_code: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
    },
    role: {
      type: String,
    },
    user_type: {
      type: String,
    },
    is_deleted: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

//hash password using bcrypt
CompanyUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//match password
CompanyUserSchema.methods.isPasswordMatched = async function (
  enteredPassword: string,
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const CompanyUserModel = mongoose.model<CompanyUserDocument>(
  'company_user',
  CompanyUserSchema,
);

export { CompanyUserModel };
