import React from 'react';

import { i18n, store } from 'util';
import { Form, Field, Text, Numeric, Button, Select } from 'ui';

export default ({ item, onChange }) => (
  <Form responsive item={item} key={item._id} onChange={onChange}>
    <Field name="name" component={<Text />} />
    <Field name="value" component={<Numeric />} />
    <Field name="description" component={<Text area />} />
  </Form>
);
