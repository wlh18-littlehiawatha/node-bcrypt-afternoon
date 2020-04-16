module.exports = {
   usersOnly:(req, res, next) => {
      if (!req.sessions.user) {
         return res.status(401).send('Please log in');
      }
      next();

   },

   adminsOnly: (req, res, next) => {
      if (!req.session.user.isAdmin) {
         return res.status(403).send('You are not admin');
      }
      next();
   }

};