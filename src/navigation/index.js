import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SalonDetailsPage from "../screens/SalonDetailsScreen";
import ServiceDetailScreen from "../screens/ServiceDetailScreen";
import Basket from "../screens/Basket";
import AppointmentsScreen from "../screens/AppointmentsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useAuthContext } from "../contexts/AuthContext";

import { Foundation, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import AppointmentDetailNavigator from "./OrderDetailsNavigator";
import SalonDetailsScreen from "../screens/SalonDetailsScreen";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { dbUser } = useAuthContext();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {dbUser ? (
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
      ) : (
        <Stack.Screen name="Profile" component={ProfileScreen} />
      )}
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      barStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AppointmentsTab"
        component={AppointmentsStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="list-alt" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Salons and Spa" component={HomeScreen} />
      <HomeStack.Screen
        name="Salon"
        component={SalonDetailsScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="Services" component={ServiceDetailScreen} />
      <HomeStack.Screen name="Basket" component={Basket} />
    </HomeStack.Navigator>
  );
};

const AppointmentsStack = createNativeStackNavigator();

const AppointmentsStackNavigator = () => {
  return (
    <AppointmentsStack.Navigator>
      <AppointmentsStack.Screen
        name="Appointments"
        component={AppointmentsScreen}
      />
      <AppointmentsStack.Screen
        name="Appointment"
        component={AppointmentDetailNavigator}
        screenOptions={{ headerShown: false }}
      />
    </AppointmentsStack.Navigator>
  );
};

export default RootNavigator;
