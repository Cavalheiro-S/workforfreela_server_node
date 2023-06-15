import { Contractor } from "@prisma/client";
import Joi from "joi";
import { VALIDATION_MESSAGES } from "../../consts/ValidationMessages";
import { ContractorDTO } from "../../dtos/ContractorDTO";
import { StatusCode } from "../../enums/StatusCode";
import { ValidationError } from "../../exceptions/ValidationError";
import { IContractorService } from "../../interfaces/Contractor/IContractorService";
import { ContractorRepository } from "../../repositories/ContractorRepository";
import { getErrorResponse, getSuccessResponse } from "../../utils/ApiResponse";
import { schemaIdString } from "../../utils/ValidationSchema";

export class ContractorService implements IContractorService {

    private repository = new ContractorRepository()

    private schemaContractor = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })    

    validateContractor(contractor: Object) {
        const { error } = this.schemaContractor.validate(contractor)
        if (error) {
            error.message = error.message.replace(/"/g, "")
            throw new ValidationError(error.message)
        }
    }

    validateId(contractorId: string) {
        const { error } = schemaIdString.validate(contractorId)
        if (error) {
            error.message = error.message.replace(/"/g, "")
            throw new ValidationError(error.message)
        }
    }

    async getAll() {
        const contractors = await this.repository.getAll();
        return contractors.length === 0
            ? getSuccessResponse<Contractor>(StatusCode.OK, contractors, VALIDATION_MESSAGES.ListEmpty)
            : getSuccessResponse<Contractor>(StatusCode.OK, contractors)
    }

    async getById(contractorId: string) {
        this.validateId(contractorId)
        const contractor = await this.repository.getById(contractorId);
        return contractor
            ? getSuccessResponse<Contractor>(StatusCode.OK, contractor)
            : getErrorResponse(StatusCode.NOT_FOUND, [VALIDATION_MESSAGES.NotFound])
    }

    async create(contractor: Object) {
        this.validateContractor(contractor)
        const contractorDTO = contractor as ContractorDTO
        const newContractor = await this.repository.create(contractorDTO);
        return newContractor
            ? getSuccessResponse<Contractor>(StatusCode.CREATED, newContractor)
            : getErrorResponse(StatusCode.BAD_REQUEST, [VALIDATION_MESSAGES.CreateFailed])
    }

    async update(contractorId: string, contractor: ContractorDTO) {
        this.validateId(contractorId)
        this.validateContractor(contractor)
        const contractorDTO = contractor as ContractorDTO
        const updatedContractor = await this.repository.update(contractorId, contractorDTO);
        return updatedContractor
            ? getSuccessResponse<Contractor>(StatusCode.OK, updatedContractor)
            : getErrorResponse(StatusCode.BAD_REQUEST, [VALIDATION_MESSAGES.UpdateFailed])
    }

    async delete(contractorId: string) {
        this.validateId(contractorId)
        const deletedContractor = await this.repository.delete(contractorId);
        return deletedContractor
            ? getSuccessResponse<Contractor>(StatusCode.OK, deletedContractor)
            : getErrorResponse(StatusCode.BAD_REQUEST, [VALIDATION_MESSAGES.DeleteFailed])
    }
}