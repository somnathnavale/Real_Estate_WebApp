export const createFilterQuery=(filter)=>{
    let query={}
    if(filter.searchText){
        query.searchText=filter.searchText;
    }
    if(filter.category.length){
        query.category=filter.category.join(',');
    }
    if(filter.listingType.length){
        query.listingType=filter.listingType.join(',');
    }
    if(filter.furnishing.length){
        query.furnishing=filter.furnishing.join(',');
    }
    if(filter.amenities.length){
        const res=filter.amenities.reduce((acc,curr)=>{
            acc[curr]=true;
            return acc;
        },{})
        query={...query,...res}
    }
    query={...query,page:filter.page}
    const priceBand=filter.price.filter(item=>item.checked);
    if(priceBand.length){
        query.minPrice=priceBand[0].min;
        query.maxPrice=priceBand[priceBand.length-1].max;
    }
    return query;
}
