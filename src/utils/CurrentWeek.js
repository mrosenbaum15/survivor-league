function CurrentWeek() {
    let d = new Date();

    if(d >= new Date(2022, 8, 14) && d < new Date(2022, 8, 21)){
        return 2;
    } else if(d >= new Date(2022, 8, 21) && d < new Date(2022, 8, 28)){
        return 3;
    } else if(d >= new Date(2022, 8, 28) && d < new Date(2022, 9, 5)){
        return 4;
    } else if(d >= new Date(2022, 9, 5) && d < new Date(2022, 9, 12)){
        return 5;
    } else if(d >= new Date(2022, 9, 12) && d < new Date(2022, 9, 19)){
        return 6;
    } else if(d >= new Date(2022, 9, 19) && d < new Date(2022, 9, 26)){
        return 7;
    } else if(d >= new Date(2022, 9, 26) && d < new Date(2022, 10, 2)){
        return 8;
    } else if(d >= new Date(2022, 10, 2) && d < new Date(2022, 10, 9)){
        return 9;
    } else if(d >= new Date(2022, 10, 9) && d < new Date(2022, 10, 16)){
        return 10;
    } else if(d >= new Date(2022, 10, 16) && d < new Date(2022, 10, 23)){
        return 11;
    } else if(d >= new Date(2022, 10, 23) && d < new Date(2022, 10, 30)){
        return 12;
    } else if(d >= new Date(2022, 10, 30) && d < new Date(2022, 11, 7)){
        return 13;
    } else if(d >= new Date(2022, 11, 7) && d < new Date(2022, 11, 14)){
        return 14;
    } else if(d >= new Date(2022, 11, 14) && d < new Date(2022, 11, 21)){
        return 15;
    } else if(d >= new Date(2022, 11, 21) && d < new Date(2022, 11, 28)){
        return 16;
    } else if(d >= new Date(2022, 11, 28) && d < new Date(2023, 0, 4)){
        return 17;
    } else if(d >= new Date(2023, 0, 4) && d < new Date(2023, 0, 11)){
        return 18;
    } else {
        return 1;
    }
    
}

export default CurrentWeek;