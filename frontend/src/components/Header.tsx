import {
  User,
  LogOut,
  Settings,
  Home,
  ShoppingCart,
  ShoppingBag,
  Bell,
  Users,
  ShieldIcon as ShieldUser,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useCartContext } from "@/context/CartContext";

interface HeaderProps {
  role?: "customer" | "partner" | "admin";
  isAuthenticated: boolean;
  onSignOut: () => void;
  user?: {
    name: string;
    email?: string;
    avatarUrl?: string;
  };
}

const CartIcons = () => {
  const { cartData } = useCartContext();
  return (
    <div className="relative">
      <ShoppingCart className="h-4 w-4" />
      {cartData?.items && cartData?.items?.length > 0 && (
        <span className="absolute -top-3 left-2 text-[9px] bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center">
          {cartData?.items?.length}
        </span>
      )}
    </div>
  );
};

export function Header({
  role = "customer",
  isAuthenticated,
  onSignOut,
  user,
}: HeaderProps) {
  const navLinks = {
    customer: [
      { name: "Home", path: "/", icon: <Home className="h-4 w-4" /> },
      {
        name: "Order History",
        path: "/order-history",
        icon: <ShoppingBag className="h-4 w-4" />,
      },
      {
        name: "Cart",
        path: "/cart",
        icon: <CartIcons />,
      },
    ],
    partner: [
      {
        name: "Orders",
        path: "/partner/orders",
        icon: <ShoppingBag className="h-4 w-4" />,
      },
      // {
      //   name: "Status",
      //   path: "/partner/status",
      //   icon: <Users className="h-4 w-4" />,
      // },
      {
        name: "Notifications",
        path: "/partner/notifications",
        icon: <Bell className="h-4 w-4" />,
      },
    ],
    admin: [
      {
        name: "All Orders",
        path: "/admin/orders",
        icon: <ShieldUser className="h-4 w-4" />,
      },
      {
        name: "All Partners",
        path: "/admin/partners",
        icon: <Users className="h-4 w-4" />,
      },
    ],
  };

  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "ABC"
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-8">
          <Link
            to={navLinks[role][0].path}
            className="flex items-center space-x-2"
          >
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                B
              </span>
            </div>
            <h1 className="text-xl font-bold text-foreground">Beeyond</h1>
          </Link>
          {/* Desktop Navigation - Hidden on small screens */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks[role].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group px-2 py-1 rounded-md hover:bg-accent/50"
              >
                {link.icon}
                <span>{link.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4 justify-end">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-auto px-2 rounded-full hover:bg-accent"
                >
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-10 w-10 rounded-full">
                      <AvatarImage src={"./avtar.jpg"} alt={user.name} />
                      <AvatarFallback className="text-xs text-black capitalize">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:flex flex-col items-start">
                      <span className="text-sm font-medium text-foreground capitalize">
                        {user.name}
                      </span>
                      {user.email && (
                        <span className="text-xs text-muted-foreground">
                          {user.email}
                        </span>
                      )}
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium capitalize">{user.name}</p>
                    {user.email && (
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />

                <div className="md:hidden">
                  {navLinks[role].map((link) => (
                    <DropdownMenuItem key={link.name} asChild>
                      <Link to={link.path} className="cursor-pointer">
                        {link.icon}
                        <span className="ml-2">{link.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                </div>

                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:text-red-600"
                  onClick={onSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              {/* Mobile Menu for Non-Authenticated Users */}
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    {navLinks[role].map((link) => (
                      <DropdownMenuItem key={link.name} asChild>
                        <Link to={link.path} className="cursor-pointer">
                          {link.icon}
                          <span className="ml-2">{link.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/login" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Sign In</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/register" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Sign Up</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
