const express = require('express');
const router = express.Router();

const SignUpController = require('../Controller/SignupController');
const LoginController = require('../Controller/Login');
const ForgotPassword = require('../Controller/ForgotPassword');
const postController = require('../Controller/Posts');
const SearchData = require('../Controller/SearchData');
const showImage = require('../Controller/ShowImage');
const follow = require('../Controller/Follow');
const suggestion = require('../Controller/Suggestion');
const EditUser = require('../Controller/EditUser');
const Admin = require('../Controller/Admin');
const autoLogin= require('../Controller/AutoLogin')



// router.get('/User_detail', home.User_detail);
router.post('/api/Signup', SignUpController.Signup);
router.post('/api/auth', SignUpController.Verification);
router.post('/api/Login', LoginController.Login);
 router.post('/api/forgot', ForgotPassword.Forgot);
 router.post('/api/PasswordReset', ForgotPassword.PasswordReset);
router.post('/api/posts',  postController.Posts);
router.post('/api/search',  SearchData.Search);
router.post('/api/ShowData', showImage.ShowData);
router.post('/api/follow', follow.Follow);
router.post('/api/UnFollow', follow.UnFollow);
router.post('/api/follower', follow.Follower);
router.get('/api/ShowImage/:id',showImage.ShowImage);
router.post('/api/CheckFollow', follow.CheckFollow);
router.post('/api/getFollowing', follow.getFollowing);

router.post('/api/AdminLogin', Admin.AdminLogin);
router.post('/api/userDataAdmin',Admin.AdminData);
router.post('/api/AdminFollow',Admin.AdminFollow);
router.post('/api/suggestion', suggestion.Suggestion);
router.post('/api/userSuggestion', suggestion.UserSuggestion);
router.post('/api/getUserDetail', showImage.getUserDetail);
router.post('/api/EditName', EditUser.EditName);
router.post('/api/EditCity', EditUser.EditCity);
router.post('/api/EditSchool', EditUser.EditSchool);
router.post('/api/EditCollege', EditUser.EditCollege);
router.post('/api/EditEmail', EditUser.EditEmail);
router.post('/api/EditMobile', EditUser.EditMobile);
router.post('/api/ChangePassword', ForgotPassword.ChangePassword);
router.post('/api/notification', suggestion.Notification);
router.post('/api/hashtagSearch', SearchData.hashtagSearch);
router.post('/api/EditProfilePic', postController.SaveProfilePic);
router.get('/api/ShowUserImage/:id',showImage.ShowUserImage);
router.post('/api/autoLogin', autoLogin.autoLogin);


module.exports = router;