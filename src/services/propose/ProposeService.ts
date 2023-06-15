import { Propose } from "@prisma/client";
import Joi from "joi";
import { VALIDATION_MESSAGES } from "../../consts/ValidationMessages";
import { ProposeDTO } from "../../dtos/ProposeDTO";
import { StatusCode } from "../../enums/StatusCode";
import { ValidationError } from "../../exceptions/ValidationError";
import { IProposeService } from "../../interfaces/Propose/IProposeService";
import { ProposeRepository } from "../../repositories/ProposeRepository";
import { getErrorResponse, getSuccessResponse } from "../../utils/ApiResponse";
import { schemaIdNumber } from "../../utils/ValidationSchema";

export class ProposeService implements IProposeService {

    private repository = new ProposeRepository()

    private schemaPropose = Joi.object({
        idProject: Joi.number().required(),
        idHired: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
        deadline: Joi.date().required(),
    })

    validatePropose(propose: Object) {
        const { error } = this.schemaPropose.validate(propose)
        if(error) {
            error.message = error.message.replace(/"/g, "")
            throw new ValidationError(error.message)
        }
    }

    validateId(proposeId: number) {
        const { error } = schemaIdNumber.validate(proposeId)
        if(error) {
            error.message = error.message.replace(/"/g, "")
            throw new ValidationError(error.message)
        }
    }

    async getAll() {
        const proposes = await this.repository.getAll();
        return proposes.length === 0
            ? getSuccessResponse<Propose>(StatusCode.OK, proposes, VALIDATION_MESSAGES.ListEmpty)
            : getSuccessResponse<Propose>(StatusCode.OK, proposes)
    }

    async getById(proposeId: number) {
        this.validateId(proposeId)
        const propose = await this.repository.getById(proposeId);
        return propose
            ? getSuccessResponse<Propose>(StatusCode.OK, propose)
            : getErrorResponse(StatusCode.NOT_FOUND, [VALIDATION_MESSAGES.NotFound])
    }

    async getByHiredId(hiredId: string) {
        const propose = await this.repository.getByHiredId(hiredId);
        return propose
            ? getSuccessResponse<Propose>(StatusCode.OK, propose)
            : getErrorResponse(StatusCode.NOT_FOUND, [VALIDATION_MESSAGES.NotFound])
    }

    async create(propose: Object) {
        this.validatePropose(propose)
        const proposeDTO = propose as ProposeDTO
        const newPropose = await this.repository.create(proposeDTO);
        return newPropose
            ? getSuccessResponse<Propose>(StatusCode.CREATED, newPropose)
            : getErrorResponse(StatusCode.BAD_REQUEST, [VALIDATION_MESSAGES.CreateFailed])
    }

    async update(proposeId: number, propose: ProposeDTO) {
        this.validateId(proposeId)
        this.validatePropose(propose)
        const proposeDTO = propose as ProposeDTO
        const updatedPropose = await this.repository.update(proposeId, proposeDTO);
        return updatedPropose
            ? getSuccessResponse<Propose>(StatusCode.OK, updatedPropose)
            : getErrorResponse(StatusCode.BAD_REQUEST, [VALIDATION_MESSAGES.UpdateFailed])
    }

    async delete (proposeId: number) {
    this.validateId(proposeId)
    const deletedPropose = await this.repository.delete(proposeId);
    return deletedPropose
        ? getSuccessResponse<Propose>(StatusCode.OK, deletedPropose)
        : getErrorResponse(StatusCode.BAD_REQUEST, [VALIDATION_MESSAGES.DeleteFailed])
}
}