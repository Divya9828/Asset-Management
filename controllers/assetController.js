const Asset = require("../models/asset");
const AssetHistory = require("../models/assethistory");
const sequelize = require("sequelize");
// Get all assets
exports.getAllAssets = (req, res) => {
  try {
    const assets = Asset.findAll();
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get asset by ID
exports.getAssetById = (req, res) => {
  const { id } = req.query;
  try {
    const asset = Asset.findByPk(id);
    if (!asset) {
      res.status(404).json({ error: "Asset not found" });
    }
    res.json(asset);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create new asset
exports.createAsset = (req, res) => {
  const { serialNumber, branch, employeeId, value } = req.body;
  try {
    const asset = Asset.create({ serialNumber, branch, employeeId, value });
    res.status(201).json(asset);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update asset by ID
exports.updateAsset = (req, res) => {
  const { id } = req.query;
  const { serialNumber, branch, employeeId, value, status } = req.body;
  try {
    let asset = Asset.findByPk(id);
    if (!asset) {
      res.status(404).json({ error: "Asset not found" });
    }
    asset = asset.update({ serialNumber, branch, employeeId, value, status });
    res.json(asset);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete asset by ID
exports.deleteAsset = (req, res) => {
  const { id } = req.query;
  try {
    const asset = Asset.findByPk(id);
    if (!asset) {
      res.status(404).json({ error: "Asset not found" });
    }
    asset.destroy();
    res.json({ message: "Asset deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// stock view
exports.getStockView = (req, res) => {
  console.log("fun call");
  try {
    const stockByBranch = Asset.findAll({
      attributes: [
        "branch",
        [sequelize.fn("count", sequelize.col("id")), "total"],
      ],
      where: { status: "available" },
      group: ["branch"],
    });
    const totalValue = Asset.sum("value", { where: { status: "available" } });

    res.json({ stockByBranch: stockByBranch, totalValue: totalValue });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

// asset   and update
exports.Asset = (req, res) => {
  const { id, reason } = req.query;
  try {
    // Update asset status to indicate it's  ed
    const asset = Asset.findByPk(id);
    if (!asset) {
      res.status(404).json({ error: "Asset not found" });
    }
    asset.status = "available";
    asset.save();

    // Log the reason for
    // Assuming there's a separate table for asset history
    AssetHistory.create({ id, action: " ", reason });

    res.json({ message: "Asset  ed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
