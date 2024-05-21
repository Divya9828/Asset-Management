// routes/assetRoutes.js
const express = require('express');
const router = express.Router();
const {getAllAssets,getAssetById,renderAddAstCat,renderEditAstForm,createAsset,updateAsset,deleteAsset} = require('../controllers/assetCategoryController');

// Define routes for CRUD operations on assets
router.get('/',getAllAssets);
router.get('/getAssetById',getAssetById);

router.get('/add',renderAddAstCat)  
router.post('/',createAsset);

router.get('/:id/edit', renderEditAstForm);
router.put('/:id',updateAsset);

router.delete('/:id',deleteAsset);

module.exports = router;
