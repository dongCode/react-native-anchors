import React from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  errorText: {
    color: 'red',
  },
});

export default function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="a.b.c"
        rules={{ required: 'This field is required' }}
        render={({ field }) => (
          <TextInput
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            placeholder="Enter a.b.c"
          />
        )}
      />
      {errors?.a?.b?.c && (
        <Text style={styles.errorText}>{errors.a.b.c.message}</Text>
      )}
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
