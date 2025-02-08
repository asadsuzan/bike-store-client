import { FieldValues, useForm } from "react-hook-form";

import { useGetProfileQuery, useUpdateProfileMutation } from "../redux/features/auth/authApi";
import { useEffect } from "react";
import ProfileSkeleton from "../components/skeleton/ProfileSkeleton";
import { toast } from "sonner";
import { User } from "lucide-react";




const Profile = () => {

const {data:userData,isLoading,isFetching,refetch} = useGetProfileQuery('',{
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,

})  // Refetch when the component mounts
;
const [updateProfile] = useUpdateProfileMutation()

const {
  name,
  email,
  address,
  city,
  phone,
} = userData?.data || {}

const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
} = useForm({
  defaultValues: {
    name: name,
    email: email,
    address: address,
    city: city,
    phone: phone,
  },
});
  // Reset form when data changes
  useEffect(() => {
    if (userData?.data) {
      reset({
        name: userData.data.name,
        email: userData.data.email,
        address: userData.data.address,
        city: userData.data.city,
        phone: userData.data.phone,
      });
    }
  }, [userData, reset]); // Reset when userData or reset changes

  if (isLoading|| isFetching) return <ProfileSkeleton/>;
  // const { name, email, address, city, phone } = userData?.data || {};




  const onSubmit = async(data: FieldValues) => {
    const toastId = toast('Please wait..')
    try{

      // Update Profile
      const response = await updateProfile(data);
      if(response?.data){
        toast.success('Profile updated successfully',{id: toastId})
        // Add your success logic here
        // You can also use the following code to refetch the profile data after update
        refetch();
        reset();
      }else{
        toast.error('Failed to update profile',{id: toastId})
        // Add your error logic here
      }
      

      // You can also use the following code to refetch the profile data after update
      // refetch();
    }catch(err){
   const message = (err as { message?: string })?.message || "Failed to update profile"
      toast.error(message,{id: toastId})
      // Handle error here
    ;
    }
   
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">

      <h1 className="text-2xl font-bold text-[#00283a] mb-4 flex items-center">
        <User className="mr-2" /> Profile
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Personal Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message?.toString()}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message?.toString()}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register("phone", { required: "Phone is required" })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message?.toString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Shipping Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Address
                </label>
                <input
                  type="text"
                  {...register("address", { required: "Address is required" })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.message?.toString()}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  City
                </label>
                <input
                  type="text"
                  {...register("city", { required: "City is required" })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message?.toString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;