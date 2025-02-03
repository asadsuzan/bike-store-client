import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { RichTextEditor } from "@mantine/rte";
import { useInsertProductMutation } from "../../redux/features/products/productsApi";
import { toast } from "sonner";

const ProductForm = () => {
  const [categories] = useState([
    "Robotic",
    "Manual",
    "Reflectorless",
    "Construction",
    "Specialized",
  ]);
  const [brands] = useState([
    "Leica Geosystems",
    "Trimble",
    "Topcon",
    "Sokkia",
    "Nikon",
    "Pentax",
    "South Surveying & Mapping Technology",
    "Stonex",
    "Ruide",
    "Hi-Target",
  ]);
  const [insertProduct] = useInsertProductMutation();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Please wait...");
    try {
      const response = await insertProduct(data);
      if (response?.data?.data) {
        toast.success("Product created successfully", { id: toastId });
        reset();
      } else {
        toast.error("Error creating product", { id: toastId });
        console.error(response.error);
      }
    } catch (err) {
      toast.error("Error creating product", { id: toastId });
      console.error(err);
    }
  };

  return (
    <div className="mx-auto bg-gray-100 p-8 rounded-lg shadow-md">
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
            defaultValue=""
            render={({ field }) => (
              <RichTextEditor
                {...field}
                id="description"
                className="bg-white border border-gray-300 rounded-md"
              />
            )}
          />
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
              min: 1,
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
              {categories.map((category) => (
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
              {brands.map((brand) => (
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
          <CheckCircle className="mr-2" /> Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
