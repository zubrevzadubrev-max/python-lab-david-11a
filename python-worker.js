'use strict';
importScripts('https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js');
let py;
async function init(){try{py=await loadPyodide({indexURL:'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/'});py.setStdout({batched:text=>postMessage({type:'stdout',text})});py.setStderr({batched:text=>postMessage({type:'stdout',text})});postMessage({type:'ready'})}catch(e){postMessage({type:'error',text:'Не удалось загрузить Python: '+e.message})}}
onmessage=async e=>{let globals;try{globals=py.toPy({});await py.runPythonAsync(e.data.code,{globals});postMessage({type:'done'})}catch(error){postMessage({type:'error',text:String(error)})}finally{if(globals)globals.destroy()}};init();
