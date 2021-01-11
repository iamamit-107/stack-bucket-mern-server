const { model, Schema } = require("mongoose");

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    default: 0,
  },
  quantity: String,
  isComplete: {
    type: Boolean,
    default: false,
  },
});

const Item = model("Item", ItemSchema);

module.exports = Item;
