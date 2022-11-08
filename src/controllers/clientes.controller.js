import { pool } from "../db.js";

export const getClientes = async (req, res) => {
  try {
    const [rows] = await pool.query("select * from cliente");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal",
    });
  }
};

export const getCliente = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "select * from cliente where idcliente= ?",
      [req.params.id]
    );

    if (rows.length <= 0)
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal",
    });
  }
};

export const postClientes = async (req, res) => {
  const { ci, nombre, appaterno, apmaterno, direccion, celular } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO cliente (ci,nombre,appaterno,apmaterno,direccion,celular) VALUES(?,?,?,?,?,?)",
      [ci, nombre, appaterno, apmaterno, direccion, celular]
    );
    res.send({ id: rows.insertId, nombre, appaterno, apmaterno });
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal",
    });
  }
};

export const updateClientes = async (req, res) => {
  const { id } = req.params;
  const { ci, nombre, appaterno, apmaterno, direccion, celular } = req.body;
  try {
    const [result] = await pool.query(
      "update cliente set ci = IFNULL(?,ci), nombre = IFNULL(?,nombre), appaterno = IFNULL(?,appaterno), apmaterno = IFNULL(?,apmaterno), direccion = IFNULL(?,direccion), celular = IFNULL(?,celular)  where idcliente= ?",
      [ci, nombre, appaterno, apmaterno, direccion, celular, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Cliente no encontrado",
      });

    const [rows] = await pool.query(
      "Select * from cliente where idcliente = ?",
      [id]
    );
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal",
    });
  }
};

export const deleteClientes = async (req, res) => {
  try {
    const [result] = await pool.query("delete from cliente where idcliente= ?", [
      req.params.id,
    ]);
  
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
  
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal",
    });
  }
};
