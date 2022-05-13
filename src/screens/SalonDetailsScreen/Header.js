import { View, Text, Image } from "react-native";
import styles from "./styles";

const DEFAULT_IMAGE =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg";

const SalonHeader = ({ salon }) => {
  return (
    <View style={styles.page}>
      <Image
        source={{
          uri: salon.image.startsWith("http") ? salon.image : DEFAULT_IMAGE,
        }}
        style={styles.image}
      />

      <View style={styles.container}>
        <Text style={styles.title}>{salon.name}</Text>
        {/* <Text style={styles.subtitle}>
          $ {restaurant.deliveryFee.toFixed(1)} &#8226; {restaurant.minDeliveryTime}-
          {restaurant.maxDeliveryTime} minutes
        </Text> */}

        <Text style={styles.menuTitle}>Services</Text>
      </View>
    </View>
  );
};

export default SalonHeader;
