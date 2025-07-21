export const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3001" // quando rodar local
    : "https://pingadim.onrender.com"; // produção (Render)
