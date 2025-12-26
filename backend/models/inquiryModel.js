// import mongoose from 'mongoose';

// // Schema for Epic 5: Client Interaction
// const inquirySchema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     phone: {
//       type: String,
//       required: false, // Phone number is optional
//     },
//     message: {
//       type: String,
//       required: true,
//     },
//     // (AC 16.2) We add a 'status' so admins can track the inquiry.
//     status: {
//       type: String,
//       required: true,
//       enum: ['New', 'Contacted', 'Closed'],
//       default: 'New',
//     },
//   },
//   {
//     timestamps: true, // This will give us 'createdAt' for sorting
//   }
// );

// const Inquiry = mongoose.model('Inquiry', inquirySchema);

// export default Inquiry;

import mongoose from 'mongoose';

const inquirySchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    projectType: {
      type: String,
      required: true,
      enum: [
        'Residential Design',
        'Commercial Design',
        'Hospitality Design',
        'Office Space',
        'Other',
      ],
    },
    budgetRange: {
      type: String,
      required: true,
    },
    projectDetails: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['New', 'Contacted', 'Closed'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;