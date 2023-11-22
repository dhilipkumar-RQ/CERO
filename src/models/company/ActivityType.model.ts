import mongoose, { Schema, Document } from 'mongoose';

interface CompanyActivityType extends Document {
  activity_type_id: number;
  company_id: mongoose.Schema.Types.ObjectId;
}

const companyActivityTypeSchema: Schema<CompanyActivityType> = new mongoose.Schema({
  activity_type_id: { 
    type: Number, 
    required: true 
  },
  company_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'  
  },
}, {
    timestamps: true
});

const CompanyActivityType = mongoose.model<CompanyActivityType>('company_activity_type', companyActivityTypeSchema);

export default CompanyActivityType;
