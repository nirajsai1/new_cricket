import mongoose from 'mongoose';
const itemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true  
  },
  name: {
    type: String,
    required: true 
  },
  rating: {
    type: Number,
    required: true 
  }
});

const Item = mongoose.model('Item', itemSchema);
export default Item;
