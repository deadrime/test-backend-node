export default async (ctx, next) => {
    let result = await ctx.booksModel.get(ctx.params.id)
    if (result) {
        ctx.body = result
    } else {
        ctx.status = 404
    }
}