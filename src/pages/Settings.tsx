import React from 'react';
import { Space } from 'antd';
import { About } from '../containers/about';
import { Appearance } from '../containers/appearance';

export function SettingsPage() {
  return (
    <Space direction='vertical' style={{ display: 'flex' }}>
      <Appearance />
      <About />
    </Space>
  );
}
