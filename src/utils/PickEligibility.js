import GetTargetDate from './GetTargetDate';

function PickEligibility(weekNum, deadline) {

    let startDate = GetTargetDate(weekNum, deadline);

    // let timeShift = IsDaylightSavings(startDate) ? 1 : 1;
    let currTime = Date.now();
    
    let offsetTime = currTime + (startDate.getTimezoneOffset() * 60 * 1000);
    let numHours;
    
    //  tnf: 00:20 the next day, london: 13:30, normal: 17, thanksgiving_early: 16:30, thanksgiving_middle: 20:30, thanksgiving_end: 00:20 the next day
    //  tnf: 01:20 the next day, london: 14:30, normal: 18, thanksgiving_early: 17:30, thanksgiving_middle: 21:30, thanksgiving_end: 01:20 the next day
    if(deadline === 'tnf') numHours = 25.33;
    else if(deadline === 'london') numHours = 14.5;
    else if(deadline === 'thanksgiving_morning') numHours = 17.5
    else if(deadline === 'thanksgiving_afternoon') numHours = 21.5
    else if(deadline === 'thanksgiving_night') numHours = 25.33;
    else if(deadline === "saturday_afternoon") numHours = 21;
    else if(deadline === "saturday_night") numHours = 25.33;
    else numHours = 18;
    
    return(offsetTime < startDate.getTime() + (numHours * 60 * 60 * 1000))
}

export default PickEligibility;
