import { DataStore } from "aws-amplify";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import { Appointment } from "../../models";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRef } from "react";

const OrderLiveUpdates = ({ id }) => {
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    DataStore.query(Appointment, id).then(setAppointment);
  }, []);

  useEffect(() => {
    if (!appointment) {
      return;
    }
    const subscription = DataStore.observe(
      Appointment,
      appointment.id
    ).subscribe((msg) => {
      if (msg.opType === "UPDATE") {
        setAppointment(msg.element);
      }
    });

    return () => subscription.unsubscribe();
  }, [appointment]);

  return (
    <View>
      <Text>Status: {appointment?.status || "loading"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default OrderLiveUpdates;
