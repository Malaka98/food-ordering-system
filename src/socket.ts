import {Server} from 'socket.io';
import jwt from "jsonwebtoken";
import {container} from "./index";
import {CartController} from "./cartModule/controller/cartController";
import {TYPES} from "./types";

require("dotenv").config();
const io = new Server();

const chatNameSpace = io.of("/chat")
const cartNameSpace = io.of("/cart")

const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(c => c.trim().split('='))
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

cartNameSpace.on("connection", socket => {
    console.log("Connected")
    try {
        const cookies: any = parseCookies(socket.request.headers.cookie);
        const cartController = container.get<CartController>(TYPES.CartController)

        // if (cookies.access_token) {
        //     try {
        //         const user = jwt.verify(cookies.access_token, process.env.JWT_SECRET)

                socket.on("add-item", async (data: any) => {
                    console.log("Event")
                    const cart = await cartController.addItem(data, "user._id")
                    socket.emit("get-cart", cart)
                })

            } catch (e) {
                socket.emit("Unauthorised", {message: `Unauthorised: ${e.message}`})
            }
    //     } else {
    //         socket.emit("Unauthorised", {message: "Unauthorised"})
    //     }
    //
    // } catch (e) {
    //     socket.emit("401", {message: `Unauthorised: ${e.message}`})
    // }
})
chatNameSpace.on("connection", (socket: any) => {

    const cookies: any = parseCookies(socket.request.headers.cookie);

    // console.log(cookies.access_token)
    if (cookies.access_token) {
        try {
            const user = jwt.verify(cookies.access_token, process.env.JWT_SECRET)
            // console.log("*********", user)
            socket.on('join', (data: any) => {
                socket.join(data.room);
                socket.broadcast.to(data.room).emit('user joined');
            });

            socket.on('message', (data: any) => {
                chatNameSpace.in(data.room).emit('new message', {user: data.user, message: data.message});
            });
        } catch (e) {
            socket.emit("401", {message: `Unauthorised: ${e.message}`})
        }
    } else {
        socket.emit("401", {message: "Unauthorised"})
    }
})

export default io
