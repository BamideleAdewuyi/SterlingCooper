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

async function campaignsGet(req, res) {
    const campaigns = await db.getAllCampaigns();
    res.render("campaigns", {
        title: "All Campaigns",
        campaigns: campaigns,
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
    if (req.params.executiveId) {
        const executiveId = req.params.executiveId;
        const campaignId = req.body.campaignId
        db.assignToCampaignPost({executiveId, campaignId});
    }
};

async function executiveDetailsGet(req, res) {
    const id = req.params.id;
    const executiveName = await db.getExecutiveById(id);
    const campaigns = await db.getExecutiveDetails(id);
    res.render("executiveDetails", {
        campaigns: campaigns,
        firstName: executiveName[0].first_name,
        lastName: executiveName[0].last_name,
    });
};

module.exports = {
    homeGet,
    allExecutivesGet,
    newExecutivePost,
    deleteExecutive,
    campaignsGet,
    newCampaignPost,
    deleteCampaign,
    allTypesGet,
    postAssignToCampaign,
    executiveDetailsGet,
};