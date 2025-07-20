import { Button } from "@/components/ui/button";
import { AuthContainer } from "../../components/AuthContainer";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "../../context/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IUser, UserRole } from "@/@types/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const { handleLogin } = useAuthContext();
  const [inputUser, setInputUser] = useState<Partial<IUser> | null>(null);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    handleLogin({ ...data, role: inputUser?.role as UserRole });
    setInputUser(null);
    e.currentTarget.reset();
  };
  return (
    <AuthContainer onSubmit={onSubmit}>
      <Input type="email" name="email" placeholder="Email" className="w-full" />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full"
      />
      <Select
        value={inputUser?.role || ""}
        onValueChange={(role: UserRole) =>
          setInputUser({ ...inputUser, role: role })
        }
      >
        <SelectTrigger name="role" className="w-full">
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="customer">Customer</SelectItem>
          <SelectItem value="partner">Partner</SelectItem>
        </SelectContent>
      </Select>
      <Button className="w-full" type="submit">
        Login
      </Button>
      <div className="text-sm mt-2 font-serif">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-blue-400">
          Register
        </Link>
      </div>
    </AuthContainer>
  );
}

export default Login;
