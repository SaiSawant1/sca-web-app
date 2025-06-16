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
import { toast } from "sonner";
import { useAction } from "@/hooks/use-action";
import Link from "next/link";
import { LoginAction } from "../../../../actions/login";

const LoginFormSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

type LoginFormType = z.infer<typeof LoginFormSchema>;

export const LoginForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { execute } = useAction(LoginAction, {
    onSuccess: () => {
      toast.success("Logged in successfully");
      router.push("/");
    },
    onError: (error) => {
      setError(error);
      toast.error(`Login failed: ${error}`);
    },
  });
  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const onSubmit = async (value: LoginFormType) => {
    setError("");
    toast.promise(
      execute({
        orgEmail: value.email,
        password: value.password,
      }),
      {
        loading: "Logging in...",
        success: "Logged in successfully",
        error: (err) => `Login failed: ${err}`,
      },
    );
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <div className="flex flex-col gap-4">
          <Button type="submit">Submit</Button>
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </form>
      {error}
    </Form>
  );
};
