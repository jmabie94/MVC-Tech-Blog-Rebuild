const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

// gets ALL blogposts for the homepage
router.get('/', async (req, res) => {
  try {
    const dbBlogPostData = await BlogPost.findAll({
      attributes: ['id', 'title', 'description', 'created_at', 'user_id'],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at',
          ],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['id', 'username'],
        },
      ],
    });

    const blogposts = dbBlogPostData.map((blogpost) =>
      blogpost.get({ plain: true })
    );
    blogposts.reverse();

    res.render('homepage', {
      blogposts,
      logged_in: req.session.logged_in,
      username: req.session.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// renders a page to write and post a new blogpost
router.get('/newpost', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: ['id', 'username'],
    });
    res.render('blog-post', {
      logged_in: req.session.logged_in,
      user: userData.dataValues,
      username: req.session.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// gets ALL blogposts FROM the logged_in user
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const allUserPosts = await BlogPost.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ['id', 'title', 'description', 'created_at', 'user_id'],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at',
          ],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    const blogposts = allUserPosts.map((blogpost) =>
      blogpost.get({ plain: true })
    );

    blogposts.reverse();

    res.render('dashboard', {
      blogposts,
      logged_in: req.session.logged_in,
      username: req.session.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get a list of ALL users, each one hyperlinks to user/:id routing
router.get('/allusers', withAuth, async (req, res) => {
  try {
    const allUserData = await User.findAll({
      attributes: ['id', 'username'],
    });

    const allUsers = allUserData.users.map((user) => user.get({ plain: true }));
    console.log(allUsers);

    res.render('user-directory', {
      allUsers,
      logged_in: req.session.logged_in,
      user: allUserData.dataValues,
      username: req.session.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get a list of ALL blogposts by specific user
router.get('/user/:id', withAuth, async (req, res) => {
  try {
    const userBlogPostData = await User.findByPk(req.params.id, {
      include: [
        {
          model: BlogPost,
          include: [Comment],
        },
      ],
      attributes: ['id', 'username'],
    });

    const userBlogPosts = userBlogPostData.blogposts.map((blogpost) =>
      blogpost.get({ plain: true })
    );
    console.log(userBlogPosts);

    res.render('single-user', {
      userBlogPosts,
      logged_in: req.session.logged_in,
      user: userBlogPostData.dataValues,
      username: req.session.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get a specific blogpost by its ID
router.get('/blogposts/:id', withAuth, async (req, res) => {
  try {
    const dbBlogPostData = await BlogPost.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'title', 'description', 'user_id', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at',
          ],
          include: {
            model: User,
            attributes: ['id', 'username'],
          },
        },
        {
          model: User,
          attributes: ['id', 'username'],
        },
      ],
    });

    const title = dbBlogPostData.dataValues.title;
    const user = dbBlogPostData.dataValues.user.username;
    const user_id = dbBlogPostData.dataValues.user.id;
    const date = dbBlogPostData.dataValues.created_at;
    // created_at rather than created_at still confusing
    console.log('dbBlogPostData.datavalues: ', dbBlogPostData.dataValues);
    const description = dbBlogPostData.dataValues.description;
    const blogPost = {
      title,
      date,
      user,
      user_id,
      description,
      comments: [],
    };

    for (let i = 0; i < dbBlogPostData.dataValues.comments.length; i++) {
      let username = dbBlogPostData.dataValues.comments[i].user.username;
      let commentText = dbBlogPostData.dataValues.comments[i].comment_text;
      let commentDate =
        dbBlogPostData.dataValues.comments[i].dataValues.created_at;
      let userId = dbBlogPostData.dataValues.comments[i].dataValues.user_id;
      let commentId = dbBlogPostData.dataValues.comments[i].dataValues.id;

      blogPost.comments.push({
        user: username,
        userId: userId,
        text: commentText,
        date: commentDate,
        commentId: commentId,
        usersComment: username === req.session.username,
      });
    }

    res.render('single-post', {
      blogPost,
      logged_in: req.session.logged_in,
      username: req.session.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// login
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

//signup
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

// logout
router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
