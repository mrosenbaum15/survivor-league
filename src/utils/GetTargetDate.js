function GetTargetDate(weekNum, deadline) {
    let startDate;
    let endDate;

    if(weekNum === 2){
        startDate = new Date(2022, 8, 13);
        endDate = new Date(2022, 8, 20);
    } else if(weekNum === 3){
        startDate = new Date(2022, 8, 20);
        endDate = new Date(2022, 8, 27);
    } else if(weekNum === 4){
        startDate = new Date(2022, 8, 27);
        endDate = new Date(2022, 9, 4);
    } else if(weekNum === 5){
        startDate = new Date(2022, 9, 4);
        endDate = new Date(2022, 9, 11);
    } else if(weekNum === 6){
        startDate = new Date(2022, 9, 11);
        endDate = new Date(2022, 9, 18);
    } else if(weekNum === 7){
        startDate = new Date(2022, 9, 18);
        endDate = new Date(2022, 9, 25);
    } else if(weekNum === 8){
        startDate = new Date(2022, 9, 25);
        endDate = new Date(2022, 10, 1);
    } else if(weekNum === 9){
        startDate = new Date(2022, 10, 1);
        endDate = new Date(2022, 10, 8);
    } else if(weekNum === 10){
        startDate = new Date(2022, 10, 8);
        endDate = new Date(2022, 10, 15);
    } else if(weekNum === 11){
        startDate = new Date(2022, 10, 15);
        endDate = new Date(2022, 10, 22);
    } else if(weekNum === 12){
        startDate = new Date(2022, 10, 22);
        endDate = new Date(2022, 10, 29);
    } else if(weekNum === 13){
        startDate = new Date(2022, 10, 29);
        endDate = new Date(2022, 11, 6);
    } else if(weekNum === 14){
        startDate = new Date(2022, 11, 6);
        endDate = new Date(2022, 11, 13);
    } else if(weekNum === 15){
        startDate = new Date(2022, 11, 13);
        endDate = new Date(2022, 11, 20);
    } else if(weekNum === 16){
        startDate = new Date(2022, 11, 20);
        endDate = new Date(2022, 11, 27);
    } else if(weekNum === 17){
        startDate = new Date(2022, 11, 27);
        endDate = new Date(2023, 0, 3);
    } else if(weekNum === 18){
        startDate = new Date(2023, 0, 3);
        endDate = new Date(2023, 0, 10);
    } else {
        startDate = new Date(2022, 8, 6);
        endDate = new Date(2022, 8, 13);
    }

    while (startDate <= endDate) {
        // console.log("DATE: " + startDate + " DOW: " + startDate.getDay());
        if(weekNum != 16 && (deadline.includes('normal') || deadline === "london" || deadline === "mnf") && startDate.getDay() === 0) {
            break;
        } else if((deadline === 'tnf' || deadline.includes("thanksgiving")) && startDate.getDay() === 4) {
            break;
        } else if(weekNum === 16 && startDate.getDay() === 6) {
            break;
        }
        startDate.setDate(startDate.getDate() + 1);
    }

    return startDate;
}

export default GetTargetDate;