import React from 'react';

import { i18n, store } from 'util';
import { Form, Field, Text, Numeric, Button, Select } from 'ui';

import styles from '../assets/styles.css';

export default ({ module }) => (
  <div className={styles.viewport}>
    <Button of="primary" onClick={() => console.log('test')}>
      Test
    </Button>
  </div>
);
