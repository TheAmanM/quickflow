// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "input", "symbols": ["_", "assignmentExpression", "_"], "postprocess": (data) => data[1]},
    {"name": "input", "symbols": ["_", "conditionExpression", "_"], "postprocess": (data) => data[1]},
    {"name": "input", "symbols": ["_", "ioExpression", "_"], "postprocess": (data) => data[1]},
    {"name": "expression", "symbols": ["additive"], "postprocess": id},
    {"name": "expression", "symbols": ["concatenative"], "postprocess": id},
    {"name": "expression", "symbols": ["notExpression"], "postprocess": id},
    {"name": "expression", "symbols": ["bool"], "postprocess": id},
    {"name": "expression", "symbols": ["char"], "postprocess": id},
    {"name": "ioExpression$subexpression$1$string$1", "symbols": [{"literal":"I"}, {"literal":"N"}, {"literal":"P"}, {"literal":"U"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ioExpression$subexpression$1", "symbols": ["ioExpression$subexpression$1$string$1"]},
    {"name": "ioExpression$subexpression$1$string$2", "symbols": [{"literal":"O"}, {"literal":"U"}, {"literal":"T"}, {"literal":"P"}, {"literal":"U"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ioExpression$subexpression$1", "symbols": ["ioExpression$subexpression$1$string$2"]},
    {"name": "ioExpression", "symbols": ["ioExpression$subexpression$1", "_", "expression"], "postprocess": 
        (data) => {
            return {
                type: data[0][0] == "INPUT" ? "input" : "output",
                data: data[2]
            }
        }
                },
    {"name": "conditionExpression$string$1", "symbols": [{"literal":"I"}, {"literal":"F"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "conditionExpression$string$2", "symbols": [{"literal":"T"}, {"literal":"H"}, {"literal":"E"}, {"literal":"N"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "conditionExpression", "symbols": ["conditionExpression$string$1", "_", "comparativeExpression", "_", "conditionExpression$string$2"], "postprocess":   
        (data) => {
            return {
                type: "conditionExpression",
                data: data[2]
            }
        }
                },
    {"name": "conditionExpression$string$3", "symbols": [{"literal":"I"}, {"literal":"F"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "conditionExpression$string$4", "symbols": [{"literal":"T"}, {"literal":"H"}, {"literal":"E"}, {"literal":"N"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "conditionExpression", "symbols": ["conditionExpression$string$3", "_", "notExpression", "_", "conditionExpression$string$4"], "postprocess": 
        (data) => {
            return {
                type: "conditionExpression",
                data: data[2],
            }
        }
                },
    {"name": "comparativeExpression", "symbols": ["expression", "_", "comparisonOperator", "_", "expression"], "postprocess": 
        (data) => {
            return {
                type: "comparativeExpression",
                operator: data[2],
                left: data[0],
                right: data[4],
            }
        }
                },
    {"name": "assignmentExpression$string$1", "symbols": [{"literal":"<"}, {"literal":"-"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "assignmentExpression", "symbols": ["identifier", "_", "assignmentExpression$string$1", "_", "expression"], "postprocess":   
        (data) => {
            return {
                type: "assignmentExpression",
                assign: data[4],
                assignTo: data[0],
            }
        }
                },
    {"name": "assignmentExpression$string$2", "symbols": [{"literal":"<"}, {"literal":"-"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "assignmentExpression", "symbols": ["arrayElement", "_", "assignmentExpression$string$2", "_", "expression"], "postprocess":   
        (data) => {
            return {
                type: "assignmentExpression",
                assign: data[4],
                assignTo: data[0],
            }
        }
                },
    {"name": "notExpression$string$1", "symbols": [{"literal":"N"}, {"literal":"O"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "notExpression", "symbols": ["notExpression$string$1", "_", "orExpression"], "postprocess": 
        (data) => {
            return {
                type: "logicalExpression",
                operator: "NOT",
                data: data[2]
            }
        }
                },
    {"name": "notExpression", "symbols": ["orExpression"], "postprocess": id},
    {"name": "orExpression$string$1", "symbols": [{"literal":"O"}, {"literal":"R"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "orExpression", "symbols": ["orExpression", "_", "orExpression$string$1", "_", "andExpression"], "postprocess": 
        (data) => {
            return {
                type: "logicalExpression",
                operator: "OR",
                left: data[0],
                right: data[4],
            }
        }    
                },
    {"name": "orExpression", "symbols": ["andExpression"], "postprocess": id},
    {"name": "andExpression$string$1", "symbols": [{"literal":"A"}, {"literal":"N"}, {"literal":"D"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "andExpression", "symbols": ["andExpression", "_", "andExpression$string$1", "_", "unaryExpression"], "postprocess": 
        (data) => {
            return {
                type: "logicalExpression",
                operator: "AND",
                left: data[0],
                right: data[4],
            }
        }    
                },
    {"name": "andExpression", "symbols": ["unaryExpression"], "postprocess": id},
    {"name": "concatenative", "symbols": ["concatenative", "_", {"literal":"&"}, "_", "unaryExpression"], "postprocess": 
        (data) => {
            return {
                type: "concatenativeExpression",
                left: data[0],
                right: data[4],
            }
        }
                },
    {"name": "concatenative", "symbols": ["unaryExpression"], "postprocess": id},
    {"name": "additive", "symbols": ["additive", "_", /[+-]/, "_", "multiplicative"], "postprocess": 
        (data) => {
            return {
                type: "arithmeticExpression",
                operator: data[2],
                left: data[0],
                right: data[4]
            }
        }
                },
    {"name": "additive", "symbols": ["multiplicative"], "postprocess": id},
    {"name": "multiplicative", "symbols": ["multiplicative", "_", /[*/]/, "_", "unaryExpression"], "postprocess": 
        (data) => {
            return {
                type: "arithmeticExpression",
                operator: data[2],
                left: data[0],
                right: data[4]
            }
        }
                },
    {"name": "multiplicative", "symbols": ["unaryExpression"], "postprocess": id},
    {"name": "unaryExpression", "symbols": ["float"], "postprocess": id},
    {"name": "unaryExpression", "symbols": ["integer"], "postprocess": id},
    {"name": "unaryExpression", "symbols": [{"literal":"("}, "_", "additive", "_", {"literal":")"}], "postprocess": 
        (data) => data[2]
            },
    {"name": "unaryExpression", "symbols": [{"literal":"("}, "_", "notExpression", "_", {"literal":")"}], "postprocess": 
        (data) => data[2]
            },
    {"name": "unaryExpression", "symbols": ["comparativeExpression"], "postprocess": id},
    {"name": "unaryExpression", "symbols": ["bool"], "postprocess": id},
    {"name": "unaryExpression", "symbols": ["identifier"], "postprocess": id},
    {"name": "unaryExpression", "symbols": ["arrayElement"], "postprocess": id},
    {"name": "unaryExpression", "symbols": ["string"], "postprocess": id},
    {"name": "value", "symbols": ["bool"], "postprocess": id},
    {"name": "value", "symbols": ["float"], "postprocess": id},
    {"name": "value", "symbols": ["digits"], "postprocess": id},
    {"name": "value", "symbols": ["string"], "postprocess": id},
    {"name": "string", "symbols": [{"literal":"\""}, "characters", {"literal":"\""}], "postprocess":  (data) => {
            return {
                type: "string",
                data: data[1]
            }
        } },
    {"name": "char", "symbols": [{"literal":"'"}, "character", {"literal":"'"}], "postprocess":  (data) => {
            return {
                type: "char",
                data: data[1]
            }
        } },
    {"name": "arrayElement", "symbols": ["identifier", {"literal":"["}, "identifier", {"literal":"]"}], "postprocess": 
        (data) => {
            return {
                type: "arrayVariable",
                identifier: data[0],
                index: data[2],
            }
        }
            },
    {"name": "arrayElement", "symbols": ["identifier", {"literal":"["}, "digits", {"literal":"]"}]},
    {"name": "identifier$ebnf$1", "symbols": []},
    {"name": "identifier$ebnf$1$subexpression$1", "symbols": [/[A-Za-z_0-9]/], "postprocess": id},
    {"name": "identifier$ebnf$1", "symbols": ["identifier$ebnf$1", "identifier$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "identifier", "symbols": [/[A-Za-z_]/, "identifier$ebnf$1"], "postprocess":  
        (data, location, reject) => {
            const keywords = [
                "IF",
                "THEN",
                "ELSE",
                "INPUT",
                "OUTPUT",
                "DECLARE",
                "FOR",
                "NEXT",
                "STRING",
                "INTEGER",
                "BOOLEAN",
                "REAL",
                "CHAR",
                "ARRAY",
                "TRUE",
                "FALSE",
                "LEFT",
                "RIGHT",
                "MID",
                "LENGTH",
                "LCASE",
                "UCASE",
                "TO_UPPER",
                "TO_LOWER",
                "NUM_TO_STRING",
                "STRING_TO_NUM",
                "INT"]; 
            const newIdentifier = data[0] + data[1].join("");
            if (keywords.includes(newIdentifier)) {
                return reject;
            } else {
                return {
                    type: "variable",
                    identifier: newIdentifier
                }
            }
        } 
            },
    {"name": "characters", "symbols": ["character"], "postprocess": id},
    {"name": "characters", "symbols": ["character", "characters"], "postprocess": (data) => data[0].concat(data[1])},
    {"name": "character", "symbols": [/[^\"\\]/], "postprocess": id},
    {"name": "character", "symbols": [{"literal":"\\"}, "escape"], "postprocess": (data) => data[1]},
    {"name": "escape", "symbols": [{"literal":"\""}], "postprocess": () => '"'},
    {"name": "escape", "symbols": [{"literal":"\\"}], "postprocess": () => "\\"},
    {"name": "comparisonOperator", "symbols": [{"literal":">"}], "postprocess": id},
    {"name": "comparisonOperator", "symbols": [{"literal":"<"}], "postprocess": id},
    {"name": "comparisonOperator", "symbols": [{"literal":"="}], "postprocess": id},
    {"name": "comparisonOperator$string$1", "symbols": [{"literal":"<"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "comparisonOperator", "symbols": ["comparisonOperator$string$1"], "postprocess": id},
    {"name": "comparisonOperator$string$2", "symbols": [{"literal":">"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "comparisonOperator", "symbols": ["comparisonOperator$string$2"], "postprocess": id},
    {"name": "comparisonOperator$string$3", "symbols": [{"literal":"<"}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "comparisonOperator", "symbols": ["comparisonOperator$string$3"], "postprocess": id},
    {"name": "bool$subexpression$1$string$1", "symbols": [{"literal":"T"}, {"literal":"R"}, {"literal":"U"}, {"literal":"E"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "bool$subexpression$1", "symbols": ["bool$subexpression$1$string$1"]},
    {"name": "bool$subexpression$1$string$2", "symbols": [{"literal":"F"}, {"literal":"A"}, {"literal":"L"}, {"literal":"S"}, {"literal":"E"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "bool$subexpression$1", "symbols": ["bool$subexpression$1$string$2"]},
    {"name": "bool", "symbols": ["bool$subexpression$1"], "postprocess":  (data) => {
            return {
                type: "boolean",
                data: data[0][0] === "TRUE"
            }
        } },
    {"name": "float$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "float$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "float", "symbols": ["float$ebnf$1", "digits", {"literal":"."}, "digits"], "postprocess":  (data) => {
            return {
                type: "float",
                data: Number(data.join(""))
            }
        } },
    {"name": "integer$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "integer$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "integer", "symbols": ["integer$ebnf$1", "digits"], "postprocess":  (data) => {
            return {
                type: "integer",
                data: Number(data.join(""))
            }
        } },
    {"name": "digits", "symbols": ["digit"], "postprocess": id},
    {"name": "digits", "symbols": ["digit", "digits"], "postprocess": (data) => data[0] + data[1]},
    {"name": "digit", "symbols": [/[0-9]/], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[ \t]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]}
]
  , ParserStart: "input"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
