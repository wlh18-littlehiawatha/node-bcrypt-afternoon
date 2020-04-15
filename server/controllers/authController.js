const bcrypt = require('bcrypt.js')

module.exports = {
   register: async (req,res) => {
      const db = req.app.get('db')

      const {username, password, isAdmin} = req.body

      const existingUser = await db.get_user([/* result*/])

      if(existingUser[0]) {
         return res.status(409).send('Username taken')
      }

      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)

      const registeredUser = await db.register_user([username, hash])

      // let user = registeredUser[0]  //???

      req.session.user = {
         isAdmin: user.is_Admin,
         id: user.id,
         username: user.username
      }

      res.status(201).send(req.session.user)


   }
}