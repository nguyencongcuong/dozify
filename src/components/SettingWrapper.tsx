import React from 'react';
import { Card } from 'antd';

interface SettingWrapperProps {
  title: string;
  children: React.ReactNode;
}

export function SettingWrapper(props: SettingWrapperProps) {
  return (
    <Card title={props.title} size={'small'}>
      {props.children}
    </Card>
  );
}
