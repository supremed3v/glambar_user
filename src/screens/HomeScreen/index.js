import { useState, useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import SalonItem from "../../components/SalonItem";
import { DataStore } from "aws-amplify";
import { Salon } from "../../models";

export default function HomeScreen() {
  const [salon, setSalon] = useState([]);

  useEffect(() => {
    DataStore.query(Salon).then(setSalon);
  }, []);

  return (
    <View style={styles.page}>
      <FlatList
        data={salon}
        renderItem={({ item }) => <SalonItem salon={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});
