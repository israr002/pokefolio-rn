import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from 'theme/theme';

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  testID?: string;
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
  testID,
}: FormInputProps<T>) => {

  const styles = StyleSheet.create({
    container: {
      marginBottom: SPACING[4],
    },
    label: {
      fontSize: TYPOGRAPHY.fontSize.base,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      color: COLORS.text.dark,
      marginBottom: SPACING[2],
    },
    input: {
      backgroundColor: COLORS.card.light,
      borderRadius: BORDER_RADIUS.base,
      padding: SPACING[3],
      fontSize: TYPOGRAPHY.fontSize.base,
      color: COLORS.text.dark,
      borderWidth: 1,
      borderColor: error ? COLORS.text.error : COLORS.border.light,
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
            testID={testID}
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
