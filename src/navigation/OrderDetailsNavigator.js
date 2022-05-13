import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AppointmentDetails from "../screens/AppointmentDetails";
import OrderLiveUpdates from "../screens/OrderLiveUpdates";

const Tab = createMaterialTopTabNavigator();

const AppointmentDetailsNavigator = ({ route }) => {
  const id = route?.params?.id;

  return (
    <Tab.Navigator>
      <Tab.Screen name="Details">
        {() => <AppointmentDetails id={id} />}
      </Tab.Screen>

      <Tab.Screen name="Updates">
        {() => <OrderLiveUpdates id={id} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default AppointmentDetailsNavigator;
