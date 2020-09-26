import React from "react"
import { View, ViewStyle, TextStyle, TouchableOpacity } from "react-native"
import { HeaderProps } from "./header.props"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { spacing } from "../../theme"
import { translate } from "../../i18n/"
import { useStores } from "../../models"

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing[3],
  alignItems: "center",
  paddingTop: spacing[4],
  paddingBottom: spacing[4],
  justifyContent: "flex-start",
}
const TITLE: TextStyle = { textAlign: "center" }
const TITLE_MIDDLE: ViewStyle = { flex: 4, justifyContent: "center" }
const LEFT: ViewStyle = { flex: 1 }
const RIGHT: ViewStyle = { flex: 1 }

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const {
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
    headerText,
    headerTx,
    style,
    titleStyle,
    buttonStyle,
    buttonTextStyle
  } = props
  const header = headerText || (headerTx && translate(headerTx)) || ""
  const { userAuth } = useStores()
  const LogOut = () => {
    userAuth.removeTokenAvaible();
  }

  return (
    <View style={{ ...ROOT, ...style }}>
      {leftIcon ? (
        <Button preset="link" onPress={onLeftPress}>
          <Icon icon={leftIcon} />
        </Button>
      ) : (
          <View style={LEFT} />
        )}
      <View style={TITLE_MIDDLE}>
        <Text style={{ ...TITLE, ...titleStyle }} text={header} />
      </View>
      {rightIcon ? (
        <TouchableOpacity
          style={buttonStyle}
          onPress={onRightPress}
        >
          <Text text="LogOut" style={buttonTextStyle} />
        </TouchableOpacity>
        // <Button preset="link" onPress={LogOut}>
        //   <Icon icon={rightIcon} />
        // </Button>
      ) : (
          <View style={RIGHT} />
        )}
    </View>
  )
}
