import replace from 'lodash/replace'
import split from 'lodash/split'

export default async (ctx, next) => {
    const params = ctx.request.query
    if ('groupBy' in params) {
        let groupByFields = split(replace(params.groupBy, ' ', ''), ',')
        params.groupBy = [...groupByFields]
    }
    let result = await ctx.booksModel.getAll(ctx.request.query)
    if (result) {
        ctx.body = result
    } else {
        ctx.status = 404
    }
}