import { createContext, useContext, useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Appointment, ServiceAppointment, Basket } from "../models";
import { useAuthContext } from "./AuthContext";
import { useBasketContext } from "./BasketContext";

const AppointmentContext = createContext({});

const AppointmentContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();
  const { salon, totalPrice, basketServices, basket } = useBasketContext();

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    DataStore.query(Appointment, (a) => a.userID("eq", dbUser.id)).then(
      setAppointments
    );
  }, [dbUser]);

  const createAppointment = async () => {
    const newAppointment = await DataStore.save(
      new Appointment({
        userID: dbUser.id,
        Salon: salon,
        status: "UPCOMING",
        total: totalPrice,
      })
    );
    await Promise.all(
      basketServices.map((basketService) =>
        DataStore.save(
          new ServiceAppointment({
            quantity: basketService.quantity,
            appointmentID: newAppointment.id,
            Service: basketService.Service,
          })
        )
      )
    );

    // delete basket
    await DataStore.delete(basket);

    setAppointments([...appointments, newAppointment]);

    return newAppointment;
  };

  const getAppointments = async (id) => {
    const appointment = await DataStore.query(Appointment, id);
    const serviceAppointments = await DataStore.query(
      ServiceAppointment,
      (sa) => sa.appointmentID("eq", id)
    );

    return { ...appointment, services: serviceAppointments };
  };

  return (
    <AppointmentContext.Provider
      value={{ createAppointment, appointments, getAppointments }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContextProvider;

export const useAppointmentContext = () => useContext(AppointmentContext);
