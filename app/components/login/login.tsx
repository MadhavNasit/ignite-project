import React, { useRef, useState } from "react"
import { Keyboard, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { color, typography } from "../../theme"
import { Text } from "../"
import scale, { verticalScale } from "../../utils/scale"
import { CustomInput } from "../custom-input/custom-input"

const TextInputOuterView: ViewStyle = {
  marginBottom: verticalScale(13)
}
const InputStyle: ViewStyle = {
  height: verticalScale(40),
  borderWidth: 1,
  borderRadius: scale(20),
  borderColor: 'rgb(219,219,219)',
  paddingLeft: scale(56)
}
const FocusedInput: TextStyle = {
  height: verticalScale(40),
  borderWidth: 1,
  borderRadius: scale(20),
  borderColor: 'blue',
  color: 'blue',
  paddingLeft: scale(56)
}
const SubmitButton: ViewStyle = {
  marginTop: verticalScale(13),
  marginBottom: verticalScale(26),
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: scale(22),
  backgroundColor: color.palette.buttonDisabled,
  height: verticalScale(44)
}
const ButtonText: TextStyle = {
  fontSize: scale(14),
  fontFamily: typography.bold,
  color: color.palette.primaryFont,
  textAlign: 'center',
  lineHeight: scale(16)
}
const ForgotText: TextStyle = {
  color: color.palette.charcoalGrey,
  textAlign: 'center',
  fontSize: scale(13),
  fontFamily: typography.medium
}

export interface LoginProps {
  /**
   * An optional style override useful for padding & margin.
   */
  containerStyle?: ViewStyle
}

/**
 * Describe your component here
 */
export function Login(props: LoginProps) {
  const {
    containerStyle,
  } = props;

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <View style={containerStyle}>
      <CustomInput
        value={email}
        forwardedRef={emailRef}
        icon='email'
        outerStyle={TextInputOuterView}
        style={InputStyle}
        activeStyle={FocusedInput}
        placeholder='Email'
        placeHolderColor={color.palette.placeholder}
        onTextChange={(value) => setEmail(value)}
        returnkeyType='next'
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <CustomInput
        value={password}
        forwardedRef={passwordRef}
        icon='key'
        iconRight='private'
        outerStyle={TextInputOuterView}
        style={InputStyle}
        activeStyle={FocusedInput}
        placeholder='Password'
        placeHolderColor={color.palette.placeholder}
        onTextChange={(value) => setPassword(value)}
        returnkeyType='done'
        onSubmitEditing={() => Keyboard.dismiss()}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={SubmitButton}
      >
        <Text style={ButtonText}>{`LOG IN`}</Text>
      </TouchableOpacity>
      <Text style={ForgotText}>{`Forgot Password ?`}</Text>
    </View>
  )
}
