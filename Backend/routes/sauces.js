const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauces');

/* router.get('/', auth, multer, saucesCtrl.getsauces);*/
router.post('/', auth,  multer,  saucesCtrl.postsauces);
router.get('/', auth,  multer,  saucesCtrl.getsauces);
router.get('/:id', auth,  multer,  saucesCtrl.getsaucesbyid);
router.put('/:id', auth,  multer,  saucesCtrl.putsaucesbyid);
router.delete('/:id', auth, multer,  saucesCtrl.deletesaucesbyid);

router.post('/:id/like', auth, saucesCtrl.likesaucebyid);
module.exports = router;
