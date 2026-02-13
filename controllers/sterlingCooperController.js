const db = require("../db/queries");

function homeGet(req, res) {
    res.render("index");
};

async function executivesGet(req, res) {
  const executives = await db.getAllExecutives();
  res.render("executives", {
        title: "All Executives",
        executives: executives,
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
        title: "All Types of Campaign",
        types: types,
    });
};

module.exports = {
    homeGet,
    executivesGet,
    newExecutivePost,
    deleteExecutive,
    campaignsGet,
    newCampaignPost,
    deleteCampaign,
    allTypesGet,
};