import mongoose, { Schema, Document } from 'mongoose';

interface Address extends Document {
  address_line?: string;
  city?: mongoose.Schema.Types.ObjectId;
  province?: mongoose.Schema.Types.ObjectId;
  country?: mongoose.Schema.Types.ObjectId;
  postal_code?: number;
  latitude?: number;
  longitude?: number;
  addressable_id?: string;
  addressable_type?: string;
}

const addressSchema = new Schema<Address>({
  address_line: {
    type: String,
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City',
  },
  province: {
    type: Schema.Types.ObjectId,
    ref: 'Province',
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
  },
  postal_code: {
    type: Number,
  },
  latitude: {
    type: Number,
    unique: true,
  },
  longitude: {
    type: Number,
    unique: true,
  },
  addressable_id: {
    type: String,
  },
  addressable_type: {
    type: String,
  },
});

// Address Model
const Address = mongoose.model<Address>('address', addressSchema);

export default Address;
