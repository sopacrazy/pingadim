// routes/pingadinhos.js
const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  const {
    titulo,
    descricao,
    link_personalizado,
    imagem,
    valor_meta,
    data_fim,
    privado,
    tem_recompensas,
    categoria,
    quem_recebe,
    valor_arrecadado = 0,
    cidade,
    estado,
    criado_por,
  } = req.body;

  try {
    const [result] = await db.execute(
      `INSERT INTO pingadinhos (
        titulo, descricao, link_personalizado, imagem,
        valor_meta, data_fim, privado, tem_recompensas,
        categoria, quem_recebe, valor_arrecadado,
        cidade, estado, criado_por, criado_em
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        titulo,
        descricao,
        link_personalizado,
        imagem || "",
        valor_meta,
        data_fim || null,
        privado || 0,
        tem_recompensas || 0,
        categoria || null,
        quem_recebe,
        valor_arrecadado,
        cidade,
        estado,
        criado_por,
      ]
    );

    res
      .status(201)
      .json({ id: result.insertId, message: "Pingadim salvo com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar Pingadim:", error);
    res.status(500).json({ message: "Erro ao salvar Pingadim" });
  }
});

router.get("/usuario/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT id, titulo, valor_meta, valor_arrecadado FROM pingadinhos WHERE criado_por = ?`,
      [id]
    );
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar Pingadinhos do usuário:", error);
    res.status(500).json({ message: "Erro ao buscar Pingadinhos" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute(
      `
      SELECT p.*, u.nome AS nome_usuario, p.categoria
      FROM pingadinhos p
      JOIN usuarios u ON u.id = p.criado_por
      WHERE p.id = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Pingadim não encontrado" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Erro ao buscar pingadim:", err);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

router.post("/contribuicoes", async (req, res) => {
  const { pingadim_id, nome, valor, anonimo } = req.body;

  if (!pingadim_id || !valor) {
    return res.status(400).json({ error: "Dados obrigatórios faltando" });
  }

  try {
    await db.execute(
      "INSERT INTO contribuicoes_pingadim (pingadim_id, nome, valor, anonimo) VALUES (?, ?, ?, ?)",
      [pingadim_id, anonimo ? "Anônimo" : nome, valor, anonimo]
    );

    res.status(201).json({ message: "Contribuição registrada com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao registrar contribuição" });
  }
});

module.exports = router;
