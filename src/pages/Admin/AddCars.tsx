/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Upload, X } from "lucide-react";
import { ICarForm } from "@/Types";
import { toast } from "sonner";
import { useAddCarMutation } from "@/redux/features/cars/carApi";

const AddCarPage = () => {
  const [addCar] = useAddCarMutation();
  const [imageUploads, setImageUploads] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<ICarForm>({
    defaultValues: {
      features: [""],
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter((file) => {
        const isValid = file.size <= 5 * 1024 * 1024; // 5MB limit
        if (!isValid) {
          toast.error(`${file.name} is too large. Max size is 5MB`);
        }
        return isValid;
      });
      setImageUploads((prev) => [...prev, ...validFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImageUploads((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImagesUpload = async (): Promise<string[]> => {
    if (!imageUploads.length) return [];

    try {
      const uploadPromises = imageUploads.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_PRESET
        );

        const response = await axios.post(
          import.meta.env.VITE_CLOUDINARY_URI,
          formData
        );
        return response.data.secure_url;
      });

      return await Promise.all(uploadPromises);
    } catch (error: any) {
      toast.error("Failed to upload images");
      return [];
    }
  };

  const features = watch("features") || [""];

  const addFeatureField = () => {
    const currentFeatures = features;
    setValue("features", [...currentFeatures, ""]);
  };

  const removeFeatureField = (index: number) => {
    const currentFeatures = features.filter((_, i) => i !== index);
    setValue("features", currentFeatures);
  };

  const onSubmit: SubmitHandler<ICarForm> = async (data) => {
    try {
      setUploading(true);
      const toastId = toast.loading("Adding Car...");
      const imageUrls = await handleImagesUpload();

      const carData = {
        ...data,
        images: imageUrls,
        isElectric: Boolean(data.isElectric),
        features: features.filter((f) => f.trim() !== ""),
        specifications: {
          ...data.specifications,
          seatingCapacity: Number(data.specifications.seatingCapacity),
          mileage: Number(data.specifications.mileage),
        },
        pricing: {
          ...data.pricing,
          insurancePrice: Number(data.pricing.insurancePrice),
          childSeatPrice: Number(data.pricing.childSeatPrice),
          gpsPrice: Number(data.pricing.gpsPrice),
          basePrice: Number(data.pricing.basePrice),
          hourlyRate: Number(data.pricing.hourlyRate),
          dailyRate: Number(data.pricing.dailyRate),
          weeklyRate: Number(data.pricing.weeklyRate),
          monthlyRate: Number(data.pricing.monthlyRate),
        },
      };

      console.log({ carData });

      const res = await addCar(carData).unwrap();
      toast.success(res.message, { id: toastId });
      navigate("/admin/manage-car");
    } catch (err: any) {
      console.log(err.data);
      toast.error(err.data?.message || "Something went wrong");
    } finally {
      toast.dismiss();
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto px-4">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add New Car</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Car Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  {...register("brand")}
                  className={errors.brand ? "border-red-500" : ""}
                />
                {errors.brand && (
                  <p className="text-sm text-red-500">{errors.brand.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  {...register("model")}
                  className={errors.model ? "border-red-500" : ""}
                />
                {errors.model && (
                  <p className="text-sm text-red-500">{errors.model.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  {...register("year")}
                  className={errors.year ? "border-red-500" : ""}
                />
                {errors.year && (
                  <p className="text-sm text-red-500">{errors.year.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  {...register("color")}
                  className={errors.color ? "border-red-500" : ""}
                />
                {errors.color && (
                  <p className="text-sm text-red-500">{errors.color.message}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="isElectric" {...register("isElectric")} />
                <Label htmlFor="isElectric">Electric Vehicle</Label>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                className={`h-32 ${errors.description ? "border-red-500" : ""}`}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Specifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="transmission">Transmission</Label>
                  <Select
                    onValueChange={(value) =>
                      setValue(
                        "specifications.transmission",
                        value as "automatic" | "manual"
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automatic">Automatic</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <Select
                    onValueChange={(value) =>
                      setValue(
                        "specifications.fuelType",
                        value as "petrol" | "diesel" | "electric" | "hybrid"
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="petrol">Petrol</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seatingCapacity">Seating Capacity</Label>
                  <Input
                    id="seatingCapacity"
                    type="number"
                    {...register("specifications.seatingCapacity")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mileage">Mileage</Label>
                  <Input
                    id="mileage"
                    type="number"
                    {...register("specifications.mileage")}
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="basePrice">Base Price</Label>
                  <Input
                    id="basePrice"
                    type="number"
                    {...register("pricing.basePrice")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    {...register("pricing.hourlyRate")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dailyRate">Daily Rate</Label>
                  <Input
                    id="dailyRate"
                    type="number"
                    {...register("pricing.dailyRate")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weeklyRate">Weekly Rate</Label>
                  <Input
                    id="weeklyRate"
                    type="number"
                    {...register("pricing.weeklyRate")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyRate">Monthly Rate</Label>
                  <Input
                    id="monthlyRate"
                    type="number"
                    {...register("pricing.monthlyRate")}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Features</h3>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addFeatureField}
                >
                  Add Feature
                </Button>
              </div>
              <div className="space-y-2">
                {features.map((_, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      {...register(`features.${index}`)}
                      placeholder={`Feature ${index + 1}`}
                    />
                    {features.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeFeatureField(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <Label>Upload Images</Label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, JPEG (MAX. 5MB each)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              {imageUploads.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {imageUploads.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        className="size-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Additional Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="insurancePrice">Insurance Price</Label>
                  <Input
                    id="insurancePrice"
                    type="number"
                    {...register("pricing.insurancePrice")}
                    placeholder="50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="childSeatPrice">Child Seat Price</Label>
                  <Input
                    id="childSeatPrice"
                    type="number"
                    {...register("pricing.childSeatPrice")}
                    placeholder="50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gpsPrice">GPS Price</Label>
                  <Input
                    id="gpsPrice"
                    type="number"
                    {...register("pricing.gpsPrice")}
                    placeholder="50"
                  />
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                onValueChange={(value) =>
                  setValue(
                    "status",
                    value as "available" | "reserved" | "booked"
                  )
                }
                defaultValue="available"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="booked">Booked</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={uploading}>
              {uploading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </div>
              ) : (
                "Add Car"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCarPage;
