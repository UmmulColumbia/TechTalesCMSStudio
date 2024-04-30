const router = require('express').Router();
//const User = require('../models/Post');

const { Post, User, Comment } = require('../models');  

// Get all posts and render them on the homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['content', 'createdAt', 'userId'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get single post by id
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });

        if (postData) {
            const post = postData.get({ plain: true });
            res.render('post', { post });
        } else {
            res.status(404).json({ message: 'No post found with this id!' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
// POST route for creating a new post
//router.post('/create', isAuthenticated, async (req, res) => {
   // try {
       // const { title, content } = req.body;

       // await Post.create({ title, content, userId: req.session.userId });

      //  res.redirect('/dashboard'); // Redirect to dashboard or appropriate path
   // } catch (error) {
       // console.error('Error creating post:', error);
       // res.status(500).send('Error creating post');
    //}
//});

// Create new post
//router.post('/', async (req, res) => {
   // try {
       // const newPost = await Post.create({
          //  ...req.body,
          //  userId: req.session.userId  
       // });
       // res.status(201).json(newPost);
   // } catch (err) {
       // res.status(400).json(err);
   // }
//});

// Update post
router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
                userId: req.session.userId  // Only allow update if the post belongs to the session user
            }
        });

        if (updatedPost) {
            res.json(updatedPost);
        } else {
            res.status(404).json({ message: 'No post found with this id!' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete post
router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId  // Only allow deletion if the post belongs to the session user
            }
        });

        if (deletedPost) {
            res.json({ message: 'Post deleted!' });
        } else {
            res.status(404).json({ message: 'No post found with this id!' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
