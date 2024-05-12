const AssetHistory = require("../models/assethistory");

// GET ALL DATA
exports.getAllAssets = (req, res) => {
  try {
    const getallAsset = AssetHistory.findAll();
    res.json(getallAsset);
  } catch (error) {
    res.status(500).json({ error: "Internal ServeR eRROR" });
  }
};

// GET PARTICULAR DATA
exports.getAssetById = (req, res) => {
  try {
    const { id } = req.query;
    const getAssetById = AssetHistory.findByPk(id);
    res.json(getAssetById);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

// insert data
exports.createAsset = (req, res) => {
  try {
    const { reason, action } = req.body;
    const createAsset = AssetHistory.create(reason, action);
    res.json(createAsset);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

// update data
exports.updateAsset = (req, res) => {
  try {
    const { id } = req.query;
    const { reason, action } = req.body;
    let assetUpdate = AssetHistory.findByPk(id);
    if (!assetUpdate) {
      res.status(404).json({ error: "asset id  not found" });
    }
    assetUpdate.update({ reason, action });
    res.json("updated success");
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

// delete data
exports.deleteAsset = (req, res) => {
  try {
    const { id } = req.query;
    let assetDelete = AssetHistory.findByPk(id);
    if (!assetDelete) {
      res.status(404).json({ error: "asset id  not found" });
    }
    assetDelete.destroy();
    res.json("deleted success");
  } catch (errorr) {
    res.status(500).json("internal server error");
  }
};
