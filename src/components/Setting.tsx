import React from 'react';
import { Col, Flex, Row, Typography } from 'antd';

// Define the Setting component interface to include static subcomponents
interface SettingComponent extends React.FC<{ children: React.ReactNode }> {
  Title: React.FC<{ children: React.ReactNode }>;
  Icon: React.FC<{ children: React.ReactNode }>;
  Content: React.FC<{ children: React.ReactNode }>;
}

// Define the Setting component
const Setting: SettingComponent = ({ children }) => {
  return <Row>{children}</Row>;
};

const SettingIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Col span={1}>{children}</Col>;
};

// Define the Setting.Title subcomponent
const SettingTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Col span={11}>
      <Typography.Text>{children}</Typography.Text>
    </Col>
  );
};

const SettingContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Col span={12}>
      <Flex justify={'flex-end'}>{children}</Flex>
    </Col>
  );
};

// Attach the SettingTitle as a static property of the Setting component
Setting.Icon = SettingIcon;
Setting.Title = SettingTitle;
Setting.Content = SettingContent;

export default Setting;
