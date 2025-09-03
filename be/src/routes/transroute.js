import express from "express";
import transfer  from "../controller/trans.controller.js";

const router = express.Router();

router.post("/", transfer.gettransfer);
router.get("/", transfer.gettransferhis);

export default router;


