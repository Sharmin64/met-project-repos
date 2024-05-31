import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUsername,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<TUsername>({
  firstName: {
    type: String,
    required: [true, 'Why no First Name?'],
    trim: true,
    maxlength: [20, 'First Name can not be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE}  is not in capitalize format',
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Why no Last Name?'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
    trim: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Where is  Father Name?'],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Where is  Father Occupation?'],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, 'We need father contact no.?'],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, 'Give your mother Name?'],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, 'What is your mother occupation?'],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, 'we need mother contact no.'],
    trim: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Where is  Father Name?'],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, 'Where is  Father Name?'],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Where is  Father Name?'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Where is  Father Name?'],
    trim: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: [true, 'Id is required'], unique: true },
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxlength: [20, 'Password can not be more than 20 characters'],
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User Id is required'],
    trim: true,
    unique: true,
    ref: 'User',
  },
  name: {
    type: userNameSchema,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: `{VALUE} is not supported`,
    },
    required: true,
    trim: true,
  },
  dateOfBirth: { type: String, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email type',
    },
    trim: true,
  },
  contactNo: { type: String, required: true, trim: true },
  emergencyContactNo: { type: String, required: true, trim: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },

  presentAddress: { type: String, required: true, trim: true },
  parmanentAddress: { type: String, required: true, trim: true },
  guardian: {
    type: guardianSchema,
    required: true,
    trim: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
    trim: true,
  },
  profileImg: { type: String },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  // isActive: {
  //   type: String,
  //   enum: ['active', 'blocked'],
  //   default: 'active',
  // },
});

// pre save middleware / hook : will work on create() save()
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save data ');

  // hashing passaword and save into DB

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; //this refer kore document k
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware / hook
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Query middleware

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// eta findOne diyew kaaj korbe
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

// ?creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
// creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
