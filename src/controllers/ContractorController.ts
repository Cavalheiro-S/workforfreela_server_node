import { Contractor } from "@prisma/client";
import { Request, Response, Router } from "express";
import { IControllerResponse } from "../interfaces/IControllerResponse";
import { asyncErrorHandler } from "../midllewares/AsyncErrorHandler";
import { ContractorService } from "../services/contractor/ContractorService";

const routerContractor = Router()

const service = new ContractorService()

// GET /api/contractor
routerContractor.get("/", asyncErrorHandler(async (req: Request, res: Response<IControllerResponse<Contractor>>) => {
    const { statusCode, ...clientResponse } = await service.getAll()
    res.status(statusCode).json({ ...clientResponse })
}))

// GET /api/contractor/1
routerContractor.get("/:id", asyncErrorHandler(async (req: Request, res: Response<IControllerResponse<Contractor>>) => {
    const { statusCode, ...clientResponse } = await service.getById(req.params.id)
    res.status(statusCode).json({ ...clientResponse })
}))

// POST /api/contractor
routerContractor.post("/", asyncErrorHandler(async (req: Request, res: Response<IControllerResponse<Contractor>>) => {
    const { statusCode, ...clientResponse } = await service.create(req.body)
    res.status(statusCode).json({ ...clientResponse })
}))

// PATCH /api/contractor/1
routerContractor.patch("/:id", asyncErrorHandler(async (req: Request, res: Response<IControllerResponse<Contractor>>) => {
    const { statusCode, ...clientResponse } = await service.update(req.params.id, req.body)
    res.status(statusCode).json({ ...clientResponse })
}))

// DELETE /api/contractor/1
routerContractor.delete("/:id", asyncErrorHandler(async (req: Request, res: Response<IControllerResponse<Contractor>>) => {
    const { statusCode, ...clientResponse } = await service.delete(req.params.id)
    res.status(statusCode).json({ ...clientResponse })
}))

export { routerContractor };
