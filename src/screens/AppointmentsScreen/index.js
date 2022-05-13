import { View, Text, FlatList } from "react-native";

import SalonListItem from "../../components/SalonListItem";
import { useAppointmentContext } from "../../contexts/AppointmentContext";

const AppointmentScreen = () => {
  const { appointments } = useAppointmentContext();
  console.log(appointments);

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <FlatList
        data={appointments}
        renderItem={({ item }) => <SalonListItem appointments={item} />}
      />
    </View>
  );
};

export default AppointmentScreen;
