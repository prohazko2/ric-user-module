import React from "react";

import { i18n, store } from "util";
import { Form, Field, Text, Numeric, Data, Button, Select } from "ui";

export default ({ item, onChange }) => (
  <Form responsive item={item} key={item._id} onChange={onChange}>
    <Field name="name" component={<Text />} />
    <Field name="kind" component={<Select values={["foo", "bar"]} />} initWith="foo" />
    <Field name="value" component={<Numeric />} initWith={42} />
    <Field name="object" component={<Select store="objects" />} />
    <Field name="description" component={<Text area />} />
    <Field
      name="yaml"
      labelText={i18n.code}
      collapseTo={i18n.set}
      component={<Data language="yaml" modes={[]} />}
    />
  </Form>
);
