import React from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

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
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
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
        <Text style={{ color: 'red' }}>{errors.a.b.c.message}</Text>
      )}
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
