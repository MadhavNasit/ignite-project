import React from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView, StatusBar, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Header, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { icons } from "../../components/icon/icons"
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
  color: color.palette.white,
  fontSize: 26,
  fontWeight: 'bold'
}
const MainView: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}
const LogoutButton: ViewStyle = {
  borderColor: color.palette.primary,
  borderWidth: 2.5,
  borderRadius: 6,
  paddingVertical: 10,
  paddingHorizontal: 25,
}
const LogoutButtonText: TextStyle = {
  color: color.palette.primary,
  fontWeight: '600'
}

export const HomeScreen = observer(function HomeScreen() {
  // Pull in one of our MST stores
  const { userAuth } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const LogOut = () => {
    userAuth.removeTokenAvaible();
  }

  return (
    <Screen style={CONTAINER} preset="scroll" backgroundColor={color.palette.primary}>
      <SafeAreaView style={SafeAreaStyle}>
        <StatusBar barStyle="light-content" backgroundColor={color.palette.primary} />
        <Header
          headerText="Home"
          titleStyle={HeaderTitle}
          style={HeaderStyle}
        />
        <View style={MainView}>
          {/* <Text tx={userAuth.} */}
          <TouchableOpacity
            style={LogoutButton}
            onPress={LogOut}
          >
            <Text text="LogOut" style={LogoutButtonText} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Screen>
  )
})
