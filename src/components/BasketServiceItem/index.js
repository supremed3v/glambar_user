import { View, Text, StyleSheet, FlatList } from "react-native";

const BasketServiceItem = ({ basketServices }) => {
  return (
    <View style={styles.row}>
      <View style={styles.quantityContainer}>
        <Text>{basketServices.quantity}</Text>
      </View>
      <Text style={{ fontWeight: "600" }}>{basketServices.Service.name}</Text>
      <Text style={{ marginLeft: "auto" }}>
        $ {basketServices.Service.price}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 10,
  },

  quantityContainer: {
    backgroundColor: "lightgray",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 10,
    borderRadius: 3,
  },
});

export default BasketServiceItem;
