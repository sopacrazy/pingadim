// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");

const router = express.Router();

// Criar novo usuário
router.post("/register", async (req, res) => {
  const { nome, sobrenome, email, cpf, senha } = req.body;

  try {
    // Verificar se já existe o e-mail ou CPF
    const [verifica] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ? OR cpf = ?",
      [email, cpf]
    );
    if (verifica.length > 0) {
      return res.status(400).json({ error: "E-mail ou CPF já cadastrado" });
    }

    // Hash da senha
    const hash = await bcrypt.hash(senha, 10);

    // Inserir usuário
    await pool.query(
      "INSERT INTO usuarios (nome, sobrenome, email, cpf, senha_hash) VALUES (?, ?, ?, ?, ?)",
      [nome, sobrenome, email, cpf, hash]
    );

    res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// Verifica se CPF já existe
router.get("/verificar-cpf/:cpf", async (req, res) => {
  const { cpf } = req.params;

  try {
    const [rows] = await pool.query("SELECT id FROM usuarios WHERE cpf = ?", [
      cpf,
    ]);
    if (rows.length > 0) {
      return res.status(200).json({ existe: true });
    } else {
      return res.status(200).json({ existe: false });
    }
  } catch (err) {
    console.error("Erro ao verificar CPF:", err);
    return res.status(500).json({ error: "Erro ao verificar CPF" });
  }
});

// Login de usuário
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  console.log("🔐 Tentando login com:", email, senha);

  try {
    const [usuarios] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    console.log("🔍 Resultado da query:", usuarios);

    if (usuarios.length === 0) {
      console.log("❌ E-mail não encontrado:", email);
      return res.status(400).json({ error: "E-mail não encontrado" });
    }

    const usuario = usuarios[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);

    console.log("🔑 Senha correta?", senhaCorreta);

    if (!senhaCorreta) {
      console.log("❌ Senha incorreta para:", email);
      return res.status(401).json({ error: "Senha incorreta" });
    }

    console.log("✅ Login realizado com sucesso para:", usuario.nome);

    res.status(200).json({
      message: "Login realizado com sucesso",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (err) {
    console.error("🔥 Erro no login:", err);
    res.status(500).json({ error: "Erro no login" });
  }
});

module.exports = router;
