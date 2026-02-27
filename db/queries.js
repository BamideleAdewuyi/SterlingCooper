const pool = require("./pool");

async function findExecutiveById(id) {
    const { rows } = await pool.query(`SELECT * FROM executive WHERE id = $1`, [id]);
    return rows;
}

async function findAllExecutives() {
    const { rows } = await pool.query("SELECT * FROM executive");
    return rows;
}

async function createNewExecutive({firstName, lastName}) {
    await pool.query("INSERT INTO executive (first_name, last_name) VALUES ($1, $2)", [firstName, lastName]);
}

async function deleteExecutive(id) {
    await pool.query("DELETE FROM executive WHERE id = $1", [id]);
}

async function findCampaignById(id) {
    const { rows } = await pool.query(`SELECT * FROM campaign WHERE id = $1`, [id]);
    return rows;
}

async function findAllCampaigns() {
    const { rows } = await pool.query("SELECT * FROM campaign");
    return rows;
}

async function createNewCampaign({brand}) {
    const { rows } = await pool.query("INSERT INTO campaign (brand) VALUES ($1) RETURNING id", [brand]);
    const id = rows[0].id;
    return id;
}

async function findCampaignTypes({ campaignId }) {
    const { rows } = await pool.query(`SELECT type, campaign_id, type_of_client_id FROM campaign JOIN campaign_type ON campaign.id = campaign_type.campaign_id JOIN type_of_client ON campaign_type.type_of_client_id = type_of_client.id WHERE campaign.id = ($1)`, [campaignId]);
    return rows;
}

async function assignNewCampaignToTypes({ campaignId, corporateOrCharity, typeId }) {
    await pool.query(`INSERT INTO campaign_type (campaign_id, type_of_client_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [campaignId, corporateOrCharity]);
    await pool.query(`INSERT INTO campaign_type (campaign_id, type_of_client_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [campaignId, typeId]);
}

async function deleteCampaign(id) {
    await pool.query("DELETE FROM campaign WHERE id = $1", [id]);
}

async function findAllTypesOfClient() {
    const { rows } = await pool.query("SELECT * FROM type_of_client");
    return rows;
}

async function assignExecutiveToCampaign({executiveId, campaignId}) {
    await pool.query("INSERT INTO assignment (executive_id, campaign_id) VALUES ($1, $2) ON CONFLICT DO NOTHING", [executiveId, campaignId]);
}

async function findExecutiveDetails(id) {
    const { rows } = await pool.query(`SELECT first_name, last_name, brand, assignment.campaign_id FROM executive JOIN assignment ON executive.id = assignment.executive_id JOIN campaign ON assignment.campaign_id = campaign.id WHERE executive.id = $1`, [id]);
    return rows;
}

async function findCampaignDetails(id) {
    const { rows } = await pool.query(`SELECT first_name, last_name, brand, assignment.executive_id FROM executive JOIN assignment ON executive.id = assignment.executive_id JOIN campaign ON assignment.campaign_id = campaign.id WHERE campaign.id = $1`, [id]);
    return rows;
}

async function removeExecutiveFromCampaign({executiveId, campaignId}) {
    await pool.query("DELETE FROM assignment WHERE executive_id = $1 AND campaign_id = $2", [executiveId, campaignId]);
}

async function findAllCampaignTypes() {
    const { rows } = await pool.query("SELECT * FROM type_of_client");
    return rows;
}

async function updateCampaignTypes({ campaignId, oldCorporateOrCharity, oldTypeId, newCorporateOrCharity, newTypeId }) {
    await pool.query("UPDATE campaign_type SET type_of_client_id = $3 WHERE campaign_id = $1 AND type_of_client_id = $2", [campaignId, oldCorporateOrCharity, newCorporateOrCharity]);
    await pool.query("UPDATE campaign_type SET type_of_client_id = $3 WHERE campaign_id = $1 AND type_of_client_id = $2", [campaignId, oldTypeId, newTypeId]);
}

async function findTypeById({ typeId }) {
    const { rows } = await pool.query("SELECT type FROM type_of_client WHERE id = $1", [typeId]);
    const type = rows[0].type;
    return type;
}

async function findCampaignsByType({ typeId }) {
    const { rows } = await pool.query("SELECT DISTINCT campaign.brand, campaign_type.campaign_id, type_of_client.type FROM campaign JOIN campaign_type ON campaign.id = campaign_type.campaign_id JOIN type_of_client ON type_of_client.id = campaign_type.type_of_client_id WHERE type_of_client.id = $1;", [typeId]);
    return rows;
}

module.exports = {
    findExecutiveById,
    findAllExecutives,
    createNewExecutive,
    deleteExecutive,
    findCampaignById,
    findAllCampaigns,
    createNewCampaign,
    findCampaignTypes,
    deleteCampaign,
    assignNewCampaignToTypes,
    findAllTypesOfClient,
    assignExecutiveToCampaign,
    findExecutiveDetails,
    findCampaignDetails,
    removeExecutiveFromCampaign,
    findAllCampaignTypes,
    updateCampaignTypes,
    findTypeById,
    findCampaignsByType,
};