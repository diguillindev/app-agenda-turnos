// middleware/roleMiddleware.js
export const authorize = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.rol; // Rol del usuario autenticado
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: 'No tienes permiso para realizar esta acción.' });
        }
        next();
    };
};