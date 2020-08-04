const axios = require('axios');
const User = require('../models/User');
const Profile = require('../models/Profile');


exports.getProfiles = async (req,res,next)=>
{
    try 
    {
        const profiles = await Profile.find().populate('user',['username','avatar']);

        res.status(200).json({
            success:true,
            data:profiles
        });
    } 
    catch (error)  
    {
        res.status(500).json({
            success:false,
            message: error.message
        });
    }
};

exports.getProfile = async (req,res,next)=>
{
    try 
    {
        const profile = await Profile.findOne({user:req.params.userId}).populate('user',['username','avatar']);
        if(!profile)
        {
            return res.status(500).json(
                {
                    success:false,
                    message: 'Internal server error'
                }
            );
        }

        res.status(200).json(
            {
                success:true,
                data:profile
            }
        );


    }
    catch (error) 
    {
        console.error(error.message);
        res.status(500).json(
            {
                success:false,
                message: 'Internal server error'
            }
        );
    }
    
};

exports.getCurrentUser = async (req,res,next)=>
{
    try {
        
        profile  = await Profile.findOne({user : req.user.id }).populate('user',['username','avatar']);
        if(!profile)
        {
            return res.status(400).json({
                success:false,
                message: 'profile not found'
            });

        }
        return res.status(200).json({
            success:true,
            data: profile
        });


    }
     catch (error) 
    {
        return res.status(400).json({
            success:false,
            message: error.message
        });
        
    }

};

exports.createprofile = async (req,res,next)=>
{
    const {
        company,
        location,
        website,
        bio,
        skills,
        status,
        githubusername,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook
      } = req.body;
  
      const profileFields = {
        user: req.user.id,
        company,
        location,
        website: website,
        bio,
        skills:skills.split(',').map((skill) =>  skill.trim()),
        status,
        githubusername
      };

      profileFields.social = {};
      if (youtube) profileFields.social.youtube = youtube;
      if (twitter) profileFields.social.twitter = twitter;
      if (instagram) profileFields.social.instagram = instagram;
      if (linkedin) profileFields.social.linkedin = linkedin;
      if (facebook) profileFields.social.facebook = facebook;
  

      try {
          let profile = await Profile.findOne({user:req.user.id});
          
          if(!profile)
          {
              profile = await Profile.create(profileFields);
              
              return res.status(202).json({
                success:true,
                data:profile
                });

          }

          profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true, upsert: true }
          );

          
          res.status(200).json({
              success:true,
              data:profile
          });

      } catch (error) {
          
        res.status(401).json({
            success:false,
            message:error.message
        });
          
      }
};

exports.deleteProfile =  async (req,res,next)=>
{
    try {
        await Profile.findByIdAndRemove({user:req.user.id});
        await User.findByIdAndRemove({_id: req.user.id});
         
        res.status(200).json({
            success:true,
            message:'User deleted'
        });
        
    } catch (error) {
         
        res.status(401).json({
            success:false,
            message:error.message
        });
    }
}

exports.addExperience = async (req,res,next)=>
{
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;
    newExperience = {title,company,location,from,to,current,description};

    try {
        const profile = await Profile.findOne({user:req.user.id});
        if(!profile)
        {
           return  res.status(401).json({
                success:false,
                message: "Profile not found"
                });
        }
        profile.experience.push(newExperience);
        await profile.save();
        res.status(201).json({
        success:true,
        data: newExperience
        });
        
        
    } catch (error) {
        res.status(401).json({
            success:false,
            message:error.message
        });
    }
};


exports.deleteExperience = async (req, res,next) => 
{
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
  
      foundProfile.experience = foundProfile.experience.filter(
        (exp) => exp._id.toString() !== req.params.exp_id
      );
  
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  };

exports.getRepos = async (req,res,next)=>
  {
      try {
        
        const gitHubResponse = await axios.get(`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_ID=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`);
        return res.json({
            success:true,
            data :gitHubResponse.data
        });
        
      } catch (error) {

        return res.status(500).json({ msg: error.message });
          
      }
  };
  