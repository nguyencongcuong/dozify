import React from 'react';
import { About } from '../containers/about';
import { Appearance } from '../containers/appearance';
import clsx from 'clsx';

export function SettingsPage() {
  return (
    <div className={clsx(['flex flex-col gap-4 p-2'])}>
      <Appearance />
      <About />
    </div>
  );
}
