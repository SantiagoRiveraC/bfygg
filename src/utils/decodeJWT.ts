export function decodeJWT(token: string | null) {
    try {
        if (token) {
            const payload = token?.split('.')[1];
            return JSON.parse(atob(payload));
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
}