const { validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");
const validateUser = require("../validators/userValidator");

function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

function homeGet(req, res) {
    res.render("index");
}

const allExecutivesGet = asyncHandler(async (req, res) => {
  const executives = await db.findAllExecutives();
  const campaigns = await db.findAllCampaigns();
  res.render("executives", {
    title: "All Executives",
    executives,
    campaigns,
  });
});

const newExecutivePost = [
    validateUser,
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const executives = await db.findAllExecutives();
            const campaigns = await db.findAllCampaigns();
            return res.status(400).render("executives", {
                title: "All Executives",
                executives: executives,
                campaigns: campaigns,
                errors: errors.array(),
            });
        }
        const { firstName, lastName } = matchedData(req);
        await db.createNewExecutive({ firstName, lastName });
        res.redirect("/executives");
    })
]

const deleteExecutive = asyncHandler(async (req, res) => {
    const id = req.params.id;
    await db.deleteExecutive(id);
    res.redirect("/executives");
})

const allCampaignsGet = asyncHandler(async (req, res) => {
    const campaigns = await db.findAllCampaigns();
    const executives = await db.findAllExecutives();
    const types = await db.findAllCampaignTypes();
    res.render("campaigns", {
        title: "All Campaigns",
        campaigns: campaigns,
        executives: executives,
        types: types,
    });
})

const newCampaignPost = [
    validateUser,
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const campaigns = await db.findAllCampaigns();
            const executives = await db.findAllExecutives();
            const types = await db.findAllCampaignTypes();
            return res.status(400).render("campaigns", {
                    title: "All Campaigns",
                    campaigns: campaigns,
                    executives: executives,
                    types: types,
                    errors: errors.array(),
                });
            }
            const  { brand, CorporateOrCharity: corporateOrCharity } = matchedData(req);
            const campaignId = await db.createNewCampaign({ brand });
            const typeId = req.body.type;
            await db.assignNewCampaignToTypes({ campaignId, corporateOrCharity, typeId })
            res.redirect("/campaigns");
    })
]

const deleteCampaign = asyncHandler(async (req, res) => {
    const id = req.params.id;
    await db.deleteCampaign(id);
    res.redirect("/campaigns");
})

const allTypesGet = asyncHandler(async (req, res) => {
    const types = await db.findAllTypesOfClient();
    res.render("types", {
        title: "The kind of work we do",
        types: types,
    });
})

const postAssignToCampaign = asyncHandler(async (req, res) => {
    const executiveId = req.params.executiveId;
    const campaignId = req.body.campaignId;
    await db.assignToCampaign({executiveId, campaignId});
    res.redirect("/executives");
})

const postAssignToExecutive = asyncHandler(async (req, res) => {
    const campaignId = req.params.campaignId;
    const executiveId = req.body.executiveId;
    await db.assignToExecutive({campaignId, executiveId});
    res.redirect("/campaigns");
})

const executiveDetailsGet = asyncHandler(async (req, res) => {
    const id = req.params.executiveId;
    const executiveName = await db.findExecutiveById(id);
    const campaigns = await db.findExecutiveDetails(id);
    res.render("executiveDetails", {
        executiveId: id,
        campaigns: campaigns,
        firstName: executiveName[0].first_name,
        lastName: executiveName[0].last_name,
    });
})

const campaignDetailsGet = asyncHandler(async (req, res) => {
    const campaignId = req.params.campaignId;
    const campaignName = await db.findCampaignById(campaignId);
    const executives = await db.findCampaignDetails(campaignId);
    const types = await db.findCampaignTypes({ campaignId });
    const allTypes = await db.findAllTypesOfClient();
    res.render("campaignDetails", {
        campaignId: campaignId,
        executives: executives,
        brand: campaignName[0].brand,
        types: types,
        allTypes: allTypes,
    });
})

const removeExecutiveFromCampaignPost = asyncHandler(async (req, res) => {
    const campaignId = req.params.campaignId;
    const executiveId = req.params.executiveId;
    await db.removeExecutiveFromCampaign({ executiveId, campaignId });
    res.redirect(`/executiveDetails/${executiveId}`);
})

const removeCampaignFromExecutivePost = asyncHandler(async (req, res) => {
    const campaignId = req.params.campaignId;
    const executiveId = req.params.executiveId;
    await db.removeExecutiveFromCampaign({ executiveId, campaignId });
    res.redirect(`/campaignDetails/${campaignId}`);
})

const updateCampaignTypesPost = asyncHandler(async (req, res) => {
    const campaignId = req.params.campaignId;
    const oldCorporateOrCharity = req.params.oldCorporateOrCharity;
    const oldTypeId = req.params.oldTypeId;
    const newCorporateOrCharity = req.body.CorporateOrCharity;
    const newTypeId = req.body.type;
    await db.updateCampaignTypes({ campaignId, oldCorporateOrCharity, oldTypeId, newCorporateOrCharity, newTypeId });
    res.redirect(`/campaignDetails/${campaignId}`);
})

const campaignsByTypeGet = asyncHandler(async (req, res) => {
    const typeId = req.params.typeId;
    const campaigns = await db.findCampaignsByType({typeId});
    const type = await db.findTypeById({ typeId });
    res.render("typeDetails", {
        title: `${type} Campaigns`,
        campaigns: campaigns,
    });
})

module.exports = {
    homeGet,
    allExecutivesGet,
    newExecutivePost,
    deleteExecutive,
    allCampaignsGet,
    newCampaignPost,
    deleteCampaign,
    allTypesGet,
    postAssignToCampaign,
    executiveDetailsGet,
    campaignDetailsGet,
    postAssignToExecutive,
    removeExecutiveFromCampaignPost,
    removeCampaignFromExecutivePost,
    updateCampaignTypesPost,
    campaignsByTypeGet,
};