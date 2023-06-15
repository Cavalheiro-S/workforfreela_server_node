import cors from "cors"
import express from "express"
import { routerContractor } from "./controllers/ContractorController"
import { errorHandler } from "./midllewares/ErrorHandler"
import { routerProject } from "./controllers/ProjectController"
import { routerHired } from "./controllers/HiredController"
import { routerPropose } from "./controllers/ProposeController"

const app = express()
const router = express.Router()

// Server configuration
router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

// Routes
router.use("/contractor", routerContractor)
router.use("/project", routerProject)
router.use("/hired", routerHired)
router.use("/propose", routerPropose)

// Middlewares
router.use(errorHandler)

// Start server
app.use("/api", router)
app.listen(3030, () => {
    console.log("Server is running on port 3030")
})