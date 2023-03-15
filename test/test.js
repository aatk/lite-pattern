const {renderCallback, getParams} = require("../index");

let template = `<div>Начало шаблона</div>

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
`;

let tempalteParams = {
    param1: "hello world",
    param2: "hello world",
    param: "test param",
    paramArray: ["1", "2", "3", "4"]
};

let params = getParams(template);
console.log(params);

const callback = (resolve = undefined, error = undefined) => {
    const exit = {
        result: resolve,
        error: error
    };
    console.log(exit.result);
}

renderCallback(template, tempalteParams, callback)

