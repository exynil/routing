var access;
var cycle_stop;
var test;
var type_of_result;
var num;
var num_backup;
var bin;
var step;
var step_of_mask;
var count;
var count_backup;
var count_of_number;
var count_of_routing;
var count_of_result;
var count_of_netmask;
var count_ip;
var octet;
var ban;
var t_01;
var t_02;
var time;
var input_01;
var input_02;
var table;
var tr_result;
var ip_bin = [];
var ip_dec = [];
var netmask_bin = [];
var netmask_dec = [];
var network_bin = [];
var network_dec = [];
var broadcast_bin = [];
var broadcast_dec = [];
var ban_01 = [];
var ban_02 = [];
var temporary_ip = [];
var temporary_netmask = [];
var types_of_masks = [0, 128, 192, 224, 240, 248, 252, 254, 255];
var block_00 = document.getElementById('block_00');
var block_01 = document.getElementById('block_01');
var button = document.getElementById('button');

button.onmousedown = function(event) {
    if (event.button === 0 && event.ctrlKey === true) {
        type_of_result = 2;
    } else {
        type_of_result = 1;
    }
    this.style.background = '#333';
    this.style.color = '#F3B222';
}
button.onmouseup = function() {
    this.style.background = '#eee';
    this.style.color = '#555';
}

function begin() {
    t_01 = performance.now();
    input_01 = document.getElementById('inp_01').value;
    input_02 = document.getElementById('inp_02').value;
    block_00.innerHTML = '';
    block_01.innerHTML = '';
    test = false;
    access = true;
    ban = 1;
    step_of_mask = 0;
    count_ip = 0;
    octet = -1;
    count_of_number = 1;
    count_of_routing = 1;
    count_of_result = 0;
    count_of_netmask = 0;
    temporary_ip = [0, 0, 0, 0];
    temporary_netmask = [0, 0, 0, 0];
    ban_01 = [undefined, undefined, undefined, undefined];
    ban_02 = [undefined, undefined, undefined, undefined];
    for (var i = 0; i <= 3; i++) {
        for (var k = 0; k <= 3; k++) {
            if (input_01.charAt(k) == '.' || input_01.charAt(k) == ',' || input_01.charAt(k) == '/') {
                ban_01[i] = Number(input_01.substring(0, k));
                input_01 = input_01.slice(k + 1);
                break;
            }
        }
        if (i == 3) {
            ban_01[i] = Number(input_01);
        }
    }
    for (var i = 0; i <= 3; i++) {
        for (var k = 0; k <= 3; k++) {
            if (input_02.charAt(k) == '.' || input_02.charAt(k) == ',' || input_02.charAt(k) == '/') {
                ban_02[i] = Number(input_02.substring(0, k));
                input_02 = input_02.slice(k + 1);
                break;
            }
        }
        if (i == 3) {
            ban_02[i] = Number(input_02);
        }
    }
    if (input_01 == '' || input_02 == '') {
        block_00.innerHTML = '<p id="answer">Необходимо сначала заполнить все поля.</p>';
    } 
    else if (ban_01[0] == 0 && ban_01[1] == 0 && ban_01[2] == 0 && ban_01[3] == 0 && ban_02[0] == 255 && ban_02[1] == 255 && ban_02[2] == 255 && ban_02[3] == 255) {
        block_00.innerHTML = '<p id="answer">Этот диапазон не имеет смысла в вычислении.</p>';
    } else {
        for (var i = 0; i <= 3; i++) {
            if (ban_01[i] >= 0 && ban_01[i] <= 255 && ban_02[i] >= 0 && ban_02[i] <= 255) {
                test = true;
            } else {
                test = false;
                break;
            }
        }
        if (test == false) {
            block_00.innerHTML = '<p id="answer">Ошибка в ip адресе! :(</p>';
        } else {
            if (ban_01[0] < ban_02[0]) {
                if (type_of_result == 2) {
                    block_01.innerHTML = '<table></table>';
                } else {
                    block_01.innerHTML = '<table><tr><th></th><th>IP адрес</th><th>Маска подсети</th><th></th></tr></table>';
                }
                table = document.getElementsByTagName('table');
                tr_result = document.getElementsByClassName('result');
                calculation();
                return;
            } else if (ban_01[0] == ban_02[0]) {
                if (ban_01[1] < ban_02[1]) {
                    if (type_of_result == 2) {
                        block_01.innerHTML = '<table></table>';
                    } else {
                        block_01.innerHTML = '<table><tr><th></th><th>IP адрес</th><th>Маска подсети</th><th></th></tr></table>';
                    }
                    table = document.getElementsByTagName('table');
                    tr_result = document.getElementsByClassName('result');
                    calculation();
                    return;
                } else if (ban_01[1] == ban_02[1]) {
                    if (ban_01[2] < ban_02[2]) {
                        if (type_of_result == 2) {
                            block_01.innerHTML = '<table></table>';
                        } else {
                            block_01.innerHTML = '<table><tr><th></th><th>IP адрес</th><th>Маска подсети</th><th></th></tr></table>';
                        }
                        table = document.getElementsByTagName('table');
                        tr_result = document.getElementsByClassName('result');
                        calculation();
                        return;
                    } else if (ban_01[2] == ban_02[2]) {
                        if (ban_01[3] < ban_02[3]) {
                            if (type_of_result == 2) {
                                block_01.innerHTML = '<table></table>';
                            } else {
                                block_01.innerHTML = '<table><tr><th></th><th>IP адрес</th><th>Маска подсети</th><th></th></tr></table>';
                            }
                            table = document.getElementsByTagName('table');
                            tr_result = document.getElementsByClassName('result');
                            calculation();
                            return;
                        } else if (ban_01[3] == ban_02[3]) {
                            block_00.innerHTML = '<p id="answer">Вы ввели два одинаковых адреса. Необходимо указать какой нибудь диапазон.</p>';
                        } else {
                            block_00.innerHTML = '<p id="answer">Четвёртый октет начала диапазона должен быть меньше четвёртого октета конца диапазона.</p>';
                        }
                    } else {
                        block_00.innerHTML = '<p id="answer">Третий октет начала диапазона должен быть меньше третьего октета конца диапазона.</p>';
                    }
                } else {
                    block_00.innerHTML = '<p id="answer">Второй октет начала диапазона должен быть меньше второго октета конца диапазона.</p>';
                }
            } else {
                block_00.innerHTML = '<p id="answer">Первый октет начала диапазона должен быть меньше первого октета конца диапазона.</p>';
            }
        }
    }
    return;
}

function calculation() {
    octet = -1;
    cycle_stop = false;
    access = true;
    ip_dec = temporary_ip;
    netmask_dec = temporary_netmask;
    for (var i = 0; i <= 3; i++) {
        bin = 0;
        count = 1;
        num = ip_dec[i];
        if (num == 0) {
            ip_bin[i] = bin;
        } else {
            while (num != 1) {
                if (num % 2 == 1) {
                    bin += count;
                    num /= 2;
                    num -= 0.5;
                    num = num.toFixed(0);
                    count *= 10;
                } else {
                    num /= 2;
                    count *= 10;
                }
            }
            bin += count;
            ip_bin[i] = bin;
        }
    }
    for (var i = 0; i <= 3; i++) {
        bin = 0;
        count = 1;
        num = netmask_dec[i];
        if (num == 0) {
            netmask_bin[i] = bin;
        } else {
            while (num != 1) {
                if (num % 2 == 1) {
                    bin += count;
                    num /= 2;
                    num -= 0.5;
                    num = num.toFixed(0);
                    count *= 10;
                } else {
                    num /= 2;
                    count *= 10;
                }
            }
            bin += count;
            netmask_bin[i] = bin;
        }
    }
    for (var i = 3; i >= 0; i--) {
        if (cycle_stop == true) {
            break;
        }
        count = 0;
        num = netmask_bin[i];
        while (num != 0) {
            if (num % 10 == 1) {
                cycle_stop = true;
                octet = i;
                break;
            }
            count++;
            num /= 10;
            num = num.toFixed(0);
        }
    }
    for (var i = 0; i <= 3; i++) {
        if (i == octet) {
            count_backup = count;
            num = ip_bin[i];
            step = 10;
            while (count != 0) {
                num /= 10;
                num = num.toFixed(0);
                count--;
            }
            count = count_backup;
            while (count_backup != 0) {
                num *= 10;
                step *= 10;
                count_backup--;
            }
            network_bin[i] = num;
        } else if (i > octet) {
            network_bin[i] = 0;
        } else {
            network_bin[i] = ip_bin[i];
        }
    }
    for (var i = 0; i <= 3; i++) {
        if (i == octet) {
            count_backup = count;
            num = ip_bin[i];
            step = 1;
            num_backup = num;
            while (count != 0) {
                if (num_backup % 10 == 0) {
                    num += step;
                }
                num_backup /= 10;
                num_backup = num_backup.toFixed(0);
                step *= 10;
                count--;
            }
            broadcast_bin[i] = num;
        } else if (i > octet) {
            broadcast_bin[i] = 11111111;
        } else {
            broadcast_bin[i] = ip_bin[i];
        }
    }
    for (var i = 0; i <= 1; i++) {
        for (var k = 0; k <= 3; k++) {
            count = 8;
            step = 1;
            num_backup = 0;
            switch (i) {
            case 0:
                num = network_bin[k];
                break;
            case 1:
                num = broadcast_bin[k];
                break;
            }
            while (count != 0) {
                num_backup += num % 10 * step;
                num /= 10;
                num = num.toFixed(0);
                step *= 2;
                count--;
            }
            switch (i) {
            case 0:
                network_dec[k] = num_backup;
                break;
            case 1:
                broadcast_dec[k] = num_backup;
                break;
            }
        }
    }
    if (ban == 1) {
        if (ban_01[count_ip] == 0 && count_ip != 3) {
            temporary_ip[count_ip] = 0;
            temporary_netmask[count_ip] = types_of_masks[8];
            step_of_mask = 0;
            count_ip++;
            calculation();
            return;
        } else if (ban_01[count_ip] == 0 && count_ip == 3) {
            ban++;
            count_of_routing = 1;
            if (type_of_result == 1) {
                if ((ban_01[0] != 0 || ban_01[1] != 0 || ban_01[2] != 0 || ban_01[3] != 0) && (ban_02[0] != 255 || ban_02[1] != 255 || ban_02[2] != 255 || ban_02[3] != 255)) {
                    table[0].innerHTML += '<tr><td></td><td></td><td></td><td></td></tr>';
                }
            }
            for (var i = 0; i <= 2; i++) {
                temporary_ip[i] = ban_02[i];
                temporary_netmask[i] = 255;
            }
            temporary_ip[3] = ban_02[3] + 1;
            temporary_netmask[3] = 0;
            step_of_mask = 0;
            calculation();
            return;
        }
        if (broadcast_dec[count_ip] >= ban_01[count_ip]) {
            step_of_mask++;
            temporary_netmask[count_ip] = types_of_masks[step_of_mask];
        } else if (broadcast_dec[count_ip] < ban_01[count_ip]) {
            table[0].innerHTML += '<tr class="result"></tr>';
            if (type_of_result == 2) {
                tr_result[count_of_result++].innerHTML += '<td class="routing">route add ' + ip_dec[0] + '.' + ip_dec[1] + '.' + ip_dec[2] + '.' + ip_dec[3] + ' mask ' + netmask_dec[0] + '.' + netmask_dec[1] + '.' + netmask_dec[2] + '.' + netmask_dec[3] + ' 192.168.0.1 metric 1</td>';
            } else {
                tr_result[count_of_result].innerHTML += '<td class="number">' + count_of_number++ + '</td>';
                tr_result[count_of_result].innerHTML += '<td class="ip">' + ip_dec[0] + '.' + ip_dec[1] + '.' + ip_dec[2] + '.' + ip_dec[3] + '</td>';
                tr_result[count_of_result].innerHTML += '<td class="netmask">' + netmask_dec[0] + '.' + netmask_dec[1] + '.' + netmask_dec[2] + '.' + netmask_dec[3] + '</td>';
                tr_result[count_of_result++].innerHTML += '<td class="number">' + count_of_routing++ + '</td>';
            }
            step_of_mask = 0;
            if (broadcast_dec[count_ip] + 1 == ban_01[count_ip]) {
                if (count_ip == 3) {
                    ban++;
                    count_of_routing = 1;
                    if (type_of_result == 1) {
                        if ((ban_01[0] != 0 || ban_01[1] != 0 || ban_01[2] != 0 || ban_01[3] != 0) && (ban_02[0] != 255 || ban_02[1] != 255 || ban_02[2] != 255 || ban_02[3] != 255)) {
                            table[0].innerHTML += '<tr><td></td><td></td><td></td><td></td></tr>';
                        }
                    }
                    for (var i = 0; i <= 2; i++) {
                        temporary_ip[i] = ban_02[i];
                        temporary_netmask[i] = 255;
                    }
                    temporary_ip[3] = ban_02[3] + 1;
                    temporary_netmask[3] = 0;
                    step_of_mask = 0;
                    calculation();
                    return;
                }
                temporary_ip[count_ip] = broadcast_dec[count_ip];
                temporary_ip[count_ip] += 1;
                temporary_netmask[count_ip] = types_of_masks[8];
                count_ip++;
            } else {
                switch (count_ip) {
                case 0:
                    temporary_ip[0] = broadcast_dec[0] + 1;
                    temporary_netmask[0] = 0;
                    break;
                case 1:
                    temporary_ip[1] = broadcast_dec[1] + 1;
                    temporary_netmask[1] = 0;
                    break;
                case 2:
                    temporary_ip[2] = broadcast_dec[2] + 1;
                    temporary_netmask[2] = 0;
                    break;
                case 3:
                    temporary_ip[3] = broadcast_dec[3] + 1;
                    temporary_netmask[3] = 0;
                    break;
                }
            }
        }
        calculation();
        return;
    } else if (ban == 2) {
        if (ban_02[count_ip] == 255) {
            if (count_ip == 0) {
                ban++;
                type_of_result = 1;
                t_02 = performance.now();
                time = t_02 - t_01;
                block_00.innerHTML = '<p id="answer">Всё прошло успешно! Расчёт занял: ' + time.toFixed(1) + ' миллисекунд. </p>';
                return;
            }
            temporary_ip[count_ip] = 0;
            temporary_ip[count_ip - 1] += 1;
            temporary_netmask[count_ip] = types_of_masks[0];
            if (count_ip > 0) {
                temporary_netmask[count_ip - 1] = 0;
            }
            count_ip--;
            calculation();
            return;
        }
        for (var i = 0; i <= 3; i++) {
            if (network_dec[i] != temporary_ip[i]) {
                access = false;
            }
        }
        if (broadcast_dec[count_ip] >= ban_02[count_ip] && access == false) {
            step_of_mask++;
            temporary_netmask[count_ip] = types_of_masks[step_of_mask];
        } else if (broadcast_dec[count_ip] > ban_02[count_ip] && access == true) {
            table[0].innerHTML += '<tr class="result"></tr>';
            if (type_of_result == 2) {
                tr_result[count_of_result++].innerHTML += '<td class="routing">route add ' + ip_dec[0] + '.' + ip_dec[1] + '.' + ip_dec[2] + '.' + ip_dec[3] + ' mask ' + netmask_dec[0] + '.' + netmask_dec[1] + '.' + netmask_dec[2] + '.' + netmask_dec[3] + ' 192.168.0.1 metric 1</td>';
            } else {
                tr_result[count_of_result].innerHTML += '<td class="number">' + count_of_number++ + '</td>';
                tr_result[count_of_result].innerHTML += '<td class="ip">' + ip_dec[0] + '.' + ip_dec[1] + '.' + ip_dec[2] + '.' + ip_dec[3] + '</td>';
                tr_result[count_of_result].innerHTML += '<td class="netmask">' + netmask_dec[0] + '.' + netmask_dec[1] + '.' + netmask_dec[2] + '.' + netmask_dec[3] + '</td>';
                tr_result[count_of_result++].innerHTML += '<td class="number">' + count_of_routing++ + '</td>';
            }
            step_of_mask = 0;
            if (broadcast_dec[count_ip] == 255) {
                if (count_ip == 0) {
                    ban++;
                    type_of_result = 1;
                    t_02 = performance.now();
                    time = t_02 - t_01;
                    block_00.innerHTML = '<p id="answer">Всё прошло успешно! Расчёт занял: ' + time.toFixed(1) + ' миллисекунд. </p>';
                    return;
                }
                temporary_ip[count_ip] = 0;
                temporary_ip[count_ip - 1] += 1;
                temporary_netmask[count_ip] = types_of_masks[0];
                if (count_ip > 0) {
                    temporary_netmask[count_ip - 1] = 0;
                }
                count_ip--;
            } else {
                switch (count_ip) {
                case 0:
                    temporary_ip[0] = broadcast_dec[0] + 1;
                    temporary_netmask[0] = 0;
                    break;
                case 1:
                    temporary_ip[1] = broadcast_dec[1] + 1;
                    temporary_netmask[1] = 0;
                    break;
                case 2:
                    temporary_ip[2] = broadcast_dec[2] + 1;
                    temporary_netmask[2] = 0;
                    break;
                case 3:
                    temporary_ip[3] = broadcast_dec[3] + 1;
                    temporary_netmask[3] = 0;
                    break;
                }
            }
        }
        calculation();
        return;
    }
}
document.getElementById('button').onclick = begin;
document.onkeydown = function(event) {
    if (event.keyCode === 13 && event.ctrlKey === true) {
        type_of_result = 2;
        begin();
    } else if (event.keyCode === 13) {
        type_of_result = 1;
        begin();
    }
}