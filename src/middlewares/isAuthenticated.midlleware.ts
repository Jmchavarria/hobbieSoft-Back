import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { envs } from "../config";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.routineSofToken;

  if (!token) {
    return res.status(401).json({ message: "Token no encontrado en las cookies" });
  }

  try {
    jwt.verify(token, envs.JWT_SECRET_KEY);
    // req.user = decoded; // Si necesitas pasar datos del token a la request
    next(); // Continúa al siguiente middleware
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "El token ha expirado. Por favor, vuelve a iniciar sesión." });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Token inválido. No tienes autorización para acceder." });
    } else {
      console.error("Error verificando token:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};
