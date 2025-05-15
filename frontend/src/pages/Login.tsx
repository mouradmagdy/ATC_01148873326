import { Lock, User } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";

import { loginAPI } from "../apis/auth-api";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

function Login() {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const userData = await loginAPI(values.username, values.password);
    if (!userData) return;
    localStorage.setItem("user", JSON.stringify(userData));
    setAuthUser(userData);
  }

  return (
    <div className="max-h-screen  flex items-center justify-center p-4">
      <div className="max-w-md w-full  rounded-xl border shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold ">Welcome Back</h1>
          <p className="mt-2 ">Please enter your details to login</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Username</FormLabel>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2  h-5 w-5" />
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="pl-10"
                        placeholder="Enter your username"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="">Password</FormLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2  h-5 w-5" />
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        className="pl-10"
                        placeholder="Enter your password"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <p className="text-sm ">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
