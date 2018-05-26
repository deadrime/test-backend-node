import Koa from 'koa'
import Router  from 'koa-router'
import bodyParser from 'koa-bodyparser'
import config from './config'
import routes from './routes'
import booksModel from './models/Books'

const app = new Koa()

app.use(async (ctx, next) => {
	try {
		await next()
	} catch (err) {
		console.log('Error detected', err)
		ctx.body = `Error: ${err.message}`
	}
})
app.use(async (ctx, next) => {
	const start = Date.now()
	await next()
	const ms = Date.now() - start
	console.log(`${ctx.method} ${ctx.url} - ${ms} ms`)
})
app.use(async (ctx, next) => {
	ctx.booksModel = booksModel
	await next()
})
app.use(bodyParser())
app.use(routes)
app.listen(config.server.port, () => {
    console.log(`listening at port ${config.server.port}`)
})