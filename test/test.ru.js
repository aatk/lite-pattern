const {renderCallback} = require("../index");

let template = `<div>Начало шаблона</div>

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
`;

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

