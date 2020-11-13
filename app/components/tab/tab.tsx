import React, { useRef } from "react"
import { Animated, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { color, typography } from "../../theme"
import { Text } from "../"
import scale, { verticalScale } from "../../utils/scale"

const TabOuterView: ViewStyle = {
  alignItems: 'center',
}
const TabViewStyle: ViewStyle = {
  width: scale(274),
  height: verticalScale(38),
  marginTop: -verticalScale(19),
  borderRadius: scale(20),
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: color.palette.white,
  shadowColor: 'rgba(0,0,0,0.9)',
  shadowOffset: {
    width: 0,
    height: verticalScale(4),
  },
  shadowOpacity: 0.15,
  shadowRadius: 2.22,
  elevation: 3,
}
const TabButton: ViewStyle = {
  height: scale(38),
  width: scale(137),
  justifyContent: 'center',
  alignItems: 'center',
}
const ActiveTab: ViewStyle = {
  position: 'absolute',
  height: verticalScale(38),
  width: scale(145),
  backgroundColor: color.palette.activeTab,
  borderRadius: scale(19)
}
const ScreenName: TextStyle = {
  fontSize: scale(14),
  lineHeight: scale(16),
  fontFamily: typography.bold
}
const ActiveScreenName: TextStyle = {
  color: color.palette.primaryFont,
}
const InactiveScreenName: TextStyle = {
  color: color.palette.secondoryFont,
}

export interface TabProps {
  /**
   * An optional style override useful for padding & margin.
   */
  setIsFirstScreen?: Function
  firstScreenName?: string
  secondScreenName?: string
  activeScreen?: boolean
}

/**
 * Describe your component here
 */
export function Tab(props: TabProps) {
  const {
    setIsFirstScreen,
    firstScreenName,
    secondScreenName,
    activeScreen
  } = props;

  const animatedActiveTab = useRef(new Animated.Value(0)).current;

  const AnimateTab = (activeFlag) => {
    setIsFirstScreen(activeFlag);
    if (activeFlag) {
      Animated.timing(animatedActiveTab, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false
      }).start()
    } else {
      Animated.timing(animatedActiveTab, {
        toValue: scale(134),
        duration: 400,
        useNativeDriver: false
      }).start()
    }
  }

  // Tab button view
  const TabView = ({ screenName, flag, textColor }) => {
    return (
      <TouchableOpacity
        style={TabButton}
        onPress={() => AnimateTab(flag)}
      >
        <Text style={[ScreenName, textColor]}>{screenName}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={TabOuterView}>
      <View style={TabViewStyle}>
        {/* Animated active tab View */}
        <Animated.View style={[ActiveTab, { left: animatedActiveTab }]}></Animated.View>
        {/* Screen Tabs */}
        <TabView
          screenName={firstScreenName}
          textColor={activeScreen ? ActiveScreenName : InactiveScreenName}
          flag={true} />
        <TabView
          screenName={secondScreenName}
          textColor={!activeScreen ? ActiveScreenName : InactiveScreenName}
          flag={false} />
      </View>
    </View>
  )
}
