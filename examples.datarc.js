const fields = {
  name: String,
  value: Number,
  description: String
};

const validate = {
  name: ['required'],
  value: ['required']
};

module.exports = {
  name: 'items',
  fields,
  validate
};
