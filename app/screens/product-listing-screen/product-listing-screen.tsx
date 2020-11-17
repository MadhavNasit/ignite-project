import React from "react"
import { observer } from "mobx-react-lite"
import { FlatList, TextStyle, ViewStyle } from "react-native"
import { Header, Product, Screen } from "../../components"
import { color, typography } from "../../theme"
import scale from "../../utils/scale"
import { useNavigation } from "@react-navigation/native"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const HeaderText: TextStyle = {
  color: color.palette.charcoalGrey,
  fontSize: scale(15),
  lineHeight: scale(18),
  fontFamily: typography.medium
}

const Array = [
  { image: 'towel1', productName: 'Product 1', price: 220 },
  { image: 'towel2', productName: 'Product 2', price: 220 },
  { image: 'towel2', productName: 'Product 3', price: 42 },
  { image: 'towel1', productName: 'Product 4', price: 80 },
  { image: 'towel1', productName: 'Product 5', price: 220 },
  { image: 'towel2', productName: 'Product 6', price: 220 },
  { image: 'towel2', productName: 'Product 7', price: 42 },
  { image: 'towel1', productName: 'Product 8', price: 80 }
]

export const ProductListingScreen = observer(function ProductListingScreen() {

  const navigation = useNavigation();

  return (
    <Screen style={ROOT} preset="fixed" statusBar='dark-content'>
      <Header
        headerText='Browse Towel'
        titleStyle={HeaderText}
        leftIcon={'back'}
        rightFirstIcon='notification'
        onLeftPress={() => navigation.navigate('primaryStack')}
        rightSecondIcon='cart'
        sortFilter
      />
      <FlatList
        data={Array}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexDirection: 'column', alignItems: 'center', marginVertical: scale(10) }}
        numColumns={2}
        renderItem={({ item, index }) => {
          return (
            <Product
              index={index}
              item={item}
            />
          )
        }}
      />
    </Screen>
  )
})
