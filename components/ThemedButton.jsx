import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Pressable } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedButtonProps = Pressable & {
  title: string;
  lightColor?: string;
  darkColor?: string;
  textLightColor?: string;
  textDarkColor?: string;
  type?: 'default' | 'primary' | 'secondary' | 'outline';
};

export function ThemedButton({
  title,
  style,
  lightColor = 'white',
  darkColor = 'black',
  textLightColor = 'white',
  textDarkColor = 'black',
  type = 'default',
  ...rest
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor({ light: darkColor, dark: lightColor }, 'background');
  const textColor = useThemeColor({ light: textLightColor, dark: textDarkColor }, 'text');

  return (
    <Pressable
      style={[
        styles.button,
        { backgroundColor },
        type === 'default' ? styles.defaultButton : undefined,
        type === 'primary' ? styles.primaryButton : undefined,
        type === 'secondary' ? styles.secondaryButton : undefined,
        type === 'outline' ? styles.outlineButton : undefined,
        style,
      ]}
      {...rest}
    >
      <Text
        style={[
          styles.text,
          { color: textColor },
          type === 'outline' ? styles.outlineText : undefined,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  
});