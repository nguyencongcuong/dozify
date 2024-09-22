import React from 'react';
import clsx from 'clsx';

interface SettingWrapperProps {
  title: string;
  children: React.ReactNode;
}

export function SettingWrapper(props: SettingWrapperProps) {
  return (
    <div
      className={clsx([
        'border',
        'rounded',
        'p-4',
        'bg-gray-50',
        'border-stone-200 dark:border-stone-500',
        'dark:bg-stone-700',
      ])}>
      <div className={clsx(['font-bold', 'mb-4', 'dark:text-stone-100'])}>
        {props.title}
      </div>
      <div className=''>{props.children}</div>
    </div>
  );
}
