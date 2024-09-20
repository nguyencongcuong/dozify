import { Typography } from 'antd';
import React from 'react';
import { SettingWrapper } from '../components/SettingWrapper';

export function Story() {
  return (
    <SettingWrapper title={'Story'}>
      <Typography>
        <Typography.Paragraph>
          Dozify is a macOS desktop app designed to effortlessly keep your Mac
          awake. Developed in 2024 as part of my ElectronJS projects, it offers
          a simple and efficient solution for preventing your Mac from going to
          sleep.
        </Typography.Paragraph>
        <Typography.Paragraph>
          Dozify is completely free—forever. No ads, no in-app purchases, and no
          paid upgrades, ever.
        </Typography.Paragraph>
      </Typography>
    </SettingWrapper>
  );
}
