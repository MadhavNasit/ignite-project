import * as React from "react"
import { Image, ImageStyle, TextInput, View, ViewStyle } from "react-native"
import scale, { verticalScale } from "../../utils/scale"
import { Icon } from "../icon/icon"
import { icons } from "../icon/icons"
import { TextFieldProps } from "../text-field/text-field.props"

const IconStyle: ImageStyle = {
  height: verticalScale(24),
  width: scale(24),
  position: 'absolute',
  top: verticalScale(8),
  left: verticalScale(14),
  resizeMode: 'contain'
}
const RightIconStyle: ImageStyle = {
  height: verticalScale(20),
  width: scale(15),
  position: 'absolute',
  top: verticalScale(10),
  right: scale(14),
  resizeMode: 'contain'
}

export interface CustomInputProps extends TextFieldProps {
  outerStyle?: ViewStyle
  value?: string
  icon?: any
  placeholder?: string
  onTextChange?: Function
  activeStyle?: ViewStyle
  style?: ViewStyle
  forwardedRef?: any
  iconRight?: any
  placeHolderColor?: any
  returnkeyType: any
}

/**
 * Describe your component here
 */
export function CustomInput(props: CustomInputProps) {
  const {
    outerStyle,
    value,
    icon,
    placeholder,
    onTextChange,
    activeStyle,
    style,
    forwardedRef,
    iconRight,
    placeHolderColor,
    returnkeyType,
    ...rest
  } = props;

  const [isFocused, setIsFocussed] = React.useState(false);

  return (
    <View style={outerStyle} >
      <Icon icon={icon} style={IconStyle} />
      <TextInput
        ref={forwardedRef}
        value={value}
        style={isFocused ? activeStyle : style}
        onFocus={() => setIsFocussed(true)}
        onBlur={() => setIsFocussed(false)}
        {...rest}
        placeholder={placeholder}
        returnKeyType={returnkeyType}
        placeholderTextColor={placeHolderColor}
        onChangeText={(value) => onTextChange(value)}
      />
      {iconRight &&
        <Image source={icons[iconRight]} style={RightIconStyle} />
      }
    </View>
  )
}
