import { useState } from "react";
import { registerUser, loginUser } from "./authService";
import { Input } from "../../components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  async function handleSubmit() {
    if (!email || !password || (mode === "signup" && !fullName)) {
      return setMessage({
        type: "error",
        text: "Please fill all required fields",
      });
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      let response;
      if (mode === "signup") {
        response = await registerUser(email, password, fullName);
        setMessage({
          type: "success",
          text: "Account created! Redirecting to home...",
        });
        navigate("/"); // <-- Redirect to home
      } else {
        response = await loginUser(email, password);
        setMessage({
          type: "success",
          text: "Logged in successfully! Redirecting to home...",
        });
        navigate("/"); // <-- Redirect to home
      }

      console.log(response);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Something went wrong.",
      });
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            {mode === "login" ? "Login" : "Create Account"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {mode === "signup" && (
            <Input
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          )}

          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {message.text && (
            <p
              className={`text-sm text-center ${
                message.type === "error" ? "text-red-500" : "text-green-600"
              }`}
            >
              {message.text}
            </p>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : mode === "login" ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </Button>

          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-sm text-sky-600 hover:underline"
          >
            {mode === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
