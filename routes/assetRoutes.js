// routes/assetRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllAssets,
  getAssetById,
  renderAddAsset,
  createAsset,
  renderEditAssetForm,
  updateAsset,
  deleteAsset,
  getStockView,
  Asset,
} = require("../controllers/assetController");

// Define routes for CRUD operations on assets
router.get("/", getAllAssets);
router.get("/getAssetById", getAssetById);

router.get('/add',renderAddAsset)    
router.post("/", createAsset);

router.get('/:id/edit', renderEditAssetForm);
router.put("/:id", updateAsset);

router.delete("/:id", deleteAsset);

router.get("/getStockView", getStockView);

router.put("/ Asset", Asset);

module.exports = router;
