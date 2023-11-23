import mongoose, { Schema, Document } from 'mongoose';

interface Company extends Document {
  name: string;
  website: string;
  status: 'pending' | 'active' | 'inactive' | 'approved' | 'rejected';
  action_at: Date;
  action_by_id: mongoose.Types.ObjectId;
  is_tc_agreed: boolean;
  tc_agreed_on: Date;
  tc_agreed_by_id: mongoose.Types.ObjectId;
}

const companySchema: Schema<Company> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'inactive', 'approved', 'rejected'],
      default: 'pending',
      required: true,
    },
    action_at: {
      type: Date,
    },
    action_by_id: {
      type: Schema.Types.ObjectId,
      ref: 'admin',
    },
    is_tc_agreed: Boolean,
    tc_agreed_on: {
      type: Date,
    },
    tc_agreed_by_id: {
      type: Schema.Types.ObjectId,
      ref: 'company_user',
    },
  },
  {
    timestamps: true,
  },
);

const CompanyModel = mongoose.model<Company>('company', companySchema);

export default CompanyModel;
