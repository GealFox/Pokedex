export default async function handler(req, res) {
    // Usamos v1beta porque v1 todavía no tiene habilitado el modelo Flash para todas las cuentas
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.API_KEY}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();

        if (!response.ok) {
            // Si Google nos da error, se lo pasamos al frontend para saber qué pasa
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: { message: "Error interno en el servidor de Vercel" } });
    }
}
