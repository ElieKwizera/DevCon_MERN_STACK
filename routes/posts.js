const express  = require('express');
const {getposts, addPost, getPost, deletePost ,likePost,unlikePost,addComment,removeComment} = require('../controllers/posts');
const auth  = require('../middleware/auth');

const router = express.Router();

router.route('/').get(auth,getposts).post(auth,addPost);
router.route('/:post_id').get(auth, getPost).delete(auth , deletePost);
router.route('/like/:post_id').put(auth,likePost);
router.route('/unlike/:id').put(auth, unlikePost);
router.route('/comment/:id').put(auth,addComment);
router.route('/removeComment/:id').put(auth,removeComment);

module.exports = router

