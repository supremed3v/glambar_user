import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import BasketServiceItem from "../../components/BasketServiceItem";

import styles from "./styles";
import { useAppointmentContext } from "../../contexts/AppointmentContext";
import { useEffect, useState } from "react";

const AppointmentDetailsHeader = ({ appointment }) => {
  console.log(appointment);
  return (
    <View>
      <View style={styles.page}>
        <Image source={{ uri: appointment.Salon.image }} style={styles.image} />

        <View style={styles.container}>
          <Text style={styles.title}>{appointment.Salon.name}</Text>
          <Text style={styles.subtitle}>{appointment.status} &#8226;</Text>

          <Text style={styles.menuTitle}>Your orders</Text>
        </View>
      </View>
    </View>
  );
};

const AppointmentDetails = ({ id }) => {
  const [appointment, setAppointment] = useState();
  const { getAppointments } = useAppointmentContext();

  useEffect(() => {
    getAppointments(id).then(setAppointment);
  }, []);

  if (!appointment) {
    return <ActivityIndicator size={"large"} color="gray" />;
  }

  return (
    <FlatList
      ListHeaderComponent={() => (
        <AppointmentDetailsHeader appointment={appointment} />
      )}
      data={appointment.services}
      renderItem={({ item }) => <BasketServiceItem basketServices={item} />}
    />
  );
};

export default AppointmentDetails;
