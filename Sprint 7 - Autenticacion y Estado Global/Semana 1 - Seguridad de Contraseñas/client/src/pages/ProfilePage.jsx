import { useEffect, useState } from "react";

function ProfilePage() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            // 1. Obtenemos el token de localStorage
            const token = localStorage.getItem("authToken");

            try {
                // 2. Hacemos la petición GET al endpoint protegido
                const response = await fetch("http://localhost:5000/api/users/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        // 3. Incluimos el token en el encabezado Authorization
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    // Guardamos la información del perfil en el estado
                    setProfile(data);
                } else {
                    console.error("No se pudo acceder al perfil.");
                }
            } catch (error) {
                console.error("Error en la petición:", error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <h2>Perfil de Usuario</h2>
            {profile ? (
                <div>
                    <p>Bienvenido, {profile.username}</p>
                    <p>Email: {profile.email}</p>
                </div>
            ) : (
                <p>Cargando información del perfil...</p>
            )}
        </div>
    );
}

export default ProfilePage;
