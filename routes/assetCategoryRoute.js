// routes/assetRoutes.js
const express = require('express');
const router = express.Router();
const assetCategoryController = require('../controllers/assetCategoryController');

// Define routes for CRUD operations on assets
router.get('/', assetCategoryController.getAllAssets);
router.get('/:id', assetCategoryController.getAssetById);
router.post('/', assetCategoryController.createAsset);
router.put('/:id', assetCategoryController.updateAsset);
router.delete('/:id', assetCategoryController.deleteAsset);

module.exports = router;
