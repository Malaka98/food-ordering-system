import {injectable} from "inversify";
import {ObjectId} from "mongodb";
import mongoose from "mongoose";

import {user} from "../../model/user";
import {UserRepository} from "../userRepository";
import {LoginDto} from "../../dto/loginDto";
import {cart} from "../../../cartModule/model/cart"

@injectable()
export class UserRepositoryImpl implements UserRepository {
    async deleteUserByEmail(email: string): Promise<any> {
        try {
            return await user.deleteOne({email: email});
        } catch (e) {
            throw e;
        }
    }

    async getUserById(id: string): Promise<any> {
        try {
            return await user.findOne({_id: new ObjectId(id)});
        } catch (e) {
            throw e;
        }
    }

    async getUserByUsernameAndPassword(credentials: LoginDto): Promise<any> {
        try {
            return await user.findOne({username: credentials.username, password: credentials.password});
        } catch (e) {
            throw e;
        }
    }

    async addUser(userModel): Promise<any> {
        const session = await mongoose.startSession();
        try {
            session.startTransaction();

            const user = await userModel.save({session});
            await new cart({id: user._id}).save({session})
            await session.commitTransaction();
            return user
        } catch (e) {
            await session.abortTransaction();
            throw e;
        } finally {
            await session.endSession();
        }
    }
}
