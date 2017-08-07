var cycle_stop;
var input_01_test;
var input_02_test;
var num;
var num_backup;
var bin;
var step;
var count;
var count_backup;
var count_ip;
var sum;
var octet;
var dots;
var number_of_hosts;
var number_of_addresses;
var ip_bin = [];
var ip_dec = [];
var netmask_bin = [];
var netmask_dec = [];
var network_bin = [];
var network_dec = [];
var broadcast_bin = [];
var broadcast_dec = [];
var hostmin = [];
var hostmax = [];
var out_01 = document.getElementById('block_01');
var table;
var input_01;
var input_02;

function data_test() {
    out_01.innerHTML = '';
    input_01_test = true;
    input_02_test = true;
    dots = 0;
    number_of_hosts = 1;
    input_01 = document.getElementById('inp_01').value;
    input_02 = document.getElementById('inp_02').value;
    if (input_02 === undefined || input_02 === '') {
        input_02 = document.getElementById('select_list').value;
    }
    for (var i = 0; i <= 3; i++) {
        for (var k = 0; k <= 3; k++) {
            if (input_01.charAt(k) == '.' || input_01.charAt(k) == ',' || input_01.charAt(k) == '/') {
                ip_dec[i] = Number(input_01.substring(0, k));
                input_01 = input_01.slice(k + 1);
                dots++;
                break;
            }
        }
        if (i == 3 && input_01.length > 0 && dots == 3) {
            ip_dec[i] = Number(input_01);
        }
        else if (i == 3 && input_01.length == 0 && dots == 3) {
            return;
        }
    }
    if (dots == 3) {
        for (var i = 0; i <= 3; i++) {
            if (ip_dec[i] < 0 || ip_dec[i] > 255) {
                input_01_test = false;
                break;
            }
        }
    } else {
        input_01_test = false;
    }
    if (input_02 < 0 || input_02 > 32) {
        input_02_test = false;
    }
    if (input_01_test == true && input_02_test == true && input_02 != '' && input_02 != undefined) {
        calculation();
    } else {
        out_01.innerHTML = '';
    }
}

function calculation() {
    switch (input_02) {
    case '0':
        netmask_dec = [0, 0, 0, 0];
        break;
    case '1':
        netmask_dec = [128, 0, 0, 0];
        break;
    case '2':
        netmask_dec = [192, 0, 0, 0];
        break;
    case '3':
        netmask_dec = [224, 0, 0, 0];
        break;
    case '4':
        netmask_dec = [240, 0, 0, 0];
        break;
    case '5':
        netmask_dec = [248, 0, 0, 0];
        break;
    case '6':
        netmask_dec = [252, 0, 0, 0];
        break;
    case '7':
        netmask_dec = [254, 0, 0, 0];
        break;
    case '8':
        netmask_dec = [255, 0, 0, 0];
        break;
    case '9':
        netmask_dec = [255, 128, 0, 0];
        break;
    case '10':
        netmask_dec = [255, 192, 0, 0];
        break;
    case '11':
        netmask_dec = [255, 224, 0, 0];
        break;
    case '12':
        netmask_dec = [255, 240, 0, 0];
        break;
    case '13':
        netmask_dec = [255, 248, 0, 0];
        break;
    case '14':
        netmask_dec = [255, 252, 0, 0];
        break;
    case '15':
        netmask_dec = [255, 254, 0, 0];
        break;
    case '16':
        netmask_dec = [255, 255, 0, 0];
        break;
    case '17':
        netmask_dec = [255, 255, 128, 0];
        break;
    case '18':
        netmask_dec = [255, 255, 192, 0];
        break;
    case '19':
        netmask_dec = [255, 255, 224, 0];
        break;
    case '20':
        netmask_dec = [255, 255, 240, 0];
        break;
    case '21':
        netmask_dec = [255, 255, 248, 0];
        break;
    case '22':
        netmask_dec = [255, 255, 252, 0];
        break;
    case '23':
        netmask_dec = [255, 255, 254, 0];
        break;
    case '24':
        netmask_dec = [255, 255, 255, 0];
        break;
    case '25':
        netmask_dec = [255, 255, 255, 128];
        break;
    case '26':
        netmask_dec = [255, 255, 255, 192];
        break;
    case '27':
        netmask_dec = [255, 255, 255, 224];
        break;
    case '28':
        netmask_dec = [255, 255, 255, 240];
        break;
    case '29':
        netmask_dec = [255, 255, 255, 248];
        break;
    case '30':
        netmask_dec = [255, 255, 255, 252];
        break;
    case '31':
        netmask_dec = [255, 255, 255, 254];
        break;
    case '32':
        netmask_dec = [255, 255, 255, 255];
        break;
    }
    sum = 0;
    octet = -1;
    cycle_stop = false;
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
            sum += 8;
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
            while (bin != 0) {
                if (bin % 10 == 0) {
                    sum++;
                }
                bin /= 10;
                bin = bin.toFixed(0);
            }
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
    for (var i = 0; i <= 2; i++) {
        hostmin[i] = network_dec[i];
        hostmax[i] = broadcast_dec[i];
    }
    if (netmask_dec[3] == 255 || netmask_dec[3] == 254) {
        hostmin[3] = network_dec[3];
        hostmax[3] = broadcast_dec[3];
    } else {
        hostmin[3] = network_dec[3] + 1;
        hostmax[3] = broadcast_dec[3] - 1;
    }
    while (sum != 0) {
        number_of_hosts *= 2;
        sum--;
    }
    out_01.innerHTML = '<table></table>';
    table = document.getElementsByTagName('table');
    table[0].innerHTML += '<tr><td class="name">Адрес</td><td class="value">' + ip_dec[0] + '.' + ip_dec[1] + '.' + ip_dec[2] + '.' + ip_dec[3] + '</td></tr>';
    table[0].innerHTML += '<tr><td class="name">Маска подсети</td><td class="value">' + netmask_dec[0] + '.' + netmask_dec[1] + '.' + netmask_dec[2] + '.' + netmask_dec[3] + '</td></tr>';
    table[0].innerHTML += '<tr><td></td><td></td></tr>';
    table[0].innerHTML += '<tr><td class="name">Адрес сети</td><td class="value">' + network_dec[0] + '.' + network_dec[1] + '.' + network_dec[2] + '.' + network_dec[3] + '</td></tr>';
    table[0].innerHTML += '<tr><td class="name">Широковещательный адрес</td><td class="value">' + broadcast_dec[0] + '.' + broadcast_dec[1] + '.' + broadcast_dec[2] + '.' + broadcast_dec[3] + '</td></tr>';
    table[0].innerHTML += '<tr><td></td><td></td></tr>';
    table[0].innerHTML += '<tr><td class="name">Начальный адрес</td><td class="value">' + hostmin[0] + '.' + hostmin[1] + '.' + hostmin[2] + '.' + hostmin[3] + '</td></tr>';
    table[0].innerHTML += '<tr><td class="name">Конечный адрес</td><td class="value">' + hostmax[0] + '.' + hostmax[1] + '.' + hostmax[2] + '.' + hostmax[3] + '</td></tr>';
    table[0].innerHTML += '<tr><td></td><td></td></tr>';
    if (netmask_dec[3] == 255 || netmask_dec[3] == 254) {
        number_of_addresses = number_of_hosts;
        table[0].innerHTML += '<tr><td class="name">Количество хостов</td><td class="value">' + number_of_hosts + '</td></tr>';
        table[0].innerHTML += '<tr><td class="name">Количество адресов</td><td class="value">' + number_of_addresses + '</td></tr>';
    } else {
        number_of_addresses = number_of_hosts - 2;
        table[0].innerHTML += '<tr><td class="name">Количество хостов</td><td class="value">' + number_of_hosts + '</td></tr>';
        table[0].innerHTML += '<tr><td class="name">Количество адресов</td><td class="value">' + number_of_addresses + '</td></tr>';
    }
}

function change_01() {
    document.getElementById('select_list').value = this.value;
    data_test();
}

function change_02() {
    document.getElementById('inp_02').value = this.value;
    data_test();
}
document.getElementById('inp_01').oninput = data_test;
document.getElementById('inp_02').oninput = change_01;
document.getElementById('select_list').oninput = change_02;