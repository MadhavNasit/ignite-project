import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Animated, SafeAreaView, TextStyle, View, ViewStyle } from "react-native"
import { Header, Product, Screen } from "../../components"
import { color, typography } from "../../theme"
import scale from "../../utils/scale"
import { useIsFocused, useNavigation } from "@react-navigation/native"

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

const ProductData = [
  { id: 1, image: 'towel1', productName: 'Product 1', price: 220, isWishlisted: false },
  { id: 2, image: 'towel2', productName: 'Product 2', price: 220, isWishlisted: false },
  { id: 3, image: 'towel2', productName: 'Product 3', price: 42, isWishlisted: false },
  { id: 4, image: 'towel1', productName: 'Product 4', price: 80, isWishlisted: false },
  { id: 5, image: 'towel1', productName: 'Product 5', price: 220, isWishlisted: false },
  { id: 6, image: 'towel2', productName: 'Product 6', price: 220, isWishlisted: false },
  { id: 7, image: 'towel2', productName: 'Product 7', price: 42, isWishlisted: false },
  { id: 8, image: 'towel1', productName: 'Product 8', price: 80, isWishlisted: false }
]

export const ProductListingScreen = observer(function ProductListingScreen() {

  const navigation = useNavigation();
  const scrollRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [dataChanged, setDataChanged] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setDataChanged(!dataChanged)
    }
  }, [isFocused]);

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

  const ManageWishlist = (id, isWishlisted) => {
    let index = ProductData.findIndex(x => x.id == id);
    ProductData[index].isWishlisted = !isWishlisted;
    setDataChanged(!dataChanged);
  }

  return (
    <Screen style={ROOT} preset="fixed" statusBar='dark-content'>
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          headerText='Browse Towel'
          titleStyle={HeaderText}
          leftIcon={'back'}
          rightFirstIcon='notification'
          onLeftPress={() => navigation.navigate('primaryStack')}
          onFirstRightPress={() => navigation.navigate('wishlist', { ProductData: ProductData })}
          rightSecondIcon='cart'
          headerHeight={headerHeight}
          translateY={translateY}
          sortFilter
        />
        <Animated.FlatList
          ref={scrollRef}
          data={ProductData}
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
          extraData={dataChanged}
          renderItem={({ item, index }) => {
            return (
              <Product
                index={index}
                item={item}
                setWishlist={(id, isWishlisted) => ManageWishlist(id, isWishlisted)}
              />
            )
          }}
        />
      </SafeAreaView>
    </Screen>
  )
})
