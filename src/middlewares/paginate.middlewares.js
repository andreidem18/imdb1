const Paginate = (offset, limit, count, result) => {
    let response = {
        count: count,
        next: null,
        previous: null,
        result: result
    };
    if(offset + limit < count){
        const limitNext = 2 * limit + offset > count ? 
            limit - (2 * limit + offset - count)
            : 
            limit;
        const offsetNext = offset + limit;
        response.next = `http://imdb.herokuapp.com/api/v1/actors/?offset=${offsetNext}&limit=${limitNext}`;
    }   
    if(offset > 0){
        const offsetPrev = offset - limit < 0 ? 0 : offset - limit;
        const limitPrev = offsetPrev === 0 ? offset : limit;
        response.previous = `http://imdb.herokuapp.com/api/v1/actors/?offset=${offsetPrev}&limit=${limitPrev}`;
    }

    return response;
}

module.exports = Paginate;