"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import Link from "next/link";
import { SignupAction } from "../../../../actions/singup";

const SignupFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  password: z.string().min(1),
  confirmationPassword: z.string().min(1),
});

type SignupFormType = z.infer<typeof SignupFormSchema>;

export const SignupForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { execute } = useAction(SignupAction, {
    onSuccess: () => {
      router.push("/");
    },
  });
  const form = useForm<SignupFormType>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      password: "",
      confirmationPassword: "",
      name: "",
      email: "",
    },
  });

  const onSubmit = async (value: SignupFormType) => {
    setError("");
    if (value.password !== value.confirmationPassword) {
      setError("Password and Confirmation Password");
      return;
    }
    await execute({
      orgName: value.name,
      orgEmail: value.email,
      password: value.password,
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization</FormLabel>
              <FormControl>
                <Input placeholder="Bussiness Name" {...field} />
              </FormControl>
              <FormDescription>
                Please enter the name of your organization.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="bussinessemail@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please enter the email of your organization.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormDescription>
                Please enter the Login password of your organization.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmationPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormDescription>
                Please enter the Login password again.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </form>
      {error}
    </Form>
  );
};
