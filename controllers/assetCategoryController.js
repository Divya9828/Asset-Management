const AssetCategory = require("../models/assetcategory");

// controllers/assetCategoryController.js
exports.getAllAssets = async (req, res) => {
  try {
    const getallAsset = await AssetCategory.findAll();
    console.log(getallAsset); // Log the data to verify it
    res.render('assetcategory/view', { getallAsset });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// GET PARTICULAR DATA
exports.getAssetById = (req, res) => {
  try {
    const { id } = req.query;
    const getAssetById = AssetCategory.findByPk(id);
    res.json(getAssetById);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

exports.renderAddAstCat=(req,res)=>{
  res.render('assetcategory/add')
}
// insert data
exports.createAsset =async  (req, res) => {
  try {
    const { name, category } = req.body;
    const createAsset = await AssetCategory.create({ name, category });
    req.flash('success_msg', 'successfully added')
    res.redirect('assetcategory/view')
  } catch (error) {
    req.flash('error_msg', 'something went wrong')
    res.redirect('assetcategory/view')
  }
};


exports.renderEditAstForm=async (req,res)=>{
  try {
    const getallAsset = await AssetCategory.findByPk(req.params.id);
    if (!getallAsset) {
      req.flash('error_msg', 'Employee not found');
      return res.redirect('assetcategory/layout');
    }
    res.render('assetcategory/edit', { getallAsset });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
// update data
exports.updateAsset =async (req, res) => {
  try {
    const asset = await AssetCategory.findByPk(req.params.id);
    if (!asset) {
      req.flash('error_msg', 'asset not found');
      return res.render('assetcategory/layout');
    }
    await asset.update(req.body);
    req.flash('success_msg', 'asset updated successfully');
    res.render('assetcategory/view');
  } catch (error) {
    req.flash('error_msg', 'Failed to update asset');
    res.render(`assetcategory/layout`);
  }
};

// delete data
exports.deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;
    let assetDelete = await AssetCategory.findByPk(id);
    if (!assetDelete) {
      req.flash('error_msg', 'asset not found');
       res.redirect('assetscategorys/layout');
    }
    assetDelete.destroy();
    req.flash('success_msg', 'asset deleted');
     res.redirect('/');
  } catch (errorr) {
    req.flash('error_msg', 'asset not found');
       res.redirect('assetscategorys');
  }
};
