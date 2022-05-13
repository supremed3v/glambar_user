import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DishListItem from "../../components/ServiceListItem";
import Header from "./Header";
import styles from "./styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import { Salon, Service } from "../../models";
import { useBasketContext } from "../../contexts/BasketContext";

const SalonDetailsScreen = () => {
  const [salon, setSalon] = useState(null);
  const [services, setServices] = useState([]);

  const route = useRoute();
  const navigation = useNavigation();

  const id = route.params?.id;

  const {
    setSalon: setBasketSalon,
    basket,
    basketServices,
  } = useBasketContext();

  useEffect(() => {
    if (!id) {
      return;
    }
    setBasketSalon(null);
    DataStore.query(Salon, id).then(setSalon);

    DataStore.query(Service, (service) => service.salonID("eq", id)).then(
      setServices
    );
  }, [id]);

  useEffect(() => {
    setBasketSalon(salon);
  }, [salon]);

  if (!salon) {
    return <ActivityIndicator size={"large"} color="gray" />;
  }
  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <Header salon={salon} />}
        data={services}
        renderItem={({ item }) => <DishListItem services={item} />}
        keyExtractor={(item) => item.name}
      />
      <Ionicons
        onPress={() => navigation.goBack()}
        name="arrow-back-circle"
        size={45}
        color="white"
        style={styles.iconContainer}
      />
      {basket && (
        <Pressable
          onPress={() => navigation.navigate("Basket")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Open basket ({basketServices.length})
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default SalonDetailsScreen;
