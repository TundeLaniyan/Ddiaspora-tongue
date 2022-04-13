import { ReactElement } from 'react';
import { 
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity } from 'react-native';

import Button from '../component/Button';
import routes from '../navigation/routes';

type Props = {
  navigation: {
    navigate: () => {}
  }
};

// const window = Dimensions.get('window');

function HomeScreen({ navigation }: any): ReactElement<Props> {
  return (
    <ImageBackground style={styles.home} source={require("../assets/homeimage.jpg")}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/logo.svg')} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Mother Tongue App</Text>   
        <Text style={styles.subTitle}>A revolutionary way to learn a language</Text>
      </View>
      <View style={styles.bottom}>
        <Button 
          style={styles.signIn} 
          styleText={styles.signInText} 
          title="Sign in" 
          onPress={() => navigation.navigate(routes.SIGNIN)}
        />
        <TouchableOpacity onPress={() => navigation.navigate(routes.SIGNUP)}>
          <Text style={styles.createAccount}>Don’t have an Account?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  home: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    // backgroundSize: 'cover',
    // backgroundPosition: '50% 0%",
  },
  logoContainer: {
    textAlign: 'left',
    padding: 20,
  },
  logo: {
    height: 60,
  },
  titleContainer: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -60 }],
    backgroundColor: 'rgba(115, 76, 65, 0.9)',
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    marginHorizontal: '10%',
    width: '80%'
    // left: '50%',
    // transform: [{ translate: '-50%' }],
    // width: 100%,
    // boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    // whiteSpace: 'nowrap',
  },
  title: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 29,
    textAlign: 'center',
    color: '#6fcf97',
    // fontWeight: 650,
    // font-size: 8.2rem,
    // fontSize: 9vw,
  },
  subTitle: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.5,
    textAlign: 'center',
    color: '#FFE898',
    // fontFamily: 'Sansation',
    // fontSize: '4.5vw',
  },
  bottom: {
    position: 'absolute',
    top: '80%',
    alignItems: 'center',
    width: '100%',
    // transform: 'translate(-50%, -50%)',
  },
  signIn: {
    alignItems: 'center',
    width: 200,
    backgroundColor: '#219653',
  },
  signInText: {
    color: 'white'
  },
  createAccount: {
    marginTop: 30,
    lineHeight: 19,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 15,
    // fontFamily: 'Gilroy-Regular',
    // whiteSpace: 'nowrap',
    // fontSize: '4.5vw',
  }

});

export default HomeScreen;
