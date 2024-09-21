import { ThemeConfig } from 'antd';
import { WritableDraft } from 'immer';
import { gray, greyDark, yellow } from '@ant-design/colors';

interface ITheme {
  LIGHT: WritableDraft<ThemeConfig>;
  DARK: WritableDraft<ThemeConfig>;
}

export const THEME: ITheme = {
  LIGHT: {
    token: {
      fontSize: 12,
      fontFamily: 'Poppins, sans-serif',
      colorText: gray[12],
      colorBgBase: 'white',
      colorPrimary: gray[6],
      colorPrimaryBg: gray[1],
    },
  },
  DARK: {
    token: {
      fontSize: 12,
      fontFamily: 'Poppins, sans-serif',
      colorText: gray[2],
      colorBgBase: greyDark[2],
      colorPrimary: yellow[6],
      colorPrimaryBg: yellow[6],
    },
  },
};
