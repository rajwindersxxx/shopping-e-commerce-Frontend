import { useState } from "react";
import { Input } from "../ui/Input";
import { PrimaryButton } from "../ui/PrimaryButton";
import { Textarea } from "../ui/TextArea";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { ProductData, UpdateProduct } from "../../types/product.type";
import useProduct from "../../hooks/useProduct";
import { useModal } from "../../context/ModalContext";
interface props {
  productDetails: ProductData;
}
const EditProductForm = ({ productDetails }: props) => {
  const { updateProductMutate, isUpdating } = useProduct();
  const { closeModal } = useModal();
  const [error, setError] = useState<string>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProduct>();
  const onSubmit: SubmitHandler<UpdateProduct> = (data) => {
    const formData = new FormData();

    // Append text fields
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", String(data.price));
    formData.append("inventoryCount", String(data.inventoryCount));

    // Normalize images (in case it's FileList or object like {0: File})
    const files: File[] = Array.isArray(data.images)
      ? data.images
      : data.images instanceof FileList
        ? Array.from(data.images)
        : Object.values(data.images);

    files.forEach((file) => {
      formData.append("images", file);
    });
    updateProductMutate(
      { input: formData, id: productDetails.id },
      {
        onSuccess: () => {
          reset();
          closeModal();
        },
        onError: (error) => {
          setError(error.message);
        },
      },
    );
  };
  return (
    <div className="mx-auto w-3xl max-w-3xl">
      <h2 className="p-2 text-center text-xl">Update Product Information</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Product name"
          placeholder="Enter name of Product "
          type="text"
          disabled={true}
          defaultValue={productDetails.name}
          error={errors.name?.message}
          {...register("name", {
            required: "name is required",
            minLength: {
              value: 3,
              message: "Product Name should be at least  then 3 characters",
            },
          })}
          required
        />
        <Textarea
          label="Product description"
          placeholder="Enter Product description"
          defaultValue={productDetails.description}
          {...register("description", {
            required: "Product description is required",
            minLength: {
              value: 20,
              message: "description should be at least  then 20 characters",
            },
          })}
          disabled={isUpdating}
          error={errors.description?.message}
          required
        />
        <Input
          label="Product Category"
          placeholder="Enter Product category"
          type="text"
          disabled={isUpdating}
          defaultValue={productDetails.category}
          error={errors.category?.message}
          {...register("category", {
            required: "category name is required",
            minLength: {
              value: 3,
              message: "category name should be at least  then 3 characters",
            },
          })}
          required
        />
        <Input
          label="Enter Price $"
          placeholder="Enter Product price"
          type="number"
          disabled={isUpdating}
          defaultValue={productDetails.price}
          error={errors.price?.message}
          {...register("price", {
            required: "price is required",
            min: {
              value: 1,
              message: "price should be at least  then 1 $",
            },
          })}
          required
        />
        <Input
          label="Enter inventoryCount"
          placeholder="Enter Product inventoryCount"
          type="number"
          disabled={isUpdating}
          error={errors.inventoryCount?.message}
          defaultValue={productDetails.inventoryCount}
          {...register("inventoryCount", {
            required: "inventoryCount is required",
            min: {
              value: 1,
              message: "inventoryCount should be at least  then 1 $",
            },
          })}
          required
        />
        <Input
          label="Upload images To update"
          placeholder="Enter Your email name  "
          type="file"
          multiple
          disabled={isUpdating}
          error={errors.images?.message}
          {...register("images")}
        />
        {error && <p className="text-center text-xs text-red-500">{error}</p>}
        <div className="flex justify-end">
          <PrimaryButton type="submit" disabled={isUpdating}>
            Update Listing
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
