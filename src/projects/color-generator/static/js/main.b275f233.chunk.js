(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],[,,,,,,,,function(e,t,a){e.exports=a(16)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var o=a(0),r=a.n(o),n=a(7),c=a.n(n),i=a(1),s=a(2),u=a(5),l=a(3),p=a(4),v=(a(13),a(14),function(e){Object(p.a)(a,e);var t=Object(l.a)(a);function a(e){var o;return Object(i.a)(this,a),o=t.call(this,e),e.favouriteCard&&(o.favouriteColor=e.color),o}return Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:this.props.favouriteCard?"favourite-card":"main-card"},r.a.createElement(h,{color:this.props.color}),r.a.createElement(f,{changeColor:this.props.changeColor,favouriteCard:this.props.favouriteCard,favouriteColor:this.favouriteColor,isFavourite:this.props.isFavourite,changeFavourite:this.props.changeFavourite,copy:this.props.copy}))}}]),a}(r.a.Component)),h=function(e){Object(p.a)(a,e);var t=Object(l.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){var e={backgroundColor:this.props.color};return r.a.createElement("div",{className:"card",style:e},r.a.createElement("div",{className:"color-value"},this.props.color))}}]),a}(r.a.Component),f=function(e){Object(p.a)(a,e);var t=Object(l.a)(a);function a(e){return Object(i.a)(this,a),t.call(this,e)}return Object(s.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"card-controls"},r.a.createElement("span",{className:"favourite-link",onClick:function(){return e.props.changeFavourite(e.props.favouriteColor)}},this.props.isFavourite?r.a.createElement("i",{className:"fa fa-heart"}):r.a.createElement("i",{className:"fa fa-heart-o"})),!this.props.favouriteCard&&r.a.createElement("span",{className:"change-color-link",onClick:this.props.changeColor},r.a.createElement("i",{className:"fa fa-arrow-right"})),r.a.createElement("span",{className:"copy-link",onClick:function(t){return e.props.copy(t,e.props.favouriteColor)}},r.a.createElement("i",{className:"fa fa-copy"})))}}]),a}(r.a.Component),m=v,d=(a(15),function(e){Object(p.a)(a,e);var t=Object(l.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"shouldComponentUpdate",value:function(e,t){return e.favouriteColors!=this.props.favouriteColors}},{key:"render",value:function(){var e=this,t=this.props.favouriteColors.map((function(t){return r.a.createElement(m,{color:t,key:t,isFavourite:!0,favouriteCard:!0,changeFavourite:e.props.changeFavourite,copy:e.props.copy})}));return r.a.createElement("div",{className:"favourite"},r.a.createElement("p",null," ",r.a.createElement("i",{className:"fa fa-heart"})," ",r.a.createElement("span",null,"\u0418\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435")," "),r.a.createElement("div",{className:"favourite-cards"},t))}}]),a}(r.a.Component)),C=function(e){Object(p.a)(a,e);var t=Object(l.a)(a);function a(e){var o;return Object(i.a)(this,a),(o=t.call(this,e)).state={color:o.randomColor(),isFavourite:!1,favouriteColors:[]},o.changeColor=o.changeColor.bind(Object(u.a)(o)),o.randomColor=o.randomColor.bind(Object(u.a)(o)),o.changeFavourite=o.changeFavourite.bind(Object(u.a)(o)),o.copy=o.copy.bind(Object(u.a)(o)),o}return Object(s.a)(a,[{key:"changeColor",value:function(){this.setState({color:this.randomColor(),isFavourite:!1})}},{key:"randomColor",value:function(){for(var e="#",t=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],a=0;a<6;a++){e+=t[Math.round(Math.random()*(t.length-1))]}return e}},{key:"changeFavourite",value:function(e){this.setState((function(t,a){if(e){var o=t.color!=e&&t.isFavourite;return{favouriteColors:t.favouriteColors.filter((function(t){if(t!=e)return!0})),isFavourite:o}}return t.isFavourite&&!e?{isFavourite:!1,favouriteColors:t.favouriteColors.filter((function(e){if(e!=t.color)return!0}))}:0==t.isFavourite?{isFavourite:!0,favouriteColors:t.favouriteColors.concat([t.color])}:void 0}))}},{key:"copy",value:function(e,t){var a="";t&&(a=t),t||(a=this.state.color),this._copyColorInput.value=a,this._copyColorInput.select(),document.execCommand("copy");var o=e.target.closest("span");o.classList.add("copied");var r=document.createTextNode("Copied");o.append(r),setTimeout((function(){o.removeChild(r),o.classList.remove("copied")}),1e3)}},{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(d,{favouriteColors:this.state.favouriteColors,changeFavourite:this.changeFavourite,copy:this.copy}),r.a.createElement(m,{color:this.state.color,changeColor:this.changeColor,isFavourite:this.state.isFavourite,changeFavourite:this.changeFavourite,copy:this.copy}),r.a.createElement("input",{type:"text",className:"copy-color-input",ref:function(t){return e._copyColorInput=t}}))}}]),a}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(C,null),document.getElementById("app")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[8,1,2]]]);
//# sourceMappingURL=main.b275f233.chunk.js.map