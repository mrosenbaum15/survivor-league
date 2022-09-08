import GetTargetDate from './GetTargetDate';

function IsDaylightSavings(date) {
    let testDate = new Date(2022, 0, 1);
    return(date.getTimezoneOffset() < testDate.getTimezoneOffset());
}

function PickEligibility(weekNum, deadline) {

    let startDate = GetTargetDate(weekNum, deadline);

    let timeShift = IsDaylightSavings(startDate) ? 0 : 1;
    let currTime = Date.now();

    let numHours;
    
    //  tnf: 00:20 the next day, london: 13:30, normal: 17, thanksgiving_early: 16:30, thanksgiving_middle: 20:30, thanksgiving_end: 00:20 the next day
    //  tnf: 01:20 the next day, london: 14:30, normal: 18, thanksgiving_early: 17:30, thanksgiving_middle: 21:30, thanksgiving_end: 01:20 the next day
    if(deadline === 'tnf') numHours = 24.33;
    else if(deadline === 'london') numHours = 13.5;
    else if(deadline === 'thanksgiving_morning') numHours = 16.5
    else if(deadline === 'thanksgiving_afternoon') numHours = 20.5
    else if(deadline === 'thanksgiving_night') numHours = 24.33;
    else numHours = 17;

    numHours += timeShift;

    return(currTime < startDate.getTime() + (numHours * 60 * 60 * 1000))
}

export default PickEligibility;
