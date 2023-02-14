const TYPES = {
    UserRepository: Symbol.for("UserRepository"),
    UserService: Symbol.for("UserService"),
    UserController: Symbol.for("UserController"),

    FoodRepository: Symbol.for("FoodRepository"),
    FoodService: Symbol.for("FoodService"),
    FoodController: Symbol.for("FoodController"),

    CartRepository: Symbol.for("CartRepository"),
    CartService: Symbol.for("CartService"),
    CartController: Symbol.for("CartController"),
    CheckoutRepository: Symbol.for("CheckoutRepository")
};

export {TYPES};
