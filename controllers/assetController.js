const Asset = require("../models/asset");
const AssetHistory = require("../models/assethistory");
const sequelize = require("sequelize");
// Get all assets
exports.getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.findAll();
    res.render('assests/assetsview',{assets})
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


exports.renderAddAsset = (req, res) => {
  res.render('assests/add');
};
// Create new asset
exports.createAsset = async(req, res) => {
  const { serialNumber, branch, employeeId, value } = req.body;
  try {
    const asset = await Asset.create({ serialNumber, branch, employeeId, value });
    req.flash('success_msg', 'Successfully Inserted');
    res.redirect(`/assets`);
  } catch (error) {
    req.flash('error_msg', 'Not Inserted');
    res.redirect(`/assets`);
  }
};

// Update employee by ID
exports.renderEditAssetForm = async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) {
      req.flash('error_msg', 'Employee not found');
      return res.redirect('/assets');
    }
    res.render('assests/edit', { asset });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update asset by ID
exports.updateAsset =async (req, res) => {
  const { id } = req.params;
  const { branch, value, status } = req.body;
  try {
    let asset = await Asset.findByPk(id);
    if (!asset) {
      req.flash('error_msg', 'No ID in this assets');
      res.redirect(`/assets`);
    }
    asset = await asset.update({ branch,value, status });
    req.flash('success_msg', 'Successfully Updated');
    res.redirect(`/assets`);
  } catch (error) {
    req.flash('error_msg', 'Failed to update employee');
    res.redirect(`/assets/${id}/edit`);
  }
};

// Delete asset by ID
exports.deleteAsset = async (req, res) => {
  const { id } = req.params;
  try {
    const asset =await Asset.findByPk(id);
    if (!asset) {
      req.flash('error_msg', 'No Id in this Asset');
      res.redirect(`/assets`);
    }
    asset.destroy();
    req.flash('success_msg', 'Successfully Deleted');
    res.redirect(`/assets`);
  } catch (error) {
    req.flash('error_msg', 'Something Wrong to Delete');
    res.redirect(`/assets`);
  }
};

// stock view
exports.getStockView = async (req, res) => {
  try {
    const stockByBranch = await Asset.findAll({
      attributes: [
        "branch",
        [sequelize.fn("count", sequelize.col("id")), "total"],
      ],
      where: { status: "available" },
      group: ["branch"],
    });
    const totalValue =await Asset.sum("value", { where: { status: "available" } });

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
