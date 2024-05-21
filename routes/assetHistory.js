// routes/assetRoutes.js
const express = require('express');
const router = express.Router();
const {getAllAssets,getAssetById,renderAddHis,createAsset,updateAsset,deleteAsset} = require('../controllers/assetHistoryController');

// Define routes for CRUD operations on assets
router.get('/', getAllAssets);
router.get('/:id', getAssetById);

router.get('/add',renderAddHis)    
router.post('/', createAsset);

router.put('/updateAsset', updateAsset);
router.delete('/deleteAsset', deleteAsset);



module.exports = router;
