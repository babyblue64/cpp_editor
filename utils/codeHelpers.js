async function compileCode(sourceCode) {

    ApiUrl = "https://wandbox.org/api/compile.json";

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            code: sourceCode,
            compiler: "gcc-head",
            options: "c++17,cpp-no-pedantic",
            stdin: ""
        })
    }

    try {
        const response = await fetch(ApiUrl, requestOptions);
        const data = await response.json();
        return data.program_output;
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
}

const generateFullCode = (functionName, args, code) => {

    functionName = functionName.trim();
    args = args.trim();

    if (args.startsWith("[") && args.endsWith("]")) {
        const fullCode = `#include <bits/stdc++.h>\nusing namespace std;\n${code}\nint main() {\ncout<<${functionName}(${args.slice(1, -1)}); \nreturn 0;\n}`;
        return fullCode;
    } else {
        throw 'Wrong args template';
    }
}

module.exports = {
    compileCode,
    generateFullCode
}