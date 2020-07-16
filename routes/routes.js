const express = require('express');
const Yup = require('yup');
const TransactionModel = require('../models/TransactionModel');

const transactionRouter = express.Router();

transactionRouter.get('/', async (request, response) => {
  const { period } = request.query;
  
  if (!!period) {
    const [ year, month ] = period.split('-');

    if (!!year && !!month) {
      const transactions = await TransactionModel.find({year, month});

      return response.json({transactions});
    } else {

      return response.status(401).json({
        message: 'You must provide year and month. Ex: 2020-07'
      });
    }
  } else {
    const transactions = await TransactionModel.find();

    return response.json({transactions});
  }  
});

transactionRouter.get('/filter', async (request, response) => {
  const { value } = request.query;

  TransactionModel.ensureIndexes({description: 'text'});

  const transactions = await TransactionModel.find(
    {
      $text: {
        $search: value,
      }
    }
  );

  // const transactions = await TransactionModel.find({
  //   description: { $regex: new RegExp('salár'), $options: 'i'}
  // });

  return response.json(transactions);
});

transactionRouter.post('/', async (request, response) => {
  const {description, value, category, year, month, day, type} = request.body;

  const schema = Yup.object().shape({
    description: Yup.string().required(),
    value: Yup.number().required().strict(),
    category: Yup.string().required(),
    year: Yup.number().positive().integer().required().strict(),
    month: Yup.number().positive().integer().required().strict(),
    day: Yup.number().positive().integer().required().strict(),
    type: Yup.string().required(),
  });

  if (!(await schema.isValid({description, value, category, year, month, day, type}))) {
    return response.status(401).json({message: 'Data validation fails'});
  }

  const yearMonth = `${year}-${month}`; 
  const yearMonthDay = `${yearMonth}-${day}`;

  const transaction = {
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type
  }

  const newTrasaction = await TransactionModel.create(transaction);

  return response.json({transaction: newTrasaction});
});

transactionRouter.put('/:id', async (request, response) => {
  const { id } = request.params;

  const transaction = await TransactionModel.findById(id);

  if (!transaction) {
    return response.json({message: 'Does not exists a register with this id'});
  }

  const {description, value, category, year, month, day, type} = request.body;

  const schema = Yup.object().shape({
    description: Yup.string().required(),
    value: Yup.number().required().strict(),
    category: Yup.string().required(),
    year: Yup.number().positive().integer().required().strict(),
    month: Yup.number().positive().integer().required().strict(),
    day: Yup.number().positive().integer().required().strict(),
    type: Yup.string().required(),
  });

  if (!(await schema.isValid({description, value, category, year, month, day, type}))) {
    return response.status(401).json({message: 'Data validation fails'});
  }

  const yearMonth = `${year}-${month}`; 
  const yearMonthDay = `${yearMonth}-${day}`;

  const updatedTransaction = {
    _id: id,
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type
  }

  await TransactionModel.findByIdAndUpdate(
    id, 
    updatedTransaction,
  );

  return response.json({ transaction: updatedTransaction });
});

transactionRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const transaction = await TransactionModel.findById(id);

  if (!transaction) {
    return response.status(401).json({message: 'Do not have a register with this id'});
  }

  await TransactionModel.findByIdAndDelete(id);

  return response.json({transaction});
});

module.exports = transactionRouter;
