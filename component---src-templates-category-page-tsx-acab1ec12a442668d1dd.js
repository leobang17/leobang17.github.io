"use strict";(self.webpackChunkgatsby_theme_simplex=self.webpackChunkgatsby_theme_simplex||[]).push([[553],{8713:function(t,e,r){var n=r(917),o=r(1131);const a={name:"1otq70c",styles:"position:-webkit-sticky;position:sticky;align-self:start;top:5rem;max-height:calc(100vh - 5rem);overflow:auto"};e.Z=()=>(0,n.tZ)("div",{css:a},(0,n.tZ)(o.Z,null))},5773:function(t,e,r){r.r(e),r.d(e,{Head:function(){return M.ov},default:function(){return S}});var n=r(7462),o=r(917),a=r(2658),l=r(4854),s=r(421),i=r(2228),c=r(7536);const u=(0,i.ZL)()((t=>({root:{transition:"all 0.1s ease",fontSize:"1.5rem",marginBlock:"0.2em",":hover":{color:"dark"===t.palette.mode?t.palette.primary.light:t.palette.primary.main}}})));var m=t=>{let{slug:e,title:r}=t;const{classes:n}=u();return(0,o.tZ)(l.rU,{to:s.M.ARTICLE+e},(0,o.tZ)(a.Z,{color:(0,c.hs)("plainText"),className:n.root},r))},Z=r(30);function p(t){const e=(r=t.categories).map(((t,e)=>{const n=function(t,e){return t.slice(0,e+1)}(r,e),o=function(t){return t.reduce(((t,e)=>t+"/"+(0,Z.l)(e)),s.M.CATEGORY)}(n);return[t,o]}));var r;return e}const y=(0,i.ZL)()({root:{}});var g=t=>{let{categoryString:e}=t;const{classes:r}=y(),n=p(e);return(0,o.tZ)(a.Z,{color:(0,c.em)("primary"),variant:"subtitle2",className:r.root},(0,o.tZ)(l.rU,{to:s.M.CATEGORY},"total"),n.map(((t,e)=>{const[r,n]=t;return(0,o.tZ)("span",{key:e}," > ",(0,o.tZ)(l.rU,{to:n},r))})))},f=r(8483),d=r(1508);const v=(0,i.ZL)()({root:{marginBlock:"3rem"},title:{marginBlock:"1em"},summary:{display:"block"},createdAt:{marginTop:"0.5rem"}});var k=t=>{let{fields:{slug:e,categoryDirectory:r},frontmatter:{title:n,createdAt:l},excerpt:s}=t;const{classes:i}=v();return(0,o.tZ)(d.Z,{component:"section",className:i.root},(0,o.tZ)(g,{categoryString:f.Z.initialize(r)}),(0,o.tZ)(m,{slug:e,title:n}),(0,o.tZ)(a.Z,{component:"summary",variant:"body1",color:(0,c.hs)("plainText"),className:i.summary},s),(0,o.tZ)(a.Z,{component:"time",variant:"body2",color:(0,c.em)("subText"),className:i.createdAt},l))},h=r(8713),b=r(8210),x=r(6089);const T={leftStack:(0,o.tZ)(h.Z,null)};var A=t=>{let{children:e}=t;return(0,o.tZ)(b.Z,T,(0,o.tZ)(x.Z,null,e))};function C(t,e){return t.filter((t=>function(t,e){const r=f.Z.initialize(t.fields.categoryDirectory);return e.isParentOf(r)}(t,e)))}var N=r(7294),w=r(9384),z=r(9582);var L=t=>{let{children:e}=t;return(0,o.tZ)(N.Fragment,null,(0,o.tZ)(z.Z,null,(0,o.tZ)(w.Z,null,e)))},M=r(1873);var S=t=>{let{data:e,pageContext:{categoryDirectory:r}}=t;const a=f.Z.initialize(r),l=C(e.allMdx.nodes,a);return(0,o.tZ)(L,null,(0,o.tZ)(A,null,l.map(((t,e)=>(0,o.tZ)(k,(0,n.Z)({key:e},t))))))}}}]);
//# sourceMappingURL=component---src-templates-category-page-tsx-acab1ec12a442668d1dd.js.map