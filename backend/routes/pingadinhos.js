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

module.exports = router;
