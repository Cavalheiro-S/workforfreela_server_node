import Joi from "joi";
import { VALIDATION_MESSAGES } from "../consts/ValidationMessages";

export const schemaIdString = Joi.string().required().messages({
    "string.base": VALIDATION_MESSAGES.InvalidId,
})

export const schemaIdNumber = Joi.number().required().messages({
    "number.base": VALIDATION_MESSAGES.InvalidId
})