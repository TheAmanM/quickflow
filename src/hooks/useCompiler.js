import { createContext, useContext, useState } from "react";
import { useNodes, getOutgoers, useEdges } from "reactflow";
import moo from "moo";

// Create a context with an initial state
const CompilerContext = createContext();

/* export default function useCompiler() {
  const [terminalLines, setTerminalLines] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const nodes = useNodes();
  const edges = useEdges();

  /* const compile = (startNodeId) => {
    setTerminalLines(["Running flow"]);
    setIsRunning(true);

    let previousNode = nodes.find(function (node) {
      return node.id === startNodeId;
    });
    let currentNode = nextNode(previousNode);

    while (currentNode !== null) {
      switch (currentNode.type) {
        case "endNode":
          setTerminalLines((terminalLines) => [...terminalLines, "Terminated with exit code: 0"]);
          console.log(terminalLines);
          break;

        default:
          setTerminalLines((terminalLines) => [...terminalLines, 'Error: Missing "End" block']);
          setTerminalLines((terminalLines) => [...terminalLines, "Terminated with exit code: 1"]);
          break;
      }

      if (currentNode.type == "endNode") {
        setTerminalLines((terminalLines) => [...terminalLines, 'Error: Missing "End" block']);
        setTerminalLines((terminalLines) => [...terminalLines, "Terminated with exit code: 1"]);
        break;
      } else {
        setTerminalLines((terminalLines) => [...terminalLines, "Don't know what that is"]);
      }

      previousNode = currentNode;
      currentNode = nextNode(currentNode);
    }

    while (currentNode !== null) {
      setTerminalLines((terminalLines) => [...terminalLines, currentNode.type]);

      if (currentNode.type === "endNode") break;

      previousNode = currentNode;
      currentNode = nextNode(currentNode);
    }

    console.log(terminalLines);
    setIsRunning(false);
  }; */

/* const compile = (startNodeId) => {
    console.log("Click!");
    setTerminalLines(["a", "b", "c"]);
  }; */

/* const nextNode = (node) => {
    const outgoers = getOutgoers(node, nodes, edges);

    if (outgoers.length === 0) return null;
    return outgoers[0];
  }; */

/* const printToTerminal = (text) => {
    setTerminalLines((terminalLines) => {
      return [...terminalLines, text];
    });
  }; */

//   return { terminalLines, isRunning, compile };
// } */

export const useCompiler = () => {
  return useContext(CompilerContext);
};

export const CompilerStateProvider = ({ children }) => {
  const [terminalLines, setTerminalLines] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const nodes = useNodes();
  const edges = useEdges();

  /* while (currentNode !== null) {
      switch (currentNode.type) {
        case "endNode":
          setTerminalLines((terminalLines) => [
            ...terminalLines,
            "Terminated with exit code: 0",
          ]);
          console.log(terminalLines);
          break;

        default:
          setTerminalLines((terminalLines) => [
            ...terminalLines,
            'Error: Missing "End" block',
          ]);
          setTerminalLines((terminalLines) => [
            ...terminalLines,
            "Terminated with exit code: 1",
          ]);
          break;
      }

      if (currentNode.type == "endNode") {
        setTerminalLines((terminalLines) => [
          ...terminalLines,
          'Error: Missing "End" block',
        ]);
        setTerminalLines((terminalLines) => [
          ...terminalLines,
          "Terminated with exit code: 1",
        ]);
        break;
      } else {
        setTerminalLines((terminalLines) => [
          ...terminalLines,
          "Don't know what that is",
        ]);
      }

      previousNode = currentNode;
      currentNode = nextNode(currentNode);
    } */
  const compile = (startNodeId) => {
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
        const tokens = lexString(currentNode.data.trim());
        terminalLog(tokens.toString());
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

  return (
    <CompilerContext.Provider value={{ terminalLines, isRunning, compile }}>
      {children}
    </CompilerContext.Provider>
  );
};
