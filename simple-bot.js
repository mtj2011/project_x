function job() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", step_result);
    xhr.open("POST", "https://api.simple-mmo.com/api/travel/perform/f4g5l4l3k", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(getReqParam()));
}

function getReqParam() {
    const sec = new Date().getSeconds()
    return {
        'api_token': 'XAxvO5fWu0aDiGIglF4MqHgvho0shDApU1b4Ro9kJDE2GUELhDjiuSe02GuS',
        'd_1': 150 + sec,
        'd_2': 400 + sec,
        's': false,
    }
}

function step_result(event) {
    const res = JSON.parse(event.target.response);
    totalCount++;
    console.log("Lv :", res.level, 'Exp :', res.exp_amount, 'Gold :', res.gold_amount, 'Type :', res.step_type, 'totalCount :', totalCount)
    if (!res.step_type) {
        console.log('Bot check!!');
        return false
    }
    if (res.step_type == 'item') {
        console.log('Item Get.')
    }
    setTimeout(job, res.nextwait * 1000);
}
let totalCount = 0
job();