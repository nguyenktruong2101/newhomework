const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const mongoose = require('mongoose');
const { MONGO_URI } = process.env;
const newsCategoryJSON = require('./sampleNewsCategory.json');
const News_category = require('./models/news_category');
const postCategoryJSON = require('./samplePostCategory.json');
const reporterAdminJSON = require('./reporterAdminList.json');
const User = require('./models/users');
const Post_category = require('./models/post_category');
const bcrypt = require('bcryptjs');
const { SERVER_PORT } = process.env;
mongoose
    .connect(MONGO_URI)

    .then(() =>
        server.listen(SERVER_PORT, () => {
            console.log(
                `Server running on port ${SERVER_PORT}. Database successfully connected`
            );
            postCategoryJSON.map(async (element, index) => {
                var existedElement = await Post_category.post_category.findOne({
                    name: element.name,
                });
                if (!existedElement) {
                    Post_category.post_category.create(
                        { name: element.name },
                        function (error, data) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log(data);
                            }
                        }
                    );
                }
            });

            newsCategoryJSON.map(async (element, index) => {
                var existedElement = await News_category.news_category.findOne({
                    name: element.name,
                });
                //console.log(element.name)
                if (!existedElement) {
                    News_category.news_category.create(
                        { name: element.name },
                        function (error, data) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log(data);
                            }
                        }
                    );
                }
            });
            reporterAdminJSON.map(async (element, index) => {
                var existedElement = await User.user.findOne({
                    username: element.username,
                });
                //console.log(element.name)
                if (!existedElement) {
                    User.user.create(
                        {
                            name: element.name,
                            username: element.username,
                            password: bcrypt.hashSync(element.password, 8),
                            email: element.email,
                            emailVerified: true,
                            userType: element.userType,
                            followers: [],
                        },
                        function (error, data) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log(data);
                            }
                        }
                    );
                }
            });
        })
    )
    .catch((error) => console.log(error.message));
