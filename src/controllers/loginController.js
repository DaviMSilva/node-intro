const User = require('../models/users');

module.exports = class loginController {
  static async login(req, res) {
    const { email, senha } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
        senha: senha
      },
      raw: true
    });
    if (user) {
      return res.render('logado', { user });
    } else {
      return res.send('<script> alert("Email ou senha incorretos!")</script>');
    }
  }

  static async signin(req, res) {
    const user = {
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha

    };

    await User.create(user);
    return res.redirect('/login');
  }
};
