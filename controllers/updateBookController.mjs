export default async (ctx, next) => {
    ctx.status = 201
    let result = await ctx.booksModel.update(ctx.params.id, ctx.request.body)
    ctx.body = result
}