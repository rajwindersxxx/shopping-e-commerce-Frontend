import { Link, useNavigate } from "react-router-dom";
import { Input } from "../ui/Input";
import { PrimaryButton } from "../ui/PrimaryButton";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { SignUp } from "../../types/auth.type";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../api/auth";
import { useState } from "react";
import { useModal } from "../../context/ModalContext";
import ConfirmModel from "../ui/ConfirmModel";

const SignupForm = () => {
  const { openModal } = useModal();
  const [error, setError] = useState<string>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUp>();
  const navigation = useNavigate();
  const { isPending, mutate: signupUser } = useMutation({
    mutationFn: (input: SignUp) => signUp(input),
    onSuccess: () => {
      reset();
      openModal(
        <ConfirmModel
          message="Account Created Successfully, Login now"
          type="message"
        />,
        "signUpMessage",
      );
      navigation("/post");
    },
    onError: (error) => {
      setError(error.message);
    },
  });
  const onSubmit: SubmitHandler<SignUp> = (data) => signupUser(data);
  return (
    <div className="absolute top-1/2 left-1/2 w-sm -translate-x-1/2 -translate-y-1/2">
      <h2 className="p-2 text-center text-xl">Sign up to get started</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          placeholder="Enter your email "
          type="text"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          error={errors.email?.message as string}
          disabled={isPending}
          required
        />
        <Input
          label="Password"
          placeholder="Enter Your password"
          type="password"
          disabled={isPending}
          error={errors.password?.message as string} //temp fix
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          required
        />
        <Input
          label="Conform Password"
          placeholder="Re-Enter Your password"
          type="password"
          disabled={isPending}
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value, formValues) =>
              value === formValues.password || "Passwords do not match",
          })}
          error={errors.confirmPassword?.message as string}
          required
        />
        {error && <p className="text-center text-sm text-red-500">{error}</p>}

        <PrimaryButton type="submit" disabled={isPending}>
          Sign Up
        </PrimaryButton>
      </form>
      <p className="py-4 text-center">
        Already have Account{" "}
        <Link to="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
