import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SalonListItem = ({ appointments }) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("Appointment", { id: appointments.id });
  };

  return (
    <Pressable
      onPress={onPress}
      style={{ flexDirection: "row", margin: 10, alignItems: "center" }}
    >
      <Image
        source={{ uri: appointments.Salon.image }}
        style={{ width: 75, height: 75, marginRight: 5 }}
      />

      <View>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          {appointments.Salon.name}
        </Text>
        <Text style={{ marginVertical: 5 }}>3 items &#8226;</Text>
        <Text>2 days ago &#8226; {appointments.status} </Text>
      </View>
    </Pressable>
  );
};

export default SalonListItem;
