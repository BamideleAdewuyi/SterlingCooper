const db = require("../db/queries");

function homeGet(req, res) {
    res.render("index");
};

async function allExecutivesGet(req, res) {
  const executives = await db.getAllExecutives();
  const campaigns = await db.getAllCampaigns();
  res.render("executives", {
        title: "All Executives",
        executives: executives,
        campaigns: campaigns,
  });
};

async function newExecutivePost(req, res) {
    const { firstName, lastName } = req.body;
    await db.postNewExecutive({ firstName, lastName });
    res.redirect("executives");
};

async function deleteExecutive(req, res) {
    const id = req.params.id;
    await db.deleteExecutive(id);
    res.redirect("/executives");
};

async function allCampaignsGet(req, res) {
    const campaigns = await db.getAllCampaigns();
    const executives = await db.getAllExecutives();
    res.render("campaigns", {
        title: "All Campaigns",
        campaigns: campaigns,
        executives: executives,
    });
};

async function newCampaignPost(req, res) {
    const { brand } = req.body;
    await db.postNewCampaign({ brand });
    res.redirect("campaigns");
};

async function deleteCampaign(req, res) {
    const id = req.params.id;
    await db.deleteCampaign(id);
    res.redirect("/campaigns");
};

async function allTypesGet(req, res) {
    const types = await db.getAllTypesOfClient();
    res.render("types", {
        title: "The kind of work we do",
        types: types,
    });
};

async function postAssignToCampaign(req, res) {
    const executiveId = req.params.executiveId;
    const campaignId = req.body.campaignId;
    db.assignToCampaignPost({executiveId, campaignId});
};

async function postAssignToExecutive(req, res) {
    const campaignId = req.params.campaignId;
    const executiveId = req.body.executiveId;
    db.assignToExecutivePost({campaignId, executiveId});
};

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
};

async function campaignDetailsGet (req, res) {
    const id = req.params.id;
    const campaignName = await db.getCampaignById(id);
    const executives = await db.getCampaignDetails(id);
    res.render("campaignDetails", {
        executives: executives,
        brand: campaignName[0].brand,
    });
};

async function removeExecutiveFromCampaignPost(req, res) {
    const campaignId = req.params.campaignId;
    const executiveId = req.params.executiveId;
    await db.postRemoveExecutiveFromCampaign({ executiveId, campaignId });
    await executiveDetailsGet(req, res);
};

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
};