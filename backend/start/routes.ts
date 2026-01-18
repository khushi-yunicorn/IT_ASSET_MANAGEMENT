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
router.group(() => {
    router.post('/register', [AssetsController, 'store'])
    router.get('/assets', [AssetsController, 'show'])
    router.get(':id', [AssetsController, 'index'])
    router.put('/:id', [AssetsController, 'edit'])
    router.delete('/asset/:id', [AssetsController, 'destroy'])
}).prefix('/asset')

// ------ Asset Assignment API --------
router.group(() => {
    router.post('/register', [AssetAssignmentsController, 'store'])
    router.get('/:id', [AssetAssignmentsController, 'show'])
    router.get('/asset_assignments', [AssetAssignmentsController, 'index'])
    router.put('/:id', [AssetAssignmentsController, 'edit'])
    router.delete('/:id', [AssetAssignmentsController, 'destroy'])
}).prefix("/asset_assignment")
