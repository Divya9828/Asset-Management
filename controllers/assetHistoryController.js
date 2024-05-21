const AssetHistory = require("../models/assethistory");

// GET ALL DATA
exports.getAllAssets =async (req, res) => {
  try {
    const history = await AssetHistory.findAll({
      order:[['id','ASC']]
  });
    // res.json(employees);
    res.render('assethistory/view', { history })
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET PARTICULAR DATA
exports.getAssetById = async (req, res) => {
  try {
    const { id } = await req.query;
    const getAssetById = AssetHistory.findByPk(id);
    res.json(getAssetById);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

exports.renderAddHis=(req,res)=>{
  res.redirect('assethistory/add');
}
// insert data
exports.createAsset = async (req, res) => {
  try {
    const { reason, action } = req.body;
    const createAsset =await AssetHistory.create(reason, action);
    res.json(createAsset);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

// update data
exports.updateAsset = async(req, res) => {
  try {
    const { id } = req.query;
    const { reason, action } = req.body;
    let assetUpdate =await AssetHistory.findByPk(id);
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
exports.deleteAsset = async (req, res) => {
  try {
    const { id } = req.query;
    let assetDelete = await AssetHistory.findByPk(id);
    if (!assetDelete) {
      res.status(404).json({ error: "asset id  not found" });
    }
    assetDelete.destroy();
    res.json("deleted success");
  } catch (errorr) {
    res.status(500).json("internal server error");
  }
};
