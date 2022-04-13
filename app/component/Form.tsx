import React, { ReactElement, useState } from "react";
import { View, StyleSheet, Text } from 'react-native';

// import { signInLocal, signUpLocal } from "../../httpServices";
import Button from "./Button";
import TextClick from "./TextClick";
import Input from "./Input";
import routes from "../navigation/routes";

type Props = {
  title: string,
  inputs: string[],
  navigation: any,
  onClick: (arg: any) => void,
};

function FormScreen({ title, inputs, navigation, onClick }: Props): ReactElement<Props> {

  const inputValues = inputs.reduce((total: any, value) => {
    total[value] = "Test23";
    return total;
  }, {});
  const [state, setState] = useState(inputValues);

  const handleOnClick = async () => {
   try { onClick(state); }
   catch (error) { alert(error); }
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Mother Tongue App</Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Enter your log in details to</Text>
        <Text style={styles.text}>access your account</Text>
      </View>
      { inputs.map(cur => 
        <Input
          key={cur}
          id={cur}
          placeholder={cur}
          secureTextEntry={cur.includes("password")}
          value={state[cur]}
          onChangeText={text => setState(state => ({...state, [cur]: text }) )} 
        />
      )}
      <Button style={styles.submit} onPress={handleOnClick} title={title === "Log in" ? "Sign In" : "Create Account"} />
      <View style={styles.bottom}>
        <Text style={styles.alternate}>{title === "Log in" ? "Don’t " : "Already " }have an Account?
          <TextClick
            style={[styles.alternate, styles.bold]}
            onPress={() => navigation.navigate(title === "Log in" ? routes.SIGNUP : routes.SIGNIN)}
            >
            { title === "Log in" ? " Create Account" : " Sign In" }
          </TextClick>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    // paddingVertical: 50,
    paddingHorizontal: 25,
    flex: 1
  },
  title: {
    marginVertical: 30,
    // margin: 3rem 0,
    // fontFamily: 'KG What the Teacher Wants',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 24,
    lineHeight: 28,
    textAlign: 'center',
    color: '#6FCF97',
  },
  textContainer: {
    marginTop: 10,
    marginBottom: 50
  },
  text: {
    // fontFamily: 'Gilroy-Bold',
    fontSize: 20,
    lineHeight: 23,
    textAlign: 'center',
    color: '#4F4F4F',
    fontWeight: '700'
  },
  submit: {
    paddingVertical: 5,
    paddingHorizontal: 0,
    backgroundColor: '#219653',
    height: 45,
    marginTop: 60,
  },
  bottom: {
    marginTop: 'auto',
    marginBottom: '20%'
    // position: 'absolute',
    // bottom: '0%',
    // left: '50%',
    // transform: [{ translateX: -150 }, { translateY: -150}],
    // transform: [{ translateX: '-50%' }, { translateY: '-50%'}],
    // whitespace: 'nowrap',
  },
  alternate: {
    // fontFamily: 'Gilroy-Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#4F4F4F',
  },
  bold: {
    fontWeight: '700',
    textDecorationLine: 'underline'
  }
});

export default FormScreen;
