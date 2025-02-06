export const API_KEY='AIzaSyC5mxCWnvxfMh6v9nY80aUm2bJobi-SOm4'

export const value_converter=(value)=>{
    if(value>=1000000){
        return Math.floor(value/1000000)+"M"
    }
    else if(value>=1000){
        return Math.floor(value/1000)+"K"
    }
    else{
        return value;
    }
}

//const publishedDate = new Date(item.snippet.publishedAt);


export const publishedDate=(uploaddate)=>{
    // Calculate difference in milliseconds
    const today = new Date();
    const newToday = today.toISOString();
    const differenceMs = today - uploaddate;
    // console.log(newToday+"  "+uploaddate)
    // // Convert milliseconds to days
     const daysAgo = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    // console.log(today)
    return(`${daysAgo} days ago`);
}

