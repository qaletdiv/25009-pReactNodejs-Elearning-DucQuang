const { where } = require("sequelize");
const { Cart, CartItem, Course } = require("../models");

exports.addToCart = async (req, res, next) => {
  const userId = req.user.id;
  const { courseId } = req.body;
  try {
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }
    const existingItem = await CartItem.findOne({
      where: { cartId: cart.id, courseId },
    });
    if (existingItem) {
      return res.status(200).json({ message: "Khóa học đã có trong giỏ hàng" });
    }
    await CartItem.create({
      cartId: cart.id,
      courseId,
    });
    res.status(201).json({ message: "Đã thêm vào giỏ hàng" });
  } catch (error) {
    next(error);
  }
};

exports.getCart = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({
      where: { userId },
      include: [
        {
          model: CartItem,
          as: "items",
          include: [
            {
              model: Course,
              as: "course",
              attributes: ['id', 'title', 'image', 'description', 'price'],
            },
          ],
        },
      ],
    });

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({ message: "Giỏ hàng trống", items: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

exports.removeFromCart = async (req, res, next) => {
  const userId = req.user.id;
  const { cartItemId } = req.params;
  try {
    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }
    await CartItem.destroy({
      where: {
        cartId: cart.id,
        id: cartItemId,
      },
    });
    res.status(200).json({ message: "Đã xóa khỏi giỏ hàng" });
  } catch (error) {
   next(error)
  }
};


exports.clearCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(200).json({ message: "Giỏ hàng đã trống!" });
    }
    await CartItem.destroy({ where: { cartId: cart.id } });
    res.json({ message: "Đã xóa toàn bộ giỏ hàng!" });
  } catch (error) {
    next(error);
  }
};;
