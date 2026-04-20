export default async function handler(req, res) {
    // CAMBIO CLAVE: v1beta en lugar de v1
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.API_KEY}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body)
        }
    );

    const data = await response.json();
    
    // Si Google devuelve un error, le pasamos ese error al frontend
    if (!response.ok) {
        return res.status(response.status).json(data);
    }
    
    res.status(200).json(data);
}
