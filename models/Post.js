const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
          },
          text: {
            type: String,
            required: [true,'text is required please']
          },
          name: {
            type: String
          },
          avatar: {
            type: String
          },    
          likes: [
            {
              user: {
                type: mongoose.Schema.Types.ObjectId
              }
            }
          ],
          comments: [
            {
              user: {
                type: mongoose.Schema.Types.ObjectId
              },
              text: {
                type: String,
                required: true
              },
              name: {
                type: String
              },
              avatar: {
                type: String
              },
              created_at: {
                type: Date,
                default: Date.now
              }
            }
          ],
          created_at: {
            type: Date,
            default: Date.now
    }
});


module.exports = mongoose.model('Post',PostSchema); 