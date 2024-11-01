"use client";

import { useCallback } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import { FormInput } from "@/components/forms/form-input";
import { FormPasswordInput } from "@/components/forms/form-password-input";
import { createTypedFormField } from "@/components/hocs/create-typed-form-field";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/ui/submit-button";
import { signInWithEmailAndPassword } from "@/lib/firebase/auth";

import { loginSchema, LoginSchemaType } from "../_schemas/login-schema";

const TypedFormField = createTypedFormField<LoginSchemaType>();

export default function LoginForm() {
  const formMethods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback<SubmitHandler<LoginSchemaType>>(
    async ({ email, password }) => {
      try {
        const idToken = await signInWithEmailAndPassword(email, password);
        console.log(idToken);
      } catch (error: any) {
        console.log(error?.message);
      }
    },
    [],
  );

  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-4">
        <TypedFormField
          name="email"
          render={({ field }) => (
            <FormInput
              label="Email"
              placeholder="Masukkan alamat email Anda"
              {...field}
            />
          )}
        />

        <TypedFormField
          name="password"
          render={({ field }) => (
            <FormPasswordInput
              label="Password"
              placeholder="Masukkan password Anda"
              {...field}
            />
          )}
        />

        <SubmitButton variant="secondary" className="w-full">
          Kirim
        </SubmitButton>
      </form>
    </Form>
  );
}
