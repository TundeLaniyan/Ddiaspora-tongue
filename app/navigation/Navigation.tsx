import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux'

import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthNavigation';

function Navigation(): ReactElement {
  const { email } = useSelector(({ user }: any) => user)
  
  return email ? <AppNavigation /> : <AuthNavigation /> ;
}

export default Navigation;