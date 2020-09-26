import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, Image, ImageStyle, SafeAreaView, StatusBar, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Header, Icon, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.transparent,
}
const SafeAreaStyle: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.background,
}
const HeaderStyle: ViewStyle = {
  backgroundColor: color.palette.primary
}
const HeaderTitle: TextStyle = {
  flex: 1,
  color: color.palette.white,
  fontSize: 26,
  fontWeight: 'bold'
}
const MainView: ViewStyle = {
  flex: 1,
  // justifyContent: 'center',
  // alignItems: 'center',
  paddingHorizontal: spacing[4]
}
const LogoutButton: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  borderColor: color.palette.white,
  borderWidth: 1,
  borderRadius: 6,
  // paddingVertical: 6,
  // paddingHorizontal: 6,
}
const LogoutButtonText: TextStyle = {
  paddingVertical: 4,
  color: color.palette.white,
  fontWeight: '600'
}

const FlatListView: ViewStyle = {
  paddingVertical: 10
}
const SubHeadingView: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
}
const SubHeadingText: TextStyle = {
  fontWeight: 'bold'
}
const IconStyle: ImageStyle = {
  height: 30,
  width: 30,
  borderRadius: 30,
  borderWidth: 0.5,
}

export const HomeScreen = observer(function HomeScreen() {
  // Pull in one of our MST stores
  const { userAuth, apiData } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  useEffect(() => {
    apiData.getApiData(1);
  }, [])

  const LogOut = () => {
    userAuth.removeTokenAvaible();
    // apiData.getApiData();
  }
  const renderView = ({ item, index }) => {
    return (
      <View key={index} style={FlatListView}>
        <View style={SubHeadingView}>
          <Text style={SubHeadingText}>{item.name}</Text>
          <Image source={{ uri: item.icon }} style={IconStyle} />
        </View>
        <View>
          <FlatList
            data={item.media}
            renderItem={(item) => {
              return (
                <View>
                  <Text>{item.item.caption}</Text>
                </View>
              )
            }}
          ></FlatList>
        </View>
      </View>
    )
  }

  return (
    <Screen style={CONTAINER} preset="scroll" backgroundColor={color.palette.primary}>
      <SafeAreaView style={SafeAreaStyle}>
        <StatusBar barStyle="light-content" backgroundColor={color.palette.primary} />
        <Header
          headerText="Home"
          titleStyle={HeaderTitle}
          style={HeaderStyle}
          rightIcon={'logout'}
          buttonStyle={LogoutButton}
          buttonTextStyle={LogoutButtonText}
          onRightPress={LogOut}
        />
        <View style={MainView}>
          <FlatList
            data={apiData.categoryData}
            renderItem={renderView}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </SafeAreaView>
    </Screen>
  )
})
