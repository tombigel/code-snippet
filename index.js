'use strict'
// require the highlight.js library including all languages
const hljs = require('highlight.js');
// require inline-css library to comp class defs into the html
const inlineCss = require('inline-css');
// Use spaces and not tabs
hljs.configure({tabReplace: '  '})
// highlight code
const highlightedCode = hljs.fixMarkup(hljs.highlight('javascript', `
$w.onReady(function () {
	previewCode($w('#html1'), code1);
	previewCode($w('#html2'), code2);
});

function previewCode(htmlComp, snippet) {
	htmlComp.onMessage(({data = {}} = {}) => {
		if (data.type === 'ready' && data.value === true) {
			htmlComp.postMessage({type: 'code_update', value: snippet});
		}
	});
}
`).value)
// template
const html = `
<style type="text/css">
    .hljs {
    font-size: 16px; line-height: 1.2; font-family: Menlo, Monaco, "Courier New", monospace; tab-size: 2;
    display: block; overflow-x: auto; padding: .5em; color: #333; background: #f8f8f8;}
    .hljs-comment, .hljs-quote {color: #998; font-style: italic;}
    .hljs-keyword, .hljs-selector-tag, .hljs-subst {color: #333; font-weight: bold;}
    .hljs-number, .hljs-literal, .hljs-variable, .hljs-template-variable, .hljs-tag .hljs-attr {color: #FF9900;}
    .hljs-string, .hljs-doctag {color: #d14;}
    .hljs-title, .hljs-section, .hljs-selector-id {color: #0084C1; font-weight: bold;}
    .hljs-subst {font-weight: normal;}
    .hljs-type, .hljs-class .hljs-title {color: #458; font-weight: bold;}
    .hljs-tag, .hljs-name, .hljs-attribute {color: #000080; font-weight: normal;}
    .hljs-regexp, .hljs-link {color: #009926;}
    .hljs-symbol, .hljs-bullet {color: #990073;}
    .hljs-built_in, .hljs-builtin-name {color: #0086b3;}
    .hljs-meta {color: #999; font-weight: bold;}
    .hljs-deletion {background: #fdd;}
    .hljs-addition {background: #dfd;}
    .hljs-emphasis {font-style: italic;}
    .hljs-strong {font-weight: bold;}
</style>
<pre class="hljs">${highlightedCode}</pre>
`
// result
inlineCss(html, {url: '/', removeHtmlSelectors: true}).then((resolved, error) => {
    error ? console.log(error) : console.log(resolved);
});