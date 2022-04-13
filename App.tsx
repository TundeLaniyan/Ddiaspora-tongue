import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import configureStore from './store/configureStore';
import Application from './app/navigation/Navigation';

export default function App() {
  const store = configureStore();

  store.subscribe(() => {
    const { entities, user } = store.getState()
    const { progress, exercise } = entities;
    console.log("Updated Game!!!");
    // console.log(progress.value);
    
    // console.log('state', {progress, exercise})
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Application />
      </NavigationContainer>
    </Provider>
  );
}