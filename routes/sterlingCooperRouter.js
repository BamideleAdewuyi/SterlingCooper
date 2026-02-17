const { Router } = require("express");
const sterlingCooperController = require("../controllers/sterlingCooperController");
const sterlingCooperRouter = Router();

// Get
sterlingCooperRouter.get("/", sterlingCooperController.homeGet);
sterlingCooperRouter.get("/executives", sterlingCooperController.allExecutivesGet);
sterlingCooperRouter.get("/campaigns", sterlingCooperController.allCampaignsGet);
sterlingCooperRouter.get("/types", sterlingCooperController.allTypesGet);
sterlingCooperRouter.get("/executiveDetails/:id", sterlingCooperController.executiveDetailsGet);

// Post
sterlingCooperRouter.post("/executives", sterlingCooperController.newExecutivePost);
sterlingCooperRouter.post("/campaigns", sterlingCooperController.newCampaignPost);
sterlingCooperRouter.post("/assignToCampaign/:executiveId", sterlingCooperController.postAssignToCampaign);
sterlingCooperRouter.post("/assignToExecutive/:campaignId", sterlingCooperController.postAssignToExecutive);

// Delete
sterlingCooperRouter.post("/executive/:id", sterlingCooperController.deleteExecutive);
sterlingCooperRouter.post("/campaign/:id", sterlingCooperController.deleteCampaign);

module.exports = sterlingCooperRouter;