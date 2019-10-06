const Usuarios = require("../model/usuarios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.CLIENT_ID);

let login = (req, res) => {
  const data = req.body;

  Usuarios.findOne({ email: data.email }, (err, usuarioDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        error: {
          message: "Internal error server"
        }
      });
    }
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        error: {
          message: "Failed (user) or password"
        }
      });
    }

    if (!bcrypt.compareSync(data.password, usuarioDB.password)) {
      return res.status(400).json({
        ok: false,
        error: {
          message: "Failed user or (password)"
        }
      });
    } else {
      const token = jwt.sign(
        {
          data: usuarioDB
        },
        process.env.SECRET_JWT,
        {
          expiresIn: process.env.EXPIRE_TOKEN
        }
      );
      return res.status(200).json({
        ok: true,
        message: "Welcome to RestServer",
        data: usuarioDB,
        token
      });
    }
  });
};

//Setting google
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID
  });
  const payload = ticket.getPayload();

  return {
    name: payload.name,
    email: payload.email,
    picture: payload.picture,
    google: true
  };
}

let loginGoogle = async (req, res) => {
  let { idtoken } = req.body;
  const googleUser = await verify(idtoken).catch(e => {
    res.status(401).json({
      ok: false,
      error: e
    });
  });
  Usuarios.findOne({ email: googleUser.email }, (err, usuarioDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Ha ocurrido un error",
        error: err
      });
    }
    if (usuarioDB) {
      if (usuarioDB.google === false) {
        return res.status(501).json({
          ok: false,
          error: {
            message: "Debes autenticarte con tu usuario normal"
          }
        });
      } else {
        const token = jwt.sign(
          {
            data: usuarioDB
          },
          process.env.SECRET_JWT,
          {
            expiresIn: process.env.EXPIRE_TOKEN
          }
        );
        return res.status(200).json({
          ok: true,
          data: usuarioDB,
          token
        });
      }
    } else {

      let usuario = new Usuarios()

        usuario.nombre = googleUser.name;
        usuario.email = googleUser.email;
        usuario.img = googleUser.picture;
        usuario.google = true;
        usuario.password = ":)";
      
      usuario.save((err, usuarioDB) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            error: err
          });
        } else {
            const token = jwt.sign(
                {
                  data: usuarioDB
                },
                process.env.SECRET_JWT,
                {
                  expiresIn: process.env.EXPIRE_TOKEN
                }
              );
          return res.status(200).json({
            ok: true,
            data: usuarioDB,
            token
          });
        }
      });
    }
  });
};

module.exports = {
  login,
  loginGoogle
};
