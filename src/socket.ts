import {Server} from 'socket.io';
import {container} from "./index";
import {CartController} from "./cartModule/controller/cartController";
import {TYPES} from "./types";
import {AuthMiddleware} from "./middlewares/authMiddleware";
import {CartDto} from "./cartModule/dto/cartDto";

const io = new Server();

const chatNameSpace = io.of("/chat")
const cartNameSpace = io.of("/cart")

cartNameSpace.use(AuthMiddleware.socketAuthenticate)
cartNameSpace.on("connection", async (socket: any) => {
    console.log("Connected")
    try {
        const user = socket.request.user
        const cartController = container.get<CartController>(TYPES.CartController)

        socket.on("add-item", async (data: any) => {
            try {
                await cartController.addItem(new CartDto(data.foodId, data.itemCount), user.id)
                const cart = await cartController.getCart(user.id)
                console.log(">>>>>>>>>>>>", cart)
                cartNameSpace.emit("get-cart", cart)
            } catch (e) {
                console.log(e.message)
            }
        })

        socket.on("delete-item", async (itemName: string) => {

            try {
                await cartController.deleteItem(itemName, user.id)
                const cart = await cartController.getCart(user.id)
                console.log(">>>>>>>>>>>>", cart)
                cartNameSpace.emit("get-cart", cart)
            } catch (e) {
                console.log(e.message)
            }
        })

        socket.on("get-current-cart", async () => {
            try {
                const cart = await cartController.getCart(user.id)
                console.log(">>>>>>>>>>>>", cart)
                cartNameSpace.emit("get-cart", cart)
            } catch (e) {
                console.log(e.message)
            }
        })

    } catch (e) {
        cartNameSpace.emit("Unauthorised", {message: `Unauthorised: ${e.message}`})
    }
})
chatNameSpace.on("connection", (socket: any) => {

    try {
        socket.on('join', (data: any) => {
            socket.join(data.room);
            socket.broadcast.to(data.room).emit('user joined');
        });

        socket.on('message', (data: any) => {
            chatNameSpace.in(data.room).emit('new message', {user: data.user, message: data.message});
        });
    } catch (e) {
        chatNameSpace.emit("401", {message: `Unauthorised: ${e.message}`})
    }
})

export default io
