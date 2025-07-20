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
import { toast } from "sonner";

function Register() {
  const [inputUser, setInputUser] = useState<Partial<IUser> | null>(null);
  const { handleRegister } = useAuthContext();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (data.password !== data.confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }
    data.role = inputUser?.role as UserRole;
    handleRegister(data);
  };
  return (
    <AuthContainer title="Register an account" onSubmit={onSubmit}>
      <Input type="text" name="name" placeholder="Name" className="w-full" />
      <Input type="email" name="email" placeholder="Email" className="w-full" />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full"
      />
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        className="w-full"
      />
      <Select
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
      <Button className="w-full">Register</Button>
      <div className="text-sm mt-2 font-serif">
        Already have an account?
        <Link to="/login" className="text-blue-400">
          &nbsp;Login
        </Link>
      </div>
    </AuthContainer>
  );
}

export default Register;
