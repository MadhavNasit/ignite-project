import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { SafeAreaView, StatusBar, TextInput, TextStyle, View, ViewStyle } from "react-native";
import { Button, Header, Screen, Text } from "../../components";
import { color } from "../../theme";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { useStores } from "../../models";
import { Formik } from "formik";
import { compose } from "recompose";
import {
  handleTextInput,
  withNextInputAutoFocusInput,
  withNextInputAutoFocusForm
} from "react-native-formik";
import * as Yup from "yup";

const Form = withNextInputAutoFocusForm(View);
const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextInput);

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email("well that's not an email"),
  password: Yup.string()
    .required()
    .min(2, "pretty sure this will be hacked")
});

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.transparent,
}
const SafeAreaStyle: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.background,
}

const HeaderStyle: ViewStyle = {
  backgroundColor: color.palette.primary,
}

const HeaderText: TextStyle = {
  fontSize: 26,
  fontWeight: '700',
}

const MainView: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}

const GoogleButton: ViewStyle = {
  marginHorizontal: 50,
  marginBottom: 10
}

const FacebookButton: ViewStyle = {
  height: 40,
  width: 200,
  borderWidth: 1,
  borderColor: color.palette.primary
}

export const SignInScreen = observer(function SignInScreen() {
  const [userInfo, setUserInfo] = useState({});
  const { userAuth } = useStores();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '177794043687-jolh660epclumr3rdbuu56f3ldv7jfo9.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      iosClientId: '177794043687-2o2tlpcjg4rg5ajf9oq1g27j51ooltg7.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }, []);

  const signIn = async () => {
    console.log('In signin')
    try {
      await GoogleSignin.hasPlayServices();
      const userData = await GoogleSignin.signIn();
      userAuth.setTokenAvaible();
      setUserInfo(userData);
      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('play services not available or outdated');
      } else {
        // some other error happened
        console.log(error);
      }
    }
  };


  return (
    <Screen style={CONTAINER} preset="fixed" backgroundColor={color.palette.primary}>
      <SafeAreaView style={SafeAreaStyle}>
        <StatusBar barStyle="light-content" backgroundColor={color.palette.primary} />
        <Header style={HeaderStyle} titleStyle={HeaderText} headerText="Sign In" />
        <View style={MainView}>
          <View style={{ marginBottom: 60, transform: [{ scale: 1.5 }] }} >
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={values => console.log(values)}
              validationSchema={validationSchema}
            >
              {({ handleSubmit, errors }) => (
                <Form>
                  <View style={{ marginBottom: 8 }}>
                    <MyInput
                      placeholder='Email'
                      label="Email" name="email" type="email" style={{ borderColor: 'black', borderWidth: 1, borderRadius: 5, width: 200, height: 25 }} />
                    {errors.email &&
                      <Text text={errors.email} style={{ fontSize: 12, color: 'red' }} />
                    }
                  </View>
                  <View style={{ marginBottom: 8 }}>
                    <MyInput
                      placeholder='Password'
                      label="Password" name="password" type="password" style={{ borderColor: 'black', borderWidth: 1, borderRadius: 5, width: 200, height: 25 }} />
                    {errors.password &&
                      <Text text={errors.password} style={{ fontSize: 12, color: 'red' }} />
                    }
                  </View>
                  <Button onPress={handleSubmit} text="SUBMIT" />
                </Form>
              )}
            </Formik>
          </View>
          <View style={GoogleButton}>
            <GoogleSigninButton
              style={{ height: 50 }}
              size={GoogleSigninButton.Size.Standard}
              color={GoogleSigninButton.Color.Dark}
              onPress={() => signIn()}
            />
          </View>
          <View style={FacebookButton}>
            <LoginButton
              publishPermissions={['publish_actions']}
              style={{ flex: 1 }}
              // readPermissions={['public_profile']}
              onLoginFinished={
                (error, result) => {
                  if (error) {
                    console.log("login has error: " + result.error);
                  } else if (result.isCancelled) {
                    console.log("login is cancelled.");
                  } else {
                    AccessToken.getCurrentAccessToken().then(
                      (data) => {
                        console.log(data.token);
                        userAuth.setTokenAvaible();
                      }
                    )
                  }
                }
              }
              onLogoutFinished={() => console.log("logout.")} />
          </View>
        </View>
      </SafeAreaView>
    </Screen >
  )
})
