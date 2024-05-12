const Asset = require('../models/asset');
const AssetHistory=require('../models/assethistory')
const sequelize=require('sequelize')
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

// stock view
exports.getStockView =  (req, res) => {
  console.log("fun call");
  try {
    const stockByBranch =  Asset.findAll({
      attributes: ['branch', [sequelize.fn('count', sequelize.col('id')), 'total']],
      where: { status: 'available' },
      group: ['branch'],
    });
    const totalValue =  Asset.sum('value', { where: { status: 'available' } });
    
     res.json({ 'stockByBranch':stockByBranch, 'totalValue':totalValue });
  } catch (error) {
    res.status(500).send({error:'Internal Server Error'});
  }
};

// asset return and update 
exports.returnAsset= (req, res) => {
  const { id, reason } = req.body;
  try {
    // Update asset status to indicate it's returned
    const asset =  Asset.findByPk(id);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    asset.status = 'available';
     asset.save();

    // Log the reason for return
    // Assuming there's a separate table for asset history
     AssetHistory.create({ id, action: 'return', reason });

    res.json({ message: 'Asset returned successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

