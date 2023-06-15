import { Hired } from "@prisma/client";
import Joi from "joi";
import { VALIDATION_MESSAGES } from "../../consts/ValidationMessages";
import { HiredDTO } from "../../dtos/HiredDTO";
import { StatusCode } from "../../enums/StatusCode";
import { ValidationError } from "../../exceptions/ValidationError";
import { IHiredService } from "../../interfaces/Hired/IHiredService";
import { HiredRepository } from "../../repositories/HiredRepository";
import { getErrorResponse, getSuccessResponse } from "../../utils/ApiResponse";
import { schemaIdString } from "../../utils/ValidationSchema";

export class HiredService implements IHiredService {

    private repository = new HiredRepository()

    private schemaHired = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        description: Joi.string().required(),
        occupation: Joi.string().required(),
        skills: Joi.string().required(),
    })    

    validateHired(hired: Object) {
        const { error } = this.schemaHired.validate(hired)
        if (error) {
            error.message = error.message.replace(/"/g, "")
            throw new ValidationError(error.message)
        }
    }

    validateId(hiredId: string) {
        const { error } = schemaIdString.validate(hiredId)
        if (error) {
            error.message = error.message.replace(/"/g, "")
            throw new ValidationError(error.message)
        }
    }

    async getAll() {
        const hireds = await this.repository.getAll();
        return hireds.length === 0
            ? getSuccessResponse<Hired>(StatusCode.OK, hireds, VALIDATION_MESSAGES.ListEmpty)
            : getSuccessResponse<Hired>(StatusCode.OK, hireds)
    }

    async getById(hiredId: string) {
        this.validateId(hiredId)
        const hired = await this.repository.getById(hiredId);
        return hired
            ? getSuccessResponse<Hired>(StatusCode.OK, hired)
            : getErrorResponse(StatusCode.NOT_FOUND, [VALIDATION_MESSAGES.NotFound])
    }

    async create(hired: Object) {
        this.validateHired(hired)
        const hiredDTO = hired as HiredDTO
        const newHired = await this.repository.create(hiredDTO);
        return newHired
            ? getSuccessResponse<Hired>(StatusCode.CREATED, newHired)
            : getErrorResponse(StatusCode.BAD_REQUEST, [VALIDATION_MESSAGES.CreateFailed])
    }

    async update(hiredId: string, hired: HiredDTO) {
        this.validateId(hiredId)
        this.validateHired(hired)
        const hiredDTO = hired as HiredDTO
        const updatedHired = await this.repository.update(hiredId, hiredDTO);
        return updatedHired
            ? getSuccessResponse<Hired>(StatusCode.OK, updatedHired)
            : getErrorResponse(StatusCode.BAD_REQUEST, [VALIDATION_MESSAGES.UpdateFailed])
    }

    async delete(hiredId: string) {
        this.validateId(hiredId)
        const deletedHired = await this.repository.delete(hiredId);
        return deletedHired
            ? getSuccessResponse<Hired>(StatusCode.OK, deletedHired)
            : getErrorResponse(StatusCode.BAD_REQUEST, [VALIDATION_MESSAGES.DeleteFailed])
    }
}