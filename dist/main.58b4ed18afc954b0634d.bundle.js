!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){const n=document.getElementById("cases"),a=document.getElementById("cases-today"),o=document.getElementById("deaths"),r=document.getElementById("deaths-today"),d=document.getElementById("recoveries"),c=document.getElementById("recoveries-today"),l=document.getElementById("admitted"),u=document.getElementById("fatality"),i=document.getElementById("recovery"),s=(document.getElementById("source"),document.querySelectorAll(".date-updated"));function y(e){const t=document.getElementById("total-cases"),n=document.getElementById("load-total-cases");!0===e?(t.style.display="block",n.style.display="none"):(n.style.display="flex",t.style.display="none")}!async function(){y(!1);const e=await fetch("https://coronavirus-ph-api.herokuapp.com/total"),t=await e.json();n.innerHTML=t.data.cases,o.innerHTML=t.data.deaths,d.innerHTML=t.data.recoveries,l.innerHTML=t.data.admitted,u.innerHTML=t.data.fatality_rate,i.innerHTML=t.data.recovery_rate,r.innerHTML=t.data.deaths_today,c.innerHTML=t.data.recoveries_today,a.innerHTML=t.data.cases_today,s.forEach(e=>e.innerHTML=t.data.last_update),y(!0)}()}]);