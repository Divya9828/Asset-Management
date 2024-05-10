const Asset = require('../models/asset');

// Get all assets
exports.getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.findAll();
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get asset by ID
exports.getAssetById = async (req, res) => {
  const { id } = req.query;
  try {
    const asset = await Asset.findByPk(id);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.json(asset);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create new asset
exports.createAsset = async (req, res) => {
  const { serialNumber,branch,employeeId,value } = req.body;
  try {
    const asset = await Asset.create({ serialNumber,branch,employeeId,value });
    res.status(201).json(asset);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update asset by ID
exports.updateAsset = async (req, res) => {
  const { id } = req.query;
  const { serialNumber,branch,employeeId,value,status } = req.body;
  try {
    let asset = await Asset.findByPk(id);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    asset = await asset.update({ serialNumber,branch,employeeId,value,status });
    res.json(asset);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete asset by ID
exports.deleteAsset = async (req, res) => {
  const { id } = req.query;
  try {
    const asset = await Asset.findByPk(id);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    await asset.destroy();
    res.json({ message: 'Asset deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
