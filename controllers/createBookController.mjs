export default async (ctx, next) => {
    ctx.status = 201
    let result = await ctx.booksModel.create(ctx.request.body)
    ctx.body = result
}