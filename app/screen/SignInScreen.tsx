import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { signInLocal } from '../../store/auth';
import FormScreen from '../component/Form';
import Db from '../utilities/Db';

type Props = {
  navigation: any
};

type State = {
  email: string;
  password: string;
}

function SignInScreen(props: Props): ReactElement<Props> {
  const dispatch = useDispatch();
  
  const handleOnClick = async (state: State) => {
    if (!Object.values(state).reduce((total, value) => Boolean(total && value), true)) 
      return alert("Please fill the information");
      
    const results = await Db.signIn(state);
    if (typeof results === "string") alert(results);
    else dispatch(signInLocal({ name: results.name, email: results.email }));
  }

  return (
    <FormScreen
      title="Log in"
      inputs={["email", "password"]}
      onClick={handleOnClick}
      {...props}
    />
  );
}

export default SignInScreen;