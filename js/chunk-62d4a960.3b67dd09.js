(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-62d4a960"],{"0789":function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return h})),n.d(t,"a",(function(){return d}));n("99af");var i=n("d9f7");function a(){for(var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length,i=new Array(n>1?n-1:0),a=1;a<n;a++)i[a-1]=arguments[a];return(e=Array()).concat.apply(e,[t].concat(i))}function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top center 0",n=arguments.length>2?arguments[2]:void 0;return{name:e,functional:!0,props:{group:{type:Boolean,default:!1},hideOnLeave:{type:Boolean,default:!1},leaveAbsolute:{type:Boolean,default:!1},mode:{type:String,default:n},origin:{type:String,default:t}},render:function(t,n){var r="transition".concat(n.props.group?"-group":""),o={props:{name:e,mode:n.props.mode},on:{beforeEnter:function(e){e.style.transformOrigin=n.props.origin,e.style.webkitTransformOrigin=n.props.origin}}};return n.props.leaveAbsolute&&(o.on.leave=a(o.on.leave,(function(e){return e.style.position="absolute"}))),n.props.hideOnLeave&&(o.on.leave=a(o.on.leave,(function(e){return e.style.display="none"}))),t(r,Object(i["a"])(n.data,o),n.children)}}}function o(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"in-out";return{name:e,functional:!0,props:{mode:{type:String,default:n}},render:function(n,a){return n("transition",Object(i["a"])(a.data,{props:{name:e},on:t}),a.children)}}}var s=n("ade3"),l=n("80d2"),c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t?"width":"height",i="offset".concat(Object(l["q"])(n));return{beforeEnter:function(e){e._parent=e.parentNode,e._initialStyle=Object(s["a"])({transition:e.style.transition,overflow:e.style.overflow},n,e.style[n])},enter:function(t){var a=t._initialStyle;t.style.setProperty("transition","none","important"),t.style.overflow="hidden";var r="".concat(t[i],"px");t.style[n]="0",t.offsetHeight,t.style.transition=a.transition,e&&t._parent&&t._parent.classList.add(e),requestAnimationFrame((function(){t.style[n]=r}))},afterEnter:r,enterCancelled:r,leave:function(e){e._initialStyle=Object(s["a"])({transition:"",overflow:e.style.overflow},n,e.style[n]),e.style.overflow="hidden",e.style[n]="".concat(e[i],"px"),e.offsetHeight,requestAnimationFrame((function(){return e.style[n]="0"}))},afterLeave:a,leaveCancelled:a};function a(t){e&&t._parent&&t._parent.classList.remove(e),r(t)}function r(e){var t=e._initialStyle[n];e.style.overflow=e._initialStyle.overflow,null!=t&&(e.style[n]=t),delete e._initialStyle}},u=(r("carousel-transition"),r("carousel-reverse-transition"),r("tab-transition"),r("tab-reverse-transition"),r("menu-transition"),r("fab-transition","center center","out-in"),r("dialog-transition"),r("dialog-bottom-transition"),r("dialog-top-transition"),r("fade-transition")),h=(r("scale-transition"),r("scroll-x-transition"),r("scroll-x-reverse-transition"),r("scroll-y-transition"),r("scroll-y-reverse-transition"),r("slide-x-transition")),d=(r("slide-x-reverse-transition"),r("slide-y-transition"),r("slide-y-reverse-transition"),o("expand-transition",c()));o("expand-x-transition",c("",!0))},"166a":function(e,t,n){},"210b":function(e,t,n){},"25c7":function(e,t,n){"use strict";n("bf29")},3206:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return l}));var i=n("ade3"),a=(n("99af"),n("2b0e")),r=n("d9bd");function o(e,t){return function(){return Object(r["c"])("The ".concat(e," component must be used inside a ").concat(t))}}function s(e,t,n){var r=t&&n?{register:o(t,n),unregister:o(t,n)}:null;return a["a"].extend({name:"registrable-inject",inject:Object(i["a"])({},e,{default:r})})}function l(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].extend({name:"registrable-provide",provide:function(){return Object(i["a"])({},e,t?this:{register:this.register,unregister:this.unregister})}})}},"36b6":function(e,t){var n='<h1 id="chronibuild">Chronibuild</h1> <p><a href="https://github.com/ll931217/ChroniBuild">ChroniBuild</a> is a website I am currently working on which is a character planner for a game called <a href="https://store.steampowered.com/app/375480/Chronicon/">Chronicon</a>. This project has been taking me a while to create because of the sheer amount of images in the game that needs to be extracted. However thanks to <a href="https://chronicondb.com/">ChoniconDB</a> I got all the assets and data that I need.</p> <p>This website will include all the ChroniconDB features and also a character planner, basically an all-in-one website.</p> <h2 id="technologies-used">Technologies Used:</h2> <ul> <li>Vue.js</li> <li>vue-leaderline</li> <li>ckeditorjs</li> </ul> ';e.exports=n},4719:function(e,t,n){"use strict";e.exports=function(e,t){return t||(t={}),e=e&&e.__esModule?e.default:e,"string"!==typeof e?e:(t.hash&&(e+=t.hash),t.maybeNeedQuotes&&/[\t\n\f\r "'=<>`]/.test(e)?'"'.concat(e,'"'):e)}},4804:function(e,t,n){},"4a42":function(e,t){var n='<h1 id="material-control-system-mcs">Material Control System (MCS)</h1> <p>During the time I worked at <a href="https://www.gyro.com.tw">Gyro Systems Incorporated (捷螺系統股份有限公司)</a>, the biggest projects I worked on was the MCS. I was on 2 different versions of the system, one of them was created with my manager for our company and the other one was created with ITRI for SPIL.</p> <p>My role in both projects is creating an interface for client&#39;s and colleagues to run and test equipments produced by us in our client&#39;s factories.</p> <h2 id="gyros-mcs">Gyro&#39;s MCS</h2> <p>This MCS was created with my manager, I focused on creating the backend server including the database and also the frontend web UI. The goal of the project was to get all the controllers for our hardware, erack, stocker, and AGV to work together.</p> <h3 id="technologies-used">Technologies Used:</h3> <ul> <li>Jinja2</li> <li>Flask</li> <li>Python</li> <li>jQuery</li> <li>Bootstrap</li> <li>MariaDB</li> </ul> <p><a href="https://www.gyro.com.tw/">Learn More</a></p> <h2 id="itris-mcs">ITRI&#39;s MCS</h2> <p>The MCS created with ITRI, I was the lead with another new colleague. One of my tasks was distribute work with him, when he couldn&#39;t finish something on time, I would pick up what he couldn&#39;t finish. When there is some free time, I would mentor him on best programming practices and techniques.</p> <h3 id="technologies-used-1">Technologies Used:</h3> <ul> <li>Vuejs</li> <li>BoostrapVue</li> <li>Flask</li> <li>Python</li> <li>MSSQL</li> </ul> <h2 id="what-i-learned-from-working-on-these-projects">What I learned from working on these projects</h2> <ul> <li>Proper planning is very important when you want to finish a project on time. Especially when you want everyone on the same track to write better code.</li> <li>Leading a team, used Trello to organise and distribute work between members, including issue and features tracking.</li> <li>Teaching team member coding techniques to improve their code, and overall application performance.</li> </ul> ';e.exports=n},"4e82":function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var i=n("ade3"),a=n("3206");function r(e,t,n){return Object(a["a"])(e,t,n).extend({name:"groupable",props:{activeClass:{type:String,default:function(){if(this[e])return this[e].activeClass}},disabled:Boolean},data:function(){return{isActive:!1}},computed:{groupClasses:function(){return this.activeClass?Object(i["a"])({},this.activeClass,this.isActive):{}}},created:function(){this[e]&&this[e].register(this)},beforeDestroy:function(){this[e]&&this[e].unregister(this)},methods:{toggle:function(){this.$emit("change")}}})}r("itemGroup")},"4fc6":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mt-10",attrs:{id:"mywork"}},[n("v-container",[n("h1",[e._v("My Work")]),n("p",[e._v("The following are projects that I had worked on. Most of them are available on my "),n("a",{attrs:{href:"https://github.com/ll931217"}},[e._v("GitHub")])]),n("div",{staticClass:"mb-1",attrs:{id:"keys"}},e._l(e.keys,(function(t,i){return n("div",{key:i,staticClass:"key"},[n("div",{staticClass:"color",style:{"background-color":t.color}}),e._v(e._s(t.text))])})),0),n("v-row",[n("v-col",[n("v-expansion-panels",{attrs:{accordion:""}},e._l(e.works,(function(t,i){return n("v-expansion-panel",{key:i},[n("v-expansion-panel-header",{attrs:{color:t.color}},[e._v(e._s(t.title))]),n("v-expansion-panel-content",[n("md",{attrs:{source:t.source}})],1)],1)})),1)],1)],1)],1)],1)},a=[],r=n("36b6"),o=n.n(r),s=n("9083"),l=n.n(s),c=n("8eac"),u=n.n(c),h=n("4a42"),d=n.n(h),p=n("9290"),f=n.n(p),v=n("f6a1"),m=n.n(v),g=n("cb6b"),b=n.n(g),y=n("f359"),w=n.n(y),x=n("a5a5"),k=n.n(x),C={name:"MyWork",data:function(){return{works:[{title:"ChroniBuild (Current)",source:o.a,color:"#ffeaa7"},{title:"SeeMo (Current)",source:m.a,color:"#ffeaa7"},{title:"MCS (Current)",source:d.a,color:"#81ecec"},{title:"Erack",source:l.a,color:"#81ecec"},{title:"Vue Treeview",source:k.a,color:"#81ecec"},{title:"JSON Validator",source:u.a,color:"#81ecec"},{title:"Project Management",source:f.a,color:"#dfe6e9"},{title:"Uhuru",source:w.a,color:"#dfe6e9"},{title:"Stock Trader",source:b.a,color:"#dfe6e9"}],keys:[{color:"#ffeaa7",text:"Personal Projects"},{color:"#81ecec",text:"Gyro Systems Inc. Projects"},{color:"#dfe6e9",text:"Old Projects"}]}}},_=C,j=(n("25c7"),n("2877")),S=n("6544"),I=n.n(S),T=n("62ad"),O=n("a523"),L=n("5530"),V=n("4e82"),M=n("3206"),E=n("80d2"),A=n("58df"),B=Object(A["a"])(Object(V["a"])("expansionPanels","v-expansion-panel","v-expansion-panels"),Object(M["b"])("expansionPanel",!0)).extend({name:"v-expansion-panel",props:{disabled:Boolean,readonly:Boolean},data:function(){return{content:null,header:null,nextIsActive:!1}},computed:{classes:function(){return Object(L["a"])({"v-expansion-panel--active":this.isActive,"v-expansion-panel--next-active":this.nextIsActive,"v-expansion-panel--disabled":this.isDisabled},this.groupClasses)},isDisabled:function(){return this.expansionPanels.disabled||this.disabled},isReadonly:function(){return this.expansionPanels.readonly||this.readonly}},methods:{registerContent:function(e){this.content=e},unregisterContent:function(){this.content=null},registerHeader:function(e){this.header=e,e.$on("click",this.onClick)},unregisterHeader:function(){this.header=null},onClick:function(e){e.detail&&this.header.$el.blur(),this.$emit("click",e),this.isReadonly||this.isDisabled||this.toggle()},toggle:function(){var e=this;this.content&&(this.content.isBooted=!0),this.$nextTick((function(){return e.$emit("change")}))}},render:function(e){return e("div",{staticClass:"v-expansion-panel",class:this.classes,attrs:{"aria-expanded":String(this.isActive)}},Object(E["j"])(this))}}),P=n("0789"),z=n("d9bd"),D=n("2b0e"),$=D["a"].extend().extend({name:"bootable",props:{eager:Boolean},data:function(){return{isBooted:!1}},computed:{hasContent:function(){return this.isBooted||this.eager||this.isActive}},watch:{isActive:function(){this.isBooted=!0}},created:function(){"lazy"in this.$attrs&&Object(z["e"])("lazy",this)},methods:{showLazyContent:function(e){return this.hasContent&&e?e():[this.$createElement()]}}}),H=n("a9ad"),N=Object(A["a"])($,H["a"],Object(M["a"])("expansionPanel","v-expansion-panel-content","v-expansion-panel")),q=N.extend().extend({name:"v-expansion-panel-content",computed:{isActive:function(){return this.expansionPanel.isActive}},created:function(){this.expansionPanel.registerContent(this)},beforeDestroy:function(){this.expansionPanel.unregisterContent()},render:function(e){var t=this;return e(P["a"],this.showLazyContent((function(){return[e("div",t.setBackgroundColor(t.color,{staticClass:"v-expansion-panel-content",directives:[{name:"show",value:t.isActive}]}),[e("div",{class:"v-expansion-panel-content__wrap"},Object(E["j"])(t))])]})))}}),R=n("9d26"),W=n("5607"),U=Object(A["a"])(H["a"],Object(M["a"])("expansionPanel","v-expansion-panel-header","v-expansion-panel")),F=U.extend().extend({name:"v-expansion-panel-header",directives:{ripple:W["a"]},props:{disableIconRotate:Boolean,expandIcon:{type:String,default:"$expand"},hideActions:Boolean,ripple:{type:[Boolean,Object],default:!1}},data:function(){return{hasMousedown:!1}},computed:{classes:function(){return{"v-expansion-panel-header--active":this.isActive,"v-expansion-panel-header--mousedown":this.hasMousedown}},isActive:function(){return this.expansionPanel.isActive},isDisabled:function(){return this.expansionPanel.isDisabled},isReadonly:function(){return this.expansionPanel.isReadonly}},created:function(){this.expansionPanel.registerHeader(this)},beforeDestroy:function(){this.expansionPanel.unregisterHeader()},methods:{onClick:function(e){this.$emit("click",e)},genIcon:function(){var e=Object(E["j"])(this,"actions")||[this.$createElement(R["a"],this.expandIcon)];return this.$createElement(P["b"],[this.$createElement("div",{staticClass:"v-expansion-panel-header__icon",class:{"v-expansion-panel-header__icon--disable-rotate":this.disableIconRotate},directives:[{name:"show",value:!this.isDisabled}]},e)])}},render:function(e){var t=this;return e("button",this.setBackgroundColor(this.color,{staticClass:"v-expansion-panel-header",class:this.classes,attrs:{tabindex:this.isDisabled?-1:null,type:"button","aria-expanded":this.hasMousedown},directives:[{name:"ripple",value:this.ripple}],on:Object(L["a"])(Object(L["a"])({},this.$listeners),{},{click:this.onClick,mousedown:function(){return t.hasMousedown=!0},mouseup:function(){return t.hasMousedown=!1}})}),[Object(E["j"])(this,"default",{open:this.isActive},!0),this.hideActions||this.genIcon()])}}),G=(n("0481"),n("210b"),n("a9e3"),n("4de4"),n("caad"),n("2532"),n("a434"),n("159b"),n("fb6a"),n("7db0"),n("c740"),n("166a"),n("a452")),J=n("7560"),Q=Object(A["a"])(G["a"],J["a"]).extend({name:"base-item-group",props:{activeClass:{type:String,default:"v-item--active"},mandatory:Boolean,max:{type:[Number,String],default:null},multiple:Boolean,tag:{type:String,default:"div"}},data:function(){return{internalLazyValue:void 0!==this.value?this.value:this.multiple?[]:void 0,items:[]}},computed:{classes:function(){return Object(L["a"])({"v-item-group":!0},this.themeClasses)},selectedIndex:function(){return this.selectedItem&&this.items.indexOf(this.selectedItem)||-1},selectedItem:function(){if(!this.multiple)return this.selectedItems[0]},selectedItems:function(){var e=this;return this.items.filter((function(t,n){return e.toggleMethod(e.getValue(t,n))}))},selectedValues:function(){return null==this.internalValue?[]:Array.isArray(this.internalValue)?this.internalValue:[this.internalValue]},toggleMethod:function(){var e=this;if(!this.multiple)return function(t){return e.internalValue===t};var t=this.internalValue;return Array.isArray(t)?function(e){return t.includes(e)}:function(){return!1}}},watch:{internalValue:"updateItemsState",items:"updateItemsState"},created:function(){this.multiple&&!Array.isArray(this.internalValue)&&Object(z["c"])("Model must be bound to an array if the multiple property is true.",this)},methods:{genData:function(){return{class:this.classes}},getValue:function(e,t){return null==e.value||""===e.value?t:e.value},onClick:function(e){this.updateInternalValue(this.getValue(e,this.items.indexOf(e)))},register:function(e){var t=this,n=this.items.push(e)-1;e.$on("change",(function(){return t.onClick(e)})),this.mandatory&&!this.selectedValues.length&&this.updateMandatory(),this.updateItem(e,n)},unregister:function(e){if(!this._isDestroyed){var t=this.items.indexOf(e),n=this.getValue(e,t);this.items.splice(t,1);var i=this.selectedValues.indexOf(n);if(!(i<0)){if(!this.mandatory)return this.updateInternalValue(n);this.multiple&&Array.isArray(this.internalValue)?this.internalValue=this.internalValue.filter((function(e){return e!==n})):this.internalValue=void 0,this.selectedItems.length||this.updateMandatory(!0)}}},updateItem:function(e,t){var n=this.getValue(e,t);e.isActive=this.toggleMethod(n)},updateItemsState:function(){var e=this;this.$nextTick((function(){if(e.mandatory&&!e.selectedItems.length)return e.updateMandatory();e.items.forEach(e.updateItem)}))},updateInternalValue:function(e){this.multiple?this.updateMultiple(e):this.updateSingle(e)},updateMandatory:function(e){if(this.items.length){var t=this.items.slice();e&&t.reverse();var n=t.find((function(e){return!e.disabled}));if(n){var i=this.items.indexOf(n);this.updateInternalValue(this.getValue(n,i))}}},updateMultiple:function(e){var t=Array.isArray(this.internalValue)?this.internalValue:[],n=t.slice(),i=n.findIndex((function(t){return t===e}));this.mandatory&&i>-1&&n.length-1<1||null!=this.max&&i<0&&n.length+1>this.max||(i>-1?n.splice(i,1):n.push(e),this.internalValue=n)},updateSingle:function(e){var t=e===this.internalValue;this.mandatory&&t||(this.internalValue=t?void 0:e)}},render:function(e){return e(this.tag,this.genData(),this.$slots.default)}}),K=(Q.extend({name:"v-item-group",provide:function(){return{itemGroup:this}}}),Q.extend({name:"v-expansion-panels",provide:function(){return{expansionPanels:this}},props:{accordion:Boolean,disabled:Boolean,flat:Boolean,hover:Boolean,focusable:Boolean,inset:Boolean,popout:Boolean,readonly:Boolean,tile:Boolean},computed:{classes:function(){return Object(L["a"])(Object(L["a"])({},Q.options.computed.classes.call(this)),{},{"v-expansion-panels":!0,"v-expansion-panels--accordion":this.accordion,"v-expansion-panels--flat":this.flat,"v-expansion-panels--hover":this.hover,"v-expansion-panels--focusable":this.focusable,"v-expansion-panels--inset":this.inset,"v-expansion-panels--popout":this.popout,"v-expansion-panels--tile":this.tile})}},created:function(){this.$attrs.hasOwnProperty("expand")&&Object(z["a"])("expand","multiple",this),Array.isArray(this.value)&&this.value.length>0&&"boolean"===typeof this.value[0]&&Object(z["a"])(':value="[true, false, true]"',':value="[0, 2]"',this)},methods:{updateItem:function(e,t){var n=this.getValue(e,t),i=this.getValue(e,t+1);e.isActive=this.toggleMethod(n),e.nextIsActive=this.toggleMethod(i)}}})),X=n("0fd9"),Y=Object(j["a"])(_,i,a,!1,null,null,null);t["default"]=Y.exports;I()(Y,{VCol:T["a"],VContainer:O["a"],VExpansionPanel:B,VExpansionPanelContent:q,VExpansionPanelHeader:F,VExpansionPanels:K,VRow:X["a"]})},5607:function(e,t,n){"use strict";n("a4d3"),n("e01a"),n("d3b7"),n("25f0"),n("b0c0"),n("99af"),n("a9e3"),n("7435");var i=n("80d2"),a=Symbol("rippleStop"),r=80;function o(e,t){e.style.transform=t,e.style.webkitTransform=t}function s(e,t){e.style.opacity=t.toString()}function l(e){return"TouchEvent"===e.constructor.name}function c(e){return"KeyboardEvent"===e.constructor.name}var u=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=0,a=0;if(!c(e)){var r=t.getBoundingClientRect(),o=l(e)?e.touches[e.touches.length-1]:e;i=o.clientX-r.left,a=o.clientY-r.top}var s=0,u=.3;t._ripple&&t._ripple.circle?(u=.15,s=t.clientWidth/2,s=n.center?s:s+Math.sqrt(Math.pow(i-s,2)+Math.pow(a-s,2))/4):s=Math.sqrt(Math.pow(t.clientWidth,2)+Math.pow(t.clientHeight,2))/2;var h="".concat((t.clientWidth-2*s)/2,"px"),d="".concat((t.clientHeight-2*s)/2,"px"),p=n.center?h:"".concat(i-s,"px"),f=n.center?d:"".concat(a-s,"px");return{radius:s,scale:u,x:p,y:f,centerX:h,centerY:d}},h={show:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(t._ripple&&t._ripple.enabled){var i=document.createElement("span"),a=document.createElement("span");i.appendChild(a),i.className="v-ripple__container",n.class&&(i.className+=" ".concat(n.class));var r=u(e,t,n),l=r.radius,c=r.scale,h=r.x,d=r.y,p=r.centerX,f=r.centerY,v="".concat(2*l,"px");a.className="v-ripple__animation",a.style.width=v,a.style.height=v,t.appendChild(i);var m=window.getComputedStyle(t);m&&"static"===m.position&&(t.style.position="relative",t.dataset.previousPosition="static"),a.classList.add("v-ripple__animation--enter"),a.classList.add("v-ripple__animation--visible"),o(a,"translate(".concat(h,", ").concat(d,") scale3d(").concat(c,",").concat(c,",").concat(c,")")),s(a,0),a.dataset.activated=String(performance.now()),setTimeout((function(){a.classList.remove("v-ripple__animation--enter"),a.classList.add("v-ripple__animation--in"),o(a,"translate(".concat(p,", ").concat(f,") scale3d(1,1,1)")),s(a,.25)}),0)}},hide:function(e){if(e&&e._ripple&&e._ripple.enabled){var t=e.getElementsByClassName("v-ripple__animation");if(0!==t.length){var n=t[t.length-1];if(!n.dataset.isHiding){n.dataset.isHiding="true";var i=performance.now()-Number(n.dataset.activated),a=Math.max(250-i,0);setTimeout((function(){n.classList.remove("v-ripple__animation--in"),n.classList.add("v-ripple__animation--out"),s(n,0),setTimeout((function(){var t=e.getElementsByClassName("v-ripple__animation");1===t.length&&e.dataset.previousPosition&&(e.style.position=e.dataset.previousPosition,delete e.dataset.previousPosition),n.parentNode&&e.removeChild(n.parentNode)}),300)}),a)}}}}};function d(e){return"undefined"===typeof e||!!e}function p(e){var t={},n=e.currentTarget;if(n&&n._ripple&&!n._ripple.touched&&!e[a]){if(e[a]=!0,l(e))n._ripple.touched=!0,n._ripple.isTouch=!0;else if(n._ripple.isTouch)return;if(t.center=n._ripple.centered||c(e),n._ripple.class&&(t.class=n._ripple.class),l(e)){if(n._ripple.showTimerCommit)return;n._ripple.showTimerCommit=function(){h.show(e,n,t)},n._ripple.showTimer=window.setTimeout((function(){n&&n._ripple&&n._ripple.showTimerCommit&&(n._ripple.showTimerCommit(),n._ripple.showTimerCommit=null)}),r)}else h.show(e,n,t)}}function f(e){var t=e.currentTarget;if(t&&t._ripple){if(window.clearTimeout(t._ripple.showTimer),"touchend"===e.type&&t._ripple.showTimerCommit)return t._ripple.showTimerCommit(),t._ripple.showTimerCommit=null,void(t._ripple.showTimer=setTimeout((function(){f(e)})));window.setTimeout((function(){t._ripple&&(t._ripple.touched=!1)})),h.hide(t)}}function v(e){var t=e.currentTarget;t&&t._ripple&&(t._ripple.showTimerCommit&&(t._ripple.showTimerCommit=null),window.clearTimeout(t._ripple.showTimer))}var m=!1;function g(e){m||e.keyCode!==i["l"].enter&&e.keyCode!==i["l"].space||(m=!0,p(e))}function b(e){m=!1,f(e)}function y(e){!0===m&&(m=!1,f(e))}function w(e,t,n){var i=d(t.value);i||h.hide(e),e._ripple=e._ripple||{},e._ripple.enabled=i;var a=t.value||{};a.center&&(e._ripple.centered=!0),a.class&&(e._ripple.class=t.value.class),a.circle&&(e._ripple.circle=a.circle),i&&!n?(e.addEventListener("touchstart",p,{passive:!0}),e.addEventListener("touchend",f,{passive:!0}),e.addEventListener("touchmove",v,{passive:!0}),e.addEventListener("touchcancel",f),e.addEventListener("mousedown",p),e.addEventListener("mouseup",f),e.addEventListener("mouseleave",f),e.addEventListener("keydown",g),e.addEventListener("keyup",b),e.addEventListener("blur",y),e.addEventListener("dragstart",f,{passive:!0})):!i&&n&&x(e)}function x(e){e.removeEventListener("mousedown",p),e.removeEventListener("touchstart",p),e.removeEventListener("touchend",f),e.removeEventListener("touchmove",v),e.removeEventListener("touchcancel",f),e.removeEventListener("mouseup",f),e.removeEventListener("mouseleave",f),e.removeEventListener("keydown",g),e.removeEventListener("keyup",b),e.removeEventListener("dragstart",f),e.removeEventListener("blur",y)}function k(e,t,n){w(e,t,!1)}function C(e){delete e._ripple,x(e)}function _(e,t){if(t.value!==t.oldValue){var n=d(t.oldValue);w(e,t,n)}}var j={bind:k,unbind:C,update:_};t["a"]=j},7435:function(e,t,n){},"8eac":function(e,t){var n='<h1 id="json-validator"><a href="https://github.com/ll931217/python-json-validator">JSON Validator</a></h1> <p>This tiny program is used to validate and correct incorrect JSON formats. This was created when I was working on the MCS, to check requests to my Flask Server.</p> ';e.exports=n},9083:function(e,t){var n='<h1 id="erack-controller-and-server">Erack Controller and Server</h1> <p>I was part of the first in <a href="https://www.gyro.com.tw">Gyro Systems Incorporated (捷螺系統股份有限公司)</a> to work on created Erack (or some call it Smart Shelf). These racks are used to keep track of carriers/FOUPs within the factory. </p> <h2 id="erack-server">Erack Server</h2> <p>Our first project was created for SK Hynix in Wuxi China, I was in charge of the Erack server which will keep track of all inventory on the Eracks.</p> <h3 id="technologies-used">Technologies Used:</h3> <ul> <li>Node.js</li> <li>Express.js</li> <li>Nuxt.js</li> <li>Vue.js</li> <li>BootstrapVue</li> <li>Tibco Rendesvous</li> <li>Java</li> </ul> <h3 id="achievements">Achievements</h3> <p>This was my first time creating a successful recursive function, however this recursive function is actually a recursive component. This component is a <a href="https://github.com/ll931217/vue-treeview"><strong>Tree View</strong></a> for our eracks, this allowed me to create a Vue.js plugin for anyone who wants to use it called <a href="https://github.com/ll931217/vue-treeview">ll931217/vue-treeview</a>.</p> <h2 id="erack-controller">Erack Controller</h2> <p>During the first Erack project for SK Hynix, the Erack controller was created by my manager, after that project he passed the code to me to maintain. The code was written in Python which I wasn&#39;t familiar with at first but soon got accustomed to it.</p> <h3 id="technologies-used-1">Technologies Used</h3> <ul> <li>Python</li> <li>Flask</li> </ul> ';e.exports=n},9290:function(e,t){var n='<h1 id="project-management">Project Management</h1> <p>A freelance project I worked on to generate a QR Code that can be printed and pasted onto products in stores for customers to scan and get more detailed information about the product. At the same time, get advertisements that can direct customers to similar products.</p> <h2 id="technologies-used">Technologies Used:</h2> <ul> <li>Vue.js</li> <li>i18n</li> <li>xlsx</li> <li>Vuetify</li> <li>Apollo</li> <li>Expressjs</li> <li>GraphQL</li> <li>MongoDB</li> <li>Json Web Tokens</li> </ul> ';e.exports=n},"9d26":function(e,t,n){"use strict";var i,a=n("5530"),r=(n("c96a"),n("caad"),n("2532"),n("a9e3"),n("498a"),n("7db0"),n("fb6a"),n("4804"),n("7e2b")),o=n("a9ad"),s=n("af2b"),l=n("7560"),c=n("80d2"),u=n("2b0e"),h=n("58df");function d(e){return["fas","far","fal","fab","fad"].some((function(t){return e.includes(t)}))}function p(e){return/^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(e)&&/[\dz]$/i.test(e)&&e.length>4}(function(e){e["xSmall"]="12px",e["small"]="16px",e["default"]="24px",e["medium"]="28px",e["large"]="36px",e["xLarge"]="40px"})(i||(i={}));var f=Object(h["a"])(r["a"],o["a"],s["a"],l["a"]).extend({name:"v-icon",props:{dense:Boolean,disabled:Boolean,left:Boolean,right:Boolean,size:[Number,String],tag:{type:String,required:!1,default:"i"}},computed:{medium:function(){return!1},hasClickListener:function(){return Boolean(this.listeners$.click||this.listeners$["!click"])}},methods:{getIcon:function(){var e="";return this.$slots.default&&(e=this.$slots.default[0].text.trim()),Object(c["p"])(this,e)},getSize:function(){var e={xSmall:this.xSmall,small:this.small,medium:this.medium,large:this.large,xLarge:this.xLarge},t=Object(c["m"])(e).find((function(t){return e[t]}));return t&&i[t]||Object(c["d"])(this.size)},getDefaultData:function(){return{staticClass:"v-icon notranslate",class:{"v-icon--disabled":this.disabled,"v-icon--left":this.left,"v-icon--link":this.hasClickListener,"v-icon--right":this.right,"v-icon--dense":this.dense},attrs:Object(a["a"])({"aria-hidden":!this.hasClickListener,disabled:this.hasClickListener&&this.disabled,type:this.hasClickListener?"button":void 0},this.attrs$),on:this.listeners$}},getSvgWrapperData:function(){var e=this.getSize(),t=Object(a["a"])(Object(a["a"])({},this.getDefaultData()),{},{style:e?{fontSize:e,height:e,width:e}:void 0});return this.applyColors(t),t},applyColors:function(e){e.class=Object(a["a"])(Object(a["a"])({},e.class),this.themeClasses),this.setTextColor(this.color,e)},renderFontIcon:function(e,t){var n=[],i=this.getDefaultData(),a="material-icons",r=e.indexOf("-"),o=r<=-1;o?n.push(e):(a=e.slice(0,r),d(a)&&(a="")),i.class[a]=!0,i.class[e]=!o;var s=this.getSize();return s&&(i.style={fontSize:s}),this.applyColors(i),t(this.hasClickListener?"button":this.tag,i,n)},renderSvgIcon:function(e,t){var n={class:"v-icon__svg",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",role:"img","aria-hidden":!0}},i=this.getSize();return i&&(n.style={fontSize:i,height:i,width:i}),t(this.hasClickListener?"button":"span",this.getSvgWrapperData(),[t("svg",n,[t("path",{attrs:{d:e}})])])},renderSvgIconComponent:function(e,t){var n={class:{"v-icon__component":!0}},i=this.getSize();i&&(n.style={fontSize:i,height:i,width:i}),this.applyColors(n);var a=e.component;return n.props=e.props,n.nativeOn=n.on,t(this.hasClickListener?"button":"span",this.getSvgWrapperData(),[t(a,n)])}},render:function(e){var t=this.getIcon();return"string"===typeof t?p(t)?this.renderSvgIcon(t,e):this.renderFontIcon(t,e):this.renderSvgIconComponent(t,e)}}),v=u["a"].extend({name:"v-icon",$_wrapperFor:f,functional:!0,render:function(e,t){var n=t.data,i=t.children,a="";return n.domProps&&(a=n.domProps.textContent||n.domProps.innerHTML||a,delete n.domProps.textContent,delete n.domProps.innerHTML),e(f,n,a?[a]:i)}});t["a"]=v},a434:function(e,t,n){"use strict";var i=n("23e7"),a=n("23cb"),r=n("a691"),o=n("50c4"),s=n("7b0b"),l=n("65f0"),c=n("8418"),u=n("1dde"),h=u("splice"),d=Math.max,p=Math.min,f=9007199254740991,v="Maximum allowed length exceeded";i({target:"Array",proto:!0,forced:!h},{splice:function(e,t){var n,i,u,h,m,g,b=s(this),y=o(b.length),w=a(e,y),x=arguments.length;if(0===x?n=i=0:1===x?(n=0,i=y-w):(n=x-2,i=p(d(r(t),0),y-w)),y+n-i>f)throw TypeError(v);for(u=l(b,i),h=0;h<i;h++)m=w+h,m in b&&c(u,h,b[m]);if(u.length=i,n<i){for(h=w;h<y-i;h++)m=h+i,g=h+n,m in b?b[g]=b[m]:delete b[g];for(h=y;h>y-i+n;h--)delete b[h-1]}else if(n>i)for(h=y-i;h>w;h--)m=h+i-1,g=h+n-1,m in b?b[g]=b[m]:delete b[g];for(h=0;h<n;h++)b[h+w]=arguments[h+2];return b.length=y-i+n,u}})},a452:function(e,t,n){"use strict";var i=n("ade3"),a=n("2b0e");function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"value",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"change";return a["a"].extend({name:"proxyable",model:{prop:e,event:t},props:Object(i["a"])({},e,{required:!1}),data:function(){return{internalLazyValue:this[e]}},computed:{internalValue:{get:function(){return this.internalLazyValue},set:function(e){e!==this.internalLazyValue&&(this.internalLazyValue=e,this.$emit(t,e))}}},watch:Object(i["a"])({},e,(function(e){this.internalLazyValue=e}))})}var o=r();t["a"]=o},a5a5:function(e,t,n){var i=n("4719"),a=n("e603"),r=i(a),o='<h1 id="ll931217vue-treeview"><a href="https://www.npmjs.com/package/@ll931217/vue-treeview">@ll931217/vue-treeview</a></h1> <p><img src="'+r+'" alt="vue-treeview"></p> <p>This is a <a href="https://vuejs.org/">Vue.js</a> plugin I created from the <strong>Erack Server</strong> project, my first ever open-source project. The tree data is in JSON format, and you feed it to the plugin and a treeview will be displayed.</p> ';e.exports=o},af2b:function(e,t,n){"use strict";n("c96a");var i=n("2b0e");t["a"]=i["a"].extend({name:"sizeable",props:{large:Boolean,small:Boolean,xLarge:Boolean,xSmall:Boolean},computed:{medium:function(){return Boolean(!this.xSmall&&!this.small&&!this.large&&!this.xLarge)},sizeableClasses:function(){return{"v-size--x-small":this.xSmall,"v-size--small":this.small,"v-size--default":this.medium,"v-size--large":this.large,"v-size--x-large":this.xLarge}}}})},bf29:function(e,t,n){},c740:function(e,t,n){"use strict";var i=n("23e7"),a=n("b727").findIndex,r=n("44d2"),o="findIndex",s=!0;o in[]&&Array(1)[o]((function(){s=!1})),i({target:"Array",proto:!0,forced:s},{findIndex:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}}),r(o)},c96a:function(e,t,n){"use strict";var i=n("23e7"),a=n("857a"),r=n("af03");i({target:"String",proto:!0,forced:r("small")},{small:function(){return a(this,"small","","")}})},cb6b:function(e,t){var n='<h1 id="stock-trader"><a href="https://github.com/ll931217/stock-trader">Stock Trader</a></h1> <p>A vuejs course project to test our skills</p> ';e.exports=n},e603:function(e,t,n){e.exports=n.p+"img/preview.2db71af0.png"},f359:function(e,t){var n='<h1 id="uhuru"><a href="https://github.com/ll931217/uhuru">Uhuru</a></h1> <p>A website to keep record of all African businesses in South Africa. The project was discontinued after my client abandoned it.</p> <h2 id="technologies-used">Technologies Used:</h2> <ul> <li>PHP</li> <li>LAMP</li> <li>MySQL</li> <li>PHPMailer</li> </ul> ';e.exports=n},f6a1:function(e,t){var n='<h1 id="seemo">SeeMo</h1> <p>SeeMo is a freelance project I am currently working on with a friend of mine. More details will be shown when the site launches.</p> ';e.exports=n}}]);
//# sourceMappingURL=chunk-62d4a960.3b67dd09.js.map