const {Schema, model} = require('mongoose');

let schema = new Schema({
  description: {
    type: String,
    required: true,
  },
  
  value: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  year: {
    type: Number,
    required: true,
  },

  month: {
    type: Number,
    required: true,
  },

  day: {
    type: Number,
    required: true,
  },

  yearMonth: {
    type: String,
    required: true,
  },
  
  yearMonthDay: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },
});

schema.index({description: 'text'});

const TransactionModel = model('transaction', schema);

module.exports = TransactionModel;
