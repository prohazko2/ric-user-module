const fields = {
  name: String,
  kind: String,
  value: Number,
  object: "ObjectId",
  description: String,
  layout: Object,
};

module.exports = {
  name: "examples",
  fields,
  validate: {
    name: ["required"],
    value: ["required"],
  },
  refs: {
    object: "objects",
  },
  defaults: {
    kind: "foo",
    value: 42,
  },
};
