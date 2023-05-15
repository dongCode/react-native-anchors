import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button, TextInput, View, Text } from 'react-native';

const DynamicForm = () => {
  const { register, control, handleSubmit, setValue, watch } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <View>
      {fields.map((item, index) => (
        <View key={item.id}>
          <TextInput
            style={{ height: 40, borderWidth: 1, marginBottom: 10 }}
            placeholder="Enter item name"
            onChangeText={(text) => setValue(`items[${index}].name`, text)}
          />
          <Button onPress={() => remove(index)} title="Remove" color="red" />
        </View>
      ))}
      <Button
        onPress={() => append({ name: '' })}
        title="Add Item"
        color="green"
      />
      <Button onPress={handleSubmit(onSubmit)} title="Submit" />
    </View>
  );
};

export default DynamicForm;
