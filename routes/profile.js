const express  = require('express');
const {getCurrentUser,createprofile,getProfiles,getProfile,addExperience,deleteExperience,getRepos} = require('../controllers/profiles');
const auth  = require('../middleware/auth');

const router = express.Router();

router.route('/me').get(auth,getCurrentUser);
router.route('/').post(auth,createprofile).get(auth,getProfiles);
router.route('/user/:userId').get(getProfile);
router.route('/experience/:exp_id').delete(auth,deleteExperience);
router.route('/experience').put(auth,addExperience);
router.route('/repos/:username').get(getRepos);

module.exports = router