"use strict";(self.webpackChunkgatsby_theme_simplex=self.webpackChunkgatsby_theme_simplex||[]).push([[553],{8713:function(t,e,r){var a=r(917),n=r(1131);const o={name:"1otq70c",styles:"position:-webkit-sticky;position:sticky;align-self:start;top:5rem;max-height:calc(100vh - 5rem);overflow:auto"};e.Z=()=>(0,a.tZ)("div",{css:o},(0,a.tZ)(n.Z,null))},5773:function(t,e,r){r.r(e),r.d(e,{Head:function(){return M.ov},default:function(){return _}});var a=r(7462),n=r(917),o=r(2658),l=r(4854),s=r(421),c=r(2228);const i=(0,c.ZL)()((t=>({root:{transition:"all 0.1s ease",":hover":{color:"dark"===t.palette.mode?t.palette.primary.dark:t.palette.primary.light}}})));var u=t=>{let{slug:e,title:r}=t;const{classes:a}=i();return(0,n.tZ)(l.rU,{to:s.M.ARTICLE+e},(0,n.tZ)(o.Z,{variant:"h5",className:a.root},r))},Z=r(30);function m(t){const e=(r=t.categories).map(((t,e)=>{const a=function(t,e){return t.slice(0,e+1)}(r,e),n=function(t){return t.reduce(((t,e)=>t+"/"+(0,Z.l)(e)),s.M.CATEGORY)}(a);return[t,n]}));var r;return e}const p=(0,c.ZL)()({root:{}});var y=t=>{let{categoryString:e}=t;const{classes:r}=p(),a=m(e);return(0,n.tZ)(o.Z,{color:"primary",variant:"subtitle2",className:r.root},(0,n.tZ)(l.rU,{to:s.M.CATEGORY},"total"),a.map(((t,e)=>{const[r,a]=t;return(0,n.tZ)("span",{key:e}," > ",(0,n.tZ)(l.rU,{to:a},r))})))},d=r(8483),f=r(1508);const g=(0,c.ZL)()((t=>({root:{marginBlock:"3rem"},summary:{display:"block"},createdAt:{color:"dark"===t.palette.mode?t.palette.subText.contrastText:t.palette.subText.main,marginTop:"0.5rem"}})));var v=t=>{let{fields:{slug:e,categoryDirectory:r},frontmatter:{title:a,createdAt:l},excerpt:s}=t;const{classes:c}=g();return(0,n.tZ)(f.Z,{component:"section",className:c.root},(0,n.tZ)(y,{categoryString:d.Z.initialize(r)}),(0,n.tZ)(u,{slug:e,title:a}),(0,n.tZ)(o.Z,{component:"summary",variant:"body1",className:c.summary},s),(0,n.tZ)(o.Z,{component:"time",variant:"body2",className:c.createdAt},l))},k=r(8713),h=r(8210),b=r(6089);const x={leftStack:(0,n.tZ)(k.Z,null)};var T=t=>{let{children:e}=t;return(0,n.tZ)(h.Z,x,(0,n.tZ)(b.Z,null,e))};function A(t,e){return t.filter((t=>function(t,e){const r=d.Z.initialize(t.fields.categoryDirectory);return e.isParentOf(r)}(t,e)))}var C=r(7294),N=r(9384),w=r(6371);var L=t=>{let{children:e}=t;return(0,n.tZ)(C.Fragment,null,(0,n.tZ)(w.Z,null,(0,n.tZ)(N.Z,null,e)))},M=r(1873);var _=t=>{let{data:e,pageContext:{categoryDirectory:r}}=t;const o=d.Z.initialize(r),l=A(e.allMdx.nodes,o);return(0,n.tZ)(L,null,(0,n.tZ)(T,null,l.map(((t,e)=>(0,n.tZ)(v,(0,a.Z)({key:e},t))))))}}}]);
//# sourceMappingURL=component---src-templates-category-page-tsx-ff8b56aefe8dd7a82151.js.map