(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(13),o=t.n(c),u=t(14),i=t(2),l=function(e){var n=e.searchTerm,t=e.handleSearchTermChange;return r.a.createElement("div",null,"filter shown with:",r.a.createElement("input",{value:n,onChange:t}))},s=function(e){var n=e.persons,t=e.handlePersonDeletion;return r.a.createElement("ul",null,function(e){return e.map((function(e){return r.a.createElement("li",{key:e.name},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return function(e){var n=e.name,a=e.id;window.confirm("Delete ".concat(n," ?"))&&t({name:n,id:a})}(e)}},"Delete"))}))}(n))},m=function(e){var n=e.addContact,t=e.newName,a=e.handleNameChange,c=e.newNumber,o=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name:",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number:",r.a.createElement("input",{value:c,onChange:o})),r.a.createElement("button",{type:"submit"},"add"))},d=(t(20),function(e){var n=e.message,t=e.status;return r.a.createElement("div",{className:"".concat(t," notification")},n)}),f=t(3),h=t.n(f),b="/api/persons",p=function(){Object(a.useEffect)((function(){h.a.get(b).then((function(e){return e.data})).then((function(e){c(e)}))}),[]);var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(""),f=Object(i.a)(o,2),p=f[0],v=f[1],E=Object(a.useState)(""),g=Object(i.a)(E,2),w=g[0],C=g[1],j=Object(a.useState)(""),O=Object(i.a)(j,2),k=O[0],N=O[1],S=Object(a.useState)({}),y=Object(i.a)(S,2),D=y[0],T=y[1],P=function(){v(""),N("")},I=function(e,n){T({message:e,status:n}),setTimeout((function(){T({})}),5e3)},J=t.filter((function(e){return e.name.toLowerCase().includes(w.toLowerCase())}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),!!Object.keys(D).length&&r.a.createElement(d,{message:D.message,status:D.status}),r.a.createElement(l,{searchTerm:w,handleSearchTermChange:function(e){C(e.target.value)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(m,{addContact:function(e){e.preventDefault();var n=t.find((function(e){return e.name===p})),a="".concat(p," is already added to phonebook, replace the old number with the new one?");if(n&&window.confirm(a)){var r=n.id,o=Object(u.a)({},n,{number:k});(function(e,n){return h.a.put("".concat(b,"/").concat(e),n).then((function(e){return e.data}))})(r,o).then((function(e){c(t.map((function(n){return n.id!==r?n:e}))),I("".concat(o.name," phone number has been modified"),"success"),P()})).catch((function(){I("Information from ".concat(o.name," has already been removed from server"),"error")}))}else{var i;(i={name:p,number:k},h.a.post(b,i).then((function(e){return e.data}))).then((function(e){c(t.concat(e)),I("".concat(e.name," has been added to phonebook"),"success"),P()})).catch((function(e){console.log(e,e.message,e.response,e.response.data),I(e.response.data,"error"),P()}))}},newName:p,handleNameChange:function(e){v(e.target.value)},newNumber:k,handleNumberChange:function(e){N(e.target.value)}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(s,{handlePersonDeletion:function(e){var n=e.id,a=e.name;(function(e){return h.a.delete("".concat(b,"/").concat(e))})(n).then((function(){var e=t.filter((function(e){return e.id!==n}));c(e),I("".concat(a," has been deleted from phonebook"),"success")}))},persons:J}))};o.a.render(r.a.createElement(p,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.f12f4c6f.chunk.js.map