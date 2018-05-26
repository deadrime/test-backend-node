import Router  from 'koa-router'
import getBookController from './controllers/getBookController'
import getBooksController from './controllers/getBooksController'
import createBookController from './controllers/createBookController'
import updateBookController from './controllers/updateBookController'

const router = new Router()

router.param('id', (id, ctx, next) => next())
router.get('/book/:id', getBookController)
router.get('/books/', getBooksController)
router.post('/book/', createBookController)
router.put('/book/:id', updateBookController)

export default router.routes()