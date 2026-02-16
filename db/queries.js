const pool = require("./pool");

async function getAllExecutives() {
    const { rows } = await pool.query("SELECT * FROM executive");
    return rows;
};

async function postNewExecutive({firstName, lastName}) {
    await pool.query("INSERT INTO executive (first_name, last_name) VALUES ($1, $2)", [firstName, lastName]);
};

async function deleteExecutive(id) {
    await pool.query("DELETE FROM executive WHERE id = $1", [id]);
};

async function getAllCampaigns() {
    const { rows } = await pool.query("SELECT * FROM campaign");
    return rows;
};

async function postNewCampaign({brand}) {
    await pool.query("INSERT INTO campaign (brand) VALUES ($1)", [brand]);
};

async function deleteCampaign(id) {
    await pool.query("DELETE FROM campaign WHERE id = $1", [id]);
};

async function getAllTypesOfClient() {
    const { rows } = await pool.query("SELECT * FROM type_of_client");
    return rows;
};

async function assignToCampaignPost({executiveId, campaignId}) {
    await pool.query("INSERT INTO assignment (executive_id, campaign_id) VALUES ($1, $2) ON CONFLICT DO NOTHING", [executiveId, campaignId])
};

async function getExecutiveDetails(id) {
    const { rows } = pool.query(`SELECT first_name, last_name, brand FROM executive JOIN assignment ON executive.id = assignment.executive_id JOIN campaign ON assignment.campaign_id = campaign.id WHERE executive.id = ${id}`);
    return rows;
};

module.exports = {
    getAllExecutives,
    postNewExecutive,
    deleteExecutive,
    getAllCampaigns,
    postNewCampaign,
    deleteCampaign,
    getAllTypesOfClient,
    assignToCampaignPost,
    getExecutiveDetails,
};