import { createContext, memo, useContext, useState } from "react";
import { useNodes, getOutgoers, useEdges } from "reactflow";
import nearley from "nearley";
import grammar from "./grammar";

import moo, { error } from "moo";

// Create a context with an initial state
const CompilerContext = createContext();

export const useCompiler = () => {
  return useContext(CompilerContext);
};

export const CompilerStateProvider = ({ children }) => {
  const [terminalLines, setTerminalLines] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  let memory = {};

  const [showInputField, setShowInputField] = useState(false);
  let inputValue = "";

  const setInputValue = (newValue) => {
    inputValue = newValue;
  };

  const handleEnter = (data) => {
    if (data !== "") {
      setInputValue(data);
      setShowInputField(false);
    }
  };

  const setMemory = (newMemory) => {
    memory = newMemory;
  };

  const nodes = useNodes();
  const edges = useEdges();

  /*const compile = (startNodeId) => {
    setTerminalLines(["Running flow"]);
    setIsRunning(true);

    let currentNode = nodes.find(function (node) {
      return node.id === startNodeId;
    });
    currentNode = nextNode(currentNode);
    let containsEndFlow = false;

    while (currentNode !== null && !containsEndFlow) {
      if (currentNode.type === "endNode") {
        containsEndFlow = true;
        terminalLog("Terminated with exit code: 0");
      } else if (currentNode.type === "processNode") {
        // const tokens = lexString(currentNode.data.trim());
        // terminalLog(tokens.toString());
        const tree = generateAST(currentNode.data.trim());
        console.log("Generated tree!");
        console.log(tree);
      } else {
        terminalLog(currentNode.type);
      }

      currentNode = nextNode(currentNode);
    }

    if (!containsEndFlow) {
      terminalLog('Error: Missing "End" block');
      terminalLog("Terminated with exit code: 1");
    }

    setIsRunning(false);
  }; */

  const compile = (startNodeId) => {
    setTerminalLines([]);
    setIsRunning(true);
    setMemory({});

    let currentNode = nodes.find(function (node) {
      return node.id === startNodeId;
    });
    let foundEndNode = false;
    let runningFlow = true;

    while (currentNode !== null && runningFlow) {
      if (currentNode.type === "startNode") {
        // terminalLog("Running flow...");
      } else if (currentNode.type === "endNode") {
        terminalLog("Flow terminated successfully. Exit code: 0");
        foundEndNode = true;
        runningFlow = false;
      } else if (currentNode.type === "processNode") {
        const tree = generateAST(currentNode.data);
        if (tree.type === "error") {
          terminalLog(tree.message);
          runningFlow = false;
        } else if (tree.type === "assignmentExpression") {
          console.log(tree);
          terminalLog("Parse successful!");

          const newExpression = evaluate(tree.assign);
          console.log(newExpression);

          let assignTo = tree.assignTo;
          if (assignTo.type === "arrayVariable") {
            let indexResult = evaluate(assignTo.index);
            if (indexResult.type === "error") {
              terminalLog(indexResult.message);
              runningFlow = false;
              break;
              // Check if this causes endFlow problem
            } else if (indexResult.type !== "integer") {
              terminalLog(
                `Error: Can not cast type ${indexResult.type} to type integer.`
              );
              runningFlow = false;
              break;
            } else {
              assignTo.index = indexResult;
              tree.assignTo = assignTo;
            }
          }

          if (newExpression.type === "error") {
            console.log("Error:", newExpression.message);
          } else {
            const assignResult = assign(
              tree.assignTo,
              newExpression.data,
              newExpression.type
            );
            console.log(assignResult);

            if (assignResult.type === "error") {
              terminalLog(assignResult.message);
              runningFlow = false;
            } else {
              console.log("SUCCESS!!");
            }
          }
        } else {
          //TODO: Handle invalid type
          terminalLog(`Error: Invalid node of type ${currentNode.type}`);
          runningFlow = false;
        }
      } else if (currentNode.type === "ioNode") {
        const tree = generateAST(currentNode.data);
        if (tree.type === "error") {
          terminalLog(tree.message);
          runningFlow = false;
        } else if (tree.type == "input") {
          terminalLog(
            `Note: Nodes of type "Input" are currently not supported.`
          );
        } else if (tree.type == "output") {
          console.log("OUTPUT");
          const result = evaluate(tree.data);
          console.log(result);
          if (result.type === "error") {
            terminalLog(result.message);
            runningFlow = false;
          } else {
            terminalLog(result.data.toString());
          }
        } else {
          terminalLog(`Error: Invalid node of type ${currentNode.type}`);
          runningFlow = false;
        }
      } else {
        console.log(`Error: Unexpected node of type ${currentNode.type}`);
        runningFlow = false;
      }

      currentNode = nextNode(currentNode);
    }

    if (!foundEndNode) {
      terminalLog("Error: Expected EndNode. Terminted with exit code: 1");
    }
    setIsRunning(false);
    console.warn(memory);
    setMemory({});
  };

  const nextNode = (node) => {
    const outgoers = getOutgoers(node, nodes, edges);

    if (outgoers.length === 0) return null;
    return outgoers[0];
  };

  const terminalLog = (line) => {
    setTerminalLines((terminalLines) => [...terminalLines, line]);
  };

  const lexString = (line) => {
    let lexer = moo.compile({
      Keyword: ["IF", "THEN", "ELSE", "INPUT", "OUTPUT"],
      // Add to InvalidKeyword
      InvalidKeyword: ["DECLARE", "FOR", "NEXT"],
      Datatype: ["STRING", "INTEGER", "BOOLEAN", "REAL", "CHAR", "ARRAY"],
      Functions: [
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
        "INT",
      ],

      LParen: "(",
      RParen: ")",
      LBracket: "[",
      RBracket: "]",

      NotEqualTo: "<>",
      GreaterThanOrEqualTo: ">=",
      LessThanOrEqualTo: "<=",
      GreaterThan: ">",
      LessThan: "<",
      EqualTo: "=",

      Multiply: "*",
      Plus: "+",
      Minus: "+",
      Divide: "/",
      IntegerDivide: "DIV",
      Modulo: "MOD",
      Ampersand: "&",

      And: "AND",
      Or: "OR",
      Not: "NOT",

      Colon: ":",

      Space: /[ \t]+/,
      Number: /0|[1-9][0-9]*/,
      String: /"(?:\\["\\]|[^\n"\\])*"/,
      Identifier: /[a-zA-Z0-9]+/,

      // NL:      { match: /\n/, lineBreaks: true },
    });

    lexer.reset(line);
    const tokens = Array.from(lexer);
    console.log(tokens);

    return tokens;
  };

  const assign = (assignTo, data, dataType) => {
    console.log(assignTo);
    console.log(data);
    console.log(dataType);

    const identifier = assignTo.identifier;
    const identifierData = memory[identifier];

    if (identifierData === undefined) {
      let newMemory = JSON.parse(JSON.stringify(memory));
      if (assignTo.type === "arrayVariable") {
        let newArray = [];
        newArray[assignTo.index] = data;
        newMemory[identifier] = {
          type: "arrayVariable",
          exactType: dataType,
          value: newArray,
        };
      } else {
        newMemory[identifier] = {
          type: dataType,
          value: data,
        };
      }
      setMemory(newMemory);
      return {
        type: "success",
      };
    } else if (assignTo.type === "arrayVariable") {
      if (assignTo.exactType === dataType) {
        let newMemory = JSON.parse(JSON.stringify(memory));
        let newArray = newMemory[identifier];
        let index = assignTo.index;

        newArray[index] = data;
        newMemory[identifier] = newArray;
        setMemory(newMemory);
      } else {
        return {
          type: "error",
          message: `Error: Can not cast type ${dataType} to type ${identifierData.exactType}`,
        };
      }
    } else if (identifierData.type === dataType) {
      let newMemory = JSON.parse(JSON.stringify(memory));
      newMemory[identifier] = {
        type: dataType,
        data: data,
      };
      setMemory(newMemory);
      return {
        type: "success",
      };
    } else {
      return {
        type: "error",
        message: `Error: Can not cast type ${dataType} to type ${identifierData.type}`,
      };
    }

    /* if (identifierData === undefined) {
      let newMemory = JSON.parse(JSON.stringify(memory));
      newMemory[identifier.name] = {
        type: dataType,
        value: data,
      };
      setMemory(newMemory);
      return {
        type: "success",
      };
    } else if (
      identifierData.type !== dataType ||
      (identifierData.type === "array" && identifierData.exactType !== dataType)
    ) {
      let errorMessage = "";
      if (identifierData.type === "array") {
        errorMessage = `Error: Can not cast type ${dataType} to type ${identifier.type} of type ${identifier.exactType}.`;
      } else {
        errorMessage = `Error: Can not cast type ${dataType} to type ${identifier.type}.`;
      }
      return {
        type: "error",
        message: errorMessage,
      };
    } else {
      let newMemory = JSON.parse(JSON.stringify(memory));
      newMemory[identifier] = {
        type: dataType,
        value: data,
      };
      setMemory(newMemory);
      return {
        type: "success",
      };
    } */
  };

  const generateAST = (line) => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    try {
      parser.feed(line);
      const results = [...new Set(parser.results.map(JSON.stringify))].map(
        JSON.parse
      );
      if (results.length > 1) {
        terminalLog(
          `Warning: Pseudocode compiler returned mutliple results ${parser.results.length}.`
        );
        console.log("results");
        console.log(results);
      }
      return results[0];
    } catch (e) {
      console.error(`Error: Unexpected token "${e.token.value}".`);
      return {
        type: "error",
        message: `Error: Unexpected token "${e.token.value}".`,
      };
    }
  };

  const evaluate = (ast) => {
    if (ast.type === "error") {
      return ast;
    } else if (
      ["integer", "float", "boolean", "char", "string"].includes(ast.type)
    ) {
      return ast;
    } else if (ast.type === "variable") {
      if (memory[ast.identifier] === undefined) {
        return {
          type: "error",
          message: `Error: Attempted to access ${ast.identifier} which has not been initialized.`,
        };
      } else {
        return {
          type: memory[ast.identifier].type,
          data: memory[ast.identifier].value,
        };
      }
    } else if (ast.type === "arithmeticExpression") {
      const left = evaluate(ast.left);
      if (left.type === "error") {
        return left;
      } else if (!["integer", "float"].includes(left.type)) {
        return {
          type: "error",
          message: `Error: Can not cast type ${left.type} to type integer | real.`,
        };
      }
      const right = evaluate(ast.right);
      if (right.type === "error") {
        return right;
      } else if (!["integer", "float"].includes(right.type)) {
        return {
          type: "error",
          message: `Error: Can not cast type ${right.type} to type integer | real.`,
        };
      }

      if (ast.operator === "+") {
        const result = left.data + right.data;
        return {
          data: result,
          type: Number.isInteger(result) ? "integer" : "float",
        };
      } else if (ast.operator === "-") {
        const result = left.data - right.data;
        return {
          data: result,
          type: Number.isInteger(result) ? "integer" : "float",
        };
      } else if (ast.operator === "*") {
        const result = left.data * right.data;
        return {
          data: result,
          type: Number.isInteger(result) ? "integer" : "float",
        };
      } else if (ast.operator === "/") {
        if (right.data === 0) {
          return { type: "error", message: "Error: Can not divide by zero." };
        } else {
          const result = left.data / right.data;
          return {
            data: result,
            type: Number.isInteger(result) ? "integer" : "float",
          };
        }
      }
    } else if (ast.type === "concatenativeExpression") {
      const left = evaluate(ast.left);
      if (left.type === "error") {
        return left;
      } else if (left.type !== "string") {
        return {
          type: "error",
          message: `Error: Can not cast type ${left.type} to type string.`,
        };
      }
      const right = evaluate(ast.right);
      if (right.type === "error") {
        return right;
      } else if (right.type !== "string") {
        return {
          type: "error",
          message: `Error: Can not cast type ${right.type} to type string.`,
        };
      }

      return { type: "string", data: left.data.concat(right.data) };
    } else {
      return { type: "error", message: "Error: Invalid syntax." };
    }
  };

  return (
    <CompilerContext.Provider
      value={{
        terminalLines,
        isRunning,
        compile,
        showInputField,
        handleEnter,
        setInputValue,
      }}
    >
      {children}
    </CompilerContext.Provider>
  );
};
