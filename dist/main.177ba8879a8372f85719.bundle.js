!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){const n=document.getElementById("cases"),o=document.getElementById("cases-today"),r=document.getElementById("deaths"),a=document.getElementById("deaths-today"),d=document.getElementById("recoveries"),c=document.getElementById("recoveries-today"),l=document.getElementById("admitted"),u=document.getElementById("fatality"),i=document.getElementById("recovery"),s=(document.getElementById("source"),document.querySelectorAll(".date-updated"));function y(e){const t=document.getElementById("total-cases"),n=document.getElementById("load-total-cases");!0===e?(t.style.display="block",n.style.display="none"):(n.style.display="flex",t.style.display="none")}!async function(){y(!1);const e=await fetch("https://coronavirus-ph-api.herokuapp.com/total"),{data:t}=await e.json();n.innerHTML=t.cases,r.innerHTML=t.deaths,d.innerHTML=t.recoveries,l.innerHTML=t.admitted,u.innerHTML=t.fatality_rate,i.innerHTML=t.recovery_rate,a.innerHTML=t.deaths_today,c.innerHTML=t.recoveries_today,o.innerHTML=t.cases_today,s.forEach(e=>e.innerHTML=t.last_update),y(!0)}()}]);