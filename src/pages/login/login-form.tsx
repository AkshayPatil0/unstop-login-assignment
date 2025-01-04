import accountCircleIcon from "@/assets/account_circle.svg";
import mailIcon from "@/assets/mail.svg";
import keyIcon from "@/assets/key.svg";
import visibilityIcon from "@/assets/visibility.svg";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginApi, LoginResponse } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { Loader2Icon } from "lucide-react";

const loginFormSchema = z.object({
  username: z.string(),
  // username: z.string().refine((v) => v === ("emilys" as string)),
  email: z.string().email().optional(),
  password: z.string().min(8),
  remember: z.boolean().optional(),
});

export default function LoginForm({
  onSuccess,
}: {
  onSuccess: (loginData: LoginResponse) => void;
}) {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
      remember: false,
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: z.infer<typeof loginFormSchema>) =>
      loginApi(data.username, data.password),
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to login !",
      });
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutate(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8 mt-8">
        <div className="space-y-4">
          <FormField
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormInput
                  icon={accountCircleIcon}
                  label="User name"
                  type="text"
                  id="username"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormInput
                  icon={mailIcon}
                  label="Email"
                  type="email"
                  id="email"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <PasswordInput {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between items-center">
          <FormField
            name="remember"
            render={({ field }) => (
              <div className="flex items-center gap-4">
                <Checkbox
                  className="size-4 bg-muted border-none"
                  id="remember"
                  onCheckedChange={field.onChange}
                  {...field}
                />
                <label htmlFor="remember" className="text-muted-foreground">
                  Remember me
                </label>
              </div>
            )}
          />
          <a href="#" className="text-primary">
            Forgot password?
          </a>
        </div>
        <div className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error.message}
            </div>
          )}
          <button className="w-full bg-primary text-white rounded-lg p-4 shadow-sm flex items-center justify-center gap-2 text-bold">
            {isPending && <Loader2Icon className="size-5 animate-spin" />} Login
          </button>
        </div>
        <div className="text-center">
          Don't have an account?{" "}
          <a href="#" className="text-primary">
            Register
          </a>
        </div>
      </form>
    </Form>
  );
}

function PasswordInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [visibility, setVisibility] = useState(false);

  return (
    <FormInput
      icon={keyIcon}
      label="Password"
      type={visibility ? "text" : "password"}
      id="password"
      rightAction={
        <img
          src={visibilityIcon}
          className="cursor-pointer"
          onMouseDown={() => setVisibility(true)}
          onMouseUp={() => setVisibility(false)}
          onMouseLeave={() => setVisibility(false)}
          onTouchStart={() => setVisibility(true)}
          onTouchEnd={() => setVisibility(false)}
        />
      }
      {...props}
    />
  );
}

function FormInput({
  icon,
  label,
  rightAction,
  ...inputProps
}: {
  label: string;
  icon: string;
  rightAction?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center gap-4 relative">
      <div className="absolute left-0 top-0 z-10 h-full flex items-center px-4">
        <img src={icon} />
      </div>
      <div className="flex-1 relative">
        <label
          htmlFor="email"
          className="text-sm text-muted-foreground block absolute top-4 left-16"
        >
          {label}
        </label>
        <input
          className="font-bold w-full bg-muted rounded-lg p-4 pt-10 pl-16"
          {...inputProps}
        />
      </div>

      {rightAction && (
        <div className="absolute right-0 top-0 z-10 h-full flex items-center px-4">
          {rightAction}
        </div>
      )}
    </div>
  );
}
