import { ReactElement } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';

type Props = {
  value: string,
  onChange: any,
  error: string,
  placeholder: string,
  type: string
};

function Input({ value, onChange, error, placeholder, type, ...props }: Props): ReactElement<Props> {
  return (
    <View style={styles.input}>
      <TextInput 
        type={type}
        style={styles.inputField}
        value={value} 
        onChange={onChange} 
        placeholder={placeholder[0].toUpperCase() + placeholder.slice(1)}
        {...props}
      />
      <Text style={styles.inputError}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {},
  container: {
    width: '100%',
    marginTop: 30
  },
  inputField: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#BDBDBD',
    borderRadius: 5,
    // boxSizing: 'border-box',
    width: '100%',
    height: 49,
    paddingHorizontal: 20,
    paddingVertical: 0,
    // fontFamily: 'Gilroy-Regular',
    fontSize: 18,
    lineHeight: 21,
    // color: '#E0E0E0',
    color: 'black'
  },
  inputError: {}
});

export default Input;