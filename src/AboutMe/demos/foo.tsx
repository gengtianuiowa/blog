import React from 'react';
import { Button, message } from 'antd';

export default () => {
  return <Button onClick={() => message.success('yes')}> test</Button>;
};
