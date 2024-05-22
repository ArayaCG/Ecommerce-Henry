import { Request, Response, NextFunction } from 'express';

export function loggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  console.log(
    `Ejecutando Middleware Global a las: ${time}, el día ${date}, metodo: ${req.method}, a la ruta: ${req.url}`,
  );
  next();
}
