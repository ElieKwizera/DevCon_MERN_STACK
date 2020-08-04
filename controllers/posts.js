const User = require('../models/User');
const Post = require('../models/Post');

exports.getposts = (req,res,next)=>
{
    try {
        const posts = await
        res.status(200).json({
            success:true,
            data: posts
        });
        
    } catch (error) {
        
    }

};

exports.getPost = async (req,res,next)=>
{
    try {
        const post  = await Post.findById(req.params.post_id);
        if(!post)
        {
            return res.status(401).json({
                success:false,
                message: 'post not found'
            });
        }
        res.status(200).json({
            success:true,
            data:post
        }); 
    } catch (error) {
        res.status(401).json({
            success:false,
            message:error.message  
        });
    }
}
 
exports.deletePost = async (req,res,next)=>
{
    try {
        const post = await Post.findById(req.params.post_id);
        if(!post)
        {
            return res.status(401).json({
                success:false,
                message: 'post not found'
            });
        }

        if(post.user !== req.user.id)
        {
            return res.status(401).json({
                success:false,
                message: 'your are not authorized to delete this post' 
            });
        } 
        await Post.findByIdAndRemove({_id:req.params.post_id})
        res.status(401).json({
            success:true,
            message: 'Post deleted' 
        });
        
    } catch (error) {
        
    }
}

exports.addPost = async (req,res,next)=>
{
    try {
        console.log(req.body);
        const user = await User.findById(req.user.id).select('-password');
        const postObject = 
        {
            user:req.user.id,
            text:req.body.text,
            name:user.username,
            avatar:user.avatar
        };
        const post  = await Post.create(postObject);
        res.status(202).json({
            success:true,
            data:post
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

exports.likePost = async (req,res,next)=>
{
    try {
        const post  = await Post.findById(req.params.post_id);
        if(!post)
        {
            return res.status(401).json({
                success:false,
                message: 'post not found'
            });
        }
        if(post.likes.filter(like=> like.user.toString() === req.user.id).length > 0)
        {
            return res.status(401).json({
                success:false,
                message: 'Already liked the post'
            });
        }

        post.likes.push({user:req.user.id});
        await post.save();

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

exports.unlikePost = async (req,res,next)=>
{
    try {
        const post  = await Post.findById(req.params.post_id);
        if(!post)
        {
            return res.status(401).json({
                success:false,
                message: 'post not found'
            });
        }
        if(post.likes.filter(like=> like.user.toString() === req.user.id).length === 0)
        {
            return res.status(401).json({
                success:false,
                message: 'You have not liked the post'
            });
        }

        const removeLike = post.likes.map(like=> like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeLike,1);
        await post.save();
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

exports.addComment = async (req,res,next)=>
{
    try {
        const user = await User.findById(req.user.id);
        const post  = await Post.findById(req.params.post_id);
        if(!post)
        {
            return res.status(401).json({
                success:false,
                message: 'post not found'
            });
        }

        const commentObject = 
        {
            user:user._id,
            text:req.body.text,
            name:user.username,
            avatar:user.avatar
        };

        post.comments.push(commentObject);
        await post.save()

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

exports.removeComment = async (req,res,next)=>
{
    try {
        
        const post  = await Post.findById(req.params.post_id);
        if(!post)
        {
            return res.status(401).json({
                success:false,
                message: 'post not found'
            });
        }
        const comment = post.comments.find(comment => comment._id.toString() === req.params.comment_id);


        const removeComment = post.comments.map(comment=> comment._id).indexOf(comment._id);
        post.comments.splice(removeComment,1);
        await post.save()

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}