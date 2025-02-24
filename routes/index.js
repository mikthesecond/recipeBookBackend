const adminController = require('../controllers/admin-controller');
const commentController = require('../controllers/comment-controller');
const ratingController = require('../controllers/rating-controller');
const recipeConroller = require('../controllers/recipe-conroller');


const Router = require('express').Router;

const route = Router()

route.get('/recipes',recipeConroller.getRecipes)
route.get('/recipe/:id',recipeConroller.getRecipe)
route.post('/recipe',recipeConroller.addRecipe)
route.patch('/recipe',recipeConroller.patchRecipe)

route.post("/auth",adminController.login)

route.post("/rating",ratingController.addRating)

route.post('/comment',commentController.addComment)



module.exports = route