import React from 'react';
import packageInfo from '../../package.json';
import { SettingWrapper } from '../components/SettingWrapper';
import Setting from '../components/Setting';
import {
  GoGitPullRequest,
  GoInfo,
  GoPerson,
  GoShield,
  GoShieldCheck,
} from 'react-icons/go';

export function About() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <SettingWrapper title='About'>
      <Setting>
        <Setting.Icon>
          <GoInfo />
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
          <GoGitPullRequest />
        </Setting.Icon>
        <Setting.Title>Version</Setting.Title>
        <Setting.Content>v{packageInfo.version}</Setting.Content>
      </Setting>

      <Setting>
        <Setting.Icon>
          <GoShield />
        </Setting.Icon>
        <Setting.Title>Copyright</Setting.Title>
        <Setting.Content>© {year}</Setting.Content>
      </Setting>

      <Setting>
        <Setting.Icon>
          <GoShieldCheck />
        </Setting.Icon>
        <Setting.Title>License</Setting.Title>
        <Setting.Content>Freeware</Setting.Content>
      </Setting>

      <Setting>
        <Setting.Icon>
          <GoPerson />
        </Setting.Icon>
        <Setting.Title>Creator</Setting.Title>
        <Setting.Content>{packageInfo.author.name}</Setting.Content>
      </Setting>
    </SettingWrapper>
  );
}
