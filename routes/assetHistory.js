// routes/assetRoutes.js
const express = require('express');
const router = express.Router();
const {getAllAssets,getAssetById,createAsset,updateAsset,deleteAsset} = require('../controllers/assetHistoryController');

// Define routes for CRUD operations on assets
router.get('/getAllAssets', getAllAssets);
router.get('/getAssetById', getAssetById);
router.post('/createAsset', createAsset);
router.put('/updateAsset', updateAsset);
router.delete('/deleteAsset', deleteAsset);



module.exports = router;
