export default async function handler(req, res) {
    // 1. Seguridad: Solo permitir peticiones POST
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            error: { message: "Método no permitido. Use POST." } 
        });
    }

    // 2. Cambio a modelo 1.5 Flash para mayor disponibilidad de cuota
    // Este modelo es más robusto ante el error de 'Limit: 0'.
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.API_KEY}`;
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();

        // 3. Manejo de errores de la API de Google (como el de Cuota Excedida)
        if (!response.ok) {
            console.error("Error detectado en Google API:", data);
            return res.status(response.status).json(data);
        }

        // 4. Respuesta exitosa
        res.status(200).json(data);

    } catch (error) {
        // 5. Error de conexión o de ejecución en Vercel
        console.error("Error crítico en el servidor de Vercel:", error);
        res.status(500).json({ 
            error: { message: "Error de conexión en el servidor de Vercel" } 
        });
    }
}
