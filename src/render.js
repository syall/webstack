/** @function Template Engine
 * @description Inspiration from {@link https://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line}.
 * @param {string} template - Path to Template File.
 * @param {Object} data - Template Data.
 * @returns {string} Templated File.
 */
function render(template, data = {}) {

    // Templating
    const html = require('fs').readFileSync(template).toString();
    const re = /<%(.+?)%>/g;
    const reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g;

    // Code Generation
    let code = 'with(obj) { var r=[];\n';
    let cursor = 0;
    let match = null;
    while (match = re.exec(html)) {
        add(html.slice(cursor, match.index), false);
        add(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor), false);
    code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, ' ');

    // Apply Code
    return new Function('obj', code).apply(data, [data]);

    // Add/Execute Line
    function add(line, javascript) {
        javascript
            ? (code += line.match(reExp)
                ? `${line}\n`
                : `r.push(${line});\n`)
            : (code += (line != '')
                ? `r.push("${line.replace(/"/g, '\\"')}");\n`
                : '');
    }

}
module.exports = render;
