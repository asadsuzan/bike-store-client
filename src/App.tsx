import { useGetProductsQuery } from "./redux/features/products/productsApi";

function App() {
  const { data } = useGetProductsQuery("");
  console.log(data);
  return (
    <>
      <h1 className="text-2xl text-red-500">Bike store </h1>
    </>
  );
}

export default App;
