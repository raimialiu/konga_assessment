import { Request, Response } from "express";
import HttpStatusCodes from "../utils/HttpStatusCodes";
import _ from "lodash"
import { ErrorMessages } from "../constant/errors.constant";
import { UserRepository } from "../services/repository/user.repository";
import { BaseController } from "./base.controller";
import Joi from "joi";
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import Application from '../config/app.config';
import { Panic } from "../common";
import { ApplicationError } from "../errors/application.error";

export class UserController extends BaseController {

    private userRepo: UserRepository;


    constructor() {
        super();

        this.userRepo = new UserRepository();

    }


    create = async (req: Request, res: Response) => {

        try {
            const payload = req.body;
            console.log({createPayload: payload})

            const validateAllow = (value: any, allowedList: any[]) => {
                console.log({ value, allowedList })
                return allowedList.includes(value)
            }

            const schema = this.defineValidationSchema({
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                password: Joi.string().required(),
                email: Joi.string().custom((v, h) => {
                    const test =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
                    if(!test) {
                        Panic(`invalid email`)
                    }

                    return true
                }).required(),
                role: Joi.string().custom((v, h) => {
                    return v && validateAllow(v.toLowerCase(), ['user', 'admin'])
                }).required()
            })

            
            // Validate The Movie Object
            const { error } = this.validateObject(schema, payload);
            if (error) {
                return this.failedResponse(res, error.message, null, HttpStatusCodes.UNPROCCESSABLE_ENTITY)
            }

            const createResult = await this.userRepo.createUserAsync(payload)

            return this.success(res, createResult);


        } catch (err) {
            console.log({ createUserError: err });

            if(err instanceof ApplicationError) {
                return this.failedResponse(res, err.Message, null, HttpStatusCodes.BAD_REQUEST);
            }

            return this.failedResponse(res, ErrorMessages.GenericFailure);
        }

    }

    login = async (req: Request, res: Response) => {

        try {
            const payload = req.body

            const schema = this.defineValidationSchema({
                email: Joi.string().required(),
                password: Joi.string().required()
            })

            // Validate The Movie Object
            const { error } = this.validateObject(schema, payload);
            if (error) {
                return this.failedResponse(res, error.message,  null, HttpStatusCodes.UNPROCCESSABLE_ENTITY)
            }

            const {email, password} = payload

            const findUser = await this.userRepo.findOneUser({
                email
            })

            if(!findUser) {
                return this.failedResponse(res, `invalid authentication details`, null, HttpStatusCodes.UNAUTHORIZED)
            }

            const pwd = await compare(password, findUser.password)
            console.log({pwdResult: pwd})
            if(!pwd) {
                return this.failedResponse(res, `invalid authentication details`, null, HttpStatusCodes.UNAUTHORIZED)
            }

            const token = sign({ findUser }, Application.APP_SECRET_KEY, {expiresIn: '1h' });

            return this.success(res, {token, user:findUser})
            
        } catch (error) {
            console.log({loginError:error})
            return this.failedResponse(res, ErrorMessages.GenericFailure)
        }

    }

    update = async (req: Request, res: Response) => {

        try {

            const payload = req.body;

            const validateAllow = (value: any, allowedList: any[]) => {
                console.log({ value, allowedList })
                return allowedList.includes(value)
            }

            const schema = this.defineValidationSchema({
                id: Joi.string().required(),
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                email: Joi.string().custom((v, h) => {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
                }).required(),
                role: Joi.string().custom((v, h) => {
                    return v && validateAllow(v.toLowerCase(), ['user', 'admin'])
                }).required()
            })

            // Validate The Movie Object
            const { error } = this.validateObject(schema, payload);
            if (error) {
                return this.failedResponse(res, error.message, null, HttpStatusCodes.UNPROCCESSABLE_ENTITY)
            }

            const findUser = await this.userRepo.findOneUser({ id: payload.id })
            if (!findUser) {
                return this.failedResponse(res, 'user not found', 'user not found', HttpStatusCodes.NOT_FOUND)
            }

            const updateResult = await this.userRepo.updateUser({ id: payload.id }, { ...payload })

            return this.success(res, updateResult);

        } catch (err) {
            console.log({ updateResult: err })
            return this.failedResponse(res, "Sorry, This movie could not be updated!");
        }
    }

    fetchSingle = async (req: Request, res: Response) => {
        try {
            const { user_id } = req.params;

            const user = await this.userRepo.findOneUser({ id: user_id });
            if (!user) {
                return this.failedResponse(res, "no match found....", null, HttpStatusCodes.NOT_FOUND);
            }

            return this.success(res, user, "OK");
        } catch (err) {
            console.log({ fetchError: err });

            return this.failedResponse(res, "!!oops, please try again");
        }
    }

    findAll = async (req: Request, res: Response) => {

        try {

            const query = req?.query
            const page = +query?.page
            const pageSise = +query?.pageSize

            const users = await this.userRepo.findAllUser({}, {
                page, limit: pageSise});

            return this.success(res, users);
        } catch (err) {
        
            return this.failedResponse(res, "Sorry, This movie could not be retrieved!");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {

            const { user_id } = req.params;

            const findUser = await this.userRepo.findOneUser({ id: user_id });
            if (!findUser) {
                return this.failedResponse(res, "no match found", HttpStatusCodes.NOT_FOUND.toString());
            }

            await this.userRepo.deleteUser({ id: user_id });

            return this.success(res, "OK", "DELETED");

        } catch (err) {
            console.log({ deleteError: err });

            return this.failedResponse (res, ErrorMessages.GenericFailure);
        }
    }
}