import React from 'react';
import { View, Text, TextInput, StyleSheet, useColorScheme } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../theme/theme';

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
}

const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
}: FormInputProps<T>) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const styles = StyleSheet.create({
    container: {
      marginBottom: SPACING[4],
    },
    label: {
      fontSize: TYPOGRAPHY.fontSize.base,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      color: isDarkMode ? COLORS.text.light : COLORS.text.dark,
      marginBottom: SPACING[2],
    },
    input: {
      backgroundColor: isDarkMode ? COLORS.card.dark : COLORS.card.light,
      borderRadius: BORDER_RADIUS.base,
      padding: SPACING[3],
      fontSize: TYPOGRAPHY.fontSize.base,
      color: isDarkMode ? COLORS.text.light : COLORS.text.dark,
      borderWidth: 1,
      borderColor: error ? COLORS.text.error : isDarkMode ? COLORS.border.dark : COLORS.border.light,
    },
    errorText: {
      color: COLORS.text.error,
      fontSize: TYPOGRAPHY.fontSize.sm,
      marginTop: SPACING[1],
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={COLORS.text.gray}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
          />
        )}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default FormInput; 