var Esprima = require("esprima");

var globalEnvironment = {
    log: function (obj) { console.log("Log: "+JSON.stringify(obj)); }
};

function evalString (string) {
    var program = Esprima.parse(string);
    return evalCode(program, Object.assign({},globalEnvironment));
}

function evalCode (code, environment) {
    switch (code.type) {
        case "Program":
            return evalSequence(code.body, environment);
        case "ExpressionStatement":
            return evalCode(code.expression, environment);
        case "BinaryExpression":
            return callOperator(code.operator, evalCode(code.left,environment), evalCode(code.right, environment));
        case "CallExpression":
            return callFunction(evalCode(code.callee, environment), code.arguments.map(function (a) {return evalCode(a,environment);}));
        case "SequenceExpression":
            return evalSequence(code.expressions, environment);
        case "MemberExpression":
            var obj = evalCode(code.object,environment);
            var value = obj[code.property.name];
            return isFunction(value)? value.bind(obj) : value;
        case "AssignmentExpression":
            return assignExpression(code.operator, code.left, evalCode(code.right,environment), environment);
        case "ArrowFunctionExpression":
            return createFunction(code.params, code.body, environment);
        case "ObjectExpression":
            return createObject(code.properties,environment);
        case "Identifier":
            return environment[code.name];
        case "Literal":
            return code.value;
        default:
            throw "Cannot eval type "+code.type;
    }
}

function evalSequence(seq,environment) {
    var results = seq.map(function (s) {return evalCode(s,environment)});
    return results[results.length-1];
}

function isFunction (obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
}

function createFunction (params, body, environment) {
    var lexicalNames = params.map(function (a) {return a.name});
    return function () {
        var env = [].slice.call(arguments).reduce(function (env, arg, ix) {
            var name = lexicalNames[ix];
            if (name) env[name] = arg;
            return env;
        }, Object.assign({}, environment));

        return evalCode(body, env);
    }
}

function createObject (properties, environment) {
    return properties.reduce(function (obj, p) {
        obj[p.key.name] = evalCode(p.value, environment);
        return obj;
    }, {});
}

function callOperator (operator, left, right) {
    switch (operator) {
        case "+": return left + right;
        case "-": return left - right;
        case "*": return left * right;
        case "/": return left / right;
        default: throw "Unknown operator "+operator;
    }
}

function callFunction (callee, arguments){
    return callee.apply(undefined, arguments);
}

function assignExpression (operator, left, right, environment) {
    switch (operator) {
        case "=":
            switch (left.type) {
                case "Identifier":
                    environment[left.name] = right;
                    return right;
                default:
                    throw "LValue "+left.type+" not implemented"
            }
    }
}

module.exports = {
    evalCode: evalCode,
    evalString: evalString,
    parse: Esprima.parse.bind(Esprima)
};