import { useAppSelector } from "./redux/hooks";

function App() {
  const cart = useAppSelector((state) => state.cart);
  console.log(cart);
  return (
    <>
      <h1 className="text-2xl text-red-500">Bike store </h1>
    </>
  );
}

export default App;
