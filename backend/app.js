const app = require('express')();
console.log('hello');
require('dotenv').config();

const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./routes/signUpLoginRoutes/auth');
const verifyEmail = require('./routes/signUpLoginRoutes/verifyEmail');

const newsPageRoute = require('./routes/newpageRoute/fetchNewPageRoute');
const forumPosts = require('./routes/forums/forumsRoute');
const profileUser = require('./routes/profile/profileRoutes');
const newsArticle = require('./routes/news/newsRoutes');
const postCategory = require('./routes/postCategory/postCategoryRoute');

const userUpdateRoute = require('./routes/profile/userUpdateRoute');
const userFollowRoute = require('./routes/profile/userFollowRoute');

const voteRoute = require('./routes/forums/voteRoute');
const categorizeRoute = require('./routes/forums/categorizeRoute');

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

//"mongodb+srv://giangle:mypassword@cluster0.sfxdv.mongodb.net/furtherweb"
//"mongodb+srv://myuser:mypassword@cluster0.1lbnn.mongodb.net/testdb"

app.use('/news', newsPageRoute);
app.use('/auth', auth);
app.use('/', verifyEmail);
app.use('/profile', profileUser);
app.use('/forums', forumPosts);

app.use('/newsdata', newsArticle);

app.use('', userUpdateRoute);
app.use('', userFollowRoute);

app.use('/post_categories', postCategory);

app.use('/vote', voteRoute);
app.use('/categorize', categorizeRoute);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to backend.' });
});

module.exports = app;
