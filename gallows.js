/**
 * Массив слов.
 * @type {array}
 */
let array = ["ПРОГРАММИСТ", "ПРОГРАММА", "ИНКАПСУЛЯЦИЯ", "НАСЛЕДОВАНИЕ", "ПОЛИМОРФИЗМ", "ПАТТЕРН", "РЕКУРСИЯ", "КОД",
    "КЛАСС", "ПЕРЕМЕННАЯ", "МАССИВ", "БИТ", "БАЙТ", "БАЗА ДАННЫХ", "ЗАПРОС", "МАКРОС",
    "ФОРМА", "ФУНКЦИЯ", "ДАННЫЕ", "КОНСТАНТА", "ГРАФ", "ДЕРЕВО", "МАССИВ", "МАТРИЦА",
    "КОМПИЛЯТОР"
];

/**
 * Размер массива слов, который в процессе игры будет уменьшаться.
 * @type {number}
 */
let aL;

/**
 * Размер массива слов, который в процессе игры будет оставаться неизменным.
 * @constant {number}
 * @default
 */
const ususus = array.length;

/**
 * Рандомно выбранное слово из массива слов.
 * @type {string}
 */
let random;

/**
 * Загаданное слово.
 * @type {string}
 */
let word0;

/**
 * Длина загадонного слова.
 * @type {number}
 */
let length;

/**
 * Слово, введённое игроком.
 * @type {string}
 */
let word1;


if (sessionStorage.getItem('aL') == null) {
    aL = ususus;
    random = Math.floor(Math.random() * aL);
    word0 = array[random];
    length = word0.length;
    word1 = "";
}

if (sessionStorage.getItem('aL') > 0) {
    aL = sessionStorage.getItem('aL');
    for (i = 0; i < aL; i++) {
        array[i] = sessionStorage['arr[' + i + ']'];
    }
    random = Math.floor(Math.random() * aL);
    word0 = array[random];
    length = word0.length;
    word1 = "";
}

if (sessionStorage.getItem('aL') == 0) {
    aL = ususus;
    random = Math.floor(Math.random() * aL);
    word0 = array[random];
    length = word0.length;
    word1 = "";
}

for (i = 0; i < length; i++) {
    if (word0.charAt(i) == " ") {
        word1 = word1 + " ";
    } else {
        word1 = word1 + "-";
    }
}

/**
 * Звук при правильно угаданной букве.
 * @constant {object}
 */
const soundYes = new Audio("sound/sound_yes.wav");

/**
 * Звук при неправильно угаданной букве.
 * @constant {object}
 */
const soundNo = new Audio("sound/sound_no.wav");

/**
 * Массив букв.
 * @type {array}
 */
var letters = ["А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О",
    "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я"
];

/**
 * Количество прав на ошибку.
 * @type {number}
 */
let count = 0;

/**
 * Количество угаданных слов.
 * @type {number}
 */
let correctCount;

if (sessionStorage.getItem('correctCount') == null) {
    correctCount = 0;
}
if (sessionStorage.getItem('correctCount') > 0) {
    correctCount = sessionStorage.getItem('correctCount');
}

if (sessionStorage.getItem('correctCount') == ususus) {
    correctCount = 0;
}

/**
 * Вывод загадонного слова по буквам.
 * @return {void}
 */
function printLetter() {
    document.getElementById("block").innerHTML = word1;
};

/**
 * Загрузка всей страницы со всеми её ресурсами.
 */
window.onload = start;

/**
 * Вывод блока с буквами.
 * @return {void}
 */
function start() {
    var content = "";
    for (i = 0; i <= 32; i++) {
        var element = "let" + i;
        content = content + '<div class="letter" onclick="check(' + i + ')" id="' + element + '">' + letters[i] + '</div>';
        if ((i + 1) % 6 == 0) {
            content = content + '<div style="clear:both;"></div>';
        }
    }
    document.getElementById("alphabet").innerHTML = content;
    printLetter();
};

/**
 * Выставление букв на нужную позицию в загаданном слове.
 * @function wordLetters
 * @param {number} a позиция букв загаданного слова
 * @param {number} b позиция буквы, которую ввёл пользователь
 * @return {string} Строка с буквами, которые ввёл пользователь.
 */
String.prototype.contains = function (a, b) {
    if (a > this.length - 1) {
        return this.toString();
    } else {
        return this.substr(0, a) + b + this.substr(a + 1);
    }
}

/**
 * Удаление угаданного слова из массива слов по индексу.
 * @param {array} array массив слов
 * @param {number} index индекс угаданного слова
 * @returns {array} Копия массива без удалённого угаданного слова.
 */
function removeByIndex(array, index) {
    return array.filter(function (_element, _index) {
        return index != _index;
    });
}

/**
 * Проверка на правильность введённых букв загаданного слова и вывод результатов.
 * @param {number} y буква загаданного слова
 * @returns {void}
 */
function check(y) {
    var correct = false;
    for (i = 0; i < length; i++) {
        if (word0.charAt(i) == letters[y]) {
            word1 = word1.contains(i, letters[y]);
            correct = true;
        }
    }
    if (correct == true) {
        soundYes.play();
        var element = "let" + y;
        document.getElementById(element).style.background = "#000000";
        document.getElementById(element).style.color = "#00FF00";
        document.getElementById(element).style.border = "5px solid #00FF00";
        document.getElementById(element).style.cursor = "default";
        printLetter();
        if (count == 0) {
            var img = "picture_after/picture_0.png";
            document.getElementById("gallows").innerHTML = '<img src="' + img + '" height="450" width="400" />';
        }
        if (count == 1) {
            var img = "picture_after/picture_1.png";
            document.getElementById("gallows").innerHTML = '<img src="' + img + '" height="450" width="400" />';
        }
        if (count == 2) {
            var img = "picture_after/picture_2.png";
            document.getElementById("gallows").innerHTML = '<img src="' + img + '" height="450" width="400" />';
        }
        if (count == 3) {
            var img = "picture_after/picture_3.png";
            document.getElementById("gallows").innerHTML = '<img src="' + img + '" height="450" width="400" />';
        }
        if (count == 5) {
            var img = "picture_after/picture_4.png";
            document.getElementById("gallows").innerHTML = '<img src="' + img + '" height="450" width="400" />';
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
        var img = "picture_befor/picture_" + count + ".png";
        document.getElementById("gallows").innerHTML = '<img src="' + img + '" height="450" width="400" />';
    }
    if (word0 == word1) {
        correctCount++;
        sessionStorage.setItem('correctCount', correctCount);

        aL--;
        sessionStorage.setItem('aL', aL);

        array.splice(array.indexOf(word0), 1);
        for (i = 0; i < aL; i++) {
            sessionStorage['arr[' + i + ']'] = array[i];
        }

        if (correctCount == ususus) {
            document.getElementById("alphabet").innerHTML = "ВЫ ОТГАДАЛИ ВСЕ СЛОВА!" + '<p>ЗАГАДАННОЕ СЛОВО: ' + word0 + '</p>' +
                '<p>ОТГАДАНО СЛОВ: ' + correctCount + ' ВСЕГО СЛОВ: ' + ususus + '</p>' +
                '<p><a href="start.html" class="reset">ВЕРНУТСЯ В ГЛАВНОЕ МЕНЮ!</a></p>';
        } else {
            document.getElementById("alphabet").innerHTML = "ВЫ ПОБЕДИЛИ!" + '<p>ЗАГАДАННОЕ СЛОВО: ' + word0 + '</p>' +
                '<p>ОТГАДАНО СЛОВ: ' + correctCount + ' ВСЕГО СЛОВ: ' + ususus + '</p>' +
                '<p><span class="reset" onclick="location.reload();">СЫГРАЕТЕ ЕЩЁ РАЗ?</span></p>';
        }
    }
    if (count >= 6) {
        document.getElementById("alphabet").innerHTML = "ВЫ ПРОИГРАЛИ!" + '<p>ЗАГАДАННОЕ СЛОВО: ' + word0 + '</p>' +
            '<p>ОТГАДАНО СЛОВ: ' + correctCount + ' ВСЕГО СЛОВ: ' + ususus + '</p>' +
            '<p><span class="reset" onclick="location.reload();">СЫГРАЕТЕ ЕЩЁ РАЗ?</span></p>';
    }
};