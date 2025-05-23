import  { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { RichTextEditor } from "@mantine/rte";
import {
  useInsertProductMutation,
  useUpdateProductMutation,
} from "../../redux/features/products/productsApi";
import { toast } from "sonner";

import RecentItems from "./RecentItems";
import { productBrands, productCategories } from "../../constants/product";
import { IProduct } from "../../types";

interface IProductFormProps {
  productData?: IProduct;
  id?: string;
}

const ProductForm = ({ productData, id }: IProductFormProps) => {
  const [recentFiveItem, setRecentFiveItems] = useState<
    { id: string; name: string; status: "new" | "updated" }[]
  >([]);
  // const [categories] = useState([
  //   "Robotic",
  //   "Manual",
  //   "Reflectorless",
  //   "Construction",
  //   "Specialized",
  // ]);
  // const [brands] = useState([
  //   "Leica Geosystems",
  //   "Trimble",
  //   "Topcon",
  //   "Sokkia",
  //   "Nikon",
  //   "Pentax",
  //   "South Surveying & Mapping Technology",
  //   "Stonex",
  //   "Ruide",
  //   "Hi-Target",
  // ]);
  const [insertProduct] = useInsertProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: productData || {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      category: "",
      brand: "",
      image: "",
    },
  });

  const handleRecentItems = (newItem: {
    id: string;
    name: string;
    status: "new" | "updated";
  }) => {
    setRecentFiveItems((prevItems) => {
      // Check if the item already exists by id
      if (prevItems.some((item) => item.id === newItem.id)) {
        return prevItems;
      }

      // Add the new item at the beginning of the array
      const updatedItems = [newItem, ...prevItems];

      // Keep only the most recent 5 items
      return updatedItems.slice(0, 5);
    });
  };

  console.log(recentFiveItem);
  // Prepopulate the form if editing
  useEffect(() => {
    if (productData) reset(productData);
  }, [productData, reset]);

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Please wait...");
    try {
      if (productData && id) {
        // Update Product
        const response = await updateProduct({
          product: {
            ...productData,
            ...data,
          },
          id: id as unknown as string,
        });
        if (response?.data) {
          handleRecentItems({
            id: response?.data?.data?._id,
            name: response?.data?.data?.name,
            status: "updated",
          });
          console.log(response?.data?.data?.name);
          toast.success("Product updated successfully", { id: toastId });
        } else {
          toast.error("Error updating product", { id: toastId });
        }
      } else {
        // Create Product
        const response = await insertProduct(data);
        if (response?.data?.data) {
          handleRecentItems({
            id: response?.data?.data?._id,
            name: response?.data?.data?.name,
            status: "new",
          });
          console.log(response?.data?.data?.name);
          toast.success("Product created successfully", { id: toastId });
          reset();
        } else {
          toast.error("Error creating product", { id: toastId });
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error("An error occurred", { id: toastId });
      console.log(err);
    }
  };

  function stripHtmlTags(value: string) {
    return value.replace(/<\/?[^>]+(>|$)/g, "");
  }

  return (
    <div className="mx-auto bg-gray-100 p-8 rounded-lg shadow-md">
      {recentFiveItem?.length ? (
        <div className="mb-2">
          <RecentItems items={recentFiveItem} />
        </div>
      ) : (
        ""
      )}
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-gray-800 font-medium mb-2"
          >
            Product Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00283a]"
            placeholder="Enter product name"
            id="name"
            {...register("name", { required: "Product name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">
              {String(errors.name.message)}
            </p>
          )}
        </div>

        {/* Product Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-gray-800 font-medium mb-2"
          >
            Product Description
          </label>
          <Controller
            name="description"
            control={control}
            rules={{
              required: "Product description is required",
              validate: (value) =>
                stripHtmlTags(value).length >= 50 ||
                "Description must be at least 50 characters long without HTML tags",
            }}
            render={({ field }) => (
              <RichTextEditor
                {...field}
                id="description"
                className="bg-white border border-gray-300 rounded-md"
              />
            )}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">
              {String(errors.description.message)}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-gray-800 font-medium mb-2"
          >
            Price
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00283a]"
            placeholder="Enter product price"
            id="price"
            {...register("price", { required: "Price is required", min: 1 })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">
              {String(errors.price.message)}
            </p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label
            htmlFor="quantity"
            className="block text-gray-800 font-medium mb-2"
          >
            Quantity
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00283a]"
            placeholder="Enter product quantity"
            id="quantity"
            {...register("quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" },
            })}
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">
              {String(errors.quantity.message)}
            </p>
          )}
        </div>

        {/* Categories and Brands */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-gray-700 font-semibold">Product Categories</h3>
            <div className="space-y-2 mt-2">
              {productCategories?.map((category) => (
                <label
                  key={category}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    value={category}
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className="mr-2"
                  />
                  {category}
                </label>
              ))}
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {String(errors.category.message)}
                </p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-gray-700 font-semibold">Brands</h3>
            <div className="space-y-2 mt-2">
              {productBrands?.map((brand) => (
                <label key={brand} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value={brand}
                    {...register("brand", { required: "Brand is required" })}
                    className="mr-2"
                  />
                  {brand}
                </label>
              ))}
              {errors.brand && (
                <p className="text-red-500 text-sm">
                  {String(errors.brand.message)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="image"
            className="block text-gray-800 font-medium mb-2"
          >
            Product Image URL
          </label>
          <input
            type="url"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00283a]"
            placeholder="Enter image URL"
            id="image"
            {...register("image", { required: "Image URL is required" })}
          />
          {errors.image && (
            <p className="text-red-500 text-sm">
              {String(errors.image.message)}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-green-500 text-white py-3 rounded-md hover:bg-green-900 flex items-center justify-center"
        >
          <CheckCircle className="mr-2" />
          {productData ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
