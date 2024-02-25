
export const persianDateNT = {
    unixWithoutTime(input,message = 'No time to change') {
        if (input === null || input === undefined || input === "") {
            return message
        }
        return timestampWiHour(input)
    },
    dateWithoutTime(input,message = 'No time to change') {
        if (input === null || input === undefined || input === "") {
            return message
        }
        return time(input,2).substr(0, 10);

    },
    date(input,message = 'No time to change') {
        if (input === null || input === undefined || input === "") {
            return message
        }
        return time(input)
    },
    unix(input,message = 'No time to change') {
        if (input === null || input === undefined || input === "") {
            return message
        }
        return timestampChange(input)
    },
    unixL(input,message = 'No time to change') {
        if (input === null || input === undefined || input === "") {
            return message
        }
        return timestampChangeFaHour(input)
    },
    now(type = 1){
        switch (type) {
            case 1 :
                return DataNowFaHour();
            case 2 :
                return DataNowFaHour().replace(' ', '_').replaceAll(':', '-')
            default :
                return "No time"
        }
    },
    nowPersian(type = 1){
        switch (type) {
            case 1 :
                return time(DataNowFaHour(),2);
            case 2 :
                return time(DataNowFaHour(),2).replace(' ', '_').replaceAll(':', '-').replaceAll('/', '-')
            default :
                return "No time"
        }
    }
}


function timestampChange(input) {
    const timestamp = new Date(parseInt(input) * 1000).toISOString().slice(0, 19).replace('T', ' ')
    return time(timestamp)
}

function DataNowFaHour() {
    const test1 = new Date().toISOString().slice(0, 10).replace('T', ' ')
    const test2 = new Date().toLocaleString("en", { hour: "2-digit",minute:"2-digit",second: "2-digit", hour12: false })
    return test1 +' '+test2;
}
function timestampChangeFaHour(input) {
    const test1 = new Date(parseInt(input) * 1000).toISOString().slice(0, 10).replace('T', ' ')
    const test2 = new Date(parseInt(input) * 1000).toLocaleString("en", { hour: "2-digit",minute:"2-digit",second: "2-digit", hour12: false })
    const timestamp = test1+' '+test2;
    return time(timestamp)
}

//بدون ساعت
function timestampWiHour(input) {
    const timestamp = new Date(parseInt(input) * 1000).toISOString().slice(0, 19).replace('T', ' ')
    const get = time(timestamp,2)
    return get.substr(0, 10);
}



function time(input, type = 1) {
    let gy = parseInt(input.substr(0, 4));
    let gm = parseInt(input.substr(5, 2));
    let gd = parseInt(input.substr(8, 2));
    let hh = input.substr(11, 2);
    let mm = input.substr(14, 2);
    let ss = input.substr(17, 2);

    var g_d_m, jy, jm, jd, gy2, days;
    g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    gy2 = (gm > 2) ? (gy + 1) : gy;
    days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
    jy = -1595 + (33 * ~~(days / 12053));
    days %= 12053;
    jy += 4 * ~~(days / 1461);
    days %= 1461;
    if (days > 365) {
        jy += ~~((days - 1) / 365);
        days = (days - 1) % 365;
    }
    if (days < 186) {
        jm = 1 + ~~(days / 31);
        jd = 1 + (days % 31);
    } else {
        jm = 7 + ~~((days - 186) / 30);
        jd = 1 + ((days - 186) % 30);
    }

    jm = jm.toString().length < 2 ? "0" + jm : jm;
    jd = jd.toString().length < 2 ? "0" + jd : jd;

    if (type === 1) {
        return hh + ":" + mm + ":" + ss + " " + jy + '/' + jm + '/' + jd;
    } else {
        return jy + '/' + jm + '/' + jd + " " + hh + ":" + mm + ":" + ss;
    }


}


function persianNumToEnglish(persianNum) {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    let englishNum = "";
    for (let i = 0; i < persianNum.length; i++) {
        const index = persianDigits.indexOf(persianNum[i]);
        if (index !== -1) {
            englishNum += englishDigits[index];
        } else {
            englishNum += persianNum[i];
        }
    }
    return englishNum;
}
