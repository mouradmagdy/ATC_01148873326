import { Lock, Mail, User } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
// import { signup } from "../apis/auth-api";
import { useAuthContext } from "../context/AuthContext";
import { signupAPI } from "@/apis/auth-api";
import { SelectField } from "@/components/admin-portal/AddEventFormFields";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  username: z.string().min(2, "Username must be at least 2 characters."),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  //male or female
  gender: z.enum(["male", "female"]),
});

function Signup() {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "male",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password !== values.confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    const data = {
      fullName: values.fullName,
      username: values.username,
      password: values.password,
      confirmPassword: values.confirmPassword,
      gender: values.gender,
    };
    const userData = await signupAPI(data);
    if (!userData) return;
    setAuthUser(userData);
    navigate("/home");
  }

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];
  return (
    <div className="max-h-screen  flex items-center justify-center p-4">
      <div className="max-w-md w-full  rounded-xl border shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold ">Create an Account</h1>
          <p className="mt-2 ">Join us today! Enter your details to sign up.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Name</FormLabel>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2  h-5 w-5" />
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="pl-10"
                        placeholder="Enter your full name"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Username</FormLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2  h-5 w-5" />
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
            <SelectField
              control={form.control}
              name="gender"
              label="Gender"
              placeholder="Select Gender"
              options={genderOptions}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Password</FormLabel>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Confirm Password</FormLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2  h-5 w-5" />
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        className="pl-10"
                        placeholder="confirm your password"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <p className="text-sm ">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
