const { Order, User, Course, OrderItem, Enrollment } = require("../models");
const Stripe = require("stripe");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
exports.createPaymentIntent = async (req, res, next) => {
  try {
    const {
      items = [],
      currency = "usd",
      discount = 0,
      shipping = 0,
    } = req.body;

    const userId = req.user.id;
    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Không có sản phẩm nào để thanh toán" });
    }

    const courses = await Course.findAll();

    const caculateOrderAmount = (items) => {
      return items.reduce((total, item) => {
        const product = courses.find((course) => course.id === item.courseId);
        if (!product) return total;
        return total + product.price;
      }, 0);
    };

    const orderAmount = caculateOrderAmount(items);
    const totalPrice = orderAmount + shipping - discount;
    const amount = Math.round(totalPrice);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId: userId, 
        email: req.user.email || "", 
        name: req.user.name || "", 
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { items, totalPrice } = req.body;

    const order = await Order.create({ userId, totalPrice });

    for (const item of items) {
      await OrderItem.create({
        orderId: order.id,
        courseId: item.courseId,
        price: item.course.price,
      });
      await Enrollment.findOrCreate({
        where: { userId, courseId: item.courseId },
        defaults: { userId, courseId: item.courseId },
      });
    }

    res.json({ message: "Đã tạo đơn hàng thành công!", orderId: order.id });
  } catch (error) {
    next(error);
  }
};
