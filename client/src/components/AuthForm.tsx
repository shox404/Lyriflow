import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { LogIn, UserPlus } from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

export type AuthDataType = {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
};

interface AuthFormProps {
  type: "signin" | "signup";
  back: (data: AuthDataType) => void;
}

const AuthForm = ({ type, back }: AuthFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AuthDataType>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (type === "signup") {
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      back(formData);
    }

    // Simulate authentication
    setTimeout(() => {
      toast({
        title: type === "signin" ? "Welcome back!" : "Account created!",
        description:
          type === "signin"
            ? "You have successfully signed in"
            : "Your account has been created successfully",
      });
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <Link to="/" className="flex items-center gap-2">
              <Avatar>
                <AvatarImage className="rounded-full" src="/logo.png" />
              </Avatar>
              <span className="font-bold text-lg">Lyriflow</span>
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold">
            {type === "signin" ? "Welcome Back" : "Create an Account"}
          </CardTitle>
          <CardDescription>
            {type === "signin"
              ? "Enter your credentials to access your account"
              : "Fill in the form below to create your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-music-primary/20 focus-visible:ring-music-primary"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-music-primary/20 focus-visible:ring-music-primary"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {type === "signin" && (
                  <Link
                    to="/forgot-password"
                    className="text-sm text-music-primary hover:underline transition"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="border-music-primary/20 focus-visible:ring-music-primary"
              />
            </div>
            {type === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="border-music-primary/20 focus-visible:ring-music-primary"
                />
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-music-primary hover:bg-music-primary/90 gap-2 mt-6 text-black"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {type === "signin" ? "Signing In..." : "Creating Account..."}
                </>
              ) : (
                <>
                  {type === "signin" ? (
                    <>
                      <LogIn size={18} />
                      Sign In
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      Create Account
                    </>
                  )}
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <p className="text-sm text-muted-foreground">
            {type === "signin"
              ? "Don't have an account? "
              : "Already have an account? "}
            <Link
              to={type === "signin" ? "/signup" : "/signin"}
              className="text-music-primary hover:underline font-medium transition"
            >
              {type === "signin" ? "Sign Up" : "Sign In"}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;
