//fix
export default async function handler(req, res) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.API_KEY}`;
    try {
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
        res.status(500).json({ 
            error: { message: "Error de conexión en el servidor de Vercel" } 
        });
    }
}
