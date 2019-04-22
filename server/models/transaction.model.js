var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  }
});

var Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;