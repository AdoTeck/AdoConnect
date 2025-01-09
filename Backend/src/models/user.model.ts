import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username : string;
  fullname : string;
  email: string;
  phonenumber: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    minlength: 3, 
    maxlength: 30 
  },
  fullname: { 
    type: String, 
    required: true, 
    trim: true, 
    minlength: 3, 
    maxlength: 50 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
  },
  phonenumber: { 
    type: String, 
    required: true, 
    unique: true, 
    
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 8, 
    maxlength: 128 
  },
}, {
  timestamps: true, 
});

export const User = mongoose.model<IUser>('User', userSchema);

