import React from 'react';
import clsx from 'clsx';

// Define the Setting component interface to include static subcomponents
interface SettingComponent extends React.FC<{ children: React.ReactNode }> {
  Title: React.FC<{ children: React.ReactNode }>;
  Icon: React.FC<{ children: React.ReactNode }>;
  Content: React.FC<{ children: React.ReactNode }>;
}

// Define the Setting component
const Setting: SettingComponent = ({ children }) => {
  return (
    <div
      className={clsx([
        'grid',
        'grid-cols-12',
        'border border-stone-200 dark:border-stone-500',
        'rounded',
        'my-2 p-2',
      ])}>
      {children}
    </div>
  );
};

const SettingIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className={clsx([
        'col-span-1',
        'dark:text-stone-100',
        'flex items-center',
      ])}>
      {children}
    </div>
  );
};

// Define the Setting.Title subcomponent
const SettingTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className={clsx(['col-span-6', 'flex items-center'])}>
      <div className={clsx(['dark:text-stone-100'])}>{children}</div>
    </div>
  );
};

const SettingContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className={'col-span-5'}>
      <div className={clsx(['text-right', 'dark:text-stone-100'])}>
        {children}
      </div>
    </div>
  );
};

// Attach the SettingTitle as a static property of the Setting component
Setting.Icon = SettingIcon;
Setting.Title = SettingTitle;
Setting.Content = SettingContent;

export default Setting;
