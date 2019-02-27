var array = ["ПРОГРАММИСТ", "ПРОГРАММА", "ИНКАПСУЛЯЦИЯ", "НАСЛЕДОВАНИЕ", "ПОЛИМОРФИЗМ", "ПАТТЕРН", "РЕКУРСИЯ", "КОД",
"КЛАСС", "ПЕРЕМЕННАЯ", "МАССИВ", "БИТ", "БАЙТ", "БАЗА ДАННЫХ", "ЗАПРОС"];

var random = Math.floor(Math.random() * array.length);

var word0 = array[random];

var length = word0.length;

var word1 = "";

for(i = 0; i < length; i++) {
    if(word0.charAt(i) == " ") {
        word1 = word1 + " ";
    } else {
        word1 = word1 + "-";
    }
}

const soundYes = new Audio("sound/sound_yes.wav");

const soundNo = new Audio("sound/sound_no.wav");

var letters = ["А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О",
"П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я"];

let count = 0;

let number = 0;

// Вывод слова по буквам
function printLetter() {
	document.getElementById("block").innerHTML = word1;
};

window.onload = start;

// Вывод букв
function start() {
    var content = "";
    for(i = 0; i <= 32; i++) {
        var element = "let" + i;
        content = content + '<div class="letter" onclick="check('+ i +')" id="'+ element +'">' + letters[i] + '</div>';
        if((i + 1) % 6 == 0) {
            content = content + '<div style="clear:both;"></div>';
        }
    }
    document.getElementById("alphabet").innerHTML = content;
    printLetter();
};

String.prototype.contains = function(a, b) {
    if(a > this.length - 1) {
        return this.toString();
    } else {
        return this.substr(0, a) + b + this.substr(a + 1);
    }
}

// Проверка на правильность введённых букв загаданного слова и вывод результатов
function check(y) {
    var correct = false;
    for(i = 0; i < length; i++) {
        if(word0.charAt(i) == letters[y]) {
            word1 = word1.contains(i, letters[y]);
            correct = true;
        }
    }
    if(correct == true) {
        soundYes.play();
        var element = "let" + y;
        document.getElementById(element).style.background = "#000000";
        document.getElementById(element).style.color = "#00FF00";
        document.getElementById(element).style.border = "5px solid #00FF00";
        document.getElementById(element).style.cursor = "default";
        printLetter();
        if(count == 0) {
            var img = "picture_after/picture_0.png";
            document.getElementById("gallows").innerHTML = '<img src="'+ img +'" alt="" />';
        }
        if(count == 1) {
            var img = "picture_after/picture_1.png";
            document.getElementById("gallows").innerHTML = '<img src="'+ img +'" alt="" />';
        }
        if(count == 2) {
            var img = "picture_after/picture_2.png";
            document.getElementById("gallows").innerHTML = '<img src="'+ img +'" alt="" />';
        }
        if(count == 3) {
            var img = "picture_after/picture_3.png";
            document.getElementById("gallows").innerHTML = '<img src="'+ img +'" alt="" />';
        }
        if(count == 5) {
            var img = "picture_after/picture_4.png";
            document.getElementById("gallows").innerHTML = '<img src="'+ img +'" alt="" />';
        }
    } else {
        soundNo.play();
        var element = "let" + y;
        document.getElementById(element).style.background = "#000000";
        document.getElementById(element).style.color = "#FF0000";
        document.getElementById(element).style.border = "5px solid #FF0000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick", ";");
        count++;
        var img = "picture_befor/picture_"+ count + ".png";
        document.getElementById("gallows").innerHTML = '<img src="'+ img +'" alt="" />';
    }
    if(word0 == word1) {
        document.getElementById("alphabet").innerHTML = "ВЫ ПОБЕДИЛИ!" + '<p>ЗАГАДАННОЕ СЛОВО: ' + word0 + '</p>'
        + '<p><span class="reset" onclick="location.reload();">СЫГРАЕТЕ ЕЩЁ РАЗ?</span></p>';
    }
    if(count >= 6) {
        document.getElementById("alphabet").innerHTML = "ВЫ ПРОИГРАЛИ!" + '<p>ЗАГАДАННОЕ СЛОВО: ' + word0 + '</p>'
        + '<p><span class="reset" onclick="location.reload();">СЫГРАЕТЕ ЕЩЁ РАЗ?</span></p>';
    }
};
