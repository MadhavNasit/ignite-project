import React, { useRef } from "react"
import { observer } from "mobx-react-lite"
import { Animated, SafeAreaView, TextStyle, View, ViewStyle } from "react-native"
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
const FlatListContainer: ViewStyle = {
  flexDirection: 'column',
  marginVertical: scale(10),
  marginLeft: scale(5)
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
  const scrollRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const translateY = scrollY.interpolate({
    inputRange: [0, 42],
    outputRange: [0, -42],
    extrapolate: 'clamp',
  });
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 46],
    outputRange: [90, 46],
    extrapolate: 'clamp',
  });

  return (
    <Screen style={ROOT} preset="fixed" statusBar='dark-content'>
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          headerText='Browse Towel'
          titleStyle={HeaderText}
          leftIcon={'back'}
          rightFirstIcon='notification'
          onLeftPress={() => navigation.navigate('primaryStack')}
          rightSecondIcon='cart'
          headerHeight={headerHeight}
          translateY={translateY}
          sortFilter
        />
        <Animated.FlatList
          ref={scrollRef}
          data={Array}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={FlatListContainer}
          numColumns={2}
          bounces={false}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: scrollY } } }
          ], { useNativeDriver: false })}
          onScrollEndDrag={(event) => {
            if (event.nativeEvent.contentOffset.y < 10) {
              Animated.timing(scrollY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false
              }).start()
            }
            else if (event.nativeEvent.contentOffset.y <= 46) {
              Animated.timing(scrollY, {
                toValue: 46,
                duration: 300,
                useNativeDriver: false
              }).start()
            }
          }
          }
          renderItem={({ item, index }) => {
            return (
              <Product
                index={index}
                item={item}
              />
            )
          }}
        />
      </SafeAreaView>
    </Screen>
  )
})
