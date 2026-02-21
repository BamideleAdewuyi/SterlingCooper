const db = require("../db/queries");

function homeGet(req, res) {
    res.render("index");
}

async function allExecutivesGet(req, res) {
  const executives = await db.getAllExecutives();
  const campaigns = await db.getAllCampaigns();
  res.render("executives", {
        title: "All Executives",
        executives: executives,
        campaigns: campaigns,
  });
}

async function newExecutivePost(req, res) {
    const { firstName, lastName } = req.body;
    await db.postNewExecutive({ firstName, lastName });
    res.redirect("executives");
}

async function deleteExecutive(req, res) {
    const id = req.params.id;
    await db.deleteExecutive(id);
    res.redirect("/executives");
}

async function allCampaignsGet(req, res) {
    const campaigns = await db.getAllCampaigns();
    const executives = await db.getAllExecutives();
    const types = await db.getAllCampaignTypes();
    res.render("campaigns", {
        title: "All Campaigns",
        campaigns: campaigns,
        executives: executives,
        types: types,
    });
}

async function newCampaignPost(req, res) {
    const { brand } = req.body;
    const campaignId = await db.postNewCampaign({ brand });
    const corporateOrCharity = req.body.CorporateOrCharity;
    const typeId = req.body.type;
    await db.postAssignNewCampaignToTypes({ campaignId, corporateOrCharity, typeId })
    res.redirect("campaigns");
}

async function deleteCampaign(req, res) {
    const id = req.params.id;
    await db.deleteCampaign(id);
    res.redirect("/campaigns");
}

async function allTypesGet(req, res) {
    const types = await db.getAllTypesOfClient();
    res.render("types", {
        title: "The kind of work we do",
        types: types,
    });
}

async function postAssignToCampaign(req, res) {
    const executiveId = req.params.executiveId;
    const campaignId = req.body.campaignId;
    db.assignToCampaignPost({executiveId, campaignId});
}

async function postAssignToExecutive(req, res) {
    const campaignId = req.params.campaignId;
    const executiveId = req.body.executiveId;
    db.assignToExecutivePost({campaignId, executiveId});
}

async function executiveDetailsGet(req, res) {
    const id = req.params.executiveId;
    const executiveName = await db.getExecutiveById(id);
    const campaigns = await db.getExecutiveDetails(id);
    res.render("executiveDetails", {
        executiveId: id,
        campaigns: campaigns,
        firstName: executiveName[0].first_name,
        lastName: executiveName[0].last_name,
    });
}

async function campaignDetailsGet (req, res) {
    const id = req.params.campaignId;
    const campaignId = id;
    const campaignName = await db.getCampaignById(id);
    const executives = await db.getCampaignDetails(id);
    const types = await db.getCampaignTypes({ campaignId });
    const allTypes = await db.getAllTypesOfClient();
    res.render("campaignDetails", {
        campaignId: id,
        executives: executives,
        brand: campaignName[0].brand,
        types: types,
        allTypes: allTypes,
    });
}

async function removeExecutiveFromCampaignPost(req, res) {
    const campaignId = req.params.campaignId;
    const executiveId = req.params.executiveId;
    await db.postRemoveExecutiveFromCampaign({ executiveId, campaignId });
    await executiveDetailsGet(req, res);
}

async function removeCampaignFromExecutivePost(req, res) {
    const campaignId = req.params.campaignId;
    const executiveId = req.params.executiveId;
    await db.postRemoveExecutiveFromCampaign({ executiveId, campaignId });
    await campaignDetailsGet(req, res);
}

async function updateCampaignTypesPost(req, res) {
    const campaignId = req.params.campaignId;
    const oldCorporateOrCharity = req.params.oldCorporateOrCharity;
    const oldTypeId = req.params.oldTypeId;
    const newCorporateOrCharity = req.body.CorporateOrCharity;
    const newTypeId = req.body.type;
    await db.postUpdateCampaignTypes({ campaignId, oldCorporateOrCharity, oldTypeId, newCorporateOrCharity, newTypeId });

    const campaignName = await db.getCampaignById(campaignId);
    const executives = await db.getCampaignDetails(campaignId);
    const types = await db.getCampaignTypes({ campaignId });
    const allTypes = await db.getAllTypesOfClient();

    res.render("campaignDetails", {
        campaignId: campaignId,
        executives: executives,
        brand: campaignName[0].brand,
        types: types,
        allTypes: allTypes,
    });
}

async function campaignsByTypeGet(req, res) {
    const typeId = req.params.typeId;
    const campaigns = await db.getCampaignsByType({typeId});
    const type = await db.getTypeById({ typeId });
    res.render("typeDetails", {
        title: `${type} Campaigns`,
        campaigns: campaigns,
    });
}

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