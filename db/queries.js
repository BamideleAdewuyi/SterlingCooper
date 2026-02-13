const pool = require("./pool");

async function getAllExecutives() {
    const { rows } = await pool.query("SELECT * FROM executive");
    return rows;
}

async function postNewExecutive({firstName, lastName}) {
    await pool.query("INSERT INTO executive (first_name, last_name) VALUES ($1, $2)", [firstName, lastName]);
}

async function deleteExecutive(id) {
    await pool.query("DELETE FROM executive WHERE id = $1", [id]);
}

async function getAllCampaigns() {
    const { rows } = await pool.query("SELECT * FROM campaign");
    return rows;
}

async function postNewCampaign({brand}) {
    await pool.query("INSERT INTO campaign (brand) VALUES ($1)", [brand]);
}

async function deleteCampaign(id) {
    await pool.query("DELETE FROM campaign WHERE id = $1", [id]);
}

async function getAllTypesOfClient() {
    const { rows } = await pool.query("SELECT * FROM type_of_client");
    return rows;
}

module.exports = {
    getAllExecutives,
    postNewExecutive,
    deleteExecutive,
    getAllCampaigns,
    postNewCampaign,
    deleteCampaign,
    getAllTypesOfClient,
};