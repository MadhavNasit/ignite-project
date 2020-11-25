import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Animated, FlatList, SafeAreaView, TextStyle, View, ViewStyle } from "react-native"
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

interface ProductWishlistProps {
  route?
}

export const ProductWishlistScreen = observer(function ProductWishlistScreen({ route }: ProductWishlistProps) {

  const navigation = useNavigation();
  const [dataChanged, setDataChanged] = useState(false);

  const [wishListedProducts, setWishListedProducts] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setData(route.params.ProductData);
    }
  }, [isFocused]);

  const setData = (productData) => {
    console.log(productData)
    let wishListedData = productData?.filter(item => item.isWishlisted == true);
    setWishListedProducts(wishListedData);
  }

  const ManageWishlist = (id, isWishlisted) => {
    let index = wishListedProducts.findIndex(x => x.id == id);
    wishListedProducts[index].isWishlisted = !isWishlisted;
    setDataChanged(!dataChanged);
  }

  return (
    <Screen style={ROOT} preset="fixed" statusBar='dark-content'>
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          headerText='WishList'
          titleStyle={HeaderText}
          leftIcon={'back'}
          rightFirstIcon='notification'
          onLeftPress={() => navigation.goBack()}
          rightSecondIcon='cart'
          headerHeight={46}
          translateY={0}
          sortFilter={false}
        />

        <FlatList
          data={wishListedProducts}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={FlatListContainer}
          numColumns={2}
          extraData={dataChanged}
          renderItem={({ item, index }) => {
            if (item.isWishlisted) {
              return (
                <Product
                  index={index}
                  item={item}
                  setWishlist={(id, isWishlisted) => ManageWishlist(id, isWishlisted)}
                />
              )
            } else {
              return null;
            }
          }}
        />
      </SafeAreaView>
    </Screen>
  )
})
