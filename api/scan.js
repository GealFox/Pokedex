export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: { message: "Método no permitido" } });
    }

    // Actualizado al modelo exacto que aparece en tu panel
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.API_KEY}`;
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Error en API:", data);
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ error: { message: "Error crítico de servidor" } });
    }
}
