export default async function handler(req, res) {
    // Seguridad: Solo permitir peticiones POST
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            error: { message: "Método no permitido. Use POST." } 
        });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.API_KEY}`;
    try 
    {
        const response = await fetch(url, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);

    } catch (error) {
        console.error("Error en Vercel Edge:", error);
        res.status(500).json({ 
            error: { message: "Error de conexión en el servidor de Vercel" } 
        });
    }
}
