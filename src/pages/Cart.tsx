import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Cart.css";
import OrderSummary from "../components/OrderSummary";
import CartItems from "../components/CartItems";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import EmptyCart from "../components/EmptyCart";

const Cart: React.FC = () => {
  const cartCount = useSelector((state: RootState) => state.cart.count);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cart</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="max-w-[95%] mx-auto flex flex-wrap gap-4 gap-y-1 xs:justify-start sm:justify-center">
          {cartCount <= 0 ? (
            <EmptyCart/>
          ) : (
            <>
              <CartItems />
              <OrderSummary />
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Cart;
