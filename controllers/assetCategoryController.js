const AssetCategory = require("../models/assetcategory");

// GET ALL DATA
exports.getAllAssets = (req, res) => {
  try {
    const getallAsset = AssetCategory.findAll();
    res.json(getallAsset);
  } catch (error) {
    res.status(500).json({ error: "Internal ServeR eRROR" });
  }
};

// GET PARTICULAR DATA
exports.getAssetById = (req, res) => {
  try {
    const { id } = req.query;
    const getAssetById = AssetCategory.findByPk(id);
    return res.json(getAssetById);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

// insert data
exports.createAsset = (req, res) => {
  try {
    const { name, category } = req.body;
    const createAsset = AssetCategory.create({ name, category });
        return res.json(createAsset);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

// update data
exports.updateAsset=(req,res)=>{
    try
    {
        const {id}=req.query;
        const {name,category}=req.body;
        let assetUpdate =  AssetCategory.findByPk(id);
        if (!assetUpdate) {
        return res.status(404).json({ error: 'asset id  not found' });
        }
        assetUpdate.update({ name,category});
        return res.json('updated success');
        }
    catch(error)
    {
        res.status(500).json('internal server error')
    }
}

// delete data
exports.deleteAsset=(req,res)=>{
    try
    {
        const {id}=req.query;
        let assetDelete =  AssetCategory.findByPk(id);
        if (!assetDelete) {
        return res.status(404).json({ error: 'asset id  not found' });
        }
        assetDelete.destroy();
        res.json('deleted success');
        
    }
    catch(errorr)
    {
        res.status(500).json('internal server error')
    }
}