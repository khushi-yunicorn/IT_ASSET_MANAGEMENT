/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AssetAssignmentsController from '#controllers/asset_assignments_controller'
import AssetsController from '#controllers/assets_controller'
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'


// ----- User API-------
router.group(() => {
    router.post('/register', [UsersController, 'store'])

    router.get('/users', [UsersController, 'show'])

    router.group(() => {
        router.get('/:id', [UsersController, 'index'])
        router.put('/:id', [UsersController, 'edit'])
        router.delete('/:id', [UsersController, 'destroy'])
    }).prefix('/user')

}).prefix('/api')


// ------ Asset API -------
router.post('/asset/register', [AssetsController, 'store'])
router.get('/asset/assets', [AssetsController, 'show'])
router.get('/asset/asset/:id', [AssetsController, 'index'])
router.put('/asset/:id', [AssetsController, 'edit'])
router.delete('/asset/:id', [AssetsController, 'destroy'])

// ------ Asset Assignment API --------
router.post('/assest_assignment/register', [AssetAssignmentsController, ])
