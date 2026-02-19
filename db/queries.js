const pool = require("./pool");

async function getExecutiveById(id) {
    const { rows } = await pool.query(`SELECT * FROM executive WHERE id = ${id}`);
    return rows;
};

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

async function getCampaignById(id) {
    const { rows } = await pool.query(`SELECT * FROM campaign WHERE id = ${id}`);
    return rows;
};

async function getAllCampaigns() {
    const { rows } = await pool.query("SELECT * FROM campaign");
    return rows;
};

async function postNewCampaign({brand}) {
    const { rows } = await pool.query("INSERT INTO campaign (brand) VALUES ($1) RETURNING id", [brand]);
    const id = rows[0].id;
    return id;
};

async function getCampaignTypes({ campaignId }) {
    
};

async function postAssignNewCampaignToTypes({ campaignId, corporateOrCharity, typeId }) {
    await pool.query(`INSERT INTO campaign_type (campaign_id, type_of_client_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [campaignId, corporateOrCharity]);
    await pool.query(`INSERT INTO campaign_type (campaign_id, type_of_client_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [campaignId, typeId]);
};

async function deleteCampaign(id) {
    await pool.query("DELETE FROM campaign WHERE id = $1", [id]);
};

async function getAllTypesOfClient() {
    const { rows } = await pool.query("SELECT * FROM type_of_client");
    return rows;
};

async function assignToCampaignPost({executiveId, campaignId}) {
    await pool.query("INSERT INTO assignment (executive_id, campaign_id) VALUES ($1, $2) ON CONFLICT DO NOTHING", [executiveId, campaignId]);
};

async function assignToExecutivePost({campaignId, executiveId}) {
    await pool.query("INSERT INTO assignment (campaign_id, executive_id) VALUES ($1, $2) ON CONFLICT DO NOTHING", [campaignId, executiveId]);
};

async function getExecutiveDetails(id) {
    const { rows } = await pool.query(`SELECT first_name, last_name, brand, assignment.campaign_id FROM executive JOIN assignment ON executive.id = assignment.executive_id JOIN campaign ON assignment.campaign_id = campaign.id WHERE executive.id = ${id}`);
    return rows;
};

async function getCampaignDetails(id) {
    const { rows } = await pool.query(`SELECT first_name, last_name, brand, assignment.executive_id FROM executive JOIN assignment ON executive.id = assignment.executive_id JOIN campaign ON assignment.campaign_id = campaign.id WHERE campaign.id = ${id}`);
    return rows;
};

async function postRemoveExecutiveFromCampaign({executiveId, campaignId}) {
    await pool.query("DELETE FROM assignment WHERE executive_id = $1 AND campaign_id = $2", [executiveId, campaignId]);
};

async function getAllCampaignTypes() {
    const { rows } = await pool.query("SELECT * FROM type_of_client");
    return rows;
};

module.exports = {
    getExecutiveById,
    getAllExecutives,
    postNewExecutive,
    deleteExecutive,
    getCampaignById,
    getAllCampaigns,
    postNewCampaign,
    getCampaignTypes,
    deleteCampaign,
    postAssignNewCampaignToTypes,
    getAllTypesOfClient,
    assignToCampaignPost,
    assignToExecutivePost,
    getExecutiveDetails,
    getCampaignDetails,
    postRemoveExecutiveFromCampaign,
    getAllCampaignTypes,
};