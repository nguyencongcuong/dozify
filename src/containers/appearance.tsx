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
import { useAppearance } from '../store/appearance.store';
import { GoChevronDown, GoClock, GoKebabHorizontal } from 'react-icons/go';
import clsx from 'clsx';

export function Appearance() {
  const [isChangeMenuSelected, setIsChangeMenuSelected] = React.useState(false);
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
          <GoKebabHorizontal />
        </Setting.Icon>
        <Setting.Title>Change menu icon</Setting.Title>
        <Setting.Content>
          <div className='relative inline-block text-left'>
            <div
              className={clsx([
                'border border-gray-200 rounded',
                'flex items-center justify-between gap-2',
                'p-2',
                'w-24',
              ])}
              onClick={() => setIsChangeMenuSelected(!isChangeMenuSelected)}>
              <div
                className={clsx([
                  'flex items-center justify-between',
                  'cursor-pointer',
                  'w-full',
                ])}>
                <img
                  className={clsx('dark:invert')}
                  alt={'tray-icon-awake-set-' + trayIconSetNo}
                  src={trayIconSet[Number(trayIconSetNo) - 1][0]}
                  width={'16px'}
                  height={'16px'}
                />
                <img
                  className={clsx('dark:invert')}
                  alt={'tray-icon-sleep-set-' + trayIconSetNo}
                  src={trayIconSet[Number(trayIconSetNo) - 1][1]}
                  width={'16px'}
                  height={'16px'}
                />
              </div>
              <GoChevronDown />
            </div>

            <div
              className={clsx([
                isChangeMenuSelected ? '' : 'hidden',
                'origin-top-right absolute right-0',
                'mt-2 w-24 rounded-md',
                'shadow-lg',
                'ring-1 ring-black ring-opacity-5 focus:outline-none',
              ])}>
              {trayIconSet.map((set, index) => {
                return (
                  <div
                    className={clsx([
                      'flex items-center justify-between',
                      'bg-stone-50 dark:bg-stone-800',
                      'hover:bg-stone-500 duration-150 transition-all',
                      'p-2',
                      'cursor-pointer',
                    ])}
                    key={index}
                    onClick={() => {
                      setTrayIconSetNo(String(index + 1));
                      setIsChangeMenuSelected(false);
                    }}>
                    <img
                      className={clsx('dark:invert')}
                      alt={'tray-icon-awake-set-' + index + 1}
                      src={set[0]}
                      width={'16px'}
                      height={'16px'}
                    />
                    <img
                      className={clsx('dark:invert')}
                      alt={'tray-icon-sleep-set-' + index + 1}
                      src={set[1]}
                      width={'16px'}
                      height={'16px'}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Setting.Content>
      </Setting>

      <Setting>
        <Setting.Icon>
          <GoClock />
        </Setting.Icon>
        <Setting.Title>Show countdown timer</Setting.Title>
        <Setting.Content>
          <input
            className={clsx([
              'text-yellow-600',
              'focus:ring-amber-500',
              'checked:bg-yellow-500',
              'hover:bg-amber-200',
            ])}
            type='checkbox'
            checked={isRemainingTimeShown}
            onChange={(event) => toggleRemainingTime(event.target.checked)}
          />
        </Setting.Content>
      </Setting>
    </SettingWrapper>
  );
}
