var express = require('express'); 

const router = express.Router()

// -------------------------------------
const test = require('../controllers/test');
const auth_sign = require('../controllers/auth/auth_sign');
const auth_login = require('../controllers/auth/microsoft/login');
const SelectDataController = require('../controllers/SelectModel');
const InsertDataController = require('../controllers/InsertModel'); 
const DeleteDataController = require('../controllers/DeleteModel');
//----------------------------------------------------------------
// -------------- Data controller --------------------------------
//const TABLE_RIA_COUNTER_ADMIN = require('../controllers/counter/DataControl_Counter');
// ------------- Event handlers ----------------------------------

// ------------ authentication --------------------
router.post('/sign', auth_sign.authenticateSignToken.sign_mid);
router.post('/verify', auth_sign.authenticateSignToken.verify_mid);
//-------------------------------------------------

// ------------ Login ---------------------
router.post('/login', auth_login.getMicrosoftLogin);
// ------------------------------------------------

// Test selected access token
router.get('/select', test.TestGetSelectdb);
router.get('/testinsert/:x', InsertDataController.testinsert);
router.put('/send', test.TestrevData);


// ----- test model --------------------------------
router.post('/insertdb', InsertDataController.insertdb); 
router.delete('/deletedb', DeleteDataController.deletedb);

router.get('/testpool', SelectDataController.getSelectdb);
//----------------------------------------------------------------

// verify token
//router.get('/verify', bodyParser,getAccessToken.verifyAccessToken,);

// getting routes
//router.post('/getusers', bodyParser,getAccessToken.generateAccessToken);

module.exports = router;
