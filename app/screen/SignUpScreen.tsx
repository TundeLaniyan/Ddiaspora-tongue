import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { signInLocal } from '../../store/auth';
import FormScreen from '../component/Form';
import Db from '../utilities/Db';

type Props = {
  navigation: any
};

type State = {
  email: string,
  password: string,
  "confirm password": string,
  name: string,
}

function SignUpScreen(props: Props): ReactElement<Props> {
  const dispatch = useDispatch();

  const handleOnClick = async (state: State) => {
    if (!Object.values(state).reduce((total, value) => Boolean(total && value), true))
      return alert("Please fill the information");

    if (state.password !== state["confirm password"])
      return alert("password not the same");
      
    const results = await Db.signUp(state);
    alert(results);
    if (results === "You have created an account") 
      dispatch(signInLocal({ name: state.name, email: state.email }));
  }

  return (
    <FormScreen
      title="Sign up"
      inputs={["name", "email", "password", "confirm password"]}
      onClick={handleOnClick}
      {...props}
    />
  );
}

export default SignUpScreen;