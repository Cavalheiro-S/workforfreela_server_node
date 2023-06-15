import { Propose } from "@prisma/client";
import { Request, Response, Router } from "express";
import { IControllerResponse } from "../interfaces/IControllerResponse";
import { asyncErrorHandler } from "../midllewares/AsyncErrorHandler";
import { ProposeService } from "../services/propose/ProposeService";

const routerPropose = Router()

const service = new ProposeService()

// GET /api/propose/1
routerPropose.get("/:id", asyncErrorHandler(async (req: Request, res: Response<IControllerResponse<Propose>>) => {
    const { statusCode, ...clientResponse } = await service.getById(Number(req.params.id))
    res.status(statusCode).json({ ...clientResponse })
}))

// GET /api/propose/byHiredId/1
routerPropose.get("/byHiredId/:id", asyncErrorHandler(async (req: Request, res: Response<IControllerResponse<Propose>>) => {
    const { statusCode, ...clientResponse } = await service.getByHiredId(req.params.id)
    res.status(statusCode).json({ ...clientResponse })
}))

// GET /api/propose
routerPropose.get("/", asyncErrorHandler(async (req: Request, res: Response<IControllerResponse<Propose>>) => {
    const { statusCode, ...clientResponse } = await service.getAll()
    res.status(statusCode).json({ ...clientResponse })
}))

// POST /api/propose
routerPropose.post("/", asyncErrorHandler(async (req: Request, res: Response<IControllerResponse<Propose>>) => {
    const { statusCode, ...clientResponse } = await service.create(req.body)
    res.status(statusCode).json({ ...clientResponse })
}))

// PATCH /api/propose/1
routerPropose.patch("/:id", asyncErrorHandler(async (req: Request, res: Response<IControllerResponse<Propose>>) => {
    const { statusCode, ...clientResponse } = await service.update(Number(req.params.id), req.body)
    res.status(statusCode).json({ ...clientResponse })
}))

// DELETE /api/propose/1
routerPropose.delete("/:id", asyncErrorHandler(async (req: Request, res: Response<IControllerResponse<Propose>>) => {
    const { statusCode, ...clientResponse } = await service.delete(Number(req.params.id))
    res.status(statusCode).json({ ...clientResponse })
}))

export { routerPropose };
