(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-618689d5"],{"1e75":function(s,e,t){"use strict";var a=t("2c6d"),r=t.n(a);r.a},"2c6d":function(s,e,t){},a55b:function(s,e,t){"use strict";t.r(e);var a=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",[t("form",{staticClass:"form-signin",on:{submit:function(e){return e.preventDefault(),s.signin(e)}}},[t("h1",{staticClass:"h3 mb-3 font-weight-normal"},[s._v("請先登入")]),t("label",{staticClass:"sr-only",attrs:{for:"inputEmail"}},[s._v("Email address")]),t("input",{directives:[{name:"model",rawName:"v-model",value:s.user.username,expression:"user.username"}],staticClass:"form-control",attrs:{type:"email",id:"inputEmail",placeholder:"Email address",required:"",autofocus:""},domProps:{value:s.user.username},on:{input:function(e){e.target.composing||s.$set(s.user,"username",e.target.value)}}}),t("label",{staticClass:"sr-only",attrs:{for:"inputPassword"}},[s._v("Password")]),t("input",{directives:[{name:"model",rawName:"v-model",value:s.user.password,expression:"user.password"}],staticClass:"form-control",attrs:{type:"password",id:"inputPassword",placeholder:"Password",required:""},domProps:{value:s.user.password},on:{input:function(e){e.target.composing||s.$set(s.user,"password",e.target.value)}}}),s._m(0),t("button",{staticClass:"btn btn-lg btn-primary btn-block",attrs:{type:"submit"}},[s._v("Sign in")]),t("p",{staticClass:"mt-5 mb-3 text-muted"},[s._v("© 2017-2019")])])])},r=[function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"checkbox mb-3"},[t("label",[t("input",{attrs:{type:"checkbox",value:"remember-me"}}),s._v(" Remember me\n      ")])])}],n={data:function(){return{user:{username:"",password:""}}},methods:{signin:function(){var s="".concat("https://vue-course-api.hexschool.io","/admin/signin"),e=this;e.$http.post(s,e.user).then(function(s){s.data.success&&e.$router.push("/dashboard/products")})}}},o=n,i=(t("1e75"),t("2877")),u=Object(i["a"])(o,a,r,!1,null,"ee414d4a",null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-618689d5.3871533e.js.map