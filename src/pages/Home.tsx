import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { getGreeting } from "../utils/greeting";
import ProductGallery from "../components/ProductGallery";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import store, { RootState } from "../redux/store";
import { fetchProducts } from "../redux/features/store/storeSlice";
import { Product } from "../types";
import { useSelector } from "react-redux";
import ErrorContainer from "../components/ErrorContainer";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [data, setData] = useState<Product[] | []>([]);
  const [searchValue, setSearchValue] = useState("");
  const { loading, error } = useSelector((state: RootState) => state.shop);

  const handleClear = () => {
    setData([...products]);
    setSearchValue("");
  };

  const filterAndUpdateProducts = (title: string) => {
    let results = products.filter(
      (product) => product.title.toLowerCase().indexOf(title) > -1
    );
    setData([...results]);
  };

  const handleSearch = (event: Event) => {
    let query = "";
    const target = event.target as HTMLIonSearchbarElement;
    if (target) {
      query = target.value!.toLowerCase();
      setSearchValue(query);
    }
  };

  useEffect(() => {
    if (products && products.length > 0) {
      setData([...products]);
    } else {
      store.dispatch(fetchProducts());
    }
  }, [products]);

  useEffect(() => {
    if (searchValue) {
      filterAndUpdateProducts(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      let { products: productStore } = store.getState().shop;
      setProducts(productStore);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <IonPage className="max-w-[1440px] mx-auto">
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>{getGreeting()}, welcome</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen className="px-2">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{getGreeting()}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="my-5 px-2 mx-auto min-h-[70%]">
          <h1 className="text-2xl px-4 font-bold my-5">Home</h1>
          <IonSearchbar
            placeholder="Search products..."
            debounce={1000}
            value={searchValue}
            onIonInput={handleSearch}
            onIonClear={handleClear}
            show-clear-button="focus"
            className="w-full p-4 max-w-[1440px] mx-auto"
          ></IonSearchbar>
          {searchValue && (
            <p className="text-sm italic">
              Showing search results for{" "}
              <span className="font-bold">'{searchValue}'</span>{" "}
            </p>
          )}
          <Loader showLoading={loading} infinite={loading} />
          {error ? (
            <>
              <ErrorContainer message={error} />
            </>
          ) : (
            <ProductGallery data={data} />
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
