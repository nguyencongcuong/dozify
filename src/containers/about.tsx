import React from 'react';
import packageInfo from '../../package.json';
import { SettingWrapper } from '../components/SettingWrapper';
import Setting from '../components/Setting';
import {
  CodeOutlined,
  CopyrightCircleOutlined,
  FileProtectOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';

export function About() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <SettingWrapper title='About'>
      <Setting>
        <Setting.Icon>
          <InfoCircleOutlined />
        </Setting.Icon>
        <Setting.Title>Application</Setting.Title>
        <Setting.Content>
          <a
            className={'underline'}
            href={packageInfo.homepage}
            target={'_blank'}
            rel={'noopener noreferrer'}>
            {packageInfo.productName}
          </a>
        </Setting.Content>
      </Setting>

      <Setting>
        <Setting.Icon>
          <FileTextOutlined />
        </Setting.Icon>
        <Setting.Title>Description</Setting.Title>
        <Setting.Content>{packageInfo.description}</Setting.Content>
      </Setting>

      <Setting>
        <Setting.Icon>
          <CodeOutlined />
        </Setting.Icon>
        <Setting.Title>Version</Setting.Title>
        <Setting.Content>v{packageInfo.version}</Setting.Content>
      </Setting>

      <Setting>
        <Setting.Icon>
          <CopyrightCircleOutlined />
        </Setting.Icon>
        <Setting.Title>Copyright</Setting.Title>
        <Setting.Content>© {year}</Setting.Content>
      </Setting>

      <Setting>
        <Setting.Icon>
          <FileProtectOutlined />
        </Setting.Icon>
        <Setting.Title>License</Setting.Title>
        <Setting.Content>
          <Tooltip title='Dozify is always free, with no ads or in-app purchases'>
            <span>Freeware</span>
          </Tooltip>
        </Setting.Content>
      </Setting>

      <Setting>
        <Setting.Icon>
          <UserOutlined />
        </Setting.Icon>
        <Setting.Title>Creator</Setting.Title>
        <Setting.Content>{packageInfo.author.name}</Setting.Content>
      </Setting>
    </SettingWrapper>
  );
}
