import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import BasketServiceItem from "../../components/BasketServiceItem";
import { useBasketContext } from "../../contexts/BasketContext";
import { useAppointmentContext } from "../../contexts/AppointmentContext";
import { useNavigation } from "@react-navigation/native";

const Basket = () => {
  const { salon, basketServices, totalPrice } = useBasketContext();
  const { createAppointment } = useAppointmentContext();
  const navigation = useNavigation();

  const onCreateOrder = async () => {
    const newAppointment = await createAppointment();
    navigation.navigate("AppointmentsTab", {
      screen: "Appointment",
      params: { id: newAppointment.id },
    });
  };

  return (
    <View style={styles.page}>
      <Text style={styles.name}>{salon?.name}</Text>

      <Text style={{ fontWeight: "bold", marginTop: 20, fontSize: 19 }}>
        Your items
      </Text>

      <FlatList
        data={basketServices}
        renderItem={({ item }) => <BasketServiceItem basketServices={item} />}
      />

      <View style={styles.separator} />

      <Pressable onPress={onCreateOrder} style={styles.button}>
        <Text style={styles.buttonText}>
          Create order &#8226; ${totalPrice.toFixed(0)}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    paddingVertical: 40, // temp fix
    padding: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 10,
  },
  description: {
    color: "gray",
  },
  separator: {
    height: 1,
    backgroundColor: "lightgrey",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 25,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "black",
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  quantityContainer: {
    backgroundColor: "lightgray",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 10,
    borderRadius: 3,
  },
});

export default Basket;
