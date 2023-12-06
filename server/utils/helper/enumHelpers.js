const enumConverter=(data)=>{
    const response=data.reduce((acc,curr)=>{
        const {category,...other}=curr._doc;
        if(acc[category]!==undefined){
            acc[category].push(other);
        }else{
            acc[category]=[other]
        }
        return acc;
    },{})
    return response;
}

const enumConstConverter=(data)=>{
    const response=data.reduce((acc,curr)=>{
        const {category,...other}=curr._doc;
        acc[category]={...acc[category],[other.key]:other.value}
        return acc;
    },{})
    return response;
}

module.exports={enumConverter,enumConstConverter}