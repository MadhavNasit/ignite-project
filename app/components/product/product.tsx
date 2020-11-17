import * as React from "react"
import { ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { color, typography } from "../../theme"
import { Text } from "../"
import { Icon } from "../icon/icon"
import scale, { verticalScale } from "../../utils/scale"

const CONTAINER: ViewStyle = {
  width: scale(172),
  marginHorizontal: scale(5),
  marginBottom: verticalScale(11),
  alignItems: 'center',
  backgroundColor: color.palette.white,
  shadowColor: 'rgba(216, 226, 234, 0.5)',
  shadowOffset: { width: 0, height: verticalScale(1) },
  shadowOpacity: 1,
  shadowRadius: 3,
  elevation: 5,
}

const PriceText: TextStyle = {
  color: color.palette.lightnavyBlue,
  fontFamily: typography.medium,
  fontSize: scale(15),
  lineHeight: scale(17),
  marginBottom: verticalScale(10)
}

const WhishListButton: ViewStyle = {
  position: 'absolute',
  top: verticalScale(11),
  right: scale(19)
}
const WhishListButtonIcon: ImageStyle = {
  height: verticalScale(16),
  width: scale(16),
  resizeMode: 'contain'
}

const ProductImage: ImageStyle = {
  height: verticalScale(102),
  width: scale(102),
  marginBottom: verticalScale(14),
  marginTop: verticalScale(18)
}

const ProductNameView: ViewStyle = {
  height: verticalScale(38),
  marginBottom: verticalScale(9)
}
const ProductNameText: TextStyle = {
  fontFamily: typography.regular,
  fontSize: scale(17),
  lineHeight: scale(19),
  color: color.palette.charcoalGrey
}

const AddCartButton: ViewStyle = {
  width: '100%',
  height: verticalScale(40),
  justifyContent: 'center',
  backgroundColor: color.palette.paleGrey
}
const AddCartButtonText: TextStyle = {
  color: color.palette.buttonDisabled,
  fontSize: scale(13),
  lineHeight: scale(15),
  textAlign: 'center'
}

export interface ProductProps {
  item?
  index?
}

/**
 * Describe your component here
 */
export function Product(props: ProductProps) {
  const { item, index } = props

  const [isWhishListed, setIsWhishListed] = React.useState(false);

  return (
    <View key={index} style={CONTAINER} >
      <TouchableOpacity onPress={() => setIsWhishListed(!isWhishListed)} style={WhishListButton} >
        <Icon icon={isWhishListed ? 'heartFilled' : 'heart'} style={WhishListButtonIcon} />
      </TouchableOpacity>
      <Icon icon={item.image} style={ProductImage} />
      <View style={ProductNameView}>
        <Text text={item.productName} style={ProductNameText} />
      </View>
      <Text text={'$' + item.price} style={PriceText} />
      <TouchableOpacity style={AddCartButton}>
        <Text text={`Add to Cart`} style={AddCartButtonText} />
      </TouchableOpacity>
    </View>
  )
}
