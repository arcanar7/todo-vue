(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9e6c7a28"],{"21bb":function(t,e,o){"use strict";var i=o("7a98"),n=o.n(i);n.a},"21e2":function(t,e,o){t.exports=o.p+"img/arrow.b79d89a1.svg"},"272b":function(t,e,o){},"4f37":function(t,e,o){"use strict";o("aa77")("trim",(function(t){return function(){return t(this,3)}}))},"6d67":function(t,e,o){"use strict";var i=o("5ca1"),n=o("0a49")(1);i(i.P+i.F*!o("2f21")([].map,!0),"Array",{map:function(t){return n(this,t,arguments[1])}})},"6e25":function(t,e,o){"use strict";var i=o("cc9b"),n=o.n(i);n.a},"6e68":function(t,e,o){},"7a98":function(t,e,o){},a2ab:function(t,e,o){t.exports=o.p+"img/exit.33c24b9d.svg"},a64d:function(t,e,o){},a6c2:function(t,e,o){"use strict";var i=o("a64d"),n=o.n(i);n.a},aa77:function(t,e,o){var i=o("5ca1"),n=o("be13"),s=o("79e5"),a=o("fdef"),d="["+a+"]",r="​",c=RegExp("^"+d+d+"*"),l=RegExp(d+d+"*$"),u=function(t,e,o){var n={},d=s((function(){return!!a[t]()||r[t]()!=r})),c=n[t]=d?e(p):a[t];o&&(n[o]=c),i(i.P+i.F*d,"String",n)},p=u.trim=function(t,e){return t=String(n(t)),1&e&&(t=t.replace(c,"")),2&e&&(t=t.replace(l,"")),t};t.exports=u},b463:function(t,e,o){t.exports=o.p+"img/cancel.7b3d8b47.svg"},bb51:function(t,e,o){"use strict";o.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-wrapper"},[i("header",{staticClass:"header-app"},[i("div",{staticClass:"logout"},[t._v("\n      "+t._s(t.email)+"\n      "),i("button",{staticClass:"exit",attrs:{title:"Log out"},on:{click:t.onLogOut}},[i("img",{attrs:{src:o("a2ab"),alt:""}})])]),i("language"),i("h1",{staticClass:"title"},[t._v(t._s(t.$t("title")))])],1),i("main",{staticClass:"app-inner"},[i("todo-list")],1)])},n=[],s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"todo-wrapper"},[i("todo-new"),t.todos.length||t.loadingApp?i("section",{staticClass:"main"},[t.loadingApp?i("spinner",{attrs:{primary:"primary"}}):i("todos",{attrs:{todos:t.todos}})],1):i("div",{staticClass:"empty-state"},[i("p",[t._v("\n      "+t._s(t.$t("todo-list.empty"))+"\n    ")]),i("img",{attrs:{src:o("21e2"),alt:""}})]),i("footer",{directives:[{name:"show",rawName:"v-show",value:t.todos.length&&!t.loadingApp,expression:"todos.length && !loadingApp"}],staticClass:"footer"},[i("todo-nav",{attrs:{todos:t.todos}})],1)],1)},a=[],d=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("ul",{staticClass:"todo-list"},t._l(t.filteredTodos,(function(e){return o("li",{key:e.id,staticClass:"todo",class:{editing:e==t.editedTodo}},[o("todo",{attrs:{todo:e}}),o("todo-edit",{attrs:{todo:e}})],1)})),0)},r=[],c=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"todo__view"},[o("div",{staticClass:"checkbox"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.todo.completed,expression:"todo.completed"}],staticClass:"toggle",attrs:{type:"checkbox",id:t.todo.id},domProps:{checked:Array.isArray(t.todo.completed)?t._i(t.todo.completed,null)>-1:t.todo.completed},on:{change:[function(e){var o=t.todo.completed,i=e.target,n=!!i.checked;if(Array.isArray(o)){var s=null,a=t._i(o,s);i.checked?a<0&&t.$set(t.todo,"completed",o.concat([s])):a>-1&&t.$set(t.todo,"completed",o.slice(0,a).concat(o.slice(a+1)))}else t.$set(t.todo,"completed",n)},t.onToggleComplete]}}),o("label",{staticClass:"label",class:{"color-primary":t.todo.completed},attrs:{for:t.todo.id}})]),o("label",{staticClass:"title",class:t.todo.completed?"completed":"color-primary",on:{dblclick:function(e){return t.editTodo(t.todo)}}},[t._v(t._s(t.todo.title))]),o("button",{staticClass:"destroy",attrs:{title:t.$t("todo.remove-title")},on:{click:function(e){return t.removeTodo(t.todo.id)}}})])},l=[],u={props:{todo:Object},methods:{onToggleComplete:function(t){var e=t.target,o=e.checked,i=e.id;this.$store.dispatch("updateCompleteTodo",{completed:o,id:i})},editTodo:function(t){this.$store.dispatch("beforeEditTitle",t.title),this.$store.dispatch("editTodo",t)},removeTodo:function(t){this.$store.dispatch("removeTodo",t)}}},p=u,f=(o("f6fd"),o("2877")),m=Object(f["a"])(p,c,l,!1,null,null,null),v=m.exports,h=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"edit"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.todo.title,expression:"todo.title"},{name:"todo-focus",rawName:"v-todo-focus",value:t.todo==t.editedTodo,expression:"todo == editedTodo"}],staticClass:"edit-title",attrs:{type:"text"},domProps:{value:t.todo.title},on:{blur:function(e){return t.doneEdit(t.todo)},keyup:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.doneEdit(t.todo)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])?null:t.cancelEdit(t.todo)}],input:function(e){e.target.composing||t.$set(t.todo,"title",e.target.value)}}}),i("button",{staticClass:"edit-done",attrs:{title:t.$t("todo-edit.edit-title")},on:{mousedown:function(e){return t.doneEdit(t.todo)}}},[i("img",{attrs:{src:o("daf0"),alt:""}})]),i("button",{staticClass:"edit-cancel",attrs:{title:t.$t("todo-edit.cancel-edit-title")},on:{mousedown:function(e){return t.cancelEdit(t.todo)}}},[i("img",{attrs:{src:o("b463"),alt:""}})])])},b=[],g=(o("4f37"),{props:{todo:Object},methods:{doneEdit:function(t){var e=this,o=t.title,i=t.id;this.editedTodo&&(o=o.trim(),o!==this.beforeEditTitle?o?this.$store.dispatch("updateTitleTodo",{title:o,id:i}).then((function(){return e.$store.dispatch("editTodo",null)})):this.$store.dispatch("removeTodo",i).then((function(){return e.$store.dispatch("editTodo",null)})):this.$store.dispatch("editTodo",null))},cancelEdit:function(t){t.title=this.beforeEditTitle,this.$store.dispatch("editTodo",null)}},computed:{editedTodo:function(){return this.$store.getters.editedTodo},beforeEditTitle:function(){return this.$store.getters.beforeEditTitle}},directives:{"todo-focus":function(t,e){e.value&&t.focus()}}}),_=g,T=(o("f05d"),Object(f["a"])(_,h,b,!1,null,null,null)),$=T.exports,y=(o("d25f"),{all:function(t){return t},active:function(t){return t.filter((function(t){return!t.completed}))},completed:function(t){return t.filter((function(t){return t.completed}))}}),C={mixins:[y],components:{Todo:v,TodoEdit:$},props:{todos:Array},computed:{filteredTodos:function(){return y[this.visibility](this.todos)},visibility:function(){return this.$store.getters.visibility},editedTodo:function(){return this.$store.getters.editedTodo}}},w=C,k=(o("e1fd"),Object(f["a"])(w,d,r,!1,null,null,null)),x=k.exports,E=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"new-todo"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.newTodo,expression:"newTodo"}],staticClass:"new-todo__title",attrs:{autofocus:"",autocomplete:"off",placeholder:t.$t("todo-new.ph-new")},domProps:{value:t.newTodo},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addTodo(e)},input:function(e){e.target.composing||(t.newTodo=e.target.value)}}}),o("button",{staticClass:"new-todo__btn",attrs:{title:t.$t("todo-new.add-title"),disabled:t.localLoading},on:{click:t.addTodo}},[t.localLoading?o("spinner"):o("span",[t._v("+")])],1)])},O=[],A=o("2375"),j={components:{Spinner:A["a"]},data:function(){return{newTodo:""}},methods:{addTodo:function(){this.newTodo&&(this.$store.dispatch("createTodo",{title:this.newTodo}).catch((function(){})),this.newTodo="")}},computed:{localLoading:function(){return this.$store.getters.localLoading}}},L=j,N=(o("fadb"),Object(f["a"])(L,E,O,!1,null,null,null)),P=N.exports,V=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("nav",{staticClass:"todo-nav"},[o("span",{staticClass:"todo-nav__count"},[o("strong",[t._v(t._s(t.remaining))]),t._v(" "+t._s(t.$tc("todo-nav.item",t.remaining))+"\n    "+t._s(t.$t("todo-nav.left"))+"\n  ")]),o("ul",{staticClass:"todo-nav-filters"},[o("li",[o("button",{staticClass:"todo-nav-filters__btn",class:{selected:"all"==t.visibility},on:{click:function(e){return t.onChangeVisibility("all")}}},[t._v("\n        "+t._s(t.$t("todo-nav.all"))+"\n      ")])]),o("li",[o("button",{staticClass:"todo-nav-filters__btn",class:{selected:"active"==t.visibility},on:{click:function(e){return t.onChangeVisibility("active")}}},[t._v("\n        "+t._s(t.$t("todo-nav.active"))+"\n      ")])]),o("li",[o("button",{staticClass:"todo-nav-filters__btn",class:{selected:"completed"==t.visibility},on:{click:function(e){return t.onChangeVisibility("completed")}}},[t._v("\n        "+t._s(t.$t("todo-nav.completed"))+"\n      ")])])]),o("button",{directives:[{name:"show",rawName:"v-show",value:t.todos.length>t.remaining,expression:"todos.length > remaining"}],staticClass:"todo-nav__clear-completed",on:{click:t.removeCompleted}},[t._v("\n    "+t._s(t.$t("todo-nav.clear"))+"\n  ")])])},S=[],F=(o("6d67"),{mixins:[y],props:{todos:Array},methods:{removeCompleted:function(){var t=this;y.completed(this.todos).map((function(e){t.$store.dispatch("removeTodo",e.id)}))},onChangeVisibility:function(t){this.$store.dispatch("setVisibility",t)}},computed:{remaining:function(){return y.active(this.todos).length},visibility:function(){return this.$store.getters.visibility}}}),J=F,R=(o("6e25"),Object(f["a"])(J,V,S,!1,null,null,null)),U=R.exports,q={components:{Todos:x,TodoNew:P,TodoNav:U,Spinner:A["a"]},computed:{todos:function(){return this.$store.getters.todos}},created:function(){this.$store.dispatch("fetchTodos")}},z=q,B=(o("a6c2"),Object(f["a"])(z,s,a,!1,null,null,null)),D=B.exports,G=o("ee34"),H={name:"home",components:{TodoList:D,Language:G["a"]},methods:{onLogOut:function(){this.$store.dispatch("logoutUser"),this.$router.push("/login")}},computed:{email:function(){return this.$store.getters.email}}},I=H,K=(o("21bb"),Object(f["a"])(I,i,n,!1,null,null,null));e["default"]=K.exports},cc9b:function(t,e,o){},d291:function(t,e,o){},daf0:function(t,e,o){t.exports=o.p+"img/edit.9d2233ba.svg"},e1fd:function(t,e,o){"use strict";var i=o("fb32"),n=o.n(i);n.a},f05d:function(t,e,o){"use strict";var i=o("6e68"),n=o.n(i);n.a},f6fd:function(t,e,o){"use strict";var i=o("272b"),n=o.n(i);n.a},fadb:function(t,e,o){"use strict";var i=o("d291"),n=o.n(i);n.a},fb32:function(t,e,o){},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);