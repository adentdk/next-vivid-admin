/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import { FormInput } from "@/components/forms/form-input";
import { FormPasswordInput } from "@/components/forms/form-password-input";
import { createTypedFormField } from "@/components/hocs/create-typed-form-field";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/ui/submit-button";
import {
  signInWithCustomToken,
  signInWithEmailAndPassword,
} from "@/lib/firebase/auth";

import { loginSchema, LoginSchemaType } from "../_schemas/login-schema";
import { createSessionAction, getCustomTokenAction } from "../actions";

const TypedFormField = createTypedFormField<LoginSchemaType>();

export default function LoginForm() {
  const router = useRouter();

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

        const customTokenResult = await getCustomTokenAction(idToken);
        if (!customTokenResult.success) {
          throw new Error(
            customTokenResult.errorMessage ?? customTokenResult.message,
          );
        }
        const newIdToken = await signInWithCustomToken(
          customTokenResult.data.customToken,
        );

        await createSessionAction(newIdToken);

        router.push("/");
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

        <SubmitButton className="w-full">Kirim</SubmitButton>
      </form>
    </Form>
  );
}
