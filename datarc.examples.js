const fields = {
  name: String,
  value: Number,
  description: String
};

const validate = {
  name: ['required'],
  value: ['required']
};

const defaults = {
  value: 1
};

module.exports = {
  name: 'examples',
  fields,
  validate,
  defaults
};
