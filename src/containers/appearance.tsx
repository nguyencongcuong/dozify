import React from 'react';

import trayIcon1Awake from '/assets/images/trays/tray-icon-1-awake.png';
import trayIcon1Sleep from '/assets/images/trays/tray-icon-1-sleep.png';
import trayIcon2Awake from '/assets/images/trays/tray-icon-2-awake.png';
import trayIcon2Sleep from '/assets/images/trays/tray-icon-2-sleep.png';
import trayIcon3Awake from '/assets/images/trays/tray-icon-3-awake.png';
import trayIcon3Sleep from '/assets/images/trays/tray-icon-3-sleep.png';
import trayIcon4Awake from '/assets/images/trays/tray-icon-4-awake.png';
import trayIcon4Sleep from '/assets/images/trays/tray-icon-4-sleep.png';
import trayIcon5Awake from '/assets/images/trays/tray-icon-5-awake.png';
import trayIcon5Sleep from '/assets/images/trays/tray-icon-5-sleep.png';

import { SettingWrapper } from '../components/SettingWrapper';
import Setting from '../components/Setting';
import { BgColorsOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Checkbox, Flex, Select } from 'antd';
import { useAppearance } from '../store/appearance.store';

export function Appearance() {
  const {
    trayIconSetNo,
    setTrayIconSetNo,
    toggleRemainingTime,
    isRemainingTimeShown,
  } = useAppearance();

  const trayIconSet = [
    [trayIcon1Awake, trayIcon1Sleep],
    [trayIcon2Awake, trayIcon2Sleep],
    [trayIcon3Awake, trayIcon3Sleep],
    [trayIcon4Awake, trayIcon4Sleep],
    [trayIcon5Awake, trayIcon5Sleep],
  ];

  return (
    <SettingWrapper title={'Appearance'}>
      {/*Customize menu icon*/}
      <Setting>
        <Setting.Icon>
          <BgColorsOutlined />
        </Setting.Icon>
        <Setting.Title>Customize menu icon</Setting.Title>
        <Setting.Content>
          <Select
            size={'small'}
            value={trayIconSetNo}
            style={{ width: 120 }}
            onChange={(setNo) => setTrayIconSetNo(setNo)}
            options={trayIconSet.map((set, index) => ({
              value: index + 1,
              label: (
                <Flex justify={'space-between'} align={'center'}>
                  <img
                    alt={'tray-icon-awake-set-' + index + 1}
                    src={set[0]}
                    width={'16px'}
                    height={'16px'}
                  />
                  <img
                    alt={'tray-icon-sleep-set-' + index + 1}
                    src={set[1]}
                    width={'16px'}
                    height={'16px'}
                  />
                </Flex>
              ),
            }))}
          />
        </Setting.Content>
      </Setting>

      <Setting>
        <Setting.Icon>
          <ClockCircleOutlined />
        </Setting.Icon>
        <Setting.Title>Show remaining time next to menu icon</Setting.Title>
        <Setting.Content>
          <Checkbox
            checked={isRemainingTimeShown}
            onChange={(event) => toggleRemainingTime(event.target.checked)}
          />
        </Setting.Content>
      </Setting>
    </SettingWrapper>
  );
}
