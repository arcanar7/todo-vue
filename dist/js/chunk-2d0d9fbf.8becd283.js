(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d9fbf"],{"6a53":function(e,a,s){"use strict";s.r(a);var r=function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("section",{staticClass:"center"},[r("h1",{staticClass:"title"},[e._v("Register account")]),e.isError?r("p",{staticClass:"error-title"},[e._v(e._s(e.isError))]):e._e(),r("form",{staticClass:"login-form",attrs:{novalidate:""},on:{submit:function(a){return a.preventDefault(),e.onSubmit("registerUser","login?registerSuccess=true")}}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"login-form__email",class:{"has-error":e.$v.email.$error,"valid-input":!e.$v.email.$invalid},attrs:{type:"email",name:"email",placeholder:"Email"},domProps:{value:e.email},on:{blur:function(a){return e.$v.email.$touch()},input:function(a){a.target.composing||(e.email=a.target.value)}}}),e.$v.email.$error?r("span",{staticClass:"message-input text-error"},[r("img",{attrs:{src:s("daa9"),alt:""}}),e.$v.email.required?e.$v.email.email?e._e():[e._v("\n        E-mail must be valid\n      ")]:[e._v("\n        Required\n      ")]],2):e._e(),r("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"login-form__password",class:{"has-error":e.$v.password.$error,"valid-input":!e.$v.password.$invalid},attrs:{type:"password",name:"password",placeholder:"Password"},domProps:{value:e.password},on:{blur:function(a){return e.$v.password.$touch()},input:function(a){a.target.composing||(e.password=a.target.value)}}}),e.$v.password.$error?r("span",{staticClass:"message-input text-error"},[r("img",{attrs:{src:s("daa9"),alt:""}}),e.$v.password.required?e.$v.password.minLength?e._e():[e._v("\n        Password must be equal or more than 6 characters\n      ")]:[e._v("\n        Required\n      ")]],2):e._e(),r("input",{directives:[{name:"model",rawName:"v-model",value:e.repeatPassword,expression:"repeatPassword"}],staticClass:"login-form__password",class:{"has-error":e.$v.repeatPassword.$error,"valid-input":!e.$v.repeatPassword.$invalid},attrs:{type:"password",name:"repeatPassword",placeholder:"Repeat password"},domProps:{value:e.repeatPassword},on:{blur:function(a){return e.$v.repeatPassword.$touch()},input:function(a){a.target.composing||(e.repeatPassword=a.target.value)}}}),e.$v.repeatPassword.$error?r("span",{staticClass:"message-input text-error"},[r("img",{attrs:{src:s("daa9"),alt:""}}),e.$v.repeatPassword.required?e.$v.repeatPassword.sameAsPassword?e._e():[e._v("\n        Passwords must be identical\n      ")]:[e._v("\n        Required\n      ")]],2):e._e(),r("button",{staticClass:"login-form__btn",attrs:{type:"submit",disabled:this.$v.$invalid}},[e.loadingApp?r("div",{staticClass:"lds-ring"},[r("div"),r("div"),r("div"),r("div")]):e._e(),e._v("\n      Create account\n    ")])])])},t=[],i=s("b5ae"),o=s("dfb2"),n={mixins:[o["a"]],validations:{email:{required:i["required"],email:i["email"]},password:{required:i["required"],minLength:Object(i["minLength"])(6)},repeatPassword:{required:i["required"],sameAsPassword:Object(i["sameAs"])("password")}}},l=n,d=s("2877"),u=Object(d["a"])(l,r,t,!1,null,null,null);a["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0d9fbf.8becd283.js.map