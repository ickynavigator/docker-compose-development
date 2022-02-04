import mongoose from 'mongoose';

const formSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    resolved: { type: Boolean, default: false },
  },
  { timestamps: true },
);
const Form = mongoose.model('Form', formSchema);

export default Form;
