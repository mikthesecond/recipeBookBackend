const userController = require('../controllers/user-controller');
const commentController = require('../controllers/comment-controller');
const ratingController = require('../controllers/rating-controller');
const recipeConroller = require('../controllers/recipe-conroller');
const savedController = require('../controllers/saved-controller');


const Router = require('express').Router;

const route = Router()

route.get('/recipes',recipeConroller.getRecipes)
route.get('/recipe/:id',recipeConroller.getRecipe)
route.post('/recipe',recipeConroller.addRecipe)
route.delete('/recipe',recipeConroller.deleteRecipe)
route.patch('/recipe',recipeConroller.patchRecipe)

route.post("/registration",userController.registration)
route.post("/login",userController.login)

route.post("/rating",ratingController.addRating)
route.get("/rating",ratingController.getRating)

route.post('/comments',commentController.addComment)
route.get('/comments/:id',commentController.getComments)

route.get('/saved',savedController.getSaved)
route.post('/saved',savedController.addSaved)



module.exports = route