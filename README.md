# О проекте

Данный проект является шаблонизатором для систем.
За аналог был взят шаблонизатор twig, но с поправкой на использование кириллической раскладке клавиатуры.

Так определители шаблона twig в виде `{{ }}` был заменен на `[[ ]]`, а `{% %}` на `[% %]`
Также была добавлена поддержка кириллицы в командах

Также добавлена возможность добавлять команды шаблонизатора и дополнительные функции

Установка:
```bash
npm install lite-pattern --save
```

# Основное использование

### Пример Шаблона:
```html
<div>Начало шаблона</div>

<!-- Поддержка условий "if" -->
[%if (param1===param2)%]

<!-- Поддержка функций расширения по аналогии с twig используя "|" --> 
[[param1|uppercase|split("")|join("_")]] 
[%endif%]

<!-- Поддержка определения переменных и JS функций -->
[%let json = JSON.stringify(paramArray,null,4)%]

<!-- Аналог простого "echo" --> 
<div>[[json]]</div>

<div>TEST LET</div>
[% let test = param %]

<div>TEST IF</div>
[%if (test==="test param")%]
    <div>TEST FOR</div>
    <!-- Поддержка циклов "for ... of" --> 
    [%for (element of paramArray)%]
        <div>TEST ECHO</div>
        <p>[[element]]</p>
    [%endfor%]
    <div>TEST ENDIF</div>
[%endif%]
<div>Конец шаблона</div>
``` 

### Вызов шаблонизатора:

```javascript
//Подключаем шаблонизатор
const {renderCallback} = require("lite-pattern");

//Присваиваем шаблон в переменную
let template = `...шаблон...`

//Подготавливаем переменные для шаблона
let tempalteParams = {
    param1: "hello world",
    param2: "hello world",
    param: "test param",
    paramArray: ["1", "2", "3", "4"]
};

//Определяем callback функцию которая будет вызвана после генерации шаблона 
const callback = (resolve = undefined, error = undefined) => {
    const exit = {
        result: resolve,
        error: error
    };
    console.log(exit.result);
}

//Вызываем рендер функции, передав шаблон, его переменные, и callback функцию
renderCallback(template, tempalteParams, callback)

//ЛИБО ЧЕРЕЗ PROMISE
render(template, tempalteParams)
    .then(result => {
        //    
    })
    .catch(error => {
        //
    });

//КАК АЛЬТЕРНАТИВА
try {
    let result = await render(template, tempalteParams);
}
catch (error) {
    //
}
```



### Результат работы шаблонизатора (exit.result):
```html
<div>Начало шаблона</div>

<!-- Поддержка условий "if" -->

<!-- Поддержка функций расширения по аналогии с twig используя "|" --> 
H_E_L_L_O_ _W_O_R_L_D 

<!-- Поддержка определения переменных и JS функций -->

<!-- Аналог простого "echo" --> 
<div>[
    "1",
    "2",
    "3",
    "4"
]</div>

<div>TEST LET</div>

<div>TEST IF</div>
    <div>TEST FOR</div>
    <!-- Поддержка циклов "for ... of" --> 
            <div>TEST ECHO</div>
        <p>1</p>
            <div>TEST ECHO</div>
        <p>2</p>
            <div>TEST ECHO</div>
        <p>3</p>
            <div>TEST ECHO</div>
        <p>4</p>
        <div>TEST ENDIF</div>
<div>Конец шаблона</div>
```

### Промежуточный код 

В информационных целях, во что трансформируется шаблон перед выполнением js кода
```javascript
result = async () => {const stdOut=[];
stdOut.push(`<div>Начало шаблона</div>

<!-- Поддержка условий "if" -->
`);
if (param1===param2) {
stdOut.push(`
<!-- Поддержка функций расширения по аналогии с twig используя "|" --> 
${functions.join(functions.split(await functions.uppercase(param1),""),"_")} 
`);
}
stdOut.push(`
<!-- Поддержка определения переменных и JS функций -->
`);
let json = JSON.stringify(paramArray,null,4);
stdOut.push(`
<!-- Аналог простого "echo" --> 
<div>${json}</div>

<div>TEST LET</div>
`);
let test = param;
stdOut.push(`
<div>TEST IF</div>
`);
if (test==="test param") {
stdOut.push(`    <div>TEST FOR</div>
    <!-- Поддержка циклов "for ... of" --> 
    `);
for (const element of paramArray) {
stdOut.push(`        <div>TEST ECHO</div>
        <p>${element}</p>
    `);
}
stdOut.push(`    <div>TEST ENDIF</div>
`);
}
stdOut.push(`<div>Конец шаблона</div>
`);

return stdOut.join("");}
```



## Особенности

### Поддержка кириллицы

Пример шаблона выше можно написать на кириллице (пример):
```html
<div>Начало шаблона</div>

<!-- Поддержка условий "if" -->
[%Если (перем1===перем2)%]

<!-- Поддержка функций расширения по аналогии с twig используя "|" --> 
[[перем1|ВРег|Разделить("")|Соединить("_")]] 
[%КонецЕсли%]

<!-- Поддержка определения переменных и JS функций -->
[%Перем джисон = JSON.stringify(массив,null,4)%]

<!-- Аналог простого "echo" --> 
<div>[[джисон]]</div>

<div>TEST LET</div>
[% Перем тестПР = параметр %]

<div>TEST IF</div>
[%Если (тестПР==="test param")%]
    <div>TEST FOR</div>
    <!-- Поддержка циклов "for ... of" --> 
    [%Цикл (элемент из массив)%]
        <div>TEST ECHO</div>
        <p>[[элемент]]</p>
    [%КонецЦикла%]
    <div>TEST ENDIF</div>
[%КонецЕсли%]
<div>Конец шаблона</div>
```

### Вызов шаблонизатора:

```javascript
const {renderCallback} = require("lite-pattern");

let template = `...шаблон...`

let tempalteParams = {
    перем1: "hello world",
    перем2: "hello world",
    параметр: "test param",
    массив: ["1", "2", "3", "4"]
};

const callback = (resolve = undefined, error = undefined) => {
    const exit = {
        result: resolve,
        error: error
    };
    console.log(exit.result);
}

renderCallback(template, tempalteParams, callback)
``` 


# Расширение шаблонизатора:

### Подключение собственных расширений для шаблонизатора

```javascript
const {appendNewFunctions, appendNewCommands} = require("lite-pattern");

const newCommand = () => {
    //Пример смотрите ниже
    return [{
       input: "регулярное выражение",
       output: `end]]let :var = :value;\n[[start`,
       params: "функция параметров в команде"
    }]
}
appendNewCommands(newCommand);

const newFunction = () => {
    //Пример смотрите ниже
    return {
       name: ["имя", "представление"],
       func: "ссылка на функцию для рендера"
    }
}
appendNewFunctions(newFunction);
```

### Пример создания команды

Файл: ./command/let.cmd.js
```javascript
//Регулярное выражение для анализа в шаблоне
const reLet = /\[%\s*(let|перем)\s*(?<var>[а-яa-z]{1}[а-яa-z0-9.]+)\s*=\s*(?<value>[\.\S]+)\s*%\]\s?/giu;
//Регулярное выражение для определения параметров (необязательно, но очень полезно)
const param = /^(?<var>[_a-zа-я]{1}[a-zа-я0-9]*)(\.[a-zа-я0-9]*)?$/miug

//Функция анализа и возврата параметров шаблона (пишется индивидуально)
//protectParams - переменные которые инициализируются в самом шаблоне и не требуют внешнего определения
//params - переменные которые требуется передать шаблону
//
//Парамерт "match" - содержит совпадение которое определил шаблонизатор
const analyzeParams = (match) => {
    let protectParams = [match.groups.var];
    let value = match.groups.value;
    let findParams = [...value.matchAll(param)];
    let params = findParams.map(param => param.groups.var);
    return {protect: protectParams, params};
}

//Функция которая будет вызвана перед вставкой кода
// !!! Данный пример не является реальным, для информативности использования посмотрите команду (файл) command/echo.cmd.js !!! 
const parseFunc = (groups, context) => {
    const value = groups.value;
    groups.value = (""+value).toLowerCase();
    return groups; 
}

//Возвращается массив объектов
//input - регулярное выражение поиска в шаблоне
//output - JS выражение которое будет на которое будет заменено (используйте "end]] ...выражение... [[start" для экранизации кода js)
//prePut (необязательный) - функция вызывается перед вставкой сгенерированного кода js в шаблон, позволяет переопределить и расширить функционал команды
//params (необязательный) - функция возвращающая параметры шаблона  
module.exports = [{
    input: reLet,
    output: `end]]let :var = :value;\n[[start`,
    prePut: parseFunc,
    params: analyzeParams
}]
```

### Пример создания функций

Файл: ./functions/uppercase.js
```javascript
//Функция которая будет вызываться 
const func = async (innerData = "") => {
    return (''+innerData).toUpperCase();
}

//Возвращается объект 
//name - возможные именами функций в шаблоне
//func - функция которая будет вызвана при рендере
module.exports = {
    name: ["uppercase", "врег"],
    func: func
}
```

# Получение используемых параметров в шаблоне:

Иногда для использования шаблонизатора в админпанелях или определения предварительных параметров и присвоения значений по умолчанию, требуется получить динамически параметры из шаблона.

Для этого используется функция ``getParams``

### Пример использования
```javascript
//Подключаем шаблонизатор
const {getParams} = require("lite-pattern");

//Присваиваем шаблон в переменную
let template = `...шаблон...`

let params = getParams(template);
console.log(params);
```

Даст результат:

```javascript
[ 'param1', 'paramArray', 'param2', 'param' ]
```
В результате будут только те переменные которые требуется передать в шаблон.

Переменные которые инициализируются в шаблоне и в нем используются выводиться не будут.
