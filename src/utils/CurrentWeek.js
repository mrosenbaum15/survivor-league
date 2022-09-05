function CurrentWeek() {
    let d = new Date();

    if(d >= new Date(2022, 9, 13) && d < new Date(2022, 9, 20)){
        return 2;
    } else if(d >= new Date(2022, 9, 20) && d < new Date(2022, 9, 27)){
        return 3;
    } else if(d >= new Date(2022, 9, 27) && d < new Date(2022, 10, 4)){
        return 4;
    } else if(d >= new Date(2022, 10, 4) && d < new Date(2022, 10, 11)){
        return 5;
    } else if(d >= new Date(2022, 10, 11) && d < new Date(2022, 10, 18)){
        return 6;
    } else if(d >= new Date(2022, 10, 18) && d < new Date(2022, 10, 25)){
        return 7;
    } else if(d >= new Date(2022, 10, 25) && d < new Date(2022, 11, 1)){
        return 8;
    } else if(d >= new Date(2022, 11, 1) && d < new Date(2022, 11, 8)){
        return 9;
    } else if(d >= new Date(2022, 11, 8) && d < new Date(2022, 11, 15)){
        return 10;
    } else if(d >= new Date(2022, 11, 15) && d < new Date(2022, 11, 22)){
        return 11;
    } else if(d >= new Date(2022, 11, 22) && d < new Date(2022, 11, 29)){
        return 12;
    } else if(d >= new Date(2022, 11, 29) && d < new Date(2022, 12, 6)){
        return 13;
    } else if(d >= new Date(2022, 12, 6) && d < new Date(2022, 12, 13)){
        return 14;
    } else if(d >= new Date(2022, 12, 13) && d < new Date(2022, 12, 20)){
        return 15;
    } else if(d >= new Date(2022, 12, 20) && d < new Date(2022, 12, 27)){
        return 16;
    } else if(d >= new Date(2022, 12, 27) && d < new Date(2023, 1, 3)){
        return 17;
    } else if(d >= new Date(2023, 1, 3) && d < new Date(2023, 1, 10)){
        return 18;
    } else {
        return 1;
    }
    
}

export default CurrentWeek;