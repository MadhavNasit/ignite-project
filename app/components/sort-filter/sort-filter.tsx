import * as React from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { color, typography } from "../../theme"
import { Text } from "../"
import { Icon } from "../icon/icon"
import scale, { verticalScale } from "../../utils/scale"

const CONTAINER: ViewStyle = {
  height: 42,
  flexDirection: 'row',
  alignItems: 'center',
}

const BOX: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: 'center',
  flexDirection: 'row',
}
const IconStyle: ImageStyle = {
  height: verticalScale(13),
  resizeMode: 'contain'
}
const BoxText: TextStyle = {
  color: color.palette.placeholder,
  fontSize: scale(15),
  lineHeight: scale(18),
  fontFamily: typography.regular
}

export interface SortFilterProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

/**
 * Describe your component here
 */
export function SortFilter(props: SortFilterProps) {

  return (
    <View style={CONTAINER}>
      <View style={[BOX, { borderRightWidth: 0.5, borderRightColor: color.palette.border }]} >
        <Icon icon='menu' style={IconStyle} />
        <Text text="Sort" style={BoxText} />
      </View>
      <View style={[BOX, { borderLeftWidth: 0.5, borderLeftColor: color.palette.border }]} >
        <Icon icon='filter' style={IconStyle} />
        <Text text="Filter" style={BoxText} />
      </View>
    </View>
  )
}
