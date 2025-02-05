const DB = require("../database/Connection");
const TokenGenarator = require("../middleware/Token");

exports.LoginPage = (req, res) => {
  let { email, password } = req.body;
  let sqlQ = `SELECT * FROM clint WHERE email= '${email}'`;
  DB.query(sqlQ, (err, results) => {
    if (err) {
      res.status(500).json(err);
    } else {
      if (results.length > 0) {
        if (results[0].password === password) {
          const token = TokenGenarator.GenarateToken(
            `${results[0].id}`,
            results[0].fullname
          );
          res.status(200).json({ data: results[0], token });
        } else {
          res.status(200).json({ msg: "wrong" });
        }
      } else {
        res.status(409).json({ msg: "empty" });
      }
    }
  });
};

exports.SignupPage = async (req, res) => {
  try {
    let { fullname, email, password, country } = req.body;
    let sql = `INSERT INTO clint( fullname, email, password,country)
        VALUES ('${fullname}','${email}','${password}','${country}')`;
    DB.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        let sqlx = `SELECT * FROM clint WHERE email= '${email}'`;
        DB.query(sqlx, (errs, out) => {
          if (errs) {
            res.status(500).json(errs);
          } else {
            const tokenGen = TokenGenarator.GenarateToken(
              out[0].id,
              out[0].fullname
            );
            res.status(200).json({ data: out[0], token: tokenGen });
          }
        });
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
