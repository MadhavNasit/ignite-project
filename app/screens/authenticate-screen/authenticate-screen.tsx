import React, { useState } from 'react';
import { SafeAreaView, View, StatusBar, TouchableOpacity, ViewStyle, TextStyle, ImageStyle, Platform } from 'react-native';
import { observer } from "mobx-react-lite"
import { Icon, Login, Signin, Tab, Text } from "../../components"
import { color, typography } from '../../theme';
import scale, { verticalScale } from '../../utils/scale';
import { useNavigation } from '@react-navigation/native';

const Container: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.primary
}

// HeadingStyles
const HeadingViewStyle: ViewStyle = {
  height: verticalScale(172) - (Platform.OS == 'ios' ? 20 : StatusBar.currentHeight),
  paddingLeft: scale(27),
  paddingRight: scale(25),
  justifyContent: 'center'
}
const BrandName: TextStyle = {
  color: color.palette.primaryFont,
  fontSize: scale(21),
  lineHeight: scale(24),
  textAlign: 'left',
  fontFamily: typography.bold,
  marginBottom: scale(12)
}
const BrandSlogan: TextStyle = {
  fontFamily: typography.regular,
  color: color.palette.primaryFont,
  fontSize: scale(15),
  lineHeight: scale(18),
  textAlign: 'left',
}

// Content view styles
const ContentView: ViewStyle = {
  backgroundColor: color.palette.white,
  borderTopStartRadius: scale(10),
  borderTopEndRadius: scale(10),
  marginTop: -verticalScale(4),
}
const FormContainerSignUp: ViewStyle = {
  height: verticalScale(298),
  paddingTop: verticalScale(54),
  paddingHorizontal: scale(32)
}
const FormContainerLogIn: ViewStyle = {
  height: verticalScale(282),
  paddingTop: verticalScale(54),
  paddingHorizontal: scale(32)
}

// Bottom view style
const SignupViaView: ViewStyle = {
  flexGrow: 1,
  height: verticalScale(172),
  backgroundColor: color.palette.paleGrey,
  alignItems: 'center'
}
const TextLight: TextStyle = {
  marginVertical: verticalScale(15),
  color: color.palette.placeholder,
  fontSize: scale(11),
  lineHeight: scale(13),
  fontFamily: typography.regular
}
const SocialMediaView: ViewStyle = {
  flexDirection: 'row',
  marginHorizontal: scale(20),
  marginBottom: verticalScale(15)
}
const SocialMediaButtonStyle: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  width: scale(110),
  marginRight: scale(2),
  paddingVertical: verticalScale(11),
  borderRadius: scale(19)
}
const SocialMediaIcon: ImageStyle = {
  height: scale(14),
  width: scale(17),
  resizeMode: 'contain',
  marginRight: scale(6)
}
const SocialMediaButtonText: TextStyle = {
  fontFamily: typography.bold,
  fontSize: scale(14),
  lineHeight: scale(16),
  color: color.palette.primaryFont
}
const AgreeText: TextStyle = {
  fontFamily: typography.light,
  fontSize: scale(13),
  lineHeight: scale(15),
  color: color.palette.placeholder,
  marginBottom: verticalScale(9)
}
const TCText: TextStyle = {
  fontFamily: typography.medium,
  fontSize: scale(13),
  lineHeight: scale(15),
  color: color.palette.charcoalGrey,
  marginBottom: verticalScale(9)
}
const GuestText: TextStyle = {
  fontFamily: typography.medium,
  fontSize: scale(15),
  lineHeight: scale(18),
  color: color.palette.placeholder,
  marginBottom: verticalScale(9)
}


export const AuthenticateScreen = observer(function AuthenticateScreen() {

  const navigation = useNavigation();
  /**
   * true - Sign Up
   * false - Log In
   */
  const [isFirstScreen, setIsFirstScreen] = useState(true);

  /**
   * Heading View - with brand name and brand slogan
   */
  const HeadingView = () => {
    return (
      <View style={HeadingViewStyle}>
        <Text style={BrandName}>{`Dr.Linen`}</Text>
        <Text style={BrandSlogan}>{`Get started and discover the best offers around you`}</Text>
      </View>
    )
  }

  /**
   * Social Media Button - render optional sign in options using social media
   */
  const SocialMediaButton = ({ icon, name, bgColor }) => {
    return (
      <TouchableOpacity style={[SocialMediaButtonStyle, { backgroundColor: bgColor }]}>
        <Icon icon={icon} style={SocialMediaIcon} />
        {/* <Image source={icons[icon]} style={SocialMediaIcon} /> */}
        <Text style={SocialMediaButtonText}>{name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={Container}>
      <StatusBar barStyle='light-content' backgroundColor={color.primary} />
      {/* Render Heading */}
      <HeadingView />

      {/* Form View */}
      <View style={ContentView}>
        {/* Tab View */}
        <Tab
          firstScreenName={'Sign Up'}
          secondScreenName={'Log In'}
          setIsFirstScreen={(flag) => setIsFirstScreen(flag)}
          activeScreen={isFirstScreen}
        />
        {/* form view of sign up & log in */}
        <View>
          {isFirstScreen ? (
            <Signin
              containerStyle={FormContainerSignUp}
            />
          ) : (
              <Login
                containerStyle={FormContainerLogIn}
              />
            )}
        </View>
      </View>
      {/* Optional sign up/log in methods and terms and codition */}
      <View style={SignupViaView}>
        <Text style={TextLight}>{`or Sign up via`}</Text>
        <View
          style={SocialMediaView}
        >
          <SocialMediaButton
            icon='facebook'
            name='Facebook'
            bgColor={color.palette.facebook}
          />
          <SocialMediaButton
            icon='gmail'
            name='Google'
            bgColor={color.palette.google}
          />
          <SocialMediaButton
            icon='apple'
            name='Apple'
            bgColor={color.palette.apple}
          />
        </View>
        {isFirstScreen &&
          <>
            <Text style={AgreeText}>{`By Signing Up you agree with our`}</Text>
            <Text style={TCText}>{`Terms & Conditions & Provacy Policy`}</Text>
          </>
        }
        <TouchableOpacity onPress={() => navigation.navigate('productListing')}>
          <Text style={GuestText}>{`Skip & Continue as Guest`}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  );
})
