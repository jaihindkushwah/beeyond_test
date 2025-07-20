import { UserRole } from "@/@types/schema";
import { NextFunction, Request, Response } from "express";

export const roleBased = (requiredRole: UserRole) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ message: "Authentication required" });
    }
    if (user.role !== requiredRole) {
      return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }
    next();
  };
};
