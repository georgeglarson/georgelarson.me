function e(e,t,s,r){Object.defineProperty(e,t,{get:s,set:r,enumerable:!0,configurable:!0})}var t,s,r,n,a,i,o,l,c,u,h,p,d,m,f,g,b,k={},v=[],w=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,y=Array.isArray;function S(e,t){for(var s in t)e[s]=t[s];return e}function E(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function C(e,t,s){var r,n,a,o={};for(a in t)"key"==a?r=t[a]:"ref"==a?n=t[a]:o[a]=t[a];if(arguments.length>2&&(o.children=arguments.length>3?i.call(arguments,2):s),"function"==typeof e&&null!=e.defaultProps)for(a in e.defaultProps)void 0===o[a]&&(o[a]=e.defaultProps[a]);return $(e,o,r,n,null)}function $(e,t,s,r,n){var a={type:e,props:t,key:s,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:null==n?++l:n,__i:-1,__u:0};return null==n&&null!=o.vnode&&o.vnode(a),a}function _(){return{current:null}}function I(e){return e.children}function N(e,t){this.props=e,this.context=t}function x(e,t){if(null==t)return e.__?x(e.__,e.__i+1):null;for(var s;t<e.__k.length;t++)if(null!=(s=e.__k[t])&&null!=s.__e)return s.__e;return"function"==typeof e.type?x(e):null}function T(e){(!e.__d&&(e.__d=!0)&&c.push(e)&&!R.__r++||u!=o.debounceRendering)&&((u=o.debounceRendering)||h)(R)}function R(){try{for(var e,t=1;c.length;)c.length>t&&c.sort(p),e=c.shift(),t=c.length,function(e){if(e.__P&&e.__d){var t=e.__v,s=t.__e,r=[],n=[],a=S({},t);a.__v=t.__v+1,o.vnode&&o.vnode(a),M(e.__P,a,t,e.__n,e.__P.namespaceURI,32&t.__u?[s]:null,r,null==s?x(t):s,!!(32&t.__u),n),a.__v=t.__v,a.__.__k[a.__i]=a,B(r,a,n),t.__e=t.__=null,a.__e!=s&&function e(t){if(null!=(t=t.__)&&null!=t.__c)return t.__e=t.__c.base=null,t.__k.some(function(e){if(null!=e&&null!=e.__e)return t.__e=t.__c.base=e.__e}),e(t)}(a)}}(e)}finally{c.length=R.__r=0}}function O(e,t,s,r,n,a,i,l,c,u,h){var p,d,m,f,g,b,w,S=r&&r.__k||v,C=t.length;for(c=function(e,t,s,r,n){var a,i,l,c,u,h=s.length,p=h,d=0;for(e.__k=Array(n),a=0;a<n;a++)null!=(i=t[a])&&"boolean"!=typeof i&&"function"!=typeof i?("string"==typeof i||"number"==typeof i||"bigint"==typeof i||i.constructor==String?i=e.__k[a]=$(null,i,null,null,null):y(i)?i=e.__k[a]=$(I,{children:i},null,null,null):void 0===i.constructor&&i.__b>0?i=e.__k[a]=$(i.type,i.props,i.key,i.ref?i.ref:null,i.__v):e.__k[a]=i,c=a+d,i.__=e,i.__b=e.__b+1,l=null,-1!=(u=i.__i=function(e,t,s,r){var n,a,i,o=e.key,l=e.type,c=t[s],u=null!=c&&0==(2&c.__u);if(null===c&&null==o||u&&o==c.key&&l==c.type)return s;if(r>+!!u){for(n=s-1,a=s+1;n>=0||a<t.length;)if(null!=(c=t[i=n>=0?n--:a++])&&0==(2&c.__u)&&o==c.key&&l==c.type)return i}return -1}(i,s,c,p))&&(p--,(l=s[u])&&(l.__u|=2)),null==l||null==l.__v?(-1==u&&(n>h?d--:n<h&&d++),"function"!=typeof i.type&&(i.__u|=4)):u!=c&&(u==c-1?d--:u==c+1?d++:(u>c?d--:d++,i.__u|=4))):e.__k[a]=null;if(p)for(a=0;a<h;a++)null!=(l=s[a])&&0==(2&l.__u)&&(l.__e==r&&(r=x(l)),function e(t,s,r){var n,a;if(o.unmount&&o.unmount(t),(n=t.ref)&&(n.current&&n.current!=t.__e||H(n,null,s)),null!=(n=t.__c)){if(n.componentWillUnmount)try{n.componentWillUnmount()}catch(e){o.__e(e,s)}n.base=n.__P=null}if(n=t.__k)for(a=0;a<n.length;a++)n[a]&&e(n[a],s,r||"function"!=typeof t.type);r||E(t.__e),t.__c=t.__=t.__e=void 0}(l,l));return r}(s,t,S,c,C),p=0;p<C;p++)null!=(m=s.__k[p])&&(d=-1!=m.__i&&S[m.__i]||k,m.__i=p,b=M(e,m,d,n,a,i,l,c,u,h),f=m.__e,m.ref&&d.ref!=m.ref&&(d.ref&&H(d.ref,null,m),h.push(m.ref,m.__c||f,m)),null==g&&null!=f&&(g=f),(w=!!(4&m.__u))||d.__k===m.__k?c=function e(t,s,r,n){var a,i;if("function"==typeof t.type){for(a=t.__k,i=0;a&&i<a.length;i++)a[i]&&(a[i].__=t,s=e(a[i],s,r,n));return s}t.__e!=s&&(n&&(s&&t.type&&!s.parentNode&&(s=x(t)),r.insertBefore(t.__e,s||null)),s=t.__e);do s=s&&s.nextSibling;while(null!=s&&8==s.nodeType)return s}(m,c,e,w):"function"==typeof m.type&&void 0!==b?c=b:f&&(c=f.nextSibling),m.__u&=-7);return s.__e=g,c}function D(e,t,s){"-"==t[0]?e.setProperty(t,null==s?"":s):e[t]=null==s?"":"number"!=typeof s||w.test(t)?s:s+"px"}function A(e,t,s,r,n){var a,i;e:if("style"==t)if("string"==typeof s)e.style.cssText=s;else{if("string"==typeof r&&(e.style.cssText=r=""),r)for(t in r)s&&t in s||D(e.style,t,"");if(s)for(t in s)r&&s[t]==r[t]||D(e.style,t,s[t])}else if("o"==t[0]&&"n"==t[1])a=t!=(t=t.replace(d,"$1")),t=(i=t.toLowerCase())in e||"onFocusOut"==t||"onFocusIn"==t?i.slice(2):t.slice(2),e.l||(e.l={}),e.l[t+a]=s,s?r?s.u=r.u:(s.u=m,e.addEventListener(t,a?g:f,a)):e.removeEventListener(t,a?g:f,a);else{if("http://www.w3.org/2000/svg"==n)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!=t&&"height"!=t&&"href"!=t&&"list"!=t&&"form"!=t&&"tabIndex"!=t&&"download"!=t&&"rowSpan"!=t&&"colSpan"!=t&&"role"!=t&&"popover"!=t&&t in e)try{e[t]=null==s?"":s;break e}catch(e){}"function"==typeof s||(null==s||!1===s&&"-"!=t[4]?e.removeAttribute(t):e.setAttribute(t,"popover"==t&&1==s?"":s))}}function L(e){return function(t){if(this.l){var s=this.l[t.type+e];if(null==t.t)t.t=m++;else if(t.t<s.u)return;return s(o.event?o.event(t):t)}}}function M(e,t,s,r,n,a,l,c,u,h){var p,d,m,f,g,b,w,C,$,_,T,R,D,L,M,B=t.type;if(void 0!==t.constructor)return null;128&s.__u&&(u=!!(32&s.__u),a=[c=t.__e=s.__e]),(p=o.__b)&&p(t);e:if("function"==typeof B)try{if(C=t.props,$=B.prototype&&B.prototype.render,_=(p=B.contextType)&&r[p.__c],T=p?_?_.props.value:p.__:r,s.__c?w=(d=t.__c=s.__c).__=d.__E:($?t.__c=d=new B(C,T):(t.__c=d=new N(C,T),d.constructor=B,d.render=j),_&&_.sub(d),d.state||(d.state={}),d.__n=r,m=d.__d=!0,d.__h=[],d._sb=[]),$&&null==d.__s&&(d.__s=d.state),$&&null!=B.getDerivedStateFromProps&&(d.__s==d.state&&(d.__s=S({},d.__s)),S(d.__s,B.getDerivedStateFromProps(C,d.__s))),f=d.props,g=d.state,d.__v=t,m)$&&null==B.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),$&&null!=d.componentDidMount&&d.__h.push(d.componentDidMount);else{if($&&null==B.getDerivedStateFromProps&&C!==f&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(C,T),t.__v==s.__v||!d.__e&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(C,d.__s,T)){t.__v!=s.__v&&(d.props=C,d.state=d.__s,d.__d=!1),t.__e=s.__e,t.__k=s.__k,t.__k.some(function(e){e&&(e.__=t)}),v.push.apply(d.__h,d._sb),d._sb=[],d.__h.length&&l.push(d);break e}null!=d.componentWillUpdate&&d.componentWillUpdate(C,d.__s,T),$&&null!=d.componentDidUpdate&&d.__h.push(function(){d.componentDidUpdate(f,g,b)})}if(d.context=T,d.props=C,d.__P=e,d.__e=!1,R=o.__r,D=0,$)d.state=d.__s,d.__d=!1,R&&R(t),p=d.render(d.props,d.state,d.context),v.push.apply(d.__h,d._sb),d._sb=[];else do d.__d=!1,R&&R(t),p=d.render(d.props,d.state,d.context),d.state=d.__s;while(d.__d&&++D<25)d.state=d.__s,null!=d.getChildContext&&(r=S(S({},r),d.getChildContext())),$&&!m&&null!=d.getSnapshotBeforeUpdate&&(b=d.getSnapshotBeforeUpdate(f,g)),L=null!=p&&p.type===I&&null==p.key?function e(t){return"object"!=typeof t||null==t||t.__b>0?t:y(t)?t.map(e):S({},t)}(p.props.children):p,c=O(e,y(L)?L:[L],t,s,r,n,a,l,c,u,h),d.base=t.__e,t.__u&=-161,d.__h.length&&l.push(d),w&&(d.__E=d.__=null)}catch(e){if(t.__v=null,u||null!=a)if(e.then){for(t.__u|=u?160:128;c&&8==c.nodeType&&c.nextSibling;)c=c.nextSibling;a[a.indexOf(c)]=null,t.__e=c}else{for(M=a.length;M--;)E(a[M]);P(t)}else t.__e=s.__e,t.__k=s.__k,e.then||P(t);o.__e(e,t,s)}else null==a&&t.__v==s.__v?(t.__k=s.__k,t.__e=s.__e):c=t.__e=function(e,t,s,r,n,a,l,c,u){var h,p,d,m,f,g,b,v=s.props||k,w=t.props,S=t.type;if("svg"==S?n="http://www.w3.org/2000/svg":"math"==S?n="http://www.w3.org/1998/Math/MathML":n||(n="http://www.w3.org/1999/xhtml"),null!=a){for(h=0;h<a.length;h++)if((f=a[h])&&"setAttribute"in f==!!S&&(S?f.localName==S:3==f.nodeType)){e=f,a[h]=null;break}}if(null==e){if(null==S)return document.createTextNode(w);e=document.createElementNS(n,S,w.is&&w),c&&(o.__m&&o.__m(t,a),c=!1),a=null}if(null==S)v===w||c&&e.data==w||(e.data=w);else{if(a=a&&i.call(e.childNodes),!c&&null!=a)for(v={},h=0;h<e.attributes.length;h++)v[(f=e.attributes[h]).name]=f.value;for(h in v)f=v[h],"dangerouslySetInnerHTML"==h?d=f:"children"==h||h in w||"value"==h&&"defaultValue"in w||"checked"==h&&"defaultChecked"in w||A(e,h,null,f,n);for(h in w)f=w[h],"children"==h?m=f:"dangerouslySetInnerHTML"==h?p=f:"value"==h?g=f:"checked"==h?b=f:c&&"function"!=typeof f||v[h]===f||A(e,h,f,v[h],n);if(p)c||d&&(p.__html==d.__html||p.__html==e.innerHTML)||(e.innerHTML=p.__html),t.__k=[];else if(d&&(e.innerHTML=""),O("template"==t.type?e.content:e,y(m)?m:[m],t,s,r,"foreignObject"==S?"http://www.w3.org/1999/xhtml":n,a,l,a?a[0]:s.__k&&x(s,0),c,u),null!=a)for(h=a.length;h--;)E(a[h]);c||(h="value","progress"==S&&null==g?e.removeAttribute("value"):null==g||g===e[h]&&("progress"!=S||g)&&("option"!=S||g==v[h])||A(e,h,g,v[h],n),h="checked",null!=b&&b!=e[h]&&A(e,h,b,v[h],n))}return e}(s.__e,t,s,r,n,a,l,u,h);return(p=o.diffed)&&p(t),128&t.__u?void 0:c}function P(e){e&&(e.__c&&(e.__c.__e=!0),e.__k&&e.__k.some(P))}function B(e,t,s){for(var r=0;r<s.length;r++)H(s[r],s[++r],s[++r]);o.__c&&o.__c(t,e),e.some(function(t){try{e=t.__h,t.__h=[],e.some(function(e){e.call(t)})}catch(e){o.__e(e,t.__v)}})}function H(e,t,s){try{if("function"==typeof e){var r="function"==typeof e.__u;r&&e.__u(),r&&null==t||(e.__u=e(t))}else e.current=t}catch(e){o.__e(e,s)}}function j(e,t,s){return this.constructor(e,s)}i=v.slice,o={__e:function(e,t,s,r){for(var n,a,i;t=t.__;)if((n=t.__c)&&!n.__)try{if((a=n.constructor)&&null!=a.getDerivedStateFromError&&(n.setState(a.getDerivedStateFromError(e)),i=n.__d),null!=n.componentDidCatch&&(n.componentDidCatch(e,r||{}),i=n.__d),i)return n.__E=n}catch(t){e=t}throw e}},l=0,N.prototype.setState=function(e,t){var s;s=null!=this.__s&&this.__s!=this.state?this.__s:this.__s=S({},this.state),"function"==typeof e&&(e=e(S({},s),this.props)),e&&S(s,e),null!=e&&this.__v&&(t&&this._sb.push(t),T(this))},N.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),T(this))},N.prototype.render=I,c=[],h="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,p=function(e,t){return e.__v.__b-t.__v.__b},R.__r=0,d=/(PointerCapture)$|Capture$/i,m=0,f=L(!1),g=L(!0),b=0;var U=function(e,t,s,r){var n;t[0]=0;for(var a=1;a<t.length;a++){var i=t[a++],o=t[a]?(t[0]|=i?1:2,s[t[a++]]):t[++a];3===i?r[0]=o:4===i?r[1]=Object.assign(r[1]||{},o):5===i?(r[1]=r[1]||{})[t[++a]]=o:6===i?r[1][t[++a]]+=o+"":i?(n=e.apply(o,U(e,o,s,["",null])),r.push(n),o[0]?t[0]|=2:(t[a-2]=0,t[a]=n)):r.push(o)}return r},W=new Map,F={};e(F,"State",()=>Z),e(F,"regexp",()=>e4),e(F,"stringToArray",()=>e7),e(F,"Options",()=>ts),e(F,"options",()=>tn),e(F,"MultiToken",()=>ta),e(F,"createTokenClass",()=>ti),e(F,"multi",()=>th),e(F,"reset",()=>tb),e(F,"registerTokenPlugin",()=>tk),e(F,"registerPlugin",()=>tv),e(F,"registerCustomProtocol",()=>tw),e(F,"init",()=>ty),e(F,"tokenize",()=>tS),e(F,"find",()=>tE),e(F,"test",()=>tC),e(F,"text",()=>th);let K="numeric",G="ascii",z="alpha",q="asciinumeric",Q="alphanumeric",V="domain",J="emoji",Y="whitespace";function X(e,t,s){for(let r in t[K]&&(t[q]=!0,t[Q]=!0),t[G]&&(t[q]=!0,t[z]=!0),t[q]&&(t[Q]=!0),t[z]&&(t[Q]=!0),t[Q]&&(t[V]=!0),t[J]&&(t[V]=!0),t){let t=(r in s||(s[r]=[]),s[r]);0>t.indexOf(e)&&t.push(e)}}function Z(e=null){this.j={},this.jr=[],this.jd=null,this.t=e}Z.groups={},Z.prototype={accepts(){return!!this.t},go(e){let t=this.j[e];if(t)return t;for(let t=0;t<this.jr.length;t++){let s=this.jr[t][0],r=this.jr[t][1];if(r&&s.test(e))return r}return this.jd},has(e,t=!1){return t?e in this.j:!!this.go(e)},ta(e,t,s,r){for(let n=0;n<e.length;n++)this.tt(e[n],t,s,r)},tr(e,t,s,r){let n;return r=r||Z.groups,t&&t.j?n=t:(n=new Z(t),s&&r&&X(t,s,r)),this.jr.push([e,n]),n},ts(e,t,s,r){let n=this,a=e.length;if(!a)return n;for(let t=0;t<a-1;t++)n=n.tt(e[t]);return n.tt(e[a-1],t,s,r)},tt(e,t,s,r){if(r=r||Z.groups,t&&t.j)return this.j[e]=t,t;let n,a=this.go(e);return a?(Object.assign((n=new Z).j,a.j),n.jr.push.apply(n.jr,a.jr),n.jd=a.jd,n.t=a.t):n=new Z,t&&(r&&(n.t&&"string"==typeof n.t?X(t,Object.assign(function(e,t){let s={};for(let r in t)t[r].indexOf(e)>=0&&(s[r]=!0);return s}(n.t,r),s),r):s&&X(t,s,r)),n.t=t),this.j[e]=n,n}};let ee=(e,t,s,r,n)=>e.ta(t,s,r,n),et=(e,t,s,r,n)=>e.tr(t,s,r,n),es=(e,t,s,r,n)=>e.ts(t,s,r,n),er=(e,t,s,r,n)=>e.tt(t,s,r,n),en="WORD",ea="UWORD",ei="ASCIINUMERICAL",eo="ALPHANUMERICAL",el="LOCALHOST",ec="UTLD",eu="SCHEME",eh="SLASH_SCHEME",ep="OPENBRACE",ed="CLOSEBRACE",em="OPENBRACKET",ef="CLOSEBRACKET",eg="OPENPAREN",eb="CLOSEPAREN",ek="OPENANGLEBRACKET",ev="CLOSEANGLEBRACKET",ew="FULLWIDTHLEFTPAREN",ey="FULLWIDTHRIGHTPAREN",eS="LEFTCORNERBRACKET",eE="RIGHTCORNERBRACKET",eC="LEFTWHITECORNERBRACKET",e$="RIGHTWHITECORNERBRACKET",e_="FULLWIDTHLESSTHAN",eI="FULLWIDTHGREATERTHAN",eN="AMPERSAND",ex="APOSTROPHE",eT="ASTERISK",eR="BACKSLASH",eO="BACKTICK",eD="CARET",eA="COLON",eL="COMMA",eM="DOLLAR",eP="EQUALS",eB="EXCLAMATION",eH="HYPHEN",ej="PERCENT",eU="PIPE",eW="PLUS",eF="POUND",eK="QUERY",eG="QUOTE",ez="FULLWIDTHMIDDLEDOT",eq="SEMI",eQ="SLASH",eV="TILDE",eJ="UNDERSCORE",eY="EMOJI";var eX=Object.freeze({__proto__:null,ALPHANUMERICAL:eo,AMPERSAND:eN,APOSTROPHE:ex,ASCIINUMERICAL:ei,ASTERISK:eT,AT:"AT",BACKSLASH:eR,BACKTICK:eO,CARET:eD,CLOSEANGLEBRACKET:ev,CLOSEBRACE:ed,CLOSEBRACKET:ef,CLOSEPAREN:eb,COLON:eA,COMMA:eL,DOLLAR:eM,DOT:"DOT",EMOJI:eY,EQUALS:eP,EXCLAMATION:eB,FULLWIDTHGREATERTHAN:eI,FULLWIDTHLEFTPAREN:ew,FULLWIDTHLESSTHAN:e_,FULLWIDTHMIDDLEDOT:ez,FULLWIDTHRIGHTPAREN:ey,HYPHEN:eH,LEFTCORNERBRACKET:eS,LEFTWHITECORNERBRACKET:eC,LOCALHOST:el,NL:"NL",NUM:"NUM",OPENANGLEBRACKET:ek,OPENBRACE:ep,OPENBRACKET:em,OPENPAREN:eg,PERCENT:ej,PIPE:eU,PLUS:eW,POUND:eF,QUERY:eK,QUOTE:eG,RIGHTCORNERBRACKET:eE,RIGHTWHITECORNERBRACKET:e$,SCHEME:eu,SEMI:eq,SLASH:eQ,SLASH_SCHEME:eh,SYM:"SYM",TILDE:eV,TLD:"TLD",UNDERSCORE:eJ,UTLD:ec,UWORD:ea,WORD:en,WS:"WS"});let eZ=/[a-z]/,e0=/\p{L}/u,e1=/\p{Emoji}/u,e2=/\d/,e3=/\s/;var e4=Object.freeze({__proto__:null,ASCII_LETTER:eZ,DIGIT:e2,EMOJI:e1,EMOJI_VARIATION:/\ufe0f/,LETTER:e0,SPACE:e3});let e5=null,e6=null;function e9(e,t){let s=e7(t.replace(/[A-Z]/g,e=>e.toLowerCase())),r=s.length,n=[],a=0,i=0;for(;i<r;){let o=e,l=null,c=0,u=null,h=-1,p=-1;for(;i<r&&(l=o.go(s[i]));)(o=l).accepts()?(h=0,p=0,u=o):h>=0&&(h+=s[i].length,p++),c+=s[i].length,a+=s[i].length,i++;a-=h,i-=p,c-=h,n.push({t:u.t,v:t.slice(a-c,a),s:a-c,e:a})}return n}function e7(e){let t=[],s=e.length,r=0;for(;r<s;){let n,a=e.charCodeAt(r),i=a<55296||a>56319||r+1===s||(n=e.charCodeAt(r+1))<56320||n>57343?e[r]:e.slice(r,r+2);t.push(i),r+=i.length}return t}function e8(e,t,s,r,n){let a,i=t.length;for(let s=0;s<i-1;s++){let i=t[s];e.j[i]?a=e.j[i]:((a=new Z(r)).jr=n.slice(),e.j[i]=a),e=a}return(a=new Z(s)).jr=n.slice(),e.j[t[i-1]]=a,a}function te(e){let t=[],s=[],r=0;for(;r<e.length;){let n=0;for(;"0123456789".indexOf(e[r+n])>=0;)n++;if(n>0){t.push(s.join(""));for(let t=parseInt(e.substring(r,r+n),10);t>0;t--)s.pop();r+=n}else s.push(e[r]),r++}return t}let tt={defaultProtocol:"http",events:null,format:tr,formatHref:tr,nl2br:!1,tagName:"a",target:null,rel:null,validate:!0,truncate:1/0,className:null,attributes:null,ignoreTags:[],render:null};function ts(e,t=null){let s=Object.assign({},tt);e&&(s=Object.assign(s,e instanceof ts?e.o:e));let r=s.ignoreTags,n=[];for(let e=0;e<r.length;e++)n.push(r[e].toUpperCase());this.o=s,t&&(this.defaultRender=t),this.ignoreTags=n}function tr(e){return e}ts.prototype={o:tt,ignoreTags:[],defaultRender:e=>e,check(e){return this.get("validate",e.toString(),e)},get(e,t,s){let r=null!=t,n=this.o[e];return n&&("object"==typeof n?"function"==typeof(n=s.t in n?n[s.t]:tt[e])&&r&&(n=n(t,s)):"function"==typeof n&&r&&(n=n(t,s.t,s))),n},getObj(e,t,s){let r=this.o[e];return"function"==typeof r&&null!=t&&(r=r(t,s.t,s)),r},render(e){let t=e.render(this);return(this.get("render",null,e)||this.defaultRender)(t,e.t,e)}};var tn=Object.freeze({__proto__:null,Options:ts,defaults:tt});function ta(e,t){this.t="token",this.v=e,this.tk=t}function ti(e,t){class s extends ta{constructor(t,s){super(t,s),this.t=e}}for(let e in t)s.prototype[e]=t[e];return s.t=e,s}ta.prototype={isLink:!1,toString(){return this.v},toHref(e){return this.toString()},toFormattedString(e){let t=this.toString(),s=e.get("truncate",t,this),r=e.get("format",t,this);return s&&r.length>s?r.substring(0,s)+"…":r},toFormattedHref(e){return e.get("formatHref",this.toHref(e.get("defaultProtocol")),this)},startIndex(){return this.tk[0].s},endIndex(){return this.tk[this.tk.length-1].e},toObject(e=tt.defaultProtocol){return{type:this.t,value:this.toString(),isLink:this.isLink,href:this.toHref(e),start:this.startIndex(),end:this.endIndex()}},toFormattedObject(e){return{type:this.t,value:this.toFormattedString(e),isLink:this.isLink,href:this.toFormattedHref(e),start:this.startIndex(),end:this.endIndex()}},validate(e){return e.get("validate",this.toString(),this)},render(e){let t=this.toHref(e.get("defaultProtocol")),s=e.get("formatHref",t,this),r=e.get("tagName",t,this),n=this.toFormattedString(e),a={},i=e.get("className",t,this),o=e.get("target",t,this),l=e.get("rel",t,this),c=e.getObj("attributes",t,this),u=e.getObj("events",t,this);return a.href=s,i&&(a.class=i),o&&(a.target=o),l&&(a.rel=l),c&&Object.assign(a,c),{tagName:r,attributes:a,content:n,eventListeners:u}}};let to=ti("email",{isLink:!0,toHref(){return"mailto:"+this.toString()}}),tl=ti("text"),tc=ti("nl"),tu=ti("url",{isLink:!0,toHref(e=tt.defaultProtocol){return this.hasProtocol()?this.v:`${e}://${this.v}`},hasProtocol(){let e=this.tk;return e.length>=2&&e[0].t!==el&&e[1].t===eA}});var th=Object.freeze({__proto__:null,Base:ta,Email:to,MultiToken:ta,Nl:tc,Text:tl,Url:tu,createTokenClass:ti});let tp=e=>new Z(e);function td(e,t,s){let r=s[0].s,n=s[s.length-1].e;return new e(t.slice(r,n),s)}let tm="u">typeof console&&console&&console.warn||(()=>{}),tf="until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.",tg={scanner:null,parser:null,tokenQueue:[],pluginQueue:[],customSchemes:[],initialized:!1};function tb(){return Z.groups={},tg.scanner=null,tg.parser=null,tg.tokenQueue=[],tg.pluginQueue=[],tg.customSchemes=[],tg.initialized=!1,tg}function tk(e,t){if("function"!=typeof t)throw Error(`linkifyjs: Invalid token plugin ${t} (expects function)`);for(let s=0;s<tg.tokenQueue.length;s++)if(e===tg.tokenQueue[s][0]){tm(`linkifyjs: token plugin "${e}" already registered - will be overwritten`),tg.tokenQueue[s]=[e,t];return}tg.tokenQueue.push([e,t]),tg.initialized&&tm(`linkifyjs: already initialized - will not register token plugin "${e}" ${tf}`)}function tv(e,t){if("function"!=typeof t)throw Error(`linkifyjs: Invalid plugin ${t} (expects function)`);for(let s=0;s<tg.pluginQueue.length;s++)if(e===tg.pluginQueue[s][0]){tm(`linkifyjs: plugin "${e}" already registered - will be overwritten`),tg.pluginQueue[s]=[e,t];return}tg.pluginQueue.push([e,t]),tg.initialized&&tm(`linkifyjs: already initialized - will not register plugin "${e}" ${tf}`)}function tw(e,t=!1){if(tg.initialized&&tm(`linkifyjs: already initialized - will not register custom scheme "${e}" ${tf}`),!/^[0-9a-z]+(-[0-9a-z]+)*$/.test(e))throw Error(`linkifyjs: incorrect scheme format.
1. Must only contain digits, lowercase ASCII letters or "-"
2. Cannot start or end with "-"
3. "-" cannot repeat`);tg.customSchemes.push([e,t])}function ty(){tg.scanner=function(e=[]){let t={};Z.groups=t;let s=new Z;null==e5&&(e5=te("aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2")),null==e6&&(e6=te("ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2")),er(s,"'",ex),er(s,"{",ep),er(s,"}",ed),er(s,"[",em),er(s,"]",ef),er(s,"(",eg),er(s,")",eb),er(s,"<",ek),er(s,">",ev),er(s,"（",ew),er(s,"）",ey),er(s,"「",eS),er(s,"」",eE),er(s,"『",eC),er(s,"』",e$),er(s,"＜",e_),er(s,"＞",eI),er(s,"&",eN),er(s,"*",eT),er(s,"@","AT"),er(s,"`",eO),er(s,"^",eD),er(s,":",eA),er(s,",",eL),er(s,"$",eM),er(s,".","DOT"),er(s,"=",eP),er(s,"!",eB),er(s,"-",eH),er(s,"%",ej),er(s,"|",eU),er(s,"+",eW),er(s,"#",eF),er(s,"?",eK),er(s,'"',eG),er(s,"/",eQ),er(s,";",eq),er(s,"~",eV),er(s,"_",eJ),er(s,"\\",eR),er(s,"・",ez);let r=et(s,e2,"NUM",{[K]:!0});et(r,e2,r);let n=et(r,eZ,ei,{[q]:!0}),a=et(r,e0,eo,{[Q]:!0}),i=et(s,eZ,en,{[G]:!0});et(i,e2,n),et(i,eZ,i),et(n,e2,n),et(n,eZ,n);let o=et(s,e0,ea,{[z]:!0});et(o,eZ),et(o,e2,a),et(o,e0,o),et(a,e2,a),et(a,eZ),et(a,e0,a);let l=er(s,"\n","NL",{[Y]:!0}),c=er(s,"\r","WS",{[Y]:!0}),u=et(s,e3,"WS",{[Y]:!0});er(s,"￼",u),er(c,"\n",l),er(c,"￼",u),et(c,e3,u),er(u,"\r"),er(u,"\n"),et(u,e3,u),er(u,"￼",u);let h=et(s,e1,eY,{[J]:!0});er(h,"#"),et(h,e1,h),er(h,"️",h);let p=er(h,"‍");er(p,"#"),et(p,e1,h);let d=[[eZ,i],[e2,n]],m=[[eZ,null],[e0,o],[e2,a]];for(let e=0;e<e5.length;e++)e8(s,e5[e],"TLD",en,d);for(let e=0;e<e6.length;e++)e8(s,e6[e],ec,ea,m);X("TLD",{tld:!0,ascii:!0},t),X(ec,{utld:!0,alpha:!0},t),e8(s,"file",eu,en,d),e8(s,"mailto",eu,en,d),e8(s,"http",eh,en,d),e8(s,"https",eh,en,d),e8(s,"ftp",eh,en,d),e8(s,"ftps",eh,en,d),X(eu,{scheme:!0,ascii:!0},t),X(eh,{slashscheme:!0,ascii:!0},t),e=e.sort((e,t)=>e[0]>t[0]?1:-1);for(let t=0;t<e.length;t++){let r=e[t][0],n=e[t][1]?{scheme:!0}:{slashscheme:!0};r.indexOf("-")>=0?n[V]=!0:eZ.test(r)?e2.test(r)?n[q]=!0:n[G]=!0:n[K]=!0,es(s,r,r,n)}return es(s,"localhost",el,{ascii:!0}),s.jd=new Z("SYM"),{start:s,tokens:Object.assign({groups:t},eX)}}(tg.customSchemes);for(let e=0;e<tg.tokenQueue.length;e++)tg.tokenQueue[e][1]({scanner:tg.scanner});tg.parser=function({groups:e}){let t=e.domain.concat([eN,eT,"AT",eR,eO,eD,eM,eP,eH,"NUM",ej,eU,eW,eF,eQ,"SYM",eV,eJ]),s=[ex,eA,eL,"DOT",eB,ej,eK,eG,eq,ek,ev,ep,ed,ef,em,eg,eb,ew,ey,eS,eE,eC,e$,e_,eI],r=[eN,ex,eT,eR,eO,eD,eM,eP,eH,ep,ed,ej,eU,eW,eF,eK,eQ,"SYM",eV,eJ],n=tp(),a=er(n,eV);ee(a,r,a),ee(a,e.domain,a);let i=tp(),o=tp(),l=tp();ee(n,e.domain,i),ee(n,e.scheme,o),ee(n,e.slashscheme,l),ee(i,r,a),ee(i,e.domain,i);let c=er(i,"AT");er(a,"AT",c),er(o,"AT",c),er(l,"AT",c);let u=er(a,"DOT");ee(u,r,a),ee(u,e.domain,a);let h=tp();ee(c,e.domain,h),ee(h,e.domain,h);let p=er(h,"DOT");ee(p,e.domain,h);let d=tp(to);ee(p,e.tld,d),ee(p,e.utld,d),er(c,el,d);let m=er(h,eH);er(m,eH,m),ee(m,e.domain,h),ee(d,e.domain,h),er(d,"DOT",p),er(d,eH,m),ee(er(d,eA),e.numeric,to);let f=er(i,eH),g=er(i,"DOT");er(f,eH,f),ee(f,e.domain,i),ee(g,r,a),ee(g,e.domain,i);let b=tp(tu);ee(g,e.tld,b),ee(g,e.utld,b),ee(b,e.domain,i),ee(b,r,a),er(b,"DOT",g),er(b,eH,f),er(b,"AT",c);let k=er(b,eA),v=tp(tu);ee(k,e.numeric,v);let w=tp(tu),y=tp();ee(w,t,w),ee(w,s,y),ee(y,t,w),ee(y,s,y),er(b,eQ,w),er(v,eQ,w);let S=er(o,eA),E=er(l,eA),C=er(E,eQ),$=er(C,eQ);ee(o,e.domain,i),er(o,"DOT",g),er(o,eH,f),ee(l,e.domain,i),er(l,"DOT",g),er(l,eH,f),ee(S,e.domain,w),er(S,eQ,w),er(S,eK,w),ee($,e.domain,w),ee($,t,w),er($,eQ,w);let _=[[ep,ed],[em,ef],[eg,eb],[ek,ev],[ew,ey],[eS,eE],[eC,e$],[e_,eI]];for(let e=0;e<_.length;e++){let[r,n]=_[e],a=er(w,r);er(y,r,a),er(a,n,w);let i=tp(tu);ee(a,t,i);let o=tp();ee(a,s),ee(i,t,i),ee(i,s,o),ee(o,t,i),ee(o,s,o),er(i,n,w),er(o,n,w)}return er(n,el,b),er(n,"NL",tc),{start:n,tokens:eX}}(tg.scanner.tokens);for(let e=0;e<tg.pluginQueue.length;e++)tg.pluginQueue[e][1]({scanner:tg.scanner,parser:tg.parser});return tg.initialized=!0,tg}function tS(e){return tg.initialized||ty(),function(e,t,s){let r=s.length,n=0,a=[],i=[];for(;n<r;){let o=e,l=null,c=null,u=0,h=null,p=-1;for(;n<r&&!(l=o.go(s[n].t));)i.push(s[n++]);for(;n<r&&(c=l||o.go(s[n].t));)l=null,(o=c).accepts()?(p=0,h=o):p>=0&&p++,n++,u++;if(p<0)(n-=u)<r&&(i.push(s[n]),n++);else{i.length>0&&(a.push(td(tl,t,i)),i=[]),n-=p,u-=p;let e=h.t,r=s.slice(n-u,n);a.push(td(e,t,r))}}return i.length>0&&a.push(td(tl,t,i)),a}(tg.parser.start,e,e9(tg.scanner.start,e))}function tE(e,t=null,s=null){if(t&&"object"==typeof t){if(s)throw Error(`linkifyjs: Invalid link type ${t}; must be a string`);s=t,t=null}let r=new ts(s),n=tS(e),a=[];for(let e=0;e<n.length;e++){let s=n[e];s.isLink&&(!t||s.t===t)&&r.check(s)&&a.push(s.toFormattedObject(r))}return a}function tC(e,t=null){let s=tS(e);return 1===s.length&&s[0].isLink&&(!t||s[0].t===t)}tS.scan=e9;let t$=(function(e){var t=W.get(this);return t||(t=new Map,W.set(this,t)),(t=U(this,t.get(e)||(t.set(e,t=function(e){for(var t,s,r=1,n="",a="",i=[0],o=function(e){1===r&&(e||(n=n.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?i.push(0,e,n):3===r&&(e||n)?(i.push(3,e,n),r=2):2===r&&"..."===n&&e?i.push(4,e,0):2===r&&n&&!e?i.push(5,0,!0,n):r>=5&&((n||!e&&5===r)&&(i.push(r,0,n,s),r=6),e&&(i.push(r,e,0,s),r=6)),n=""},l=0;l<e.length;l++){l&&(1===r&&o(),o(l));for(var c=0;c<e[l].length;c++)t=e[l][c],1===r?"<"===t?(o(),i=[i],r=3):n+=t:4===r?"--"===n&&">"===t?(r=1,n=""):n=t+n[0]:a?t===a?a="":n+=t:'"'===t||"'"===t?a=t:">"===t?(o(),r=1):r&&("="===t?(r=5,s=n,n=""):"/"===t&&(r<5||">"===e[l][c+1])?(o(),3===r&&(i=i[0]),r=i,(i=i[0]).push(2,0,r),r=0):" "===t||"	"===t||"\n"===t||"\r"===t?(o(),r=2):n+=t),3===r&&"!--"===n&&(r=4,i=i[0])}return o(),i}(e)),t),arguments,[])).length>1?t:t[0]}).bind(C),t_="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",tI={"~":"owner","&":"admin","@":"operator","%":"halfop","+":"voice"},tN={"~":"q","&":"a","@":"o","%":"h","+":"v"},tx={";":"\\:"," ":"\\s","\\":"\\\\","\r":"\\r","\n":"\\n"},tT=Object.fromEntries(Object.entries(tx).map(([e,t])=>[t,e]));function tR(e){let t={};return e.split(";").forEach(e=>{if(!e)return;let s=e.split("=",2),r=s[0],n=null;2===s.length&&(n=s[1].replace(/\\[:s\\rn]/g,e=>tT[e])).endsWith("\\")&&(n=n.slice(0,n.length-1)),t[r]=n}),t}function tO(e){let t=[];for(let s in e){if(void 0===e[s]||null===e[s]){t.push(s);continue}let r=String(e[s]).replace(/[; \\\r\n]/g,e=>tx[e]);t.push(s+"="+r)}return t.join(";")}function tD(e){let t=null,s=e.indexOf("@");s>0&&(t=e.slice(s+1),e=e.slice(0,s));let r=null;return(s=e.indexOf("!"))>0&&(r=e.slice(s+1),e=e.slice(0,s)),{name:e,user:r,host:t}}function tA(e){e.endsWith("\r\n")&&(e=e.slice(0,e.length-2));let t={tags:{},prefix:null,command:null,params:[]};if(e.startsWith("@")){let s=e.indexOf(" ");if(s<0)throw Error("expected a space after tags");t.tags=tR(e.slice(1,s)),e=e.slice(s+1)}if(e.startsWith(":")){let s=e.indexOf(" ");if(s<0)throw Error("expected a space after prefix");t.prefix=tD(e.slice(1,s)),e=e.slice(s+1)}let s=e.indexOf(" ");if(s<0)return t.command=e,t;for(t.command=e.slice(0,s),e=e.slice(s+1);;){if(e.startsWith(":")){t.params.push(e.slice(1));break}if((s=e.indexOf(" "))<0){t.params.push(e);break}t.params.push(e.slice(0,s)),e=e.slice(s+1)}return t}function tL(e){var t;let s,r="";if(e.tags&&Object.keys(e.tags).length>0&&(r+="@"+tO(e.tags)+" "),e.prefix&&(r+=":"+(s=(t=e.prefix).name,t.user&&(s+="!"+t.user),t.host&&(s+="@"+t.host),s)+" "),r+=e.command,e.params&&e.params.length>0){for(let t=0;t<e.params.length-1;t++)r+=" "+e.params[t];let t=String(e.params[e.params.length-1]);0===t.length||t.startsWith(":")||t.indexOf(" ")>=0?r+=" :"+t:r+=" "+t}return r}function tM(e,t="~&@%+"){let s;for(s=0;s<e.length&&!(0>t.indexOf(e[s]));s++);return{prefix:e.slice(0,s),name:e.slice(s)}}let tP=(()=>{try{return RegExp(/^[\p{L}0-9]$/,"u")}catch(e){return RegExp(/^[a-zA-Z0-9]$/,"u")}})(),tB=new RegExp(/^\s$/);function tH(e){switch(e){case"-":case"_":case"|":return!1;default:return!tP.test(e)}}function tj(e){if(e>="400"&&e<="568")return!0;switch(e){case"902":case"904":case"905":case"906":case"907":case"734":case"FAIL":return!0;default:return!1}}function tU(e){let t=e.getUTCFullYear().toString().padStart(4,"0"),s=(e.getUTCMonth()+1).toString().padStart(2,"0"),r=e.getUTCDate().toString().padStart(2,"0"),n=e.getUTCHours().toString().padStart(2,"0"),a=e.getUTCMinutes().toString().padStart(2,"0"),i=e.getUTCSeconds().toString().padStart(2,"0"),o=e.getUTCMilliseconds().toString().padStart(3,"0");return`${t}-${s}-${r}T${n}:${a}:${i}.${o}Z`}function tW(e){let t;if("PRIVMSG"!==e.command&&"NOTICE"!==e.command)return null;let s=e.params[1];if(!s.startsWith("\x01"))return null;(s=s.slice(1)).endsWith("\x01")&&(s=s.slice(0,-1));let r=s.indexOf(" ");return(t=r>=0?{command:s.slice(0,r),param:s.slice(r+1)}:{command:s,param:""}).command=t.command.toUpperCase(),t}class tF{raw=new Map;parse(e){e.forEach(e=>{if(e.startsWith("-")){let t=e.slice(1);this.raw.delete(t.toUpperCase());return}let t=e.indexOf("="),s=e,r="";t>=0&&(s=e.slice(0,t),r=e.slice(t+1).replace(/\\x[0-9A-Z]{2}/gi,e=>String.fromCharCode(parseInt(e.slice(2),16)))),s=s.toUpperCase(),this.raw.set(s,r)})}caseMapping(){let e=this.raw.get("CASEMAPPING");if(!e)return tK.RFC1459;let t=tK.byName(e);return t||(console.error("Unsupported case-mapping '"+e+"', falling back to RFC 1459"),tK.RFC1459)}monitor(){if(!this.raw.has("MONITOR"))return 0;let e=this.raw.get("MONITOR");return""===e?1/0:parseInt(e,10)}whox(){return this.raw.has("WHOX")}prefix(){return this.raw.get("PREFIX")||""}chanTypes(){return this.raw.get("CHANTYPES")||"#&+!"}statusMsg(){return this.raw.get("STATUSMSG")}network(){return this.raw.get("NETWORK")}chatHistory(){if(!this.raw.has("CHATHISTORY"))return 0;let e=parseInt(this.raw.get("CHATHISTORY"),10);return e<=0?1/0:e}bouncerNetID(){return this.raw.get("BOUNCER_NETID")}chanModes(){let e=["beI","k","l","imnst"];if(!this.raw.has("CHANMODES"))return e;let t=this.raw.get("CHANMODES").split(",");return 4!==t.length?(console.error("Invalid CHANMODES: ",this.raw.get("CHANMODES")),e):t}bot(){return this.raw.get("BOT")}userLen(){return this.raw.has("USERLEN")?parseInt(this.raw.get("USERLEN"),10):20}hostLen(){return this.raw.has("HOSTLEN")?parseInt(this.raw.get("HOSTLEN"),10):63}lineLen(){return this.raw.has("LINELEN")?parseInt(this.raw.get("LINELEN"),10):512}filehost(){return this.raw.get("SOJU.IM/FILEHOST")}}let tK={ASCII(e){let t="";for(let s=0;s<e.length;s++){let r=e[s];"A"<=r&&r<="Z"&&(r=r.toLowerCase()),t+=r}return t},RFC1459(e){let t="";for(let s=0;s<e.length;s++){let r=e[s];"A"<=r&&r<="Z"?r=r.toLowerCase():"{"===r?r="[":"}"===r?r="]":"\\"===r?r="|":"~"===r&&(r="^"),t+=r}return t},RFC1459Strict(e){let t="";for(let s=0;s<e.length;s++){let r=e[s];"A"<=r&&r<="Z"?r=r.toLowerCase():"{"===r?r="[":"}"===r?r="]":"\\"===r&&(r="|"),t+=r}return t},byName(e){switch(e){case"ascii":return tK.ASCII;case"rfc1459":return tK.RFC1459;case"rfc1459-strict":return tK.RFC1459Strict}return null}};function tG(e,t){let s;return(s={next:()=>{let{value:s,done:r}=e.next();return r?{done:!0}:{value:t(s),done:!1}}})[Symbol.iterator]=()=>s,s}class tz{caseMap=null;map=null;constructor(e,t){if(e instanceof tz&&(e.caseMap===t||!t))this.caseMap=e.caseMap,this.map=new Map(e.map);else{if(!t)throw Error("Missing case-mapping when creating CaseMapMap");if(this.caseMap=t,this.map=new Map,e)for(let[t,s]of e)this.set(t,s)}}get size(){return this.map.size}has(e){return this.map.has(this.caseMap(e))}get(e){let t=this.map.get(this.caseMap(e));if(t)return t.value}set(e,t){this.map.set(this.caseMap(e),{key:e,value:t})}delete(e){this.map.delete(this.caseMap(e))}entries(){return tG(this.map.values(),e=>[e.key,e.value])}keys(){return tG(this.map.values(),e=>e.key)}values(){return tG(this.map.values(),e=>e.value)}[Symbol.iterator](){return this.entries()}}function tq(e){if("("!==e[0])throw Error("malformed ISUPPORT PREFIX value: expected opening parenthesis");let t=e.indexOf(")");if(t<0)throw Error("malformed ISUPPORT PREFIX value: expected closing parenthesis");let s=e.length-t-1,r=[];for(let n=0;n<s;n++){let s=e[n+1],a=e[t+n+1];r.push({mode:s,prefix:a})}return r}function tQ(e,t){let s=e.batch;for(;s;){if(s.type===t)return s;s=s.parent}return null}function tV(e,t){return!!e&&e!==t&&"realname"!==e.toLowerCase()&&"unknown"!==e.toLowerCase()&&"fullname"!==e.toLowerCase()}function tJ(e){let t,s;if(!e.startsWith("irc://")&&!e.startsWith("ircs://"))return null;let r=(e=e.slice(e.indexOf(":")+3)).indexOf("/");r<0?(t=e,e=""):(t=e.slice(0,r),e=e.slice(r+1));let n=t;if((r=t.indexOf("@"))>=0&&(n=t.slice(r+1)),(r=e.indexOf("?"))>=0&&(e=e.slice(0,r)),(r=e.indexOf(","))>=0){let t=e.slice(r+1).split(",");e=e.slice(0,r),t.indexOf("isuser")>=0?s="user":t.indexOf("ischannel")>=0&&(s="channel")}let a=decodeURIComponent(e);return s||(s=a.startsWith("#")?"channel":"user"),{host:n,enttype:s,entity:a}}function tY({host:e,enttype:t,entity:s}={}){let r="irc://"+(e=e||"")+"/"+encodeURIComponent(s=s||"");return t&&(r+=",is"+t),r}class tX{available=new Map;enabled=new Set;addAvailable(e){e.split(" ").forEach(e=>{let t=e.indexOf("="),s=e,r="";t>=0&&(s=e.slice(0,t),r=e.slice(t+1)),this.available.set(s.toLowerCase(),r)})}parse(e){if("CAP"!==e.command)return;let t=e.params[1],s=e.params.slice(2);switch(t){case"LS":this.addAvailable(s[s.length-1]);break;case"NEW":this.addAvailable(s[0]);break;case"DEL":s[0].split(" ").forEach(e=>{e=e.toLowerCase(),this.available.delete(e),this.enabled.delete(e)});break;case"ACK":s[0].split(" ").forEach(e=>{(e=e.toLowerCase()).startsWith("-")?this.enabled.delete(e.slice(1)):this.enabled.add(e)})}}requestAvailable(e){return 0===(e=e.filter(e=>this.available.has(e)&&!this.enabled.has(e))).length?null:{command:"CAP",params:["REQ",e.join(" ")]}}}let tZ=["account-notify","away-notify","batch","chghost","echo-message","extended-join","extended-monitor","invite-notify","labeled-response","message-tags","multi-prefix","sasl","server-time","setname","draft/account-registration","draft/chathistory","draft/extended-monitor","draft/message-redaction","draft/read-marker","soju.im/bouncer-networks"],t0={1001:"going away",1002:"protocol error",1003:"unsupported data",1005:"no status code received",1006:"abnormal closure",1007:"invalid frame payload data",1008:"policy violation",1009:"message too big",1010:"missing mandatory extension",1011:"internal server error",1015:"TLS handshake failed"},t1={channel:"c",username:"u",hostname:"h",server:"s",nick:"n",flags:"f",account:"a",realname:"r"},t2={name:"*"},t3=0,t4=0;class t5 extends Error{constructor(e){super(e.params.length>0?e.params[e.params.length-1]:`unknown error (${e.command})`),this.msg=e}}class t6 extends Error{constructor(e){let t="Connection error",s=t0[e];s&&(t+=" ("+s+")"),super(t)}}class t9{n=0;constructor(e,t){this.base=e,this.max=t}reset(){this.n=0}next(){if(0===this.n)return this.n=1,0;let e=this.n*this.base;return e>this.max?e=this.max:this.n*=2,e}}class t7 extends EventTarget{static Status={DISCONNECTED:"disconnected",CONNECTING:"connecting",REGISTERING:"registering",REGISTERED:"registered"};status=t7.Status.DISCONNECTED;serverPrefix=t2;nick=null;supportsCap=!1;caps=new tX;isupport=new tF;ws=null;params={url:null,username:null,realname:null,nick:null,pass:null,saslPlain:null,saslExternal:!1,saslOauthBearer:null,bouncerNetwork:null,ping:0,eventPlayback:!0};debug=!1;batches=new Map;autoReconnect=!0;reconnectTimeoutID=null;reconnectBackoff=new t9(1e4,6e5);lastReconnectDate=new Date(0);pingIntervalID=null;pendingCmds={WHO:Promise.resolve(null),CHATHISTORY:Promise.resolve(null)};cm=tK.RFC1459;monitored=new tz(null,tK.RFC1459);pendingLists=new tz(null,tK.RFC1459);whoxQueries=new Map;constructor(e){super(),this.handleOnline=this.handleOnline.bind(this),this.params={...this.params,...e},this.reconnect()}reconnect(){let e=this.autoReconnect;this.disconnect(),this.autoReconnect=e,console.log("Connecting to "+this.params.url),this.setStatus(t7.Status.CONNECTING),this.lastReconnectDate=new Date;try{this.ws=new WebSocket(this.params.url)}catch(e){console.error("Failed to create connection:",e),setTimeout(()=>{this.dispatchError(Error("Failed to create connection",{cause:e})),this.setStatus(t7.Status.DISCONNECTED)},0);return}this.ws.addEventListener("open",this.handleOpen.bind(this)),this.ws.addEventListener("message",e=>{try{this.handleMessage(e)}catch(e){this.dispatchError(e),this.disconnect()}}),this.ws.addEventListener("close",e=>{if(console.log("Connection closed (code: "+e.code+")"),1e3!==e.code&&1001!==e.code&&this.dispatchError(new t6(e.code)),this.ws=null,this.setStatus(t7.Status.DISCONNECTED),this.nick=null,this.serverPrefix=t2,this.caps=new tX,this.batches=new Map,Object.keys(this.pendingCmds).forEach(e=>{this.pendingCmds[e]=Promise.resolve(null)}),this.isupport=new tF,this.monitored=new tz(null,tK.RFC1459),this.autoReconnect)if(window.addEventListener("online",this.handleOnline),navigator.onLine){let e=this.reconnectBackoff.next();new Date().getTime()-this.lastReconnectDate.getTime()<1e4&&(e=Math.max(e,1e4)),console.info("Reconnecting to server in "+e/1e3+" seconds"),clearTimeout(this.reconnectTimeoutID),this.reconnectTimeoutID=setTimeout(()=>{this.reconnect()},e)}else console.info("Waiting for network to go back online")})}disconnect(){this.autoReconnect=!1,clearTimeout(this.reconnectTimeoutID),this.reconnectTimeoutID=null,window.removeEventListener("online",this.handleOnline),this.setPingInterval(0),this.ws&&this.ws.close(1e3)}setStatus(e){this.status!==e&&(this.status=e,this.dispatchEvent(new CustomEvent("status")))}dispatchError(e){this.dispatchEvent(new CustomEvent("error",{detail:e}))}handleOnline(){window.removeEventListener("online",this.handleOnline),this.autoReconnect&&this.status===t7.Status.DISCONNECTED&&this.reconnect()}handleOpen(){console.log("Connection opened"),this.setStatus(t7.Status.REGISTERING),this.reconnectBackoff.reset(),this.setPingInterval(this.params.ping),this.nick=this.params.nick,this.send({command:"CAP",params:["LS","302"]}),this.params.pass&&this.send({command:"PASS",params:[this.params.pass]}),this.send({command:"NICK",params:[this.nick]}),this.send({command:"USER",params:[this.params.username,"0","*",this.params.realname]})}pushPendingList(e,t){let s=this.pendingLists.get(e);s||(s=[],this.pendingLists.set(e,s)),s.push(t)}endPendingList(e,t){t.list=this.pendingLists.get(e)||[],this.pendingLists.delete(e)}handleMessage(e){if("string"!=typeof e.data){console.error("Received unsupported data type:",e.data),this.ws.close(1003);return}let t=e.data;this.debug&&console.debug("Received:",t);let s=tA(t);s.prefix||(s.prefix=this.serverPrefix),s.tags||(s.tags={});let r=null;s.tags.batch&&(r=this.batches.get(s.tags.batch))&&(s.batch=r);let n=null;switch(s.command){case"001":if(this.params.saslPlain&&!this.supportsCap){this.dispatchError(Error("Server doesn't support SASL PLAIN")),this.disconnect();return}s.prefix&&(this.serverPrefix=s.prefix),this.nick=s.params[0],console.log("Registration complete"),this.setStatus(t7.Status.REGISTERED);break;case"005":let a=this.isupport.monitor(),i=s.params.slice(1,-1);this.isupport.parse(i),this.updateCaseMapping();let o=this.isupport.monitor();if(0===a&&this.monitored.size>0&&o>0){let e=Array.from(this.monitored.keys()).slice(0,o);this.send({command:"MONITOR",params:["+",e.join(",")]})}break;case"376":case"422":this.isupport.raw.has("CASEMAPPING")||this.updateCaseMapping();break;case"CAP":this.handleCap(s);break;case"AUTHENTICATE":let l=s.params[0];"+"!==l&&(this.dispatchError(Error("Expected an empty challenge, got: "+l)),this.send({command:"AUTHENTICATE",params:["*"]}));break;case"900":console.log("Logged in");break;case"901":console.log("Logged out");break;case"353":this.pushPendingList("NAMES "+s.params[2],s);break;case"366":this.endPendingList("NAMES "+s.params[1],s);break;case"311":case"312":case"313":case"317":case"319":this.pushPendingList("WHOIS "+s.params[1],s);break;case"318":this.endPendingList("WHOIS "+s.params[1],s);break;case"352":case"354":this.pushPendingList("WHO",s);break;case"315":this.endPendingList("WHO",s);break;case"PING":this.send({command:"PONG",params:[s.params[0]]});break;case"NICK":let c=s.params[0];this.isMyNick(s.prefix.name)&&(this.nick=c);break;case"BATCH":let u=s.params[0].startsWith("+"),h=s.params[0].slice(1);if(u){let e={name:h,type:s.params[1],params:s.params.slice(2),tags:s.tags,parent:r};this.batches.set(h,e)}else n=h;break;case"ERROR":this.dispatchError(new t5(s)),this.disconnect();break;case"464":case"432":case"433":case"436":case"437":case"463":case"465":this.dispatchError(new t5(s)),this.status!==t7.Status.REGISTERED&&this.disconnect();break;case"FAIL":if(this.status===t7.Status.REGISTERED)break;"BOUNCER"===s.params[0]&&"BIND"===s.params[2]&&(this.dispatchError(Error("Failed to bind to bouncer network",{cause:new t5(s)})),this.disconnect()),"ACCOUNT_REQUIRED"===s.params[1]&&(this.dispatchError(new t5(s)),this.disconnect())}this.dispatchEvent(new CustomEvent("message",{detail:{message:s,batch:r}})),n&&this.batches.delete(n)}authenticate(e,t){let s;if(!this.supportsSASL(e))throw Error(`${e} authentication not supported by the server`);switch(console.log(`Starting SASL ${e} authentication`),e){case"PLAIN":s="\0"+t.username+"\0"+t.password;break;case"EXTERNAL":s="";break;case"OAUTHBEARER":s="n,,\x01auth=Bearer "+t.token+"\x01\x01";break;default:throw Error(`Unknown authentication mechanism '${e}'`)}let r=this.roundtrip({command:"AUTHENTICATE",params:[e]},e=>{switch(e.command){case"903":return!0;case"902":case"904":case"905":case"906":case"907":throw new t5(e)}});for(let e of function(e){let t=function(e){if(!window.TextEncoder)return btoa(e);let t=new TextEncoder().encode(e),s=t.length%3,r="";for(let e=0;e<t.length-s;e+=3){let s=(t[e]<<16)+(t[e+1]<<8)+t[e+2];r+=t_[s>>18&63],r+=t_[s>>12&63],r+=t_[s>>6&63],r+=t_[63&s]}if(1===s){let e=t[t.length-1];r+=t_[e>>2],r+=t_[e<<4&63],r+="=="}else if(2===s){let e=(t[t.length-2]<<8)+t[t.length-1];r+=t_[e>>10],r+=t_[e>>4&63],r+=t_[e<<2&63],r+="="}return r}(e),s=[];for(let e=0;e<=t.length;e+=400){let r=t.substring(e,e+400);s.push({command:"AUTHENTICATE",params:[r||"+"]})}return s}(s))this.send(e);return r}who(e,t){let s=[e],r="",n="";t&&this.isupport.whox()&&(r="t",t.fields&&t.fields.forEach(e=>{if(!t1[e])throw Error(`Unknown WHOX field ${e}`);r+=t1[e]}),n=String(t4%1e3),t4++,s.push(`%${r},${n}`),this.whoxQueries.set(n,r));let a={command:"WHO",params:s},i=[],o=this.pendingCmds.WHO.then(()=>this.roundtrip(a,t=>{switch(t.command){case"352":t.internal=!0,i.push(this.parseWhoReply(t));break;case"354":if(t.params.length!==r.length+1||t.params[1]!==n)break;t.internal=!0,i.push(this.parseWhoReply(t));break;case"315":if(t.params[1]===e)return t.internal=!0,i}}).finally(()=>{this.whoxQueries.delete(n)}));return this.pendingCmds.WHO=o.catch(()=>{}),o}parseWhoReply(e){switch(e.command){case"352":let t=e.params[e.params.length-1];return{username:e.params[2],hostname:e.params[3],server:e.params[4],nick:e.params[5],flags:e.params[6],realname:t.slice(t.indexOf(" ")+1)};case"354":let s=e.params[1],r=this.whoxQueries.get(s);if(!r)throw Error("Unknown WHOX token: "+s);let n={},a=0;return Object.keys(t1).forEach(t=>{!(0>r.indexOf(t1[t]))&&(n[t]=e.params[2+a],a++)}),"0"===n.account&&(n.account=null),n;default:throw Error("Not a WHO reply: "+e.command)}}whois(e){let t=this.cm(e);return this.roundtrip({command:"WHOIS",params:[e]},e=>{let s;switch(e.command){case"318":if(s=e.params[1],this.cm(s)===t){let t={};return e.list.forEach(e=>{t[e.command]=e}),t}break;case"401":if(s=e.params[1],this.cm(s)===t)throw new t5(e)}})}supportsSASL(e){let t=this.caps.available.get("sasl");return void 0!==t&&t.split(",").includes(e)}checkAccountRegistrationCap(e){let t=this.caps.available.get("draft/account-registration");return void 0!==t&&t.split(",").includes(e)}requestCaps(){let e=[].concat(tZ);this.params.bouncerNetwork||e.push("soju.im/bouncer-networks-notify"),this.params.eventPlayback&&e.push("draft/event-playback");let t=this.caps.requestAvailable(e);t&&this.send(t)}handleCap(e){this.caps.parse(e);let t=e.params[1],s=e.params.slice(2);switch(t){case"LS":if(this.supportsCap=!0,"*"===s[0])break;if(console.log("Available server caps:",this.caps.available),this.requestCaps(),this.status!==t7.Status.REGISTERED){if(this.caps.available.has("sasl")){let e;this.params.saslPlain?e=this.authenticate("PLAIN",this.params.saslPlain):this.params.saslExternal?e=this.authenticate("EXTERNAL"):this.params.saslOauthBearer&&(e=this.authenticate("OAUTHBEARER",this.params.saslOauthBearer)),(e||Promise.resolve()).catch(e=>{this.dispatchError(e),this.disconnect()})}this.caps.available.has("soju.im/bouncer-networks")&&this.params.bouncerNetwork&&this.send({command:"BOUNCER",params:["BIND",this.params.bouncerNetwork]}),this.send({command:"CAP",params:["END"]})}break;case"NEW":console.log("Server added available caps:",s[0]),this.requestCaps();break;case"DEL":console.log("Server removed available caps:",s[0]);break;case"ACK":console.log("Server ack'ed caps:",s[0]);break;case"NAK":console.log("Server nak'ed caps:",s[0]),this.status!==t7.Status.REGISTERED&&this.send({command:"CAP",params:["END"]})}}send(e){if(!this.ws)throw Error("Failed to send IRC message "+e.command+": socket is closed");let t=tL(e);this.ws.send(t),this.debug&&console.debug("Sent:",t)}updateCaseMapping(){this.cm=this.isupport.caseMapping(),this.pendingLists=new tz(this.pendingLists,this.cm),this.monitored=new tz(this.monitored,this.cm)}isServer(e){return"*"===e||this.cm(e)===this.cm(this.serverPrefix.name)}isMyNick(e){return this.cm(e)===this.cm(this.nick)}isChannel(e){return this.isupport.chanTypes().indexOf(e[0])>=0}isNick(e){return!this.isServer(e)&&!this.isChannel(e)&&!e.startsWith("$")}setPingInterval(e){clearInterval(this.pingIntervalID),this.pingIntervalID=null,e<=0||(this.pingIntervalID=setInterval(()=>{this.ws&&this.send({command:"PING",params:["gamja"]})},1e3*e))}roundtrip(e,t){let s,r=e.command;return this.caps.enabled.has("labeled-response")&&(s=String(++t3),e.tags={...e.tags,label:s}),new Promise((n,a)=>{let i,o=e=>{let o,l=e.detail.message,c=function(e){if(e.tags.label)return e.tags.label;let t=e.batch;for(;t;){if(t.tags.label)return t.tags.label;t=t.parent}return null}(l);if(c&&c!==s)return;let u=!1;switch(l.command){case"FAIL":u=l.params[0]===r;break;case"400":case"421":case"461":case"263":u=l.params[1]===r}if(u){i(),a(new t5(l));return}try{o=t(l)}catch(e){i(),a(e)}o&&(i(),n(o))},l=()=>{this.status===t7.Status.DISCONNECTED&&(i(),a(Error("Connection closed")))};i=()=>{this.removeEventListener("message",o),this.removeEventListener("status",l)},this.addEventListener("message",o,{capture:!0}),this.addEventListener("status",l),this.send(e)})}join(e,t){let s=[e];return t&&s.push(t),this.roundtrip({command:"JOIN",params:s},t=>{switch(t.command){case"403":case"405":case"475":case"474":case"471":case"473":if(this.cm(t.params[1])===this.cm(e))throw new t5(t);break;case"JOIN":if(this.isMyNick(t.prefix.name)&&this.cm(t.params[0])===this.cm(e))return!0}})}fetchBatch(e,t){let s=null,r=[];return this.roundtrip(e,e=>{if(s){let t=e.batch;for(;t;){if(t.name===s){r.push(e);break}t=t.parent}}if("BATCH"!==e.command)return;let n=e.params[0].startsWith("+"),a=e.params[0].slice(1);if(n&&e.params[1]===t){s=a;return}if(!n&&a===s)return{...this.batches.get(a),messages:r}})}roundtripChatHistory(e){let t=this.pendingCmds.CHATHISTORY.then(()=>this.fetchBatch({command:"CHATHISTORY",params:e},"chathistory").then(e=>e.messages));return this.pendingCmds.CHATHISTORY=t.catch(()=>{}),t}async fetchHistoryBefore(e,t,s){let r=Math.min(s,this.isupport.chatHistory()),n=await this.roundtripChatHistory(["BEFORE",e,"timestamp="+t,r]);return{messages:n,more:n.length>=r}}async fetchHistoryBetween(e,t,s,r){let n=Math.min(r,this.isupport.chatHistory()),a=["AFTER",e,"timestamp="+t.time,n],i=await this.roundtripChatHistory(a);if((r-=i.length)<=0)throw Error("Cannot fetch all chat history: too many messages");return i.length>=n?(t={...t,time:i[i.length-1].tags.time},await this.fetchHistoryBetween(e,t,s,r)):{messages:i}}async fetchHistoryTargets(e,t){return(await this.fetchBatch({command:"CHATHISTORY",params:["TARGETS","timestamp="+e,"timestamp="+t,1e3]},"draft/chathistory-targets")).messages.map(e=>(console.assert("CHATHISTORY"===e.command&&"TARGETS"===e.params[0]),{name:e.params[1],latestMessage:e.params[2]}))}async listBouncerNetworks(){let e=await this.fetchBatch({command:"BOUNCER",params:["LISTNETWORKS"]},"soju.im/bouncer-networks"),t=new Map;for(let s of e.messages){console.assert("BOUNCER"===s.command&&"NETWORK"===s.params[0]);let e=s.params[1],r=tR(s.params[2]);t.set(e,r)}return t}monitor(e){this.monitored.has(e)||(this.monitored.set(e,!0),this.monitored.size+1>this.isupport.monitor()||this.send({command:"MONITOR",params:["+",e]}))}unmonitor(e){!this.monitored.has(e)||(this.monitored.delete(e),0>=this.isupport.monitor()||this.send({command:"MONITOR",params:["-",e]}))}createBouncerNetwork(e){let t={command:"BOUNCER",params:["ADDNETWORK",tO(e)]};return this.roundtrip(t,e=>{if("BOUNCER"===e.command&&"ADDNETWORK"===e.params[0])return e.params[1]})}registerAccount(e,t){return this.roundtrip({command:"REGISTER",params:["*",e||"*",t]},e=>{if("REGISTER"===e.command)return{verificationRequired:"VERIFICATION_REQUIRED"===e.params[0],account:e.params[1],message:e.params[2]}})}verifyAccount(e,t){return this.roundtrip({command:"VERIFY",params:[e,t]},e=>{if("VERIFY"===e.command)return{message:e.params[2]}})}supportsReadMarker(){return this.caps.enabled.has("draft/read-marker")}fetchReadMarker(e){this.send({command:"MARKREAD",params:[e]})}setReadMarker(e,t){this.send({command:"MARKREAD",params:[e,"timestamp="+t]})}}function t8(e){let t=[];for(let s in e)t.push(encodeURIComponent(s)+"="+encodeURIComponent(e[s]));return t.join("&")}async function se(e){let t;try{if(!(t=await fetch(e+"/.well-known/oauth-authorization-server")).ok)throw Error(`HTTP error: ${t.status} ${t.statusText}`)}catch(s){console.warn("OAuth 2.0 server doesn't support Authorization Server Metadata (retrying with OpenID Connect Discovery): ",s),t=await fetch(e+"/.well-known/openid-configuration")}if(!t.ok)throw Error(`HTTP error: ${t.status} ${t.statusText}`);let s=await t.json();if(!s.issuer)throw Error("Missing issuer in response");if(!s.authorization_endpoint||!s.token_endpoint)throw Error("Missing authorization_endpoint in response");if(!s.response_types_supported.includes("code"))throw Error("Server doesn't support authorization code response type");return s}function st(e,t){let s={"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"};return t&&(s.Authorization="Basic "+btoa(encodeURIComponent(e)+":"+encodeURIComponent(t))),s}async function ss({serverMetadata:e,redirectUri:t,code:s,clientId:r,clientSecret:n}){let a={grant_type:"authorization_code",code:s,redirect_uri:t};n||(a.client_id=r);let i=await fetch(e.token_endpoint,{method:"POST",headers:st(r,n),body:t8(a)});if(!i.ok)throw Error(`HTTP error: ${i.status} ${i.statusText}`);if((a=await i.json()).error)throw Error("Authentication failed: "+(a.error_description||a.error));return a}async function sr({serverMetadata:e,token:t,clientId:s,clientSecret:r}){let n=await fetch(e.introspection_endpoint,{method:"POST",headers:st(s,r),body:t8({token:t})});if(!n.ok)throw Error(`HTTP error: ${n.status} ${n.statusText}`);let a=await n.json();if(!a.active)throw Error("Expired token");return a}F.options.defaults.defaultProtocol="https",F.registerCustomProtocol("irc"),F.registerCustomProtocol("ircs"),F.registerCustomProtocol("geo",!0);let sn=F.createTokenClass("ircChannel",{isLink:!0,toHref(){return"irc:///"+this.v}});function sa(e,t){let s=F.find(e),r=[],n=0;s.forEach(s=>{if(!s.isLink)return;let a=e.substring(n,s.start);r.push(a),r.push(t$`
			<a
				href=${s.href}
				target="_blank"
				rel="noreferrer noopener"
				onClick=${t}
			>${s.value}</a>
		`),n=s.end});let a=e.substring(n);return r.push(a),r}function si(e){return e>="0"&&e<="9"}function so(e){if(e.length<6)return!1;for(let t=0;t<6;t++){let s=e[t].toUpperCase();if(!(s>="0"&&s<="9"||s>="A"&&s<="F"))return!1}return!0}function sl(e){let t="";for(let s=0;s<e.length;s++){let r=e[s];switch(r){case"\x02":case"\x1d":case"\x1f":case"\x1e":case"\x11":case"\x16":case"\x0f":break;case"\x03":if(!si(e[s+1]))break;si(e[++s+1])&&s++,","===e[s+1]&&si(e[s+2])&&si(e[(s+=2)+1])&&s++;break;case"\x04":if(!so(e.slice(s+1)))break;","===e[(s+=6)+1]&&so(e.slice(s+2))&&(s+=7);break;default:t+=r}}return t}F.registerPlugin("ircChannel",({scanner:e,parser:t})=>{let{POUND:s,UNDERSCORE:r,DOT:n,HYPHEN:a}=e.tokens,{alphanumeric:i}=e.tokens.groups,o=t.start.tt(s),l=new F.State(sn),c=l.tt(n);o.ta(i,l),o.tt(s,l),o.tt(r,l),o.tt(n,c),o.tt(a,l),l.ta(i,l),l.tt(s,l),l.tt(r,l),l.tt(a,l),c.ta(i,l)});let sc="server",su="channel",sh="nick",sp=t7.Status,sd={NONE:"",MESSAGE:"message",HIGHLIGHT:"highlight",compare(e,t){let s={[sd.NONE]:0,[sd.MESSAGE]:1,[sd.HIGHLIGHT]:2};return s[e]-s[t]},union:(e,t)=>sd.compare(e,t)>0?e:t},sm="delivered",sf="read",sg="fold",sb="hide",sk=function(e){function t(e){var s,r;return this.getChildContext||(s=new Set,(r={})[t.__c]=this,this.getChildContext=function(){return r},this.componentWillUnmount=function(){s=null},this.shouldComponentUpdate=function(e){this.props.value!=e.value&&s.forEach(function(e){e.__e=!0,T(e)})},this.sub=function(e){s.add(e);var t=e.componentWillUnmount;e.componentWillUnmount=function(){s&&s.delete(e),t&&t.call(e)}}),e.children}return t.__c="__cC"+b++,t.__=e,t.Provider=t.__l=(t.Consumer=function(e,t){return e.children(t)}).contextType=t,t}("settings");function sv(e){switch(e.type){case sc:return tY();case su:return tY({entity:e.name});case sh:return tY({entity:e.name,enttype:"user"})}throw Error("Unknown buffer type: "+e.type)}function sw(e,t){let s=sv(e);return t.tags.msgid?s+"?msgid="+encodeURIComponent(t.tags.msgid):s+"?timestamp="+encodeURIComponent(t.tags.time)}function sy(e,t){let s=e.name;return t&&t.name&&t.name!==t.host?t.name:s||(t?t.name||t.host||"server":e.isBouncer?"bouncer":"server")}function sS(e){if(!e.tags.time)throw Error("Missing time message tag");return{time:e.tags.time}}function sE(e,t){if(!t)return!1;if(!e)return!0;if(!e.time||!t.time)throw Error("Missing receipt time");return e.time<=t.time}function sC(e,t){if(!t)return!1;if(!e.tags.time)throw Error("Missing time message tag");if(!t.time)throw Error("Missing receipt time");return e.tags.time<=t.time}function s$(e,t){let s;if(s="function"==typeof t?t(e,e):t,e!==s&&s)return{...e,...s}}function s_(e){return e.type===sc}function sI(e,t){let s=0;for(;s<e.length&&e[s]===t;++s);return e.substring(s)}function sN(e,t){let s=e.servers.get(t.server),r=e.bouncerNetworks.get(s.bouncerNetID);return r?sy(s,r):null}let sx=0,sT=0,sR=0,sO={create:()=>({servers:new Map,buffers:new Map,activeBuffer:null,bouncerNetworks:new Map,settings:{secondsInTimestamps:!0,bufferEvents:sg}}),updateServer(e,t,s){let r=e.servers.get(t);if(!r)return;let n=s$(r,s);if(!n)return;let a=new Map(e.servers);return a.set(t,n),{servers:a}},updateBuffer(e,t,s){let r=sO.getBuffer(e,t);if(!r)return;let n=s$(r,s);if(!n)return;let a=new Map(e.buffers);return a.set(r.id,n),{buffers:a}},getActiveServerID(e){let t=e.buffers.get(e.activeBuffer);return t?t.server:null},getBuffer(e,t){switch(typeof t){case"number":return e.buffers.get(t);case"object":if(t.id)return e.buffers.get(t.id);let s=t.server,r=t.name;s||(s=sO.getActiveServerID(e)),r||(r="*");let n=tK.RFC1459,a=e.servers.get(s);a&&(n=a.cm);let i=n(r);for(let t of e.buffers.values())if(t.server===s&&n(t.name)===i)return t;return null;default:throw Error("Invalid buffer ID type: "+typeof t)}},createServer(e){let t=++sx,s=new Map(e.servers);return s.set(t,{id:t,name:null,status:sp.DISCONNECTED,cm:tK.RFC1459,users:new tz(null,tK.RFC1459),account:null,supportsSASLPlain:!1,supportsAccountRegistration:!1,reliableUserAccounts:!1,statusMsg:null,isBouncer:!1,bouncerNetID:null}),[t,{servers:s}]},createBuffer(e,t,s,r){let n,a=sO.getBuffer(e,{server:s,name:t});if(a)return[a.id,null];let i=++sT;n="*"===t?sc:r.isChannel(t)?su:sh;let o=Array.from(e.buffers.values());return o.push({id:i,name:t,type:n,server:s,serverInfo:null,joined:!1,topic:null,hasInitialWho:!1,members:new tz(null,r.cm),messages:[],redacted:new Set,unread:sd.NONE,prevReadReceipt:null}),[i,{buffers:new Map((o=o.sort((t,s)=>(function(e,t,s){if(t.server!==s.server){let r=sN(e,t),n=sN(e,s);return r&&n&&r!==n?r.localeCompare(n):t.server>s.server?1:-1}if(s_(t)!==s_(s))return s_(s)?1:-1;if(t.type===su&&s.type===su){let e=sI(t.name,t.name[0]),r=sI(s.name,s.name[0]),n=e.localeCompare(r);if(0!==n)return n}return t.name.localeCompare(s.name)})(e,t,s))).map(e=>[e.id,e]))}]},storeBouncerNetwork(e,t,s){let r=new Map(e.bouncerNetworks);return r.set(t,{...r.get(t),...s}),{bouncerNetworks:r}},deleteBouncerNetwork(e,t){let s=new Map(e.bouncerNetworks);return s.delete(t),{bouncerNetworks:s}},handleMessage(e,t,s,r){let n,a,i,o,l;function c(t){return sO.updateServer(e,s,t)}function u(t,r){return sO.updateBuffer(e,{server:s,name:t},r)}function h(e,t){return c(s=>{let r=new tz(s.users),n=s$(r.get(e),t);if(n)return r.set(e,n),{users:r}})}if(!tQ(t,"chathistory"))switch(t.command){case"004":return u("*",{serverInfo:{name:t.params[1],version:t.params[2]}});case"005":return l=new Map(e.buffers),e.buffers.forEach(e=>{if(e.server!==s)return;let t=new tz(e.members,r.cm);l.set(e.id,{...e,members:t})}),{buffers:l,...c(e=>({name:r.isupport.network(),cm:r.cm,users:new tz(e.users,r.cm),reliableUserAccounts:r.isupport.monitor()>0&&r.isupport.whox(),statusMsg:r.isupport.statusMsg(),bouncerNetID:r.isupport.bouncerNetID()}))};case"CAP":return c({supportsSASLPlain:r.supportsSASL("PLAIN"),supportsAccountRegistration:r.caps.enabled.has("draft/account-registration"),isBouncer:r.caps.enabled.has("soju.im/bouncer-networks")});case"900":return c({account:t.params[2]});case"901":return c({account:null});case"REGISTER":case"VERIFY":if("SUCCESS"===t.params[0])return c({account:t.params[1]});break;case"331":return u(a=t.params[1],{topic:null});case"332":return u(a=t.params[1],{topic:t.params[2]});case"333":break;case"366":return u(a=t.params[1],e=>{let s=new tz(null,e.members.caseMap);return t.list.forEach(e=>{e.params[3].split(" ").forEach(e=>{let t=tM(e);s.set(t.name,t.prefix)})}),{members:s}});case"315":if(n=t.params[1],0===t.list.length&&!r.isChannel(n)&&0>n.indexOf("*"))return h(n,e=>({offline:!0}));return c(e=>{let s=new tz(e.users);for(let e of t.list){let t=r.parseWhoReply(e);if(void 0!==t.flags){t.away=t.flags.indexOf("G")>=0,t.operator=t.flags.indexOf("*")>=0;let e=r.isupport.bot();e&&(t.bot=t.flags.indexOf(e)>=0),delete t.flags}t.offline=!1,s.set(t.nick,t)}return{users:s}});case"JOIN":if(a=t.params[0],r.isMyNick(t.prefix.name)){let[t,n]=sO.createBuffer(e,a,s,r);e={...e,...n}}return o=u(a,e=>{let s=new tz(e.members);return s.set(t.prefix.name,""),{members:s,joined:e.joined||r.isMyNick(t.prefix.name)}}),e={...e,...o},i={nick:t.prefix.name,offline:!1},t.prefix.user&&(i.username=t.prefix.user),t.prefix.host&&(i.hostname=t.prefix.host),t.params.length>2&&(i.account=t.params[1],"*"===i.account&&(i.account=null),i.realname=t.params[2]),o=h(t.prefix.name,i),e={...e,...o};case"PART":return u(a=t.params[0],e=>{let s=new tz(e.members);return s.delete(t.prefix.name),{members:s,joined:e.joined&&!r.isMyNick(t.prefix.name)}});case"KICK":a=t.params[0];let p=t.params[1];return u(a,e=>{let t=new tz(e.members);return t.delete(p),{members:t,joined:e.joined&&!r.isMyNick(p)}});case"QUIT":return l=new Map(e.buffers),e.buffers.forEach(e=>{if(e.server!==s||!e.members.has(t.prefix.name))return;let r=new tz(e.members);r.delete(t.prefix.name),l.set(e.id,{...e,members:r})}),e={...e,buffers:l},o=h(t.prefix.name,e=>{if(e)return{offline:!0}}),e={...e,...o};case"NICK":let d=t.params[0];return l=new Map(e.buffers),e.buffers.forEach(e=>{if(e.server!==s)return;let r=e.members.get(t.prefix.name);if(void 0===r)return;let n=new tz(e.members);n.set(d,r),n.delete(t.prefix.name),l.set(e.id,{...e,members:n})}),e={...e,buffers:l},o=c(e=>{let s=new tz(e.users),r=s.get(t.prefix.name);if(r)return s.set(d,r),s.delete(t.prefix.name),{users:s}}),e={...e,...o};case"SETNAME":return h(t.prefix.name,{realname:t.params[0]});case"CHGHOST":return h(t.prefix.name,{username:t.params[0],hostname:t.params[1]});case"ACCOUNT":let m=t.params[0];return"*"===m&&(m=null),h(t.prefix.name,{account:m});case"AWAY":let f=t.params[0];return h(t.prefix.name,{away:!!f});case"TOPIC":return u(a=t.params[0],{topic:t.params[1]});case"MODE":if(n=t.params[0],!r.isChannel(n))return;let g=new Map(tq(r.isupport.prefix()).map(e=>[e.mode,e.prefix]));return u(n,e=>{let s=new tz(e.members);return!function(e,t,s){let[r,n,a,i]=t.chanModes(),o=t.prefix(),l=new Map;if(Array.from(r).forEach(e=>l.set(e,"A")),Array.from(n).forEach(e=>l.set(e,"B")),Array.from(a).forEach(e=>l.set(e,"C")),Array.from(i).forEach(e=>l.set(e,"D")),tq(o).forEach(e=>l.set(e.mode,"B")),"MODE"!==e.command)throw Error("Expected a MODE message");let c=e.params[1],u=e.params.slice(2),h=null,p=0;for(let e=0;e<c.length;e++){if("+"===c[e]||"-"===c[e]){h=c[e];continue}if(!h)throw Error("malformed mode string: missing plus/minus");let t=c[e],r="+"===h,n=l.get(t);if(!n)continue;let a=null;("A"===n||"B"===n||"C"===n&&r)&&(a=u[p],p++),s(t,r,a)}}(t,r.isupport,(e,t,n)=>{var a;let i;if(!g.has(e))return;let o=s.get(n);if(void 0===o)return;let l=g.get(e);s.set(n,(a=o,i=new Map(tq(r.isupport.prefix()).map((e,t)=>[e.prefix,t])),t?0>a.indexOf(l)&&(a+=l,a=Array.from(a).sort((e,t)=>i.get(e)-i.get(t)).join("")):a=a.replace(l,""),a))}),{members:s}});case"REDACT":return n=t.params[0],r.isMyNick(n)&&(n=t.prefix.name),u(n,e=>({redacted:new Set(e.redacted).add(t.params[1])}));case"730":case"731":for(let s of t.params[1].split(",")){let r=h(tD(s).name,{offline:"731"===t.command});e={...e,...r}}return e}},addMessage:(e,t,s)=>(t.key=++sR,sO.updateBuffer(e,s,e=>({messages:function(e,t){if(0===e.length)return[t];if(!tQ(t,"chathistory")||e[e.length-1].tags.time<=t.tags.time)return e.concat(t);let s=-1;for(let r=0;r<e.length;r++){let n=e[r];if(t.tags.time<n.tags.time){s=r;break}}return console.assert(s>=0,""),(e=[...e]).splice(s,0,t),e}(e.messages,t)})))};function sD(e,t){let s=null;return(...r)=>{clearTimeout(s),s=setTimeout(()=>{s=null,e(...r)},t)}}class sA{constructor(e){this.k="gamja_"+e}load(){let e=localStorage.getItem(this.k);return e?JSON.parse(e):null}put(e){e?localStorage.setItem(this.k,JSON.stringify(e)):localStorage.removeItem(this.k)}}let sL=new sA("autoconnect"),sM=new sA("naggedProtocolHandler"),sP=new sA("settings");class sB{raw=new sA("buffers");m=null;constructor(){let e=this.raw.load();this.m=new Map(Object.entries(e||{}));let t=this.save.bind(this);this.save=sD(t,500),document.addEventListener("visibilitychange",()=>{"hidden"===document.visibilityState&&t()})}key(e){return JSON.stringify({name:e.name.toLowerCase(),server:{bouncerNetwork:e.server.bouncerNetwork}})}save(){this.m.size>0?this.raw.put(Object.fromEntries(this.m)):this.raw.put(null)}get(e){return this.m.get(this.key(e))}put(e){let t=this.key(e),s=!this.m.has(t),r=this.m.get(t)||{},n=r.unread||sd.NONE;void 0!==e.unread&&e.unread!==r.unread&&(n=e.unread,s=!0);let a={...r.receipts};e.receipts&&(Object.keys(e.receipts).forEach(t=>{(!a[t]||a[t].time<e.receipts[t].time)&&(a[t]=e.receipts[t],s=!0)}),a[sm]<a[sf]&&(a[sm]=a[sf],s=!0));let i=r.closed||!1;return void 0!==e.closed&&e.closed!==r.closed&&(i=e.closed,s=!0),!!s&&(this.m.set(this.key(e),{name:e.name,unread:n,receipts:a,closed:i,server:{bouncerNetwork:e.server.bouncerNetwork}}),this.save(),!0)}delete(e){this.m.delete(this.key(e)),this.save()}list(e){let t=new Set,s=[];for(let r of this.m.values())r.server.bouncerNetwork===e.bouncerNetwork&&(t.has(r.name)||(s.push(r),t.add(r.name)));return s}clear(e){if(e)for(let t of this.list(e))this.m.delete(this.key(t));else this.m=new Map;this.save()}}function sH(e){if(!this.props.value)return null;let t=tI[this.props.value[0]]||"";return t$`
		<span class="membership ${t}" title=${t}>
			${this.props.value}
		</span>
	`}function sj(e){let t;e.user&&tV(e.user.realname,e.nick)&&(t=sl(e.user.realname));let s=function(e){let t=5381;for(let s=0;s<e.length;s++)t=(t<<5)+t+e.charCodeAt(s)>>>0;return t}(e.nick)%16+1;return t$`
		<a
			href=${tY({entity:e.nick})}
			title=${t}
			class="nick nick-${s}"
			onClick=${function(t){t.preventDefault(),e.onClick()}}
		>${e.nick}</a>
	`}function sU({date:e,url:t,showSeconds:s}){if(!e){let e="--:--";return s&&(e+=":--"),t$`<span class="timestamp" aria-hidden="true">${e}</span>`}let r=e.getHours().toString().padStart(2,"0"),n=e.getMinutes().toString().padStart(2,"0"),a=`${r}:${n}`;return s&&(a+=":"+e.getSeconds().toString().padStart(2,"0")),t$`
		<a
			href=${t}
			class="timestamp"
			title=${e.toLocaleString()}
			onClick=${e=>e.preventDefault()}
		>
			${a}
		</a>
	`}function sW(e){return t$`
		<${sk.Consumer}>
			${t=>t$`
				<${sU} ...${e} showSeconds=${t.secondsInTimestamps}/>
			`}
		</>
	`}function sF(e){switch(e.command){case"JOIN":case"PART":case"QUIT":case"NICK":return!0}return!1}class sK extends N{shouldComponentUpdate(e){return this.props.message!==e.message||this.props.redacted!==e.redacted}render(){let e,t,s,r,n=this.props.message,a=this.props.buffer,i=this.props.server,o=this.props.onNickClick,l=this.props.onChannelClick,c=this.props.onVerifyClick;function u(e){return t$`
				<${sj}
					nick=${e}
					user=${i.users.get(e)}
					onClick=${()=>o(e)}
				/>
			`}let h="";switch(n.command){case"NOTICE":case"PRIVMSG":s=n.params[0];let p=n.params[1],d=tW(n);if(d)"ACTION"===d.command?(h="me-tell",e=t$`* ${u(n.prefix.name)} ${sa(sl(d.param),l)}`):e=t$`
						${u(n.prefix.name)} has sent a CTCP command: ${d.command} ${d.param}
					`;else{let t="<",s=">";"NOTICE"===n.command&&(h+=" notice",t=s="-"),this.props.redacted?e=t$`<i>This message has been deleted.</i>`:(e=t$`${sa(sl(p),l)}`,h+=" talk"),e=t$`
					<span class="nick-caret" aria-hidden="true">${t}</span>
					${u(n.prefix.name)}
					<span class="nick-caret" aria-hidden="true">${s}</span>
					${" "}
					${e}
				`}let m=i.statusMsg;if(s!==a.name&&m){let t=tM(s,m);t.name===a.name&&(e=[t$`(<${sH} value=${t.prefix}/>)`," ",e])}n.tags["+draft/channel-context"]&&(e=t$`<em>(only visible to you)</em> ${e}`),n.isHighlight&&(h+=" highlight");break;case"JOIN":e=t$`
				${u(n.prefix.name)} has joined
			`;break;case"PART":e=t$`
				${u(n.prefix.name)} has left
			`;break;case"QUIT":e=t$`
				${u(n.prefix.name)} has quit
			`;break;case"NICK":let f=n.params[0];e=t$`
				${u(n.prefix.name)} is now known as ${u(f)}
			`;break;case"KICK":e=t$`
				${u(n.params[1])} was kicked by ${u(n.prefix.name)} (${n.params.slice(2)})
			`;break;case"MODE":s=n.params[0];let g=n.params[1],b=t$`${u(n.prefix.name)}`;if(a.type===su&&2===g.length&&i.cm(a.name)===i.cm(s)){let t,s,r=g[0],a=g[1],i=n.params[2];switch(a){case"b":t="+"===r?"added":"removed",e=t$`${b} has ${t} a ban on ${i}`;break;case"e":t="+"===r?"added":"removed",e=t$`${b} has ${t} a ban exemption on ${i}`;break;case"l":e="+"===r?t$`${b} has set the channel user limit to ${i}`:t$`${b} has unset the channel user limit`;break;case"i":t="+"===r?"marked":"unmarked",e=t$`${b} has ${t} as invite-only`;break;case"m":t="+"===r?"marked":"unmarked",e=t$`${b} has ${t} as moderated`;break;case"s":t="+"===r?"marked":"unmarked",e=t$`${b} has ${t} as secret`;break;case"t":t="+"===r?"locked":"unlocked",e=t$`${b} has ${t} the channel topic`;break;case"n":t="+"===r?"allowed":"denied",e=t$`${b} has ${t} external messages to this channel`}if(e)break;for(let e in tN)if(tN[e]===a){s=tI[e];break}if(s&&i){e=t$`
						${b} has ${"+"===r?"granted":"revoked"} ${s} privileges ${"+"===r?"to":"from"} ${u(i)}
					`;break}}e=t$`
				${b} sets mode ${n.params.slice(1).join(" ")}
			`,i.cm(a.name)!==i.cm(s)&&(e=t$`${e} on ${s}`);break;case"TOPIC":let k=n.params[1];e=k?t$`
					${u(n.prefix.name)} changed the topic to: ${sa(sl(k),l)}
				`:t$`
					${u(n.prefix.name)} cleared the topic
				`;break;case"INVITE":t=n.params[0];let v=n.params[1];if(a.type===sc)h="talk",e=t$`
					You have been invited to ${t$`
				<a href=${tY({entity:v})} onClick=${l}>
					${v}
				</a>
			`} by ${u(n.prefix.name)}
				`;else e=t$`
					${u(n.prefix.name)} has invited ${u(t)} to the channel
				`;break;case"001":let w=n.params[0];e=t$`Connected to server, your nickname is ${w}`;break;case"341":t=n.params[1],e=t$`${u(t)} has been invited to the channel`;break;case"372":h="motd",e=sa(sl(n.params[1]),l);break;case"900":r=n.params[2],e=t$`You are now authenticated as ${r}`;break;case"901":e=t$`You are now unauthenticated`;break;case"REGISTER":r=n.params[1];let y=n.params[2];switch(n.params[0]){case"SUCCESS":e=t$`A new account has been created, you are now authenticated as ${r}`;break;case"VERIFICATION_REQUIRED":e=t$`A new account has been created, but you need to <a href="#" onClick=${function(e){e.preventDefault(),c(r,y)}}>verify it</a>: ${sa(y)}`}break;case"VERIFY":r=n.params[1],e=t$`The new account has been verified, you are now authenticated as ${r}`;break;case"221":let S=n.params[1];e=S?t$`Your user mode is ${S}`:t$`You have no user mode`;break;case"324":e=t$`Channel mode is ${n.params.slice(2).join(" ")}`;break;case"329":let E=new Date(1e3*parseInt(n.params[2],10));e=t$`Channel was created on ${E.toLocaleString()}`;break;case"730":e=t$`${u(a.name)} is online`;break;case"731":e=t$`${u(a.name)} is offline`;break;default:tj(n.command)&&"422"!==n.command&&(h="error"),e=t$`${n.command} ${sa(n.params.join(" "))}`}return e?t$`
			<div class="logline ${h}" data-key=${n.key} role="listitem">
				<${sW} date=${new Date(n.tags.time)} url=${sw(a,n)}/>
				${" "}
				${e}
			</div>
		`:null}}class sG extends N{shouldComponentUpdate(e){return this.props.messages[0]!==e.messages[0]||this.props.messages[this.props.messages.length-1]!==e.messages[e.messages.length-1]}render(){let e=this.props.messages,t=this.props.buffer,s=this.props.server,r=this.props.onNickClick;function n(e){return t$`
				<${sj}
					nick=${e}
					user=${s.users.get(e)}
					onClick=${()=>r(e)}
				/>
			`}let a={JOIN:[],PART:[],QUIT:[],NICK:[]};e.forEach(e=>{a[e.command].push(e)});let i=!0,o=[];["JOIN","PART","QUIT"].forEach(e=>{let t;if(0===a[e].length)return;let s=new Set(a[e].map(e=>e.prefix.name)),r=s.size>1;switch(e){case"JOIN":t=r?"have joined":"has joined";break;case"PART":t=r?"have left":"has left";break;case"QUIT":t=r?"have quit":"has quit"}i?i=!1:o.push(", "),o.push(function(e,t){if(0===e.length)return null;if(1===e.length)return t(e[0]);let s=e.slice(0,e.length-1).map((e,s)=>0===s?t(e):[", ",t(e)]);return s.push(" and "),s.push(t(e[e.length-1])),s}([...s],n)),o.push(" "+t)}),a.NICK.forEach(e=>{i?i=!1:o.push(", ");let t=e.params[0];o.push(t$`
				${n(e.prefix.name)} is now known as ${n(t)}
			`)});let l=e[e.length-1],c=new Date(e[0].tags.time),u=new Date(l.tags.time),h=t$`
			<${sW} date=${c} url=${sw(t,e[0])}/>
		`;return u-c>6e3&&(h=[h," — ",t$`
					<${sW} date=${u} url=${sw(t,l)}/>
				`]),t$`
			<div class="logline" data-key=${e[0].key} role="listitem">
				${h}
				${" "}
				${o}
			</div>
		`}}let sz=!1;if(window.Notification&&(sz=!0,"default"===Notification.permission))try{new Notification("")}catch(e){"TypeError"===e.name&&(sz=!1)}class sq extends N{state={nag:!1};constructor(e){super(e),this.handleClick=this.handleClick.bind(this),this.state.nag=this.shouldNag()}shouldNag(){return sz&&"default"===Notification.permission}handleClick(e){e.preventDefault(),Notification.requestPermission(e=>{this.setState({nag:this.shouldNag()})})}render(){return this.state.nag?t$`
			<div class="logline nag" role="listitem">
				<${sW}/>
				${" "}
				<a href="#" onClick=${this.handleClick}>Turn on desktop notifications</a> to get notified about new messages
			</div>
		`:null}}class sQ extends N{state={nag:!0};constructor(e){super(e),this.handleClick=this.handleClick.bind(this),this.state.nag=!sM.load()}handleClick(e){e.preventDefault();let t=window.location.origin+window.location.pathname+"?open=%s";try{navigator.registerProtocolHandler("irc",t),navigator.registerProtocolHandler("ircs",t)}catch(e){console.error("Failed to register protocol handler: ",e)}sM.put(!0),this.setState({nag:!1})}render(){if(!navigator.registerProtocolHandler||!this.state.nag)return null;let e=this.props.bouncerName||"this bouncer";return t$`
			<div class="logline nag" role="listitem">
				<${sW}/>
				${" "}
				<a href="#" onClick=${this.handleClick}>Register our protocol handler</a> to open IRC links with ${e}
			</div>
		`}}function sV({server:e,onAuthClick:t,onRegisterClick:s}){let r="an account on this server";e.name&&(r="a "+e.name+" account");let n=[t$`
		You are unauthenticated on this server,
		${" "}
		<a href="#" onClick=${function(e){e.preventDefault(),t()}}>login</a>
		${" "}
	`];return e.supportsAccountRegistration?n.push(t$`or <a href="#" onClick=${function(e){e.preventDefault(),s()}}>register</a> ${r}`):n.push(t$`if you have ${r}`),t$`
		<div class="logline nag" role="listitem">
			<${sW}/> ${n}
		</div>
	`}class sJ extends N{constructor(e){super(e)}shouldComponentUpdate(e){return this.props.date.getTime()!==e.date.getTime()}render(){let e=this.props.date.toLocaleDateString([],{year:"numeric",month:"2-digit",day:"2-digit"});return t$`
			<div class="separator date-separator" role="separator">
				${e}
			</div>
		`}}function sY(e){return t$`<div class="separator unread-separator" role="separator">New messages</div>`}class sX extends N{shouldComponentUpdate(e){return this.props.buffer!==e.buffer||this.props.settings!==e.settings}render(){let e=this.props.buffer;if(!e)return null;let t=this.props.server,s=this.props.settings,r=t.name,n=[];e.type===sc&&n.push(t$`<${sq}/>`),e.type===sc&&t.isBouncer&&!t.bouncerNetID&&n.push(t$`<${sQ} bouncerName=${r}/>`),e.type===sc&&t.status===sp.REGISTERED&&t.supportsSASLPlain&&!t.account&&n.push(t$`
				<${sV}
					server=${t}
					onAuthClick=${this.props.onAuthClick}
					onRegisterClick=${this.props.onRegisterClick}
				/>
			`);let a=this.props.onChannelClick,i=this.props.onNickClick,o=this.props.onVerifyClick;function l(s){return t$`
				<${sK}
					key=${"msg-"+s.key}
					message=${s}
					buffer=${e}
					server=${t}
					redacted=${e.redacted.has(s.tags.msgid)}
					onChannelClick=${a}
					onNickClick=${i}
					onVerifyClick=${o}
				/>
			`}function c(s){let r=new Map,n=[];for(let e of s){let t=!0;switch(e.command){case"PART":case"QUIT":r.delete(e.prefix.name);break;case"NICK":let s=r.get(e.prefix.name);if(!s){e={...e},r.set(e.params[0],e);break}s.params=e.params,r.delete(e.prefix.name),r.set(e.params[0],s),t=!1}t&&n.push(e)}s=n;let a=new Map,o=[];return(s.forEach((e,t)=>{("PART"===e.command||"QUIT"===e.command)&&a.set(e.prefix.name,t),"JOIN"===e.command&&a.has(e.prefix.name)?(o[a.get(e.prefix.name)]=!1,a.delete(e.prefix.name),o.push(!1)):"NICK"===e.command&&e.prefix.name===e.params[0]?o.push(!1):o.push(!0)}),0===(s=s.filter((e,t)=>o[t])).length)?null:1===s.length?l(s[0]):t$`
				<${sG}
					key=${"fold-"+s[0].key+"-"+s[s.length-1].key}
					messages=${s}
					buffer=${e}
					server=${t}
					onNickClick=${i}
				/>
			`}let u=!1,h=new Date,p=[],d=null;return e.messages.forEach(t=>{var r;let a=[];if(s.bufferEvents===sb&&sF(t))return;if("730"===t.command||"731"===t.command){let e=!d||t.command===d;if(d=t.command,e)return}u||e.type===sc||sC(t,e.prevReadReceipt)||(a.push(t$`<${sY} key="unread"/>`),u=!0);let i=new Date(t.tags.time);(((r=h).getFullYear()!==i.getFullYear()||r.getMonth()!==i.getMonth()||r.getDate()!==i.getDate())&&a.push(t$`<${sJ} key=${"date-"+i} date=${i}/>`),h=i,a.length>0&&(n.push(c(p)),n.push(...a),p=[]),s.bufferEvents===sg&&sF(t))?p.push(t):(p.length>0&&(n.push(c(p)),p=[]),n.push(l(t)))}),n.push(c(p)),t$`
			<div class="logline-list" role="list">
				${n}
			</div>
		`}}function sZ(e){let t,s=e.buffer.name;e.buffer.type===sc&&(s=sy(e.server,e.bouncerNetwork));let r=["type-"+e.buffer.type];switch(e.active&&r.push("active"),e.buffer.unread!==sd.NONE&&r.push("unread-"+e.buffer.unread),e.buffer.type){case sc:let n=e.server.status===sp.DISCONNECTED;e.bouncerNetwork&&e.bouncerNetwork.error&&(n=!0),n&&r.push("error");break;case sh:let a=e.server.users.get(s);a&&tV(a.realname,s)&&(t=sl(a.realname))}return t$`
		<li class="${r.join(" ")}" role="tab" aria-selected="${e.active}">
			<a
				href=${sv(e.buffer)}
				title=${t}
				onClick=${function(t){t.preventDefault(),e.onClick()}}
				onMouseDown=${function(t){1===t.button&&(t.preventDefault(),e.onClose())}}
			>${s}</a>
		</li>
	`}function s0(e){let t=Array.from(e.buffers.values()).map(t=>{let s=e.servers.get(t.server),r=null;return s.bouncerNetID&&(r=e.bouncerNetworks.get(s.bouncerNetID)),t$`
			<${sZ}
				key=${t.id}
				buffer=${t}
				server=${s}
				bouncerNetwork=${r}
				onClick=${()=>e.onBufferClick(t)}
				onClose=${()=>e.onBufferClose(t)}
				active=${e.activeBuffer===t.id}
			/>
		`});return t$`
		<ul role="tablist" aria-label="Buffer list">
			${t}
		</ul>
	`}let s1="here",s2="gone",s3="offline";function s4(e){let t={[s1]:"User is online",[s2]:"User is away",[s3]:"User is offline"}[e.status];return t$`<span class="status status-${e.status}" title=${t}>●</span>`}function s5(e){let t=e.server.status===sp.REGISTERED;e.bouncerNetwork&&(t=t&&"connected"===e.bouncerNetwork.state);let s=null,r=[];switch(e.buffer.type){case sc:switch(e.server.status){case sp.DISCONNECTED:s="Disconnected";break;case sp.CONNECTING:s="Connecting...";break;case sp.REGISTERING:s="Logging in...";break;case sp.REGISTERED:if(e.bouncerNetwork)switch(e.bouncerNetwork.state){case"disconnected":s="Bouncer disconnected from network",e.bouncerNetwork.error&&(s+=": "+e.bouncerNetwork.error);break;case"connecting":s="Bouncer connecting to network...";break;case"connected":s=`Connected to ${e.bouncerNetwork.host||"network"}`}else if(e.buffer.serverInfo){let t=e.buffer.serverInfo;s=`Connected to ${t.name}`}else s="Connected"}let n=t$`
			<button
				key="join"
				onClick=${e.onJoin}
			>Join channel</button>
		`,a=t$`
			<button
				key="reconect"
				onClick=${e.onReconnect}
			>Reconnect</button>
		`,i=t$`
			<button
				key="settings"
				onClick="${e.onOpenSettings}"
			>Settings</button>
		`;e.server.isBouncer?e.server.bouncerNetID?(t&&r.push(n),e.server.status===sp.REGISTERED&&r.push(t$`
						<button
							key="manage"
							onClick=${e.onManageNetwork}
						>Manage network</button>
					`)):(t?r.push(t$`
						<button
							key="add"
							onClick=${e.onAddNetwork}
						>Add network</button>
					`):e.server.status===sp.DISCONNECTED&&r.push(a),r.push(i)):(t?r.push(n):e.server.status===sp.DISCONNECTED&&r.push(a),r.push(i));break;case su:e.buffer.topic&&(s=sa(sl(e.buffer.topic),e.onChannelClick)),e.buffer.joined?r.push(t$`
				<button
					key="part"
					class="danger"
					onClick=${e.onClose}
				>Leave</button>
			`):(t&&r.push(t$`
					<button
						key="join"
						onClick=${e.onJoin}
					>Join</button>
				`),r.push(t$`
				<button
					key="part"
					class="danger"
					onClick=${e.onClose}
				>Close</button>
			`));break;case sh:if(e.user){let t=s1;e.user.offline?t=s3:e.user.away&&(t=s2);let r=e.buffer.name;tV(e.user.realname,e.buffer.name)&&(r=sl(e.user.realname||""));let n=[];if(e.user.username&&e.user.hostname&&n.push(`${e.user.username}@${e.user.hostname}`),e.user.account){let t,s=`This user is verified and has logged in to the server with the account ${e.user.account}.`;t=e.user.account===e.buffer.name?"authenticated":`authenticated as ${e.user.account}`,n.push(t$`<abbr title=${s}>${t}</abbr>`)}else e.server.reliableUserAccounts&&n.push(t$`<abbr title=${"This user has not been verified and is not logged in."}>unauthenticated</abbr>`);e.user.operator&&n.push(t$`<abbr title=${"This user is a server operator, they have administrator privileges."}>server operator</abbr>`),e.user.bot&&n.push(t$`<abbr title=${"This user is an automated bot."}>bot</abbr>`),(n=n.map((e,t)=>0===t?e:[", ",e])).length>0&&(n=["(",n,")"]),s=t$`<${s4} status=${t}/> ${r} ${n}`}r=t$`
			<button
				key="close"
				class="danger"
				onClick=${e.onClose}
			>Close</button>
		`}let o=e.buffer.name;return e.buffer.type===sc&&(o=sy(e.server,e.bouncerNetwork)),t$`
		<div class="title">${o}</div>
		${s?t$`<div class="description">${s}</div>`:null}
		<div class="actions">${r}</div>
	`}class s6 extends N{constructor(e){super(e),this.handleClick=this.handleClick.bind(this)}shouldComponentUpdate(e){return this.props.nick!==e.nick||this.props.membership!==e.membership||this.props.user!==e.user}handleClick(e){e.preventDefault(),this.props.onClick()}render(){let e,t=this.props.user,s=["nick"];if(t){let r="";t.username&&t.hostname&&(r=`${t.username}@${t.hostname}`),tV(t.realname,this.props.nick)?(e=sl(t.realname),r&&(e=`${e} (${r})`)):e=r,t.account&&(e+=`
Authenticated as ${t.account}`),t.away&&(s.push("away"),e+="\nAway")}return t$`
			<li>
				<a
					href=${tY({entity:this.props.nick,enttype:"user"})}
					class=${s.join(" ")}
					title=${e}
					onClick=${this.handleClick}
				>
					<${sH} value=${this.props.membership}/>
					${this.props.nick}
				</a>
			</li>
		`}}function s9(e,t){let[s,r]=e,[n,a]=t,i=["~","&","@","%","+"],o=i.indexOf(r[0]),l=i.indexOf(a[0]);return(o<0&&(o=i.length),l<0&&(l=i.length),o!==l)?o-l:s.localeCompare(n)}class s7 extends N{shouldComponentUpdate(e){return this.props.members!==e.members||this.props.users!==e.users}render(){return t$`
			<ul>
				${Array.from(this.props.members).sort(s9).map(([e,t])=>t$`
					<${s6}
						key=${e}
						nick=${e}
						membership=${t}
						user=${this.props.users.get(e)}
						onClick=${()=>this.props.onNickClick(e)}
					/>
				`)}
			</ul>
		`}}class s8 extends N{state={url:"",pass:"",nick:"",password:"",rememberMe:!1,username:"",realname:"",autojoin:!0};nickInput=_();constructor(e){super(e),this.handleInput=this.handleInput.bind(this),this.handleSubmit=this.handleSubmit.bind(this),e.params&&(this.state={...this.state,url:e.params.url||"",nick:e.params.nick||"",rememberMe:e.params.autoconnect||!1,username:e.params.username||"",realname:e.params.realname||""})}handleInput(e){let t=e.target,s="checkbox"===t.type?t.checked:t.value;this.setState({[t.name]:s})}handleSubmit(e){if(e.preventDefault(),this.props.connecting)return;let t={url:this.state.url,pass:this.state.pass,nick:this.state.nick,autoconnect:this.state.rememberMe,username:this.state.username,realname:this.state.realname,saslPlain:null,autojoin:[]};this.state.password?t.saslPlain={username:t.username||t.nick,password:this.state.password}:"external"===this.props.auth?t.saslExternal=!0:"oauth2"===this.props.auth&&(t.saslOauthBearer=this.props.params.saslOauthBearer),this.state.autojoin&&(t.autojoin=this.props.params.autojoin||[]),this.props.onSubmit(t)}componentDidMount(){this.nickInput.current&&this.nickInput.current.focus()}render(){let e=this.props.connecting,t=null;this.props.params&&this.props.params.url||(t=t$`
				<label>
					Server URL:<br/>
					<input
						type="text"
						name="url"
						value=${this.state.url}
						disabled=${e}
						inputmode="url"
					/>
				</label>
				<br/><br/>
			`);let s=null;this.props.connecting?s=t$`
				<p>Connecting...</p>
			`:this.props.error&&(s=t$`
				<p class="error-text">${sa(this.props.error)}</p>
			`);let r=null;"disabled"!==this.props.auth&&"external"!==this.props.auth&&"oauth2"!==this.props.auth&&(r=t$`
				<label>
					Password:<br/>
					<input
						type="password"
						name="password"
						value=${this.state.password}
						disabled=${e}
						required=${"mandatory"===this.props.auth}
						placeholder=${"mandatory"!==this.props.auth?"(optional)":""}
					/>
				</label>
				<br/><br/>
			`);let n=null,a=this.props.params.autojoin||[];if(a.length>0){let e=a.length>1?"s":"";n=t$`
				<label>
					<input
						type="checkbox"
						name="autojoin"
						checked=${this.state.autojoin}
					/>
					Auto-join channel${e} <strong>${a.join(", ")}</strong>
				</label>
				<br/><br/>
			`}return t$`
			<form onInput=${this.handleInput} onSubmit=${this.handleSubmit}>
				<h2>Connect to IRC</h2>

				<label>
					Nickname:<br/>
					<input
						type="username"
						name="nick"
						value=${this.state.nick}
						disabled=${e}
						ref=${this.nickInput}
						required
						autofocus
					/>
				</label>
				<br/><br/>

				${r}

				${n}

				<label>
					<input
						type="checkbox"
						name="rememberMe"
						checked=${this.state.rememberMe}
						disabled=${e}
					/>
					Remember me
				</label>
				<br/><br/>

				<details>
					<summary role="button">Advanced options</summary>

					<br/>

					${t}

					<label>
						Username:<br/>
						<input
							type="username"
							name="username"
							value=${this.state.username}
							disabled=${e}
							placeholder="Same as nickname"
						/>
					</label>
					<br/><br/>

					<label>
						Real name:<br/>
						<input
							type="text"
							name="realname"
							value=${this.state.realname}
							disabled=${e}
							placeholder="Same as nickname"
						/>
					</label>
					<br/><br/>

					<label>
						Server password:<br/>
						<input
							type="password"
							name="pass"
							value=${this.state.pass}
							disabled=${e}
							placeholder="None"
						/>
					</label>
					<br/><br/>
				</details>

				<br/>
				<button disabled=${e}>Connect</button>

				${s}
			</form>
		`}}class re extends N{state={channel:"#"};constructor(e){super(e),this.handleInput=this.handleInput.bind(this),this.handleSubmit=this.handleSubmit.bind(this),e.channel&&(this.state.channel=e.channel)}handleInput(e){let t=e.target,s="checkbox"===t.type?t.checked:t.value;this.setState({[t.name]:s})}handleSubmit(e){e.preventDefault();let t={channel:this.state.channel};this.props.onSubmit(t)}render(){return t$`
			<form onInput=${this.handleInput} onSubmit=${this.handleSubmit}>
				<label>
					Channel:<br/>
					<input type="text" name="channel" value=${this.state.channel} autofocus required/>
				</label>
				<br/>

				<br/>
				<button>Join</button>
			</form>
		`}}function rt(e,t,s){let r=Array.from(e.values()),n=r.findIndex(e=>e.id===t);return n<0?null:(n=(n+r.length+s)%r.length,r[n])}let rs=[{key:"h",altKey:!0,description:"Mark all messages as read",execute:e=>{e.setState(t=>{let s=new Map;return t.buffers.forEach(t=>{s.set(t.id,{...t,unread:sd.NONE,prevReadReceipt:null});let r={};if(t.messages.length>0){let e=t.messages[t.messages.length-1];r[sf]=sS(e)}let n=e.clients.get(t.server);e.bufferStore.put({name:t.name,server:n.params,unread:sd.NONE,receipts:r})}),{buffers:s}},()=>{e.updateDocumentTitle()})}},{key:"a",altKey:!0,description:"Jump to next buffer with activity",execute:e=>{let t=null,s=null;for(let r of e.state.buffers.values())t||r.type!==sc||(t=r),r.unread!==sd.NONE&&(!s||sd.compare(r.unread,s.unread)>0)&&(s=r);s||(s=t),s&&e.switchBuffer(s)}},{key:"ArrowUp",altKey:!0,description:"Jump to the previous buffer",execute:e=>{let t=rt(e.state.buffers,e.state.activeBuffer,-1);t&&e.switchBuffer(t)}},{key:"ArrowDown",altKey:!0,description:"Jump to the next buffer",execute:e=>{let t=rt(e.state.buffers,e.state.activeBuffer,1);t&&e.switchBuffer(t)}},{key:"k",ctrlKey:!0,description:"Switch to a buffer",execute:e=>{e.openDialog("switch")}}];function rr(e){let t=e.state.buffers.get(e.state.activeBuffer);if(!t)throw Error("Not connected to server");return e.clients.get(t.server)}function rn(e){let t=e.state.buffers.get(e.state.activeBuffer);if(!t||t.type!==su)throw Error("Not in a channel");return t.name}async function ra(e,t,s){let r=t[0];if(!r)throw Error("Missing nick");let n=rn(e),a=rr(e),i=(await a.whois(r))["311"].params,o=i[2],l=i[3];a.send({command:"MODE",params:[n,s,`*!${o}@${l}`]})}function ri(e){let t=e.state.buffers.get(e.state.activeBuffer);t&&t.type!==sc&&e.setBufferState({server:t.server},e=>({unread:sd.union(e.unread,sd.MESSAGE)}))}let ro={name:"join",usage:"<name> [password]",description:"Join a channel",execute:(e,t)=>{let s=t[0];if(!s)throw Error("Missing channel name");t.length>1?e.open(s,null,t[1]):e.open(s)}},rl={name:"kick",usage:"<nick> [comment]",description:"Remove a user from the channel",execute:(e,t)=>{let s=t[0],r=[rn(e),s];t.length>1&&r.push(t.slice(1).join(" ")),rr(e).send({command:"KICK",params:r})}},rc={name:"ban",usage:"[nick]",description:"Ban a user from the channel, or display the current ban list",execute:(e,t)=>{if(0!==t.length)return ra(e,t,"+b");{let t=rn(e);rr(e).send({command:"MODE",params:[t,"+b"]})}}};function ru(e,t,s){let r=t[0];if(!r)throw Error("Missing nick");let n=rn(e);rr(e).send({command:"MODE",params:[n,s,r]})}var rh=new Map([{name:"away",usage:"[message]",description:"Set away message",execute:(e,t)=>{let s=[];t.length&&s.push(t.join(" ")),rr(e).send({command:"AWAY",params:s})}},rc,{name:"buffer",usage:"<name>",description:"Switch to a buffer",execute:(e,t)=>{let s=t[0];for(let t of e.state.buffers.values())if(t.name===s)return void e.switchBuffer(t);throw Error("Unknown buffer")}},{name:"close",description:"Close the current buffer",execute:(e,t)=>{let s=e.state.buffers.get(e.state.activeBuffer);if(!s||s.type===sc)throw Error("Not in a user or channel buffer");e.close(s.id)}},{name:"deop",usage:"<nick>",description:"Remove operator status for a user on this channel",execute:(e,t)=>ru(e,t,"-o")},{name:"devoice",usage:"<nick>",description:"Remove voiced status for a user on this channel",execute:(e,t)=>ru(e,t,"-v")},{name:"disconnect",description:"Disconnect from the server",execute:(e,t)=>{e.disconnect()}},{name:"help",description:"Show help menu",execute:(e,t)=>{e.openHelp()}},{name:"invite",usage:"<nick>",description:"Invite a user to the channel",execute:(e,t)=>{let s=t[0];if(!s)throw Error("Missing nick");let r=rn(e);rr(e).send({command:"INVITE",params:[s,r]})}},{...ro,name:"j"},ro,rl,{name:"kickban",usage:"<target>",description:"Ban a user and removes them from the channel",execute:(e,t)=>{rl.execute(e,t),rc.execute(e,t)}},{name:"lusers",usage:"[<mask> [<target>]]",description:"Request user statistics about the network",execute:(e,t)=>{rr(e).send({command:"LUSERS",params:t}),ri(e)}},{name:"me",usage:"<action>",description:"Send an action message to the current buffer",execute:(e,t)=>{let s=t.join(" "),r=function(e){let t=e.state.buffers.get(e.state.activeBuffer);if(!t)throw Error("Not in a buffer");return t.name}(e),n=`\x01ACTION ${s}\x01`;e.privmsg(r,n)}},{name:"mode",usage:"[target] [modes] [mode args...]",description:"Query or change a channel or user mode",execute:(e,t)=>{let s=t[0];(!s||s.startsWith("+")||s.startsWith("-"))&&(t=[rn(e),...t]),rr(e).send({command:"MODE",params:t})}},{name:"motd",usage:"[server]",description:"Get the Message Of The Day",execute:(e,t)=>{rr(e).send({command:"MOTD",params:t}),ri(e)}},{name:"msg",usage:"<target> <message>",description:"Send a message to a nickname or a channel",execute:(e,t)=>{let s=t[0],r=t.slice(1).join(" ");rr(e).send({command:"PRIVMSG",params:[s,r]})}},{name:"nick",usage:"<nick>",description:"Change current nickname",execute:(e,t)=>{let s=t[0];rr(e).send({command:"NICK",params:[s]})}},{name:"notice",usage:"<target> <message>",description:"Send a notice to a nickname or a channel",execute:(e,t)=>{let s=t[0],r=t.slice(1).join(" ");rr(e).send({command:"NOTICE",params:[s,r]})}},{name:"op",usage:"<nick>",description:"Give a user operator status on this channel",execute:(e,t)=>ru(e,t,"+o")},{name:"part",usage:"[reason]",description:"Leave a channel",execute:(e,t)=>{let s=t.join(" "),r=[rn(e)];s&&r.push(s),rr(e).send({command:"PART",params:r})}},{name:"query",usage:"<nick> [message]",description:"Open a buffer to send messages to a nickname",execute:(e,t)=>{let s=t[0];if(!s)throw Error("Missing nickname");if(e.open(s),t.length>1){let r=t.slice(1).join(" ");e.privmsg(s,r)}}},{name:"quiet",usage:"[nick]",description:"Quiet a user in the channel, or display the current quiet list",execute:(e,t)=>{if(0!==t.length)return ra(e,t,"+q");rr(e).send({command:"MODE",params:[rn(e),"+q"]})}},{name:"quit",description:"Quit",execute:(e,t)=>{e.close({name:"*"})}},{name:"quote",usage:"<command>",description:"Send a raw IRC command to the server",execute:(e,t)=>{let s;try{s=tA(t.join(" "))}catch(e){throw Error("Failed to parse IRC command",{cause:e})}rr(e).send(s)}},{name:"reconnect",description:"Reconnect to the server",execute:(e,t)=>{e.reconnect()}},{name:"setname",usage:"<realname>",description:"Change current realname",execute:(e,t)=>{let s=t.join(" "),r=rr(e);if(!r.caps.enabled.has("setname"))throw Error("Server doesn't support changing the realname");r.send({command:"SETNAME",params:[s]})}},{name:"stats",usage:"<query> [server]",description:"Request server statistics",execute:(e,t)=>{let s=t[0];if(!s)throw Error("Missing query");let r=[s];t.length>1&&r.push(t.slice(1).join(" ")),rr(e).send({command:"STATS",params:r}),ri(e)}},{name:"topic",usage:"<topic>",description:"Change the topic of the current channel",execute:(e,t)=>{let s=[rn(e)];t.length>0&&s.push(t.join(" ")),rr(e).send({command:"TOPIC",params:s})}},{name:"unban",usage:"<nick>",description:"Remove a user from the ban list",execute:(e,t)=>ra(e,t,"-b")},{name:"unquiet",usage:"<nick>",description:"Remove a user from the quiet list",execute:(e,t)=>ra(e,t,"-q")},{name:"voice",usage:"<nick>",description:"Give a user voiced status on this channel",execute:(e,t)=>ru(e,t,"+v")},{name:"who",usage:"<mask>",description:"Retrieve a list of users",execute:(e,t)=>{rr(e).send({command:"WHO",params:t}),ri(e)}},{name:"whois",usage:"<nick>",description:"Retrieve information about a user",execute:(e,t)=>{let s=t[0];if(!s)throw Error("Missing nick");rr(e).send({command:"WHOIS",params:[s]}),ri(e)}},{name:"whowas",usage:"<nick> [count]",description:"Retrieve information about an offline user",execute:(e,t)=>{if(t.length<1)throw Error("Missing nick");rr(e).send({command:"WHOWAS",params:t}),ri(e)}},{name:"list",usage:"[filter]",description:"Retrieve a list of channels from a network",execute:(e,t)=>{rr(e).send({command:"LIST",params:t}),ri(e)}}].map(e=>[e.name,e]));function rp(){let e=rs.map(e=>{let t=[];return e.ctrlKey&&t.push("Ctrl"),e.altKey&&t.push("Alt"),t.push(e.key),t=t.map((e,t)=>t$`
				${t>0?"+":null}
				<kbd>${e}</kbd>
			`),t$`
			<dt>${t}</dt>
			<dd>${e.description}</dd>
		`});return e.push(t$`
		<dt><kbd>Tab</kbd></dt>
		<dd>Automatically complete nickname or channel</dd>
	`),window.matchMedia("(pointer: none)").matches||e.push(t$`
			<dt><strong>Middle mouse click</strong></dt>
			<dd>Close buffer</dd>
		`),t$`<dl>${e}</dl>`}function rd(){let e=[...rh.keys()].map(e=>{let t=rh.get(e),s=[t$`<strong>/${e}</strong>`];return t.usage&&s.push(" "+t.usage),t$`
			<dt><code>${s}</code></dt>
			<dd>${t.description}</dd>
		`});return t$`<dl>${e}</dl>`}function rm(){return t$`
		<h3>Key bindings</h3>
		<${rp}/>

		<h3>Commands</h3>
		<${rd}/>
	`}let rf={name:"",host:"",port:6697,nickname:"",username:"",realname:"",pass:""};class rg extends N{prevParams=null;state={...rf,autojoin:!0};constructor(e){super(e),this.prevParams={...rf},this.handleInput=this.handleInput.bind(this),this.handleSubmit=this.handleSubmit.bind(this),e.params&&Object.keys(rf).forEach(t=>{void 0!==e.params[t]&&(this.state[t]=e.params[t],this.prevParams[t]=e.params[t])})}handleInput(e){let t=e.target,s="checkbox"===t.type?t.checked:t.value;this.setState({[t.name]:s})}handleSubmit(e){e.preventDefault();let t={};Object.keys(rf).forEach(e=>{!this.props.isNew&&this.prevParams[e]===this.state[e]||this.props.isNew&&rf[e]===this.state[e]||(t[e]=this.state[e])});let s=this.state.autojoin?this.props.autojoin:null;this.props.onSubmit(t,s)}render(){let e=null;this.props.isNew||(e=t$`
				<button type="button" class="danger" onClick=${()=>this.props.onRemove()}>
					Remove network
				</button>
			`);let t=null;return this.props.autojoin&&(t=t$`
				<label>
					<input
						type="checkbox"
						name="autojoin"
						checked=${this.state.autojoin}
					/>
					Auto-join channel <strong>${this.props.autojoin}</strong>
				</label>
				<br/><br/>
			`),t$`
			<form onInput=${this.handleInput} onSubmit=${this.handleSubmit}>
				<label>
					Hostname:<br/>
					<input type="text" name="host" value=${this.state.host} autofocus required/>
				</label>
				<br/><br/>

				${t}

				<details>
					<summary role="button">Advanced options</summary>

					<br/>

					<label>
						Port:<br/>
						<input type="number" name="port" value=${this.state.port}/>
					</label>
					<br/><br/>

					<label>
						Network name:<br/>
						<input type="text" name="name" value=${this.state.name}/>
					</label>
					<br/><br/>

					<label>
						Nickname:<br/>
						<input type="username" name="nickname" value=${this.state.nickname}/>
					</label>
					<br/><br/>

					<label>
						Username:<br/>
						<input type="username" name="username" value=${this.state.username}/>
					</label>
					<br/><br/>

					<label>
						Real name:<br/>
						<input type="text" name="realname" value=${this.state.realname}/>
					</label>
					<br/><br/>

					<label>
						Server password:<br/>
						<input type="password" name="pass" value=${this.state.pass} placeholder="None"/>
					</label>
					<br/>
				</details>

				<br/>
				${e}
				${" "}
				<button>
					${this.props.isNew?"Add network":"Save network"}
				</button>
			</form>
		`}}class rb extends N{state={username:"",password:""};constructor(e){super(e),this.handleInput=this.handleInput.bind(this),this.handleSubmit=this.handleSubmit.bind(this),e.username&&(this.state.username=e.username)}handleInput(e){let t=e.target,s="checkbox"===t.type?t.checked:t.value;this.setState({[t.name]:s})}handleSubmit(e){e.preventDefault(),this.props.onSubmit(this.state.username,this.state.password)}render(){return t$`
			<form onInput=${this.handleInput} onSubmit=${this.handleSubmit}>
				<label>
					Username:<br/>
					<input type="username" name="username" value=${this.state.username} required/>
				</label>
				<br/><br/>

				<label>
					Password:<br/>
					<input type="password" name="password" value=${this.state.password} required autofocus/>
				</label>
				<br/><br/>

				<button>Login</button>
			</form>
		`}}class rk extends N{state={email:"",password:""};constructor(e){super(e),this.handleInput=this.handleInput.bind(this),this.handleSubmit=this.handleSubmit.bind(this)}handleInput(e){let t=e.target,s="checkbox"===t.type?t.checked:t.value;this.setState({[t.name]:s})}handleSubmit(e){e.preventDefault(),this.props.onSubmit(this.state.email,this.state.password)}render(){return t$`
			<form onInput=${this.handleInput} onSubmit=${this.handleSubmit}>
				<label>
					E-mail:<br/>
					<input
						type="email"
						name="email"
						value=${this.state.email}
						required=${this.props.emailRequired}
						placeholder=${this.props.emailRequired?null:"(optional)"}
						autofocus
					/>
				</label>
				<br/><br/>

				<label>
					Password:<br/>
					<input type="password" name="password" value=${this.state.password} required/>
				</label>
				<br/><br/>

				<button>Register</button>
			</form>
		`}}class rv extends N{state={code:""};constructor(e){super(e),this.handleInput=this.handleInput.bind(this),this.handleSubmit=this.handleSubmit.bind(this)}handleInput(e){let t=e.target,s="checkbox"===t.type?t.checked:t.value;this.setState({[t.name]:s})}handleSubmit(e){e.preventDefault(),this.props.onSubmit(this.state.code)}render(){return t$`
			<form onInput=${this.handleInput} onSubmit=${this.handleSubmit}>
				<p>Your account <strong>${this.props.account}</strong> has been created, but a verification code is required to complete the registration.</p>

				<p>${sa(this.props.message)}</p>

				<label>
					Verification code:<br/>
					<input type="text" name="code" value=${this.state.code} required autofocus autocomplete="off"/>
				</label>
				<br/><br/>

				<button>Verify account</button>
			</form>
		`}}class rw extends N{state={};constructor(e){super(e),this.state.secondsInTimestamps=e.settings.secondsInTimestamps,this.state.bufferEvents=e.settings.bufferEvents,this.handleInput=this.handleInput.bind(this),this.handleSubmit=this.handleSubmit.bind(this)}handleInput(e){let t=e.target,s="checkbox"===t.type?t.checked:t.value;this.setState({[t.name]:s},()=>{this.props.onChange(this.state)})}handleSubmit(e){e.preventDefault(),this.props.onClose()}registerProtocol(){let e=window.location.origin+window.location.pathname+"?open=%s";try{navigator.registerProtocolHandler("irc",e),navigator.registerProtocolHandler("ircs",e)}catch(e){console.error("Failed to register protocol handler: ",e)}}render(){let e=null;return this.props.showProtocolHandler&&(e=t$`
				<div class="protocol-handler">
					<div class="left">
						Set gamja as your default IRC client for this browser.
						IRC links will be automatically opened here.
					</div>
					<div class="right">
						<button type="button" onClick=${()=>this.registerProtocol()}>
							Enable
						</button>
					</div>
				</div>
				<br/><br/>
			`),t$`
			<form onInput=${this.handleInput} onSubmit=${this.handleSubmit}>
				<label>
					<input
						type="checkbox"
						name="secondsInTimestamps"
						checked=${this.state.secondsInTimestamps}
					/>
					Show seconds in time indicator
				</label>
				<br/><br/>

				<label>
					<input
						type="radio"
						name="bufferEvents"
						value="fold"
						checked=${"fold"===this.state.bufferEvents}
					/>
					Show and fold chat events
				</label>
				<br/>
				<label>
					<input
						type="radio"
						name="bufferEvents"
						value="expand"
						checked=${"expand"===this.state.bufferEvents}
					/>
					Show and expand chat events
				</label>
				<br/>
				<label>
					<input
						type="radio"
						name="bufferEvents"
						value="hide"
						checked=${"hide"===this.state.bufferEvents}
					/>
					Hide chat events
				</label>
				<br/><br/>

				${e}

				<button type="button" class="danger" onClick=${()=>this.props.onDisconnect()}>
					Disconnect
				</button>
				<button>
					Close
				</button>
			</form>
		`}}class ry extends N{constructor(e){super(e),this.handleClick=this.handleClick.bind(this)}handleClick(e){e.preventDefault(),this.props.onClick()}render(){let e=this.props.selected?"selected":"";return t$`
			<li>
				<a
					href=${sv(this.props.buffer)}
					class=${e}
					onClick=${this.handleClick}
				>
					<span class="server">
						${sy(this.props.server,this.props.bouncerNetwork)}
					</span>
					${this.props.buffer.name}
				</a>
			</li>
		`}}function rS(e,t){return+!!e.toLowerCase().includes(t)}class rE extends N{state={query:"",selected:0};constructor(e){super(e),this.handleInput=this.handleInput.bind(this),this.handleSubmit=this.handleSubmit.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this)}getSuggestions(){let e=this.state.query.toLowerCase(),t=[],s=new Map;for(let r of this.props.buffers.values()){if(r.type===sc)continue;let n=0;if(""!==e){let t=this.props.servers.get(r.server);if(!(n=function(e,t,s){let r=2*rS(e.name,s);switch(e.type){case su:r+=rS(e.topic||"",s);break;case sh:let n=t.users.get(e.name);n&&n.realname&&tV(n.realname,e.name)&&(r+=rS(n.realname,s))}return r}(r,t,e)))continue}s.set(r.id,n),t.push(r)}return t.sort((e,t)=>s.get(t.id)-s.get(e.id)),t.slice(0,20)}handleInput(e){let t=e.target;this.setState({[t.name]:t.value})}handleSubmit(e){e.preventDefault(),this.props.onSubmit(this.getSuggestions()[this.state.selected])}handleKeyDown(e){switch(e.key){case"ArrowUp":e.stopPropagation(),this.move(-1);break;case"ArrowDown":e.stopPropagation(),this.move(1)}}move(e){let t=this.getSuggestions().length;this.setState(s=>({selected:(s.selected+e+t)%t}))}render(){let e=this.getSuggestions().map((e,t)=>{let s=this.props.servers.get(e.server),r=null;return s.bouncerNetID&&(r=this.props.bouncerNetworks.get(s.bouncerNetID)),t$`
				<${ry}
					buffer=${e}
					server=${s}
					bouncerNetwork=${r}
					selected=${this.state.selected===t}
					onClick=${()=>this.props.onSubmit(e)}
				/>
			`});return t$`
			<form
				onInput=${this.handleInput}
				onSubmit=${this.handleSubmit}
				onKeyDown=${this.handleKeyDown}
			>
				<input
					type="search"
					name="query"
					value=${this.state.query}
					placeholder="Filter"
					autocomplete="off"
					autofocus
				/>
				<ul class="switcher-list">
					${e}
				</ul>
			</form>
		`}}class rC extends N{state={text:""};textInput=_();lastAutocomplete=null;constructor(e){super(e),this.handleInput=this.handleInput.bind(this),this.handleSubmit=this.handleSubmit.bind(this),this.handleInputKeyDown=this.handleInputKeyDown.bind(this),this.handleInputPaste=this.handleInputPaste.bind(this),this.handleDragOver=this.handleDragOver.bind(this),this.handleDrop=this.handleDrop.bind(this),this.handleWindowKeyDown=this.handleWindowKeyDown.bind(this),this.handleWindowPaste=this.handleWindowPaste.bind(this)}handleInput(e){this.setState({[e.target.name]:e.target.value}),this.props.readOnly&&"text"===e.target.name&&!e.target.value&&e.target.blur()}handleSubmit(e){e.preventDefault(),this.props.onSubmit(this.state.text),this.setState({text:""})}handleInputKeyDown(e){let t,s=e.target;if(!this.props.autocomplete||"Tab"!==e.key||s.selectionStart!==s.selectionEnd)return;e.preventDefault();let r=s.selectionStart,n=this.state.text;if(this.lastAutocomplete&&this.lastAutocomplete.text===n&&this.lastAutocomplete.carretPos===r)t=this.lastAutocomplete;else{let e,a;for(this.lastAutocomplete=null,e=r-1;e>=0&&" "!==n[e];e--);for(e++,a=r;a<n.length&&" "!==n[a];a++);let i=n.slice(e,a);if(!i)return;let o=this.props.autocomplete(i);if(0===o.length)return;t={text:n,carretPos:s.selectionStart,prefix:n.slice(0,e),suffix:n.slice(a),replacements:o,replIndex:-1}}let a=t.replacements.length;e.shiftKey?t.replIndex--:t.replIndex++,t.replIndex=(t.replIndex+a)%a;let i=t.replacements[t.replIndex];t.prefix||t.suffix||(i.startsWith("/")?i+=" ":i+=": "),t.text=t.prefix+i+t.suffix,t.carretPos=t.prefix.length+i.length,s.value=t.text,s.selectionStart=t.carretPos,s.selectionEnd=s.selectionStart,this.lastAutocomplete=t,this.setState({text:t.text})}canUploadFiles(){let e=this.props.client;return e&&e.isupport.filehost()&&!this.props.readOnly}async uploadFile(e){var t;let s,r,n=this.props.client,a=n.isupport.filehost();if(n.params.saslPlain){let e=n.params.saslPlain;r="Basic "+btoa(e.username+":"+e.password)}else n.params.saslOauthBearer&&(r="Bearer "+n.params.saslOauthBearer.token);let i={"Content-Length":e.size,"Content-Disposition":(s=encodeURIComponent(t=e.name))===t?'attachment; filename="'+t+'"':"attachment; filename*=UTF-8''"+s};e.type&&(i["Content-Type"]=e.type),r&&(i.Authorization=r);let o=await fetch(a,{method:"POST",body:e,headers:i,credentials:"include"});if(!o.ok)throw Error(`HTTP request failed (${o.status})`);let l=o.headers.get("Location");if(!l)throw Error("filehost response missing Location header field");return new URL(l,a)}async uploadFileList(e){let t,s=[];for(let t of e)s.push(this.uploadFile(t));try{t=await Promise.all(s)}catch(e){this.props.onError(Error("Failed to upload files",{cause:e}));return}this.setState(e=>e.text?{text:e.text+" "+t.join(" ")}:{text:t.join(" ")})}async handleInputPaste(e){0!==e.clipboardData.files.length&&this.canUploadFiles()&&(e.preventDefault(),e.stopImmediatePropagation(),await this.uploadFileList(e.clipboardData.files))}handleDragOver(e){if(0!==e.dataTransfer.items.length&&this.canUploadFiles()){for(let t of e.dataTransfer.items)if("file"!==t.kind)return;e.preventDefault()}}async handleDrop(e){0!==e.dataTransfer.files.length&&this.canUploadFiles()&&(e.preventDefault(),e.stopImmediatePropagation(),await this.uploadFileList(e.dataTransfer.files))}handleWindowKeyDown(e){if(document.activeElement&&document.activeElement!==document.body)switch(document.activeElement.tagName.toLowerCase()){case"section":case"a":break;default:return}e.altKey||e.ctrlKey||e.metaKey||1!=[...e.key].length||this.state.text||this.props.readOnly||this.props.commandOnly&&"/"!==e.key||(e.preventDefault(),this.setState({text:e.key},()=>{this.focus()}))}handleWindowPaste(e){if(document.activeElement!==document.body&&"SECTION"!==document.activeElement.tagName||this.props.readOnly||!this.textInput.current)return;if(e.clipboardData.files.length>0)return void this.handleInputPaste(e);let t=e.clipboardData.getData("text");e.preventDefault(),e.stopImmediatePropagation(),this.textInput.current.focus(),this.textInput.current.setRangeText(t,void 0,void 0,"end"),this.setState({text:this.textInput.current.value})}componentDidMount(){window.addEventListener("keydown",this.handleWindowKeyDown),window.addEventListener("paste",this.handleWindowPaste)}componentWillUnmount(){window.removeEventListener("keydown",this.handleWindowKeyDown),window.removeEventListener("paste",this.handleWindowPaste)}focus(){this.textInput.current&&(document.activeElement.blur(),this.textInput.current.focus())}render(){let e="";this.props.readOnly&&!this.state.text&&(e="read-only");let t="Type a message";return this.props.commandOnly&&(t="Type a command (see /help)"),t$`
			<form
				id="composer"
				class=${e}
				onInput=${this.handleInput}
				onSubmit=${this.handleSubmit}
			>
				<input
					type="text"
					name="text"
					ref=${this.textInput}
					value=${this.state.text}
					autocomplete="off"
					placeholder=${t}
					enterkeyhint="send"
					onKeyDown=${this.handleInputKeyDown}
					onPaste=${this.handleInputPaste}
					onDragOver=${this.handleDragOver}
					onDrop=${this.handleDrop}
					maxlength=${this.props.maxLen}
				/>
			</form>
		`}}let r$=new Map;class r_ extends N{constructor(e){super(e),this.handleScroll=sD(this.handleScroll.bind(this),100),this.handleResize=this.handleResize.bind(this),this.stickToBottom=!0,this.resizeObserver=new ResizeObserver(this.handleResize)}isAtBottom(){let e=this.props.target.current;return 10>=Math.abs(e.scrollHeight-e.clientHeight-e.scrollTop)}saveScrollPosition(e){let t=this.props.target.current,s=t.querySelectorAll(this.props.stickTo),r=null;if(!this.isAtBottom())for(let e=0;e<s.length;e++){let n=s[e];if(n.offsetTop>=t.scrollTop+t.offsetTop){r=n.dataset.key;break}}r$.set(e,r)}restoreScrollPosition(){let e=this.props.target.current;if(!e.firstChild)return;let t=r$.get(this.props.scrollKey);if(t){let s=e.querySelector('[data-key="'+t+'"]');s&&s.scrollIntoView()}else e.firstChild.scrollIntoView({block:"end"});this.stickToBottom=!t,0===e.scrollTop&&this.props.onScrollTop()}handleScroll(){0===this.props.target.current.scrollTop&&this.props.onScrollTop(),this.stickToBottom=this.isAtBottom()}handleResize(){this.stickToBottom&&this.props.target.current.firstChild&&this.props.target.current.firstChild.scrollIntoView({block:"end"})}componentDidMount(){this.restoreScrollPosition(),this.props.target.current.addEventListener("scroll",this.handleScroll),this.resizeObserver.observe(this.props.target.current)}getSnapshotBeforeUpdate(e){(this.props.scrollKey!==e.scrollKey||this.props.children!==e.children)&&this.saveScrollPosition(e.scrollKey)}componentDidUpdate(e){this.props.target.current&&this.restoreScrollPosition()}componentWillUnmount(){this.resizeObserver.unobserve(this.props.target.current),this.props.target.current.removeEventListener("scroll",this.handleScroll),this.saveScrollPosition(this.props.scrollKey)}render(){return this.props.children}}class rI extends N{body=_();constructor(e){super(e),this.handleCloseClick=this.handleCloseClick.bind(this),this.handleBackdropClick=this.handleBackdropClick.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this)}dismiss(){this.props.onDismiss()}handleCloseClick(e){e.preventDefault(),this.dismiss()}handleBackdropClick(e){"dialog"===e.target.className&&this.dismiss()}handleKeyDown(e){"Escape"===e.key&&this.dismiss()}componentDidMount(){window.addEventListener("keydown",this.handleKeyDown);let e=this.body.current.querySelector("input[autofocus]");e&&e.focus()}componentWillUnmount(){window.removeEventListener("keydown",this.handleKeyDown)}render(){return t$`
			<div class="dialog" onClick=${this.handleBackdropClick} role="dialog" aria-modal="true">
				<div class="dialog-body" ref=${this.body}>
					<div class="dialog-header">
						<h2>${this.props.title}</h2>
						<button class="dialog-close" onClick=${this.handleCloseClick} title="Close">×</button>
					</div>
					${this.props.children}
				</div>
			</div>
		`}}let rN={server:{}},rx=fetch("./config.json").then(e=>e.ok?e.json():(404!==e.status&&console.error("Failed to fetch config: HTTP error:",e.status,e.statusText),{})).catch(e=>(console.error("Failed to fetch config:",e),{})).then(e=>({...rN,...e}));function rT(e,t){return e&&e.receipts?e.receipts[sf]:null}let rR=0;class rO extends N{state={...sO.create(),connectParams:{url:null,pass:null,username:null,realname:null,nick:null,saslPlain:null,saslExternal:!1,autoconnect:!1,autojoin:[],ping:0},connectForm:!0,loading:!0,dialog:null,dialogData:null,error:null,openPanels:{bufferList:!1,memberList:!1}};debug=!function(){try{return!0}catch(e){return!1}}();config={...rN};clients=new Map;endOfHistory=new Map;receipts=new Map;buffer=_();composer=_();switchToChannel=null;autoOpenURL=null;messageNotifications=new Set;baseTitle=null;lastFocusPingDate=null;constructor(e){super(e),this.handleConnectSubmit=this.handleConnectSubmit.bind(this),this.handleJoinSubmit=this.handleJoinSubmit.bind(this),this.handleBufferListClick=this.handleBufferListClick.bind(this),this.handleBufferListClose=this.handleBufferListClose.bind(this),this.toggleBufferList=this.toggleBufferList.bind(this),this.toggleMemberList=this.toggleMemberList.bind(this),this.handleComposerSubmit=this.handleComposerSubmit.bind(this),this.handleChannelClick=this.handleChannelClick.bind(this),this.handleNickClick=this.handleNickClick.bind(this),this.autocomplete=this.autocomplete.bind(this),this.handleBufferScrollTop=this.handleBufferScrollTop.bind(this),this.dismissDialog=this.dismissDialog.bind(this),this.handleAddNetworkClick=this.handleAddNetworkClick.bind(this),this.handleNetworkSubmit=this.handleNetworkSubmit.bind(this),this.handleNetworkRemove=this.handleNetworkRemove.bind(this),this.showError=this.showError.bind(this),this.handleDismissError=this.handleDismissError.bind(this),this.handleAuthSubmit=this.handleAuthSubmit.bind(this),this.handleRegisterSubmit=this.handleRegisterSubmit.bind(this),this.handleVerifyClick=this.handleVerifyClick.bind(this),this.handleVerifySubmit=this.handleVerifySubmit.bind(this),this.handleOpenSettingsClick=this.handleOpenSettingsClick.bind(this),this.handleSettingsChange=this.handleSettingsChange.bind(this),this.handleSettingsDisconnect=this.handleSettingsDisconnect.bind(this),this.handleSwitchSubmit=this.handleSwitchSubmit.bind(this),this.handleWindowFocus=this.handleWindowFocus.bind(this),this.state.settings={...this.state.settings,...sP.load()},this.bufferStore=new sB,rx.then(e=>(this.handleConfig(e),e))}async handleConfig(e){let t,s,r={...this.state.connectParams};"string"==typeof e.server.url&&(r.url=e.server.url),Array.isArray(e.server.autojoin)?r.autojoin=e.server.autojoin:"string"==typeof e.server.autojoin&&(r.autojoin=[e.server.autojoin]),"string"==typeof e.server.nick&&(r.nick=e.server.nick),"boolean"==typeof e.server.autoconnect&&(r.autoconnect=e.server.autoconnect),"external"===e.server.auth&&(r.saslExternal=!0),"number"==typeof e.server.ping&&(r.ping=e.server.ping),r.autoconnect&&"mandatory"===e.server.auth&&(console.error('Error in config.json: cannot set server.autoconnect = true and server.auth = "mandatory"'),r.autoconnect=!1),"oauth2"!==e.server.auth||e.oauth2&&e.oauth2.url&&e.oauth2.client_id||(console.error('Error in config.json: server.auth = "oauth2" requires oauth2 settings'),e.server.auth=null);let n=sL.load();n&&(r={...r,...n,autoconnect:!0,autojoin:[]});let a=[],i=(t=window.location.search.substring(1),s={},t.split("&").forEach(e=>{if(!e)return;let t=e.split("=");s[decodeURIComponent(t[0])]=decodeURIComponent(t[1]||"")}),s);if("string"!=typeof i.server||r.url&&i.server||(r.url=i.server,e.server.auth=null),"string"==typeof i.nick&&(r.nick=i.nick),"string"==typeof i.channels&&(a=i.channels.split(",")),"string"==typeof i.open&&(this.autoOpenURL=tJ(i.open)),"1"===i.debug?this.debug=!0:"0"===i.debug&&(this.debug=!1),window.location.hash&&(a=window.location.hash.split(",")),this.config=e,!r.nick&&r.autoconnect&&(r.nick="user-*"),r.nick&&r.nick.includes("*")){let e=Math.random().toString(36).substr(2,7);r.nick=r.nick.replace("*",e)}if("oauth2"===e.server.auth&&!r.saslOauthBearer){let e;if(i.error){console.error("OAuth 2.0 authorization failed: ",i.error),this.showError("Authentication failed: "+(i.error_description||i.error));return}if(!i.code)return void this.redirectOauth2Authorize();let t=new URL(window.location.toString());t.searchParams.delete("code"),t.searchParams.delete("state"),window.history.replaceState(null,"",t.toString());try{e=await this.exchangeOauth2Code(i.code)}catch(e){this.showError(e);return}r.saslOauthBearer=e,e.username&&!r.nick&&(r.nick=e.username)}a.length>0&&(r.autoconnect?this.autoOpenURL={host:"",entity:a[0]}:r.autojoin=a),this.setState({loading:!1,connectParams:r}),r.autoconnect&&(this.setState({connectForm:!1}),this.connect(r))}async redirectOauth2Authorize(){let e;try{e=await se(this.config.oauth2.url)}catch(e){console.error("Failed to fetch OAuth 2.0 server metadata:",e),this.showError("Failed to fetch OAuth 2.0 server metadata");return}!function({serverMetadata:e,clientId:t,redirectUri:s,scope:r}){let n={response_type:"code",client_id:t,redirect_uri:s};r&&(n.scope=r),window.location.assign(e.authorization_endpoint+"?"+t8(n))}({serverMetadata:e,clientId:this.config.oauth2.client_id,redirectUri:window.location.toString(),scope:this.config.oauth2.scope})}async exchangeOauth2Code(e){let t=await se(this.config.oauth2.url),s=new URL(window.location.toString());s.searchParams.delete("code"),s.searchParams.delete("state");let r=(await ss({serverMetadata:t,redirectUri:s.toString(),code:e,clientId:this.config.oauth2.client_id,clientSecret:this.config.oauth2.client_secret})).access_token,n=null;if(t.introspection_endpoint)try{(n=(await sr({serverMetadata:t,token:r,clientId:this.config.oauth2.client_id,clientSecret:this.config.oauth2.client_secret})).username)||console.warn("Username missing from OAuth 2.0 token introspection response")}catch(e){console.warn("Failed to introspect OAuth 2.0 token:",e)}return{token:r,username:n}}showError(e){let t;if(console.error("App error: ",e),e instanceof Error){let s=[];for(;e;)s.push(e.message),e=e.cause;t=s.join(": ")}else t=String(e);return this.setState({error:t}),++rR}dismissError(e){e&&e!==rR||this.setState({error:null})}handleDismissError(e){e.preventDefault(),this.dismissError()}setServerState(e,t,s){this.setState(s=>sO.updateServer(s,e,t),s)}setBufferState(e,t,s){this.setState(s=>sO.updateBuffer(s,e,t),s)}syncBufferUnread(e,t){let s=this.clients.get(e),r=this.bufferStore.get({name:t,server:s.params});s.caps.enabled.has("draft/chathistory")&&r&&this.setBufferState({server:e,name:t},{unread:r.unread},()=>{this.updateDocumentTitle()}),this.bufferStore.put({name:t,server:s.params,closed:!1})}createBuffer(e,t){let s=this.clients.get(e),r=null,n=!1;return this.setState(a=>{let i;return[r,i]=sO.createBuffer(a,t,e,s),n=!!i,i}),n&&this.syncBufferUnread(e,t),r}sendReadReceipt(e,t){if(!e.supportsReadMarker())return;let s=t.receipts[sf];"*"!==t.name&&s&&e.setReadMarker(t.name,s.time)}switchBuffer(e){let t;this.setState(s=>{if(!(t=sO.getBuffer(s,e)))return;let r=this.clients.get(t.server),n=rT(this.bufferStore.get({name:t.name,server:r.params}),sf),a=sO.updateBuffer(s,t.id,{prevReadReceipt:n});return{activeBuffer:t.id,...a}},()=>{if(!t)return;this.buffer.current&&this.buffer.current.focus();let e=this.state.servers.get(t.server);t.type!==sh||e.users.has(t.name)||this.whoUserBuffer(t.name,t.server),t.type!==su||t.hasInitialWho||this.whoChannelBuffer(t.name,t.server),this.updateDocumentTitle()}),this.markBufferAsRead(e)}markBufferAsRead(e){let t;this.setState(s=>{if(t=sO.getBuffer(s,e))return sO.updateBuffer(s,t.id,{unread:sd.NONE})},()=>{if(!t)return;let e=this.clients.get(t.server);for(let s of this.messageNotifications)e.cm(s.data.bufferName)===e.cm(t.name)&&s.close();if(t.messages.length>0){let s=t.messages[t.messages.length-1],r={name:t.name,server:e.params,unread:sd.NONE,receipts:{[sf]:sS(s)}};this.bufferStore.put(r)&&this.sendReadReceipt(e,r)}this.updateDocumentTitle()})}updateDocumentTitle(){let e,t,s=sO.getBuffer(this.state,this.state.activeBuffer);s&&(e=this.state.servers.get(s.server)),e.bouncerNetID&&(t=this.state.bouncerNetworks.get(e.bouncerNetID));let r=0;for(let e of this.state.buffers.values())sd.compare(e.unread,sd.HIGHLIGHT)>=0&&r++;let n=[];s&&s.type!==sc&&n.push(s.name),t&&n.push(sy(e,t)),n.push(this.baseTitle);let a="";r>0&&(a=`(${r}) `),a+=n.join(" · "),document.title=a}prepareChatMessage(e,t){if(void 0===t.isHighlight){let s=this.clients.get(e);t.isHighlight=function(e,t,s){if("PRIVMSG"!==e.command&&"NOTICE"!==e.command||(t=s(t),e.prefix&&s(e.prefix.name)===t))return!1;let r=s(e.params[1]);for(;;){let e=r.indexOf(t);if(e<0)return!1;let s="\0",n="\0";if(e>0&&(s=r[e-1]),e+t.length<r.length&&(n=r[e+t.length]),tH(s)&&tH(n)&&!function(e){for(let t=e.length-1;t>=0;t--)if(tB.test(e[t])){e=e.slice(t);break}let t=e.indexOf("://");if(t<=0)return!1;let s=e[t-1];switch(s){case"+":case"-":case".":return!0;default:return tP.test(s)}}(r.slice(0,e)))return!0;r=r.slice(e+t.length)}}(t,s.nick,s.cm)||("PRIVMSG"===t.command||"NOTICE"===t.command)&&t.params[0].startsWith("$")}t.tags||(t.tags={}),t.tags.time||(t.tags.time=tU(new Date))}handleChatMessage(e,t,s){let r=this.clients.get(e);this.prepareChatMessage(e,s);let n=this.bufferStore.get({name:t,server:r.params}),a=rT(n,sm),i=rT(n,sf),o=sC(s,a),l=sC(s,i);r.isMyNick(s.prefix.name)&&(l=!0);let c=sd.NONE;if(("PRIVMSG"===s.command||"NOTICE"===s.command)&&!l){let n,a=s.params[0],i=s.params[1];if(s.isHighlight?(c=sd.HIGHLIGHT,n="highlight"):r.isMyNick(a)?(c=sd.HIGHLIGHT,n="private message"):c=sd.MESSAGE,c===sd.HIGHLIGHT&&!o&&!tW(s)){let a="New "+n+" from "+s.prefix.name;r.isChannel(t)&&(a+=" in "+t);let o=function(e,t){if(!window.Notification||"granted"!==Notification.permission)return null;try{return new Notification(e,t)}catch(e){return console.error("Failed to show notification: ",e),null}}(a,{body:sl(i),requireInteraction:!0,tag:"msg,server="+e+",from="+s.prefix.name+",to="+t,data:{bufferName:t,message:s}});o&&(o.addEventListener("click",()=>{this.switchBuffer({server:e,name:t})}),o.addEventListener("close",()=>{this.messageNotifications.delete(o)}),this.messageNotifications.add(o))}}if("INVITE"===s.command&&r.isMyNick(s.params[0])){c=sd.HIGHLIGHT;let n=s.params[1],a=new Notification("Invitation to "+n,{body:s.prefix.name+" has invited you to "+n,requireInteraction:!0,tag:"invite,server="+e+",from="+s.prefix.name+",channel="+n,actions:[{action:"accept",title:"Accept"}]});a&&a.addEventListener("click",a=>{if("accept"===a.action){let a={name:t,server:r.params,receipts:{[sf]:sS(s)}};this.bufferStore.put(a)&&this.sendReadReceipt(r,a),this.open(n,e)}else this.switchBuffer({server:e,name:t})})}(!r.isMyNick(s.prefix.name)||r.isMyNick(t))&&"PART"!==s.command&&"QUIT"!==s.command&&"730"!==s.command&&"731"!==s.command&&this.createBuffer(e,t);let u={server:e,name:t};this.setState(e=>sO.addMessage(e,s,u)),this.setBufferState(u,e=>{let t=e.unread,n=e.prevReadReceipt,a={[sm]:sS(s)};this.state.activeBuffer===e.id&&document.hasFocus()?a[sf]=sS(s):t=sd.union(t,c),r.isMyNick(s.prefix.name)&&!sC(s,n)&&(n=sS(s));let i={name:e.name,server:r.params,unread:t,receipts:a};return this.bufferStore.put(i)&&this.sendReadReceipt(r,i),{unread:t,prevReadReceipt:n}},()=>{c===sd.HIGHLIGHT&&this.updateDocumentTitle()})}connect(e){var t;let s,r,n;e={...this.state.connectParams,...e};let a=null;this.setState(e=>{let t;return[a,t]=sO.createServer(e),t}),this.setState({connectParams:e});let i=new t7({...(t=e,s=window.location.host||"localhost:8080",r="wss:","https:"!==window.location.protocol&&(r="ws:"),n=window.location.pathname||"/",!window.location.host&&(n="/"),!(t={...t}).url&&(t.url=r+"//"+s+n+"socket"),t.url.startsWith("/")&&(t.url=r+"//"+s+t.url),0>t.url.indexOf("://")&&(t.url=r+"//"+t.url),!t.username&&(t.username=t.nick),!t.realname&&(t.realname=t.nick),t),eventPlayback:this.state.settings.bufferEvents!==sb});i.debug=this.debug,this.clients.set(a,i),this.setServerState(a,{status:i.status});let o=null;i.addEventListener("status",()=>{switch(this.setServerState(a,{status:i.status}),i.status){case t7.Status.DISCONNECTED:this.setServerState(a,{account:null}),this.setState(e=>{let t=new Map(e.buffers);return e.buffers.forEach(e=>{e.server===a&&t.set(e.id,{...e,joined:!1})}),{buffers:t}});break;case t7.Status.REGISTERED:this.setState({connectForm:!1}),o&&this.dismissError(o)}}),i.addEventListener("message",e=>{this.handleMessage(a,e.detail.message)}),i.addEventListener("error",e=>{o=this.showError(e.detail)}),this.createBuffer(a,"*"),this.state.activeBuffer||this.switchBuffer({server:a,name:"*"}),e.autojoin.length>0&&(this.switchToChannel=e.autojoin[0])}disconnect(e){e||(e=sO.getActiveServerID(this.state));let t=this.clients.get(e);t&&(this.clients.delete(e),t.disconnect())}reconnect(e){e||(e=sO.getActiveServerID(this.state));let t=this.clients.get(e);t&&t.reconnect()}serverFromBouncerNetwork(e){for(let[t,s]of this.clients)if(s.params.bouncerNetwork===e)return t;return null}routeMessage(e,t){let s,r,n,a=this.clients.get(e),i=tQ(t,"chathistory");if(t.internal)return[];switch(t.command){case"MODE":if(s=t.params[0],a.isChannel(s))return[s];return["*"];case"NOTICE":case"PRIVMSG":if(s=t.params[0],a.isMyNick(s))if(a.cm(t.prefix.name)===a.cm(a.serverPrefix.name))s="*";else{let r=t.tags["+draft/channel-context"];s=r&&a.isChannel(r)&&sO.getBuffer(this.state,{server:e,name:r})?r:t.prefix.name}let o=a.isupport.statusMsg();if(o){let e=tM(s,o);a.isChannel(e.name)&&(s=e.name)}let l=!0;if("PRIVMSG"!==t.command)l=!1;else{let e=tW(t);e&&"ACTION"!==e.command&&(l=!1)}return l||sO.getBuffer(this.state,{server:e,name:s})||(s="*"),[s];case"JOIN":if(r=t.params[0],!a.isMyNick(t.prefix.name))return[r];return[];case"PART":case"KICK":case"TOPIC":return[r=t.params[0]];case"QUIT":return n=[],i?n.push(i.params[0]):this.state.buffers.forEach(s=>{s.server!==e||s.members.has(t.prefix.name)&&n.push(s.name)}),n;case"NICK":let c=t.params[0];return n=[],i?n.push(i.params[0]):(this.state.buffers.forEach(s=>{s.server!==e||s.members.has(t.prefix.name)&&n.push(s.name)}),a.isMyNick(c)&&n.push("*")),n;case"INVITE":let u=r=t.params[1];return sO.getBuffer(this.state,{server:e,name:r})||(u="*"),[u];case"324":case"329":case"346":case"347":case"348":case"349":case"367":case"368":case"728":case"729":return[r=t.params[1]];case"341":return[r=t.params[2]];case"730":case"731":let h=t.params[1].split(",");for(let e of(n=[],h)){let t=tD(e);n.push(t.name)}return n;case"002":case"004":case"005":case"376":case"422":case"301":case"331":case"332":case"333":case"353":case"366":case"903":case"328":case"AWAY":case"SETNAME":case"CHGHOST":case"ACCOUNT":case"CAP":case"AUTHENTICATE":case"PING":case"PONG":case"BATCH":case"TAGMSG":case"CHATHISTORY":case"ACK":case"BOUNCER":case"MARKREAD":case"REDACT":return[];default:return["*"]}}handleMessage(e,t){let s,r,n,a=this.clients.get(e);if(tQ(t,"chathistory"))return;let i=this.routeMessage(e,t);switch(this.setState(s=>sO.handleMessage(s,t,e,a)),t.command){case"001":this.fetchBacklog(e);break;case"376":case"422":let o=[];for(let t of this.bufferStore.list(a.params))if("*"!==t.name&&!t.closed)if(a.isChannel(t.name)){if(a.caps.enabled.has("soju.im/bouncer-networks"))continue;o.push(t.name)}else this.createBuffer(e,t.name),this.whoUserBuffer(t.name,e);let l=this.state.servers.get(e).bouncerNetID,c=null;l&&(c=this.state.bouncerNetworks.get(l)),c&&"connected"!==c.state||(o=o.concat(a.params.autojoin),a.params.autojoin=[]),o.length>0&&a.send({command:"JOIN",params:[o.join(",")]});let u=c?c.host:"";this.autoOpenURL&&u===this.autoOpenURL.host&&(this.openURL(this.autoOpenURL),this.autoOpenURL=null);break;case"JOIN":r=t.params[0],a.isMyNick(t.prefix.name)&&this.syncBufferUnread(e,r),r===this.switchToChannel&&(this.switchBuffer({server:e,name:r}),this.switchToChannel=null);break;case"BOUNCER":if("NETWORK"!==t.params[0]||a.isupport.bouncerNetID())break;let h=t.params[1],p=null;"*"!==t.params[2]&&(p=tR(t.params[2]));let d=!1;this.setState(e=>p?(d=!e.bouncerNetworks.has(h),sO.storeBouncerNetwork(e,h,p)):sO.deleteBouncerNetwork(e,h),()=>{if(p)d&&this.connect({...a.params,bouncerNetwork:h});else{let e=this.serverFromBouncerNetwork(h);e&&this.close({server:e,name:"*"})}if(p&&"connected"===p.state){let e=this.serverFromBouncerNetwork(h),t=this.clients.get(e);t&&t.status===t7.Status.REGISTERED&&t.params.autojoin&&t.params.autojoin.length>0&&(t.send({command:"JOIN",params:[t.params.autojoin.join(",")]}),t.params.autojoin=[])}});break;case"BATCH":if(!t.params[0].startsWith("-"))break;let m=t.params[0].slice(1),f=a.batches.get(m);if(!f||"soju.im/bouncer-networks"!==f.type)break;this.autoOpenURL&&this.autoOpenURL.host&&!this.findBouncerNetIDByHost(this.autoOpenURL.host)&&(this.openURL(this.autoOpenURL),this.autoOpenURL=null);break;case"MARKREAD":s=t.params[0];let g=t.params[1];if("*"===g||!g.startsWith("timestamp="))break;let b={time:g.replace("timestamp=","")};if(sE(b,rT(this.bufferStore.get({name:s,server:a.params}),sf)))break;for(let e of this.messageNotifications)a.cm(e.data.bufferName)===a.cm(s)&&sC(e.data.message,b)&&e.close();let k=!0;this.setBufferState({server:e,name:s},e=>{k=!1,n=sd.NONE;for(let t=e.messages.length-1;t>=0;t--){let s=e.messages[t];if("PRIVMSG"===s.command||"NOTICE"===s.command){if(sC(s,b))break;if(s.isHighlight||a.isMyNick(e.name)){n=sd.HIGHLIGHT;break}n=sd.MESSAGE}}return{unread:n}},()=>{this.bufferStore.put({name:s,server:a.params,unread:n,closed:k,receipts:{[sf]:b}}),this.updateDocumentTitle()});break;default:if(tj(t.command)&&"422"!==t.command){let e=t.params[t.params.length-1];this.showError(e)}}i.forEach(s=>{this.handleChatMessage(e,s,t)})}async fetchBacklog(e){let t=this.clients.get(e);if(!t.caps.enabled.has("draft/chathistory")||t.caps.enabled.has("soju.im/bouncer-networks")&&!t.params.bouncerNetwork)return;let s=function(e,t,s){let r=e.list(t),n=null;for(let e of r){if("*"===e.name)continue;let t=rT(e,s);sE(n,t)&&(n=t)}return n}(this.bufferStore,t.params,sm);if(!s)return;let r=tU(new Date);(await t.fetchHistoryTargets(r,s.time)).forEach(async n=>{let a,i=s,o=rT(this.bufferStore.get({name:n.name,server:t.params}),sf);sE(i,o)&&(i=o);let l=sO.getBuffer(this.state,{server:e,name:n.name});l&&l.messages.length>0&&(i=sS(l.messages[l.messages.length-1])),t.supportsReadMarker()&&t.isNick(n.name)&&t.fetchReadMarker(n.name);try{a=await t.fetchHistoryBetween(n.name,i,{time:r},4e3)}catch(e){console.error("Failed to fetch backlog for '"+n.name+"': ",e),this.showError("Failed to fetch backlog for '"+n.name+"'");return}for(let t of a.messages)for(let s of this.routeMessage(e,t))this.handleChatMessage(e,s,t)})}handleConnectSubmit(e){this.dismissError(),e.autoconnect?sL.put(e):sL.put(null);let t=this.state.buffers.get(this.state.activeBuffer);t&&this.close(t.server),this.connect(e)}handleChannelClick(e){this.openURL(e.target.href)&&e.preventDefault()}findBouncerNetIDByHost(e){for(let[t,s]of this.state.bouncerNetworks)if(s.host===e)return t;return null}openURL(e){var t;let s,r,n,a;if("string"==typeof e&&(e=tJ(e)),!e)return!1;let{host:i,port:o}=(r=t=e.host,n=null,(a=t.lastIndexOf(":"))>0&&!t.endsWith("]")&&(r=t.slice(0,a),n=parseInt(t.slice(a+1),10)),r.startsWith("[")&&r.endsWith("]")&&(r=r.slice(1,r.length-1)),{host:r,port:n});if(e.host){let t=this.findBouncerNetIDByHost(i);if(!t){let t=this.clients.values().next().value;if(!t||!t.caps.enabled.has("soju.im/bouncer-networks"))return!1;let s={host:i};return"number"==typeof o&&(s.port=o),this.openDialog("network",{params:s,autojoin:e.entity}),!0}for(let[e,r]of this.state.servers)if(r.bouncerNetID===t){s=e;break}}else s=sO.getActiveServerID(this.state);if(!s)return!1;let l=sO.getBuffer(this.state,{server:s,name:e.entity||"*"});return l?this.switchBuffer(l.id):this.openDialog("join",{server:s,channel:e.entity}),!0}handleNickClick(e){this.open(e)}whoUserBuffer(e,t){let s=this.clients.get(t);s.who(e,{fields:["flags","hostname","nick","realname","username","account"]}),s.monitor(e),s.supportsReadMarker()&&s.fetchReadMarker(e)}async whoChannelBuffer(e,t){let s=this.clients.get(t);this.setBufferState({name:e,server:t},{hasInitialWho:!0});let r=!1;try{await s.who(e,{fields:["flags","hostname","nick","realname","username","account"]}),r=!0}finally{this.setBufferState({name:e,server:t},{hasInitialWho:r})}}open(e,t,s){t||(t=sO.getActiveServerID(this.state));let r=this.clients.get(t);r.isServer(e)?this.switchBuffer({server:t}):r.isChannel(e)?(this.switchToChannel=e,r.join(e,s).catch(e=>{this.showError(e)})):(this.whoUserBuffer(e,t),this.createBuffer(t,e),this.switchBuffer({server:t,name:e}))}close(e){let t=sO.getBuffer(this.state,e);if(!t)return;let s=this.clients.get(t.server);switch(t.type){case sc:this.setState(e=>{let s=new Map(e.buffers);for(let[r,n]of e.buffers)n.server===t.server&&s.delete(r);let r=e.activeBuffer;return r&&e.buffers.get(r).server===t.server&&(r=s.size>0?s.keys().next().value:null),{buffers:s,activeBuffer:r}});let r=s&&!s.params.bouncerNetwork&&s.caps.enabled.has("soju.im/bouncer-networks"),n=this.state.servers.keys().next().value===t.server;if(this.disconnect(t.server),this.setState(e=>{let s=new Map(e.servers);s.delete(t.server);let r=e.connectForm;return 0===s.size&&(r=!0),{servers:s,connectForm:r}}),r){for(let e of this.clients.keys())this.close({server:e,name:"*"});this.bufferStore.clear()}else this.bufferStore.clear(s.params);n&&sL.put(null);break;case su:t.joined&&s.send({command:"PART",params:[t.name]});case sh:this.state.activeBuffer===t.id&&this.switchBuffer({name:"*"}),this.setState(e=>{let s=new Map(e.buffers);return s.delete(t.id),{buffers:s}}),s.unmonitor(t.name),this.bufferStore.put({name:t.name,server:s.params,closed:!0})}}disconnectAll(){this.close(this.state.buffers.keys().next().value)}executeCommand(e){let t=e.split(" "),s=t[0].toLowerCase().slice(1),r=t.slice(1),n=rh.get(s);if(!n)return void this.showError(`Unknown command "${s}" (run "/help" to get a command list)`);try{n.execute(this,r)}catch(e){console.error(`Failed to execute command "${s}":`,e),this.showError(e.message)}}privmsg(e,t){if("*"===e)return void this.showError("Cannot send message in server buffer");let s=sO.getActiveServerID(this.state),r=this.clients.get(s),n={command:"PRIVMSG",params:[e,t]};r.send(n),r.caps.enabled.has("echo-message")||(n.prefix={name:r.nick},this.handleChatMessage(s,e,n))}handleComposerSubmit(e){if(!e)return;if(e.startsWith("//"))e=e.slice(1);else if(e.startsWith("/"))return void this.executeCommand(e);let t=this.state.buffers.get(this.state.activeBuffer);t&&this.privmsg(t.name,e)}handleBufferListClick(e){this.switchBuffer(e),this.closeBufferList()}handleBufferListClose(e){this.close(e),this.closeBufferList()}toggleBufferList(){this.setState(e=>({openPanels:{...e.openPanels,bufferList:!e.openPanels.bufferList}}))}toggleMemberList(){this.setState(e=>({openPanels:{...e.openPanels,memberList:!e.openPanels.memberList}}))}closeBufferList(){this.setState(e=>({openPanels:{...e.openPanels,bufferList:!1}}))}closeMemberList(){this.setState(e=>({openPanels:{...e.openPanels,memberList:!1}}))}handleJoinClick(e){switch(e.type){case sc:this.openDialog("join",{server:e.server});break;case su:this.clients.get(e.server).send({command:"JOIN",params:[e.name]})}}handleJoinSubmit(e){this.open(e.channel,this.state.dialogData.server),this.dismissDialog()}autocomplete(e){function t(e,t){t=t.toLowerCase();let s=[];for(let r of e)r.toLowerCase().startsWith(t)&&s.push(r);return s}if(e.startsWith("/"))return t([...rh.keys()],e.slice(1)).map(e=>"/"+e);if(e.startsWith("#")){let s=[];for(let e of this.state.buffers.values())e.name.startsWith("#")&&s.push(e.name);return t(s,e)}let s=this.state.buffers.get(this.state.activeBuffer);return s&&s.members?t(s.members.keys(),e):[]}openHelp(){this.openDialog("help")}async handleBufferScrollTop(){let e,t=this.state.buffers.get(this.state.activeBuffer);if(!t||t.type===sc)return;let s=this.clients.get(t.server);if(!s||!s.caps.enabled.has("draft/chathistory")||!s.caps.enabled.has("server-time")||this.endOfHistory.get(t.id))return;e=t.messages.length>0?t.messages[0].tags.time:tU(new Date),this.endOfHistory.set(t.id,!0);let r=100;s.caps.enabled.has("draft/event-playback")&&(r=200);let n=await s.fetchHistoryBefore(t.name,e,r);if(this.endOfHistory.set(t.id,!n.more),n.messages.length>0){let e=n.messages[n.messages.length-1],r={[sm]:sS(e)};this.state.activeBuffer===t.id&&(r[sf]=sS(e));let a={name:t.name,server:s.params,receipts:r};this.bufferStore.put(a)&&this.sendReadReceipt(s,a),this.setBufferState(t,({prevReadReceipt:t})=>(sC(e,t)||(t=sS(e)),{prevReadReceipt:t}))}for(let e of n.messages)for(let s of(this.prepareChatMessage(t.server,e),this.routeMessage(t.server,e))){let r={server:t.server,name:s};this.setState(t=>sO.addMessage(t,e,r))}}openDialog(e,t){this.setState({dialog:e,dialogData:t})}dismissDialog(){this.setState({dialog:null,dialogData:null})}setDialogLoading(e){let t=e=>{this.setState(t=>({dialogData:{...t.dialogData,loading:e}}))};t(!0),e.finally(()=>t(!1))}handleAuthClick(e){let t=this.clients.get(e);this.openDialog("auth",{username:t.nick})}handleAuthSubmit(e,t){let s=sO.getActiveServerID(this.state),r=this.clients.get(s),n=r.authenticate("PLAIN",{username:e,password:t}).then(()=>{if(this.dismissDialog(),r!==this.clients.values().next().value)return;let s=sL.load();s&&(console.log("Saving SASL PLAIN credentials"),s={...s,saslPlain:{username:e,password:t}},sL.put(s))});this.setDialogLoading(n)}handleRegisterClick(e){let t=this.clients.get(e).checkAccountRegistrationCap("email-required");this.openDialog("register",{emailRequired:t})}handleRegisterSubmit(e,t){let s=sO.getActiveServerID(this.state),r=this.clients.get(s),n=r.registerAccount(e,t).then(e=>{if(this.dismissDialog(),e.verificationRequired&&this.handleVerifyClick(e.account,e.message),r!==this.clients.values().next().value)return;let s=sL.load();s&&(console.log("Saving account registration credentials"),s={...s,saslPlain:{username:e.account,password:t}},sL.put(s))});this.setDialogLoading(n)}handleVerifyClick(e,t){this.openDialog("verify",{account:e,message:t})}handleVerifySubmit(e){let t=sO.getActiveServerID(this.state),s=this.clients.get(t).verifyAccount(this.state.dialogData.account,e).then(()=>{this.dismissDialog()});this.setDialogLoading(s)}handleAddNetworkClick(){this.openDialog("network")}handleManageNetworkClick(e){let t=this.state.servers.get(e).bouncerNetID,s=this.state.bouncerNetworks.get(t);this.openDialog("network",{id:t,params:s})}async handleNetworkSubmit(e,t){let s=this.clients.values().next().value;if(this.dismissDialog(),this.state.dialogData&&this.state.dialogData.id){if(0===Object.keys(e).length)return;s.send({command:"BOUNCER",params:["CHANGENETWORK",this.state.dialogData.id,tO(e)]})}else{e={...e,tls:"1"};let r=await s.createBouncerNetwork(e);if(!t)return;let n=this.serverFromBouncerNetwork(r);this.clients.get(n).params.autojoin=[t],this.switchToChannel=t}}handleNetworkRemove(){this.clients.values().next().value.send({command:"BOUNCER",params:["DELNETWORK",this.state.dialogData.id]}),this.dismissDialog()}handleOpenSettingsClick(){let e=!1;for(let[t,s]of this.clients)if(s.caps.enabled.has("soju.im/bouncer-networks")){e=!0;break}this.openDialog("settings",{showProtocolHandler:e})}handleSettingsChange(e){sP.put(e),this.setState({settings:e})}handleSettingsDisconnect(){this.dismissDialog(),this.disconnectAll()}handleSwitchSubmit(e){this.dismissDialog(),e&&this.switchBuffer(e)}handleWindowFocus(){this.state.activeBuffer&&this.markBufferAsRead(this.state.activeBuffer);let e=new Date;if(!(this.lastFocusPingDate&&e.getTime()-this.lastFocusPingDate.getTime()<15e3))for(let t of(this.lastFocusPingDate=e,this.clients.values()))t.status===t7.Status.REGISTERED&&t.send({command:"PING",params:["gamja"]})}componentDidMount(){var e;let t;this.baseTitle=document.title,e=this,t={},rs.forEach(e=>{t[e.key]||(t[e.key]=[]),t[e.key].push(e)}),window.addEventListener("keydown",s=>{let r=t[s.key];r&&1===(r=r.filter(e=>!!e.altKey===s.altKey&&!!e.ctrlKey===s.ctrlKey)).length&&(s.preventDefault(),r[0].execute(e))}),window.addEventListener("focus",this.handleWindowFocus)}componentWillUnmount(){document.title=this.baseTitle,window.removeEventListener("focus",this.handleWindowFocus)}render(){let e,t;if(this.state.loading){let e=null;return this.state.error&&(e=t$`<form><p class="error-text">${this.state.error}</p></form>`),t$`<section id="connect">${e}</section>`}let s=null,r=null,n=null;if(this.state.buffers.get(this.state.activeBuffer)){s=this.state.buffers.get(this.state.activeBuffer);let e=(r=this.state.servers.get(s.server)).bouncerNetID;e&&(n=this.state.bouncerNetworks.get(e))}let a=null;if(s&&(a=this.clients.get(s.server)),this.state.connectForm){let e=r?r.status:sp.DISCONNECTED,t=e===sp.CONNECTING||e===sp.REGISTERING;return t$`
				<section id="connect">
					<${s8}
						error=${this.state.error}
						params=${this.state.connectParams}
						auth=${this.config.server.auth}
						connecting=${t}
						onSubmit=${this.handleConnectSubmit}
					/>
				</section>
			`}let i=null;if(s){let e=null;s.type===sh&&(e=r.users.get(s.name)),i=t$`
				<section id="buffer-header" role="banner">
					<${s5}
						buffer=${s}
						server=${r}
						user=${e}
						bouncerNetwork=${n}
						onChannelClick=${this.handleChannelClick}
						onClose=${()=>this.close(s)}
						onJoin=${()=>this.handleJoinClick(s)}
						onReconnect=${()=>this.reconnect()}
						onAddNetwork=${this.handleAddNetworkClick}
						onManageNetwork=${()=>this.handleManageNetworkClick(s.server)}
						onOpenSettings=${this.handleOpenSettingsClick}
					/>
				</section>
			`}let o=null;s&&s.type===su&&(o=t$`
				<section
					id="member-list"
					class=${this.state.openPanels.memberList?"expand":""}
					role="complementary"
					aria-label="Members list"
				>
					<button
						class="expander"
						onClick=${this.toggleMemberList}
					>
						<span></span>
						<span></span>
					</button>
					<section>
						<section id="member-list-header">
							${s.members.size} users
						</section>
						<${s7}
							members=${s.members}
							users=${r.users}
							onNickClick=${this.handleNickClick}
						/>
					</section>
				</section>
			`);let l=null,c=this.state.dialogData||{};switch(this.state.dialog){case"network":let u=!c.id;l=t$`
				<${rI} title=${u?"Add network":"Edit network"} onDismiss=${this.dismissDialog}>
					<${rg}
						onSubmit=${this.handleNetworkSubmit}
						onRemove=${this.handleNetworkRemove}
						params=${c.params}
						autojoin=${c.autojoin}
						isNew=${u}
					/>
				</>
			`;break;case"help":l=t$`
				<${rI} title="Help" onDismiss=${this.dismissDialog}>
					<${rm}/>
				</>
			`;break;case"join":l=t$`
				<${rI} title="Join channel" onDismiss=${this.dismissDialog}>
					<${re} channel=${c.channel} onSubmit=${this.handleJoinSubmit}/>
				</>
			`;break;case"auth":e=c.loading?t$`<p>Logging in…</p>`:t$`
					<${rb} username=${c.username} onSubmit=${this.handleAuthSubmit}/>
				`,l=t$`
				<${rI} title="Login to ${sy(r,n)}" onDismiss=${this.dismissDialog}>
					${e}
				</>
			`;break;case"register":e=c.loading?t$`<p>Creating account…</p>`:t$`
					<${rk} emailRequired=${c.emailRequired} onSubmit=${this.handleRegisterSubmit}/>
				`,l=t$`
				<${rI} title="Register a new ${sy(r,n)} account" onDismiss=${this.dismissDialog}>
					${e}
				</>
			`;break;case"verify":e=c.loading?t$`<p>Verifying account…</p>`:t$`
					<${rv} account=${c.account} message=${c.message} onSubmit=${this.handleVerifySubmit}/>
				`,l=t$`
				<${rI} title="Verify ${sy(r,n)} account" onDismiss=${this.dismissDialog}>
					${e}
				</>
			`;break;case"settings":l=t$`
				<${rI} title="Settings" onDismiss=${this.dismissDialog}>
					<${rw}
						settings=${this.state.settings}
						showProtocolHandler=${c.showProtocolHandler}
						onChange=${this.handleSettingsChange}
						onDisconnect=${this.handleSettingsDisconnect}
						onClose=${this.dismissDialog}
					/>
				</>
			`;break;case"switch":l=t$`
				<${rI} title="Switch to a channel or user" onDismiss=${this.dismissDialog}>
					<${rE}
						buffers=${this.state.buffers}
						servers=${this.state.servers}
						bouncerNetworks=${this.state.bouncerNetworks}
						onSubmit=${this.handleSwitchSubmit}/>
				</>
			`}let h=null;this.state.error&&(h=t$`
				<div id="error-msg" role="alert">
					${this.state.error}
					${" "}
					<button onClick=${this.handleDismissError}>×</button>
				</div>
			`);let p=!1;r&&r.status!==sp.REGISTERED&&(p=!0);let d=!1;if(s&&s.type===sc)d=!0;else if(s){var m,f,g;let e,r=this.clients.get(s.server);m=r.isupport,f=r.nick,g=s.name,e=tL({prefix:{name:f,user:"_".repeat(m.userLen()),host:"_".repeat(m.hostLen())},command:"PRIVMSG",params:[g,""]})+"\r\n",t=m.lineLen()-e.length}let b=t$`
			<section
				id="buffer-list"
				class=${this.state.openPanels.bufferList?"expand":""}
			>
				<${s0}
					buffers=${this.state.buffers}
					servers=${this.state.servers}
					bouncerNetworks=${this.state.bouncerNetworks}
					activeBuffer=${this.state.activeBuffer}
					onBufferClick=${this.handleBufferListClick}
					onBufferClose=${this.handleBufferListClose}
				/>
				<button
					class="expander"
					onClick=${this.toggleBufferList}
				>
					<span></span>
					<span></span>
				</button>
			</section>
			${i}
			<${r_}
				target=${this.buffer}
				stickTo=".logline"
				scrollKey=${this.state.activeBuffer}
				onScrollTop=${this.handleBufferScrollTop}
			>
				<section id="buffer" ref=${this.buffer} tabindex="-1" role="log">
					<${sX}
						buffer=${s}
						server=${r}
						settings=${this.state.settings}
						onChannelClick=${this.handleChannelClick}
						onNickClick=${this.handleNickClick}
						onAuthClick=${()=>this.handleAuthClick(s.server)}
						onRegisterClick=${()=>this.handleRegisterClick(s.server)}
						onVerifyClick=${this.handleVerifyClick}
					/>
				</section>
			</>
			${o}
			<${rC}
				ref=${this.composer}
				client=${a}
				readOnly=${p}
				onSubmit=${this.handleComposerSubmit}
				onError=${this.showError}
				autocomplete=${this.autocomplete}
				commandOnly=${d}
				maxLen=${t}
			/>
			${l}
			${h}
		`;return t$`
			<${sk.Provider} value=${this.state.settings}>
				${b}
			</>
		`}}t=t$`<${rO}/>`,(s=document.body)==document&&(s=document.documentElement),o.__&&o.__(t,s),r=s.__k,n=[],a=[],M(s,t=s.__k=C(I,null,[t]),r||k,k,s.namespaceURI,r?null:s.firstChild?i.call(s.childNodes):null,n,r?r.__e:s.firstChild,!1,a),B(n,t,a);
//# sourceMappingURL=gamja.06d470ba.js.map
