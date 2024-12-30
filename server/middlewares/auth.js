const { verifyToken } = require("../helpers/jwt");
const { User, Preference } = require("../models");

async function authentication(req, res, next) {
  try {
    const getToken = req.headers.authorization;
    if (!getToken) {
      throw { name: "Unauthorized", message: "Invalid Token" };
    }
    const [type, token] = getToken.split(" ");

    const isValidToken = verifyToken(token);

    const user = await User.findByPk(isValidToken.id);

    if (!user) {
      throw { name: "Unauthorized", message: "Invalid Token" };
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

// async function needPrefrenece(req, res, next) {
//   try {
//     const userPreference = await Preference.findOne({
//       where: {
//         UserId: req.user.id,
//       },
//     });

//     if (!userPreference) {
//       res.redirect("/");
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// }

// async function userPermission(req, res, next) {
//   try {
//     const { id } = req.params;
//     const product = await Product.findByPk(+id);
//     if (!product) {
//       throw { name: "NotFound", message: "Product is not found" };
//     }
//     if (req.user.id !== product.authorId) {
//       throw { name: "Forbidden", message: `You'r not authorized` };
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// }

module.exports = {
  authentication,
};
