const { Router } = require("express");
const sterlingCooperController = require("../controllers/sterlingCooperController");
const sterlingCooperRouter = Router();

// Get
sterlingCooperRouter.get("/", sterlingCooperController.homeGet);
sterlingCooperRouter.get("/executives", sterlingCooperController.executivesGet);
sterlingCooperRouter.get("/campaigns", sterlingCooperController.campaignsGet);
sterlingCooperRouter.get("/types", sterlingCooperController.allTypesGet);

// Post
sterlingCooperRouter.post("/executives", sterlingCooperController.newExecutivePost);
sterlingCooperRouter.post("/campaigns", sterlingCooperController.newCampaignPost);

// Delete
sterlingCooperRouter.delete("/executive/:id", sterlingCooperController.deleteExecutive);
sterlingCooperRouter.delete("/campaigns/:id", sterlingCooperController.deleteCampaign);

module.exports = sterlingCooperRouter;