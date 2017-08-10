var cycle_stop;
var input_01_test;
var input_02_test;
var num_01;
var num_02;
var step;
var count_01;
var count_02;
var count_ip;
var sum;
var bin;
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
var wildcard;

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
        } else if (i == 3 && input_01.length == 0 && dots == 3) {
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
        wildcard = '+255.255.255.255';
        break;
    case '1':
        netmask_dec = [128, 0, 0, 0];
        wildcard = '+127.255.255.255';
        break;
    case '2':
        netmask_dec = [192, 0, 0, 0];
        wildcard = '+63.255.255.255';
        break;
    case '3':
        netmask_dec = [224, 0, 0, 0];
        wildcard = '+31.255.255.255';
        break;
    case '4':
        netmask_dec = [240, 0, 0, 0];
        wildcard = '+15.255.255.255';
        break;
    case '5':
        netmask_dec = [248, 0, 0, 0];
        wildcard = '+7.255.255.255';
        break;
    case '6':
        netmask_dec = [252, 0, 0, 0];
        wildcard = '+3.255.255.255';
        break;
    case '7':
        netmask_dec = [254, 0, 0, 0];
        wildcard = '+1.255.255.255';
        break;
    case '8':
        netmask_dec = [255, 0, 0, 0];
        wildcard = '+0.255.255.255';
        break;
    case '9':
        netmask_dec = [255, 128, 0, 0];
        wildcard = '+0.127.255.255';
        break;
    case '10':
        netmask_dec = [255, 192, 0, 0];
        wildcard = '+0.63.255.255';
        break;
    case '11':
        netmask_dec = [255, 224, 0, 0];
        wildcard = '+0.31.255.255';
        break;
    case '12':
        netmask_dec = [255, 240, 0, 0];
        wildcard = '+0.15.255.255';
        break;
    case '13':
        netmask_dec = [255, 248, 0, 0];
        wildcard = '+0.7.255.255';
        break;
    case '14':
        netmask_dec = [255, 252, 0, 0];
        wildcard = '+0.3.255.255';
        break;
    case '15':
        netmask_dec = [255, 254, 0, 0];
        wildcard = '+0.1.255.255';
        break;
    case '16':
        netmask_dec = [255, 255, 0, 0];
        wildcard = '+0.0.255.255';
        break;
    case '17':
        netmask_dec = [255, 255, 128, 0];
        wildcard = '+0.0.127.255';
        break;
    case '18':
        netmask_dec = [255, 255, 192, 0];
        wildcard = '+0.0.63.255';
        break;
    case '19':
        netmask_dec = [255, 255, 224, 0];
        wildcard = '+0.0.31.255';
        break;
    case '20':
        netmask_dec = [255, 255, 240, 0];
        wildcard = '+0.0.15.255';
        break;
    case '21':
        netmask_dec = [255, 255, 248, 0];
        wildcard = '+0.0.7.255';
        break;
    case '22':
        netmask_dec = [255, 255, 252, 0];
        wildcard = '+0.0.3.255';
        break;
    case '23':
        netmask_dec = [255, 255, 254, 0];
        wildcard = '+0.0.1.255';
        break;
    case '24':
        netmask_dec = [255, 255, 255, 0];
        wildcard = '+0.0.0.255';
        break;
    case '25':
        netmask_dec = [255, 255, 255, 128];
        wildcard = '+0.0.0.127';
        break;
    case '26':
        netmask_dec = [255, 255, 255, 192];
        wildcard = '+0.0.0.63';
        break;
    case '27':
        netmask_dec = [255, 255, 255, 224];
        wildcard = '+0.0.0.31';
        break;
    case '28':
        netmask_dec = [255, 255, 255, 240];
        wildcard = '+0.0.0.15';
        break;
    case '29':
        netmask_dec = [255, 255, 255, 248];
        wildcard = '+0.0.0.7';
        break;
    case '30':
        netmask_dec = [255, 255, 255, 252];
        wildcard = '+0.0.0.3';
        break;
    case '31':
        netmask_dec = [255, 255, 255, 254];
        wildcard = '+0.0.0.1';
        break;
    case '32':
        netmask_dec = [255, 255, 255, 255];
        wildcard = '+0.0.0.0';
        break;
    }
    sum = 0;
    octet = -1;
    cycle_stop = false;
    for (var i = 0; i <= 3; i++) {
        ip_bin[i] = Number(ip_dec[i].toString(2));
        netmask_bin[i] = Number(netmask_dec[i].toString(2));
    }
    for (var i = 0; i <= 3; i++) {
        if (netmask_bin[i] == 0) {
            sum += 8;
        } else {
            bin = netmask_bin[i];
            while (bin != 0) {
                if (bin % 10 == 0) {
                    sum++;
                }
                bin /= 10;
                bin = bin.toFixed(0);
            }
        }
    }
    while (sum != 0) {
        number_of_hosts *= 2;
        sum--;
    }
    for (var i = 3; i >= 0; i--) {
        if (cycle_stop == true) {
            break;
        }
        count_01 = 0;
        num_01 = netmask_bin[i];
        while (num_01 != 0) {
            if (num_01 % 10 == 1) {
                cycle_stop = true;
                octet = i;
                break;
            }
            count_01++;
            num_01 /= 10;
            num_01 = num_01.toFixed(0);
        }
    }
    for (var i = 0; i <= 3; i++) {
        if (i == octet) {
            count_02 = count_01;
            num_01 = ip_bin[i];
            step = 10;
            while (count_01 != 0) {
                num_01 /= 10;
                num_01 = num_01.toFixed(0);
                count_01--;

            }
            count_01 = count_02;
            while (count_02 != 0) {
                num_01 *= 10;
                step *= 10;
                count_02--;
            }
            network_bin[i] = num_01;
        } else if (i > octet) {
            network_bin[i] = 0;
        } else {
            network_bin[i] = ip_bin[i];
        }
    }
    for (var i = 0; i <= 3; i++) {
        if (i == octet) {
            count_02 = count_01;
            num_01 = ip_bin[i];
            step = 1;
            num_02 = num_01;
            while (count_01 != 0) {
                if (num_02 % 10 == 0) {
                    num_01 += step;
                }
                num_02 /= 10;
                num_02 = num_02.toFixed(0);
                step *= 10;
                count_01--;
            }

            broadcast_bin[i] = num_01;
        } else if (i > octet) {
            broadcast_bin[i] = 11111111;
        } else {
            broadcast_bin[i] = ip_bin[i];
        }
    }
    for (var i = 0; i <= 3; i++) {
        network_dec[i] = parseInt(network_bin[i], 2);
        broadcast_dec[i] = parseInt(broadcast_bin[i], 2);
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
    out_01.innerHTML = '<table></table>';
    table = document.getElementsByTagName('table');
    table[0].innerHTML += '<tr><td class="name">Адрес</td><td class="value">' + ip_dec[0] + '.' + ip_dec[1] + '.' + ip_dec[2] + '.' + ip_dec[3] + '</td></tr>';
    table[0].innerHTML += '<tr><td class="name">Маска подсети</td><td class="value">' + netmask_dec[0] + '.' + netmask_dec[1] + '.' + netmask_dec[2] + '.' + netmask_dec[3] + '</td></tr>';
    table[0].innerHTML += '<tr><td class="name">До последнего ip в подсети</td><td class="value">' + wildcard + '</td></tr>';
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
