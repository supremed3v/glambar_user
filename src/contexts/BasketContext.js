import { createContext, useState, useEffect, useContext } from "react";
import { DataStore } from "aws-amplify";
import { Basket, BasketService } from "../models";
import { useAuthContext } from "./AuthContext";

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();

  const [salon, setSalon] = useState(null);
  const [basket, setBasket] = useState(null);
  const [basketServices, setBasketServices] = useState([]);

  const totalPrice = basketServices.reduce(
    (sum, basketServices) =>
      sum + basketServices.quantity * basketServices.Service.price,
    0
  );

  useEffect(() => {
    DataStore.query(Basket, (b) =>
      b.salonID("eq", salon.id).userID("eq", dbUser.id)
    ).then((baskets) => setBasket(baskets[0]));
  }, [dbUser, salon]);

  useEffect(() => {
    if (basket) {
      DataStore.query(BasketService, (bs) => bs.basketID("eq", basket.id)).then(
        setBasketServices
      );
    }
  }, [basket]);

  const addServiceToBasket = async (service, quantity) => {
    // get the existing basket or create a new one
    let theBasket = basket || (await createNewBasket());

    // create a BasketDish item and save to Datastore
    const newBasket = await DataStore.save(
      new BasketService({ quantity, Service: service, basketID: theBasket.id })
    );

    setBasketServices([...basketServices, newBasket]);
  };

  const createNewBasket = async () => {
    const newBasket = await DataStore.save(
      new Basket({ userID: dbUser.id, salonID: salon.id })
    );
    setBasket(newBasket);
    return newBasket;
  };

  return (
    <BasketContext.Provider
      value={{
        addServiceToBasket,
        setSalon,
        salon,
        basket,
        basketServices,
        totalPrice,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
