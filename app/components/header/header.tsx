import React from "react"
import { View, ViewStyle, TextStyle, ImageStyle, Animated } from "react-native"
import { HeaderProps } from "./header.props"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { translate } from "../../i18n/"
import scale, { verticalScale } from "../../utils/scale"
import { SortFilter } from "../sort-filter/sort-filter"
import { color } from "../../theme"

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingLeft: scale(18),
  paddingRight: scale(20),
  alignItems: "center",
  paddingTop: verticalScale(13),
  paddingBottom: verticalScale(13),
  justifyContent: "flex-start",
}
const TITLE: TextStyle = { textAlign: "center" }
const TITLE_MIDDLE: ViewStyle = { flex: 4, justifyContent: "center" }
const LEFT: ViewStyle = { width: 44 }
const RIGHT: ViewStyle = { width: 44 }
const ICONSTYLE: ImageStyle = {
  height: verticalScale(18),
  maxWidth: scale(18),
  resizeMode: 'contain',
}
const MultiplerightIcon: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-end'
}
const SHADOW: ViewStyle = {
  backgroundColor: color.palette.white,
  shadowColor: 'rgba(216, 226, 234, 0.5)',
  shadowOffset: { width: 0, height: verticalScale(1) },
  shadowOpacity: 1,
  shadowRadius: 3,
  elevation: 5,
}

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const {
    onLeftPress,
    onFirstRightPress,
    onSecondRightPress,
    rightFirstIcon,
    rightSecondIcon,
    leftIcon,
    headerText,
    headerTx,
    sortFilter,
    style,
    titleStyle,
    headerHeight,
    translateY
  } = props
  const header = headerText || (headerTx && translate(headerTx)) || ""

  return (
    <Animated.View style={{ overflow: 'hidden', paddingBottom: 5, height: headerHeight }}>
      <View style={SHADOW}>
        <Animated.View style={[{ ...ROOT, ...style, transform: [{ translateY: translateY }], }]}>
          {leftIcon ? (
            <Button preset="link" onPress={onLeftPress} style={{ flex: 1 }}>
              <Icon icon={leftIcon} style={ICONSTYLE} />
            </Button>
          ) : (
              <View style={LEFT} />
            )}
          <View style={TITLE_MIDDLE}>
            <Text style={{ ...TITLE, ...titleStyle }} text={header} numberOfLines={1} />
          </View>
          {rightFirstIcon || rightSecondIcon ? (
            <View style={MultiplerightIcon}>
              <Button preset="link" onPress={onFirstRightPress} style={{ marginRight: scale(11.5) }}>
                <Icon icon={rightFirstIcon} style={ICONSTYLE} />
              </Button>
              <Button preset="link" onPress={onSecondRightPress}>
                <Icon icon={rightSecondIcon} style={ICONSTYLE} />
              </Button>
            </View>
          ) : (
              <View style={RIGHT} />
            )}
        </Animated.View>
        {sortFilter &&
          <SortFilter
            translateY={translateY} />
        }
      </View>
    </Animated.View>
  )
}
