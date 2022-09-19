function CurrentWeekNum() {
    let d = new Date();

    if(d >= new Date(2022, 8, 13) && d < new Date(2022, 8, 20)){
        return 2;
    } else if(d >= new Date(2022, 8, 20) && d < new Date(2022, 8, 27)){
        return 3;
    } else if(d >= new Date(2022, 8, 27) && d < new Date(2022, 9, 4)){
        return 4;
    } else if(d >= new Date(2022, 9, 4) && d < new Date(2022, 9, 11)){
        return 5;
    } else if(d >= new Date(2022, 9, 11) && d < new Date(2022, 9, 18)){
        return 6;
    } else if(d >= new Date(2022, 9, 18) && d < new Date(2022, 9, 25)){
        return 7;
    } else if(d >= new Date(2022, 9, 25) && d < new Date(2022, 10, 1)){
        return 8;
    } else if(d >= new Date(2022, 10, 1) && d < new Date(2022, 10, 8)){
        return 9;
    } else if(d >= new Date(2022, 10, 8) && d < new Date(2022, 10, 15)){
        return 10;
    } else if(d >= new Date(2022, 10, 15) && d < new Date(2022, 10, 22)){
        return 11;
    } else if(d >= new Date(2022, 10, 22) && d < new Date(2022, 10, 29)){
        return 12;
    } else if(d >= new Date(2022, 10, 29) && d < new Date(2022, 11, 6)){
        return 13;
    } else if(d >= new Date(2022, 11, 6) && d < new Date(2022, 11, 13)){
        return 14;
    } else if(d >= new Date(2022, 11, 13) && d < new Date(2022, 11, 20)){
        return 15;
    } else if(d >= new Date(2022, 11, 20) && d < new Date(2022, 11, 27)){
        return 16;
    } else if(d >= new Date(2022, 11, 27) && d < new Date(2023, 0, 3)){
        return 17;
    } else if(d >= new Date(2023, 0, 3) && d < new Date(2023, 0, 10)){
        return 18;
    } else {
        return 1;
    }
    
}

export default CurrentWeekNum;