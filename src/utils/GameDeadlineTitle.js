function GameDeadlineTitle(currDeadline, activePage) {
    let bannerTitle = "";
    console.log(currDeadline);
    if(currDeadline === 'tnf') {
        bannerTitle = "Thursday";
    } else if(currDeadline.includes("christmas")){
        bannerTitle = "Chirstmas";
    } else if((activePage === 16 && currDeadline === "normal") || (currDeadline === "saturday_morning")){
        bannerTitle = "Saturday Early Afternoon";
    } else if((activePage === 16 && currDeadline === "normal_afternoon") || (currDeadline === "saturday_afternoon")){ // TODO: improve saturday logic for next year
        bannerTitle = "Saturday Late Afternoon";
    } else if((activePage === 16 && currDeadline === "normal_night") || (currDeadline === "saturday_night")){
        bannerTitle = "Saturday Night";
    } else if(currDeadline === 'normal_afternoon'){
        bannerTitle = "Sunday Late Afternoon";
    } else if(currDeadline === 'normal_night'){
        bannerTitle = "Sunday Night";
    } else if(currDeadline === 'mnf'){
        bannerTitle = "Monday";
    } else if(currDeadline === 'london'){
        bannerTitle = "Sunday AM in London";
    } else if(currDeadline === 'thanksgiving_morning') {
        bannerTitle = "Thanksgiving Morning";
    } else if(currDeadline === 'thanksgiving_afternoon') {
        bannerTitle = "Thanksgiving Afternoon";
    } else if(currDeadline === 'thanksgiving_night') {
        bannerTitle = "Thanksgiving Night";
    } else {
        bannerTitle = "Sunday Early Afternoon";
    }

    return bannerTitle;
}

export default GameDeadlineTitle;