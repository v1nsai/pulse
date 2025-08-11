import React from 'react';
import { Text as DefaultText, View as DefaultView } from 'react-native';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  return (
    <DefaultText
      style={style}
      className={`${lightColor ? 'text-black' : ''} ${darkColor ? 'dark:text-white' : ''}`}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  return (
    <DefaultView
      style={style}
      className={`${lightColor ? 'bg-gray-100' : ''} ${darkColor ? 'dark:bg-gray-800' : ''}`}
      {...otherProps}
    />
  );
}
