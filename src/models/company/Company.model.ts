import mongoose, { Schema, Document } from 'mongoose';

interface Company extends Document {
  name: string;
  website: string;
  status: 'pending' | 'active' | 'inactive' | 'approved' | 'rejected';
  action_at: Date;
  action_by_id: mongoose.Schema.Types.ObjectId;
  tc_agreed_on: Date;
  tc_agreed_by_id: mongoose.Schema.Types.ObjectId;
}

const companySchema: Schema<Company> = new mongoose.Schema({
  name: { 
		type: String,
    required: true 
  },
  website: { 
    type: String
  },
  status: { 
    type: String, 
    enum: ['pending', 'active', 'inactive', 'approved', 'rejected'],
		default: 'pending',
		required: true 
	},
  action_at: { 
		type: Date 
	},
  action_by_id: { 
		type: mongoose.Schema.Types.ObjectId,
		ref: 'admin' 
	},
  tc_agreed_on: { 
		type: Date 
	},
  tc_agreed_by_id: { 
		type: mongoose.Schema.Types.ObjectId,
		ref: 'company_user' 
	},
}, {
	timestamps: true
});

const Company = mongoose.model<Company>('company', companySchema);

export default Company;
