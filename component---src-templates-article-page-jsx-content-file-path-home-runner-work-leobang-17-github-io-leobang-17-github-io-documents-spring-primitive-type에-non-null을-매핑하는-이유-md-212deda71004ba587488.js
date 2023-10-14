"use strict";(self.webpackChunkgatsby_theme_simplex=self.webpackChunkgatsby_theme_simplex||[]).push([[2785],{1912:function(e,t,n){n.r(t),n.d(t,{Head:function(){return h.py},default:function(){return E}});var a=n(1151),l=n(7294);function r(e){const t=Object.assign({h2:"h2",a:"a",div:"div",pre:"pre",code:"code",p:"p",blockquote:"blockquote",h4:"h4",ul:"ul",li:"li"},(0,a.ah)(),e.components);return l.createElement(l.Fragment,null,l.createElement(t.h2,{id:"what",style:{position:"relative"}},l.createElement(t.a,{href:"#what","aria-label":"what permalink",className:"header-links before"},l.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"What"),"\n",l.createElement(t.pre,null,l.createElement(t.code,null,'Caused by: org.h2.jdbc.JdbcSQLIntegrityConstraintViolationException: NULL not allowed for column "ARTICLE_CURSOR"; SQL statement:\n')),"\n",l.createElement("br"),"\n",l.createElement(t.h2,{id:"when",style:{position:"relative"}},l.createElement(t.a,{href:"#when","aria-label":"when permalink",className:"header-links before"},l.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"When"),"\n",l.createElement(t.p,null,"테스트를 위해 빈 생성자로 ",l.createElement(t.code,null,"Nie"),"를 생성하고 persist하는 과정에서 에러가 발생했다."),"\n",l.createElement("br"),"\n",l.createElement(t.p,null,"값타입인 ",l.createElement(t.code,null,"NieContext"),"와 값타입을 가지고 있는 ",l.createElement(t.code,null,"Nie"),"의 엔티티 정의는 다음과 같았다."),"\n",l.createElement(t.pre,null,l.createElement(t.code,{className:"language-java"},"@Getter\n@NoArgsConstructor(access = AccessLevel.PROTECTED)\n@Embeddable\npublic class NieContext {\n\t@Enumerated(EnumType.STRING)\n\tprivate NieProcessType lastProcess;\n\tprivate long articleCursor;\n}\n")),"\n",l.createElement("br"),"\n",l.createElement(t.pre,null,l.createElement(t.code,{className:"language-java"},'@Getter\n@NoArgsConstructor(access = AccessLevel.PROTECTED)\n@Entity\npublic class Nie extends BaseEntity {\n\t@Id\n\t@GeneratedValue(strategy = GenerationType.AUTO)\n\t@Column(name = "nie_id")\n\tprivate Long id;\n  // ...\n\t@Embedded\n\t@Column(updatable = false)\n\tprivate NieContext context;\n\n  // ...\n}\n')),"\n",l.createElement("br"),"\n",l.createElement(t.p,null,"hibernate가 매핑한 ddl을 확인해보니 다음과 같았다."),"\n",l.createElement(t.pre,null,l.createElement(t.code,null,"Hibernate: \n    \n    create table nie (\n       nie_id bigint not null,\n        created_at timestamp,\n        updated_at timestamp,\n        article_id bigint not null,\n        article_cursor bigint not null,  // <--- \n        last_process varchar(255),\n        status varchar(255),\n        group_user_id bigint,\n        primary key (nie_id)\n    )\n")),"\n",l.createElement(t.p,null,l.createElement(t.code,null,"article_cursor")," 가 not null로 매핑되고 있었다… 왜지?"),"\n",l.createElement(t.p,null,"심지어 제약조건이 필요한 column도 아니어서 수정이 필요한 상태였다."),"\n",l.createElement("br"),"\n",l.createElement("br"),"\n",l.createElement(t.h2,{id:"why",style:{position:"relative"}},l.createElement(t.a,{href:"#why","aria-label":"why permalink",className:"header-links before"},l.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Why"),"\n",l.createElement(t.p,null,l.createElement(t.a,{href:"https://docs.jboss.org/hibernate/orm/6.1/userguide/html_single/Hibernate_User_Guide.html#basic-basic-annotation",target:"_self",rel:"nofollow"},"https://docs.jboss.org/hibernate/orm/6.1/userguide/html_single/Hibernate_User_Guide.html#basic-basic-annotation")),"\n",l.createElement(t.p,null,"hibernate 문서의 ",l.createElement(t.code,null,"@Basic")," 어노테이션 설명을 보면 그 이유가 설명되어 있다."),"\n",l.createElement(t.p,null,l.createElement(t.code,null,"@Basic")," 어노테이션은 basic type (Java type과 database column을 매핑하는 타입)을 선언하기 위한 어노테이션으로,  ",l.createElement(t.code,null,"jakarta.persistence.Basic")," 에서 제공한다."),"\n",l.createElement(t.blockquote,null,"\n",l.createElement(t.p,null,"A basic type is a mapping between a Java type and a single database column."),"\n"),"\n",l.createElement(t.p,null,l.createElement(t.code,null,"@Basic")," 어노테이션은 기본적으로 적용되기 때문에 매번 부착해줄 필요가 없다. 우리가 지금껏  ",l.createElement(t.code,null,"@Entity")," 를 정의할 때는 사실 각 필드에 ",l.createElement(t.code,null,"@Basic"),"  어노테이션이 붙은 것과 마찬가지였다."),"\n",l.createElement(t.pre,null,l.createElement(t.code,{className:"language-java"},"@Entity\npublic class Product {\n  @Id @Basic\n  private Integer id;\n  \n  @Basic\n  private String sku;\n}\n")),"\n",l.createElement(t.p,null,"는 다음과 동일하다."),"\n",l.createElement(t.pre,null,l.createElement(t.code,{className:"language-java"},"@Entity\npublic class Product {\n  @Id \n  private Integer id;\n  \n  private String sku;\n}\n")),"\n",l.createElement("br"),"\n",l.createElement(t.p,null,l.createElement(t.code,null,"@Basic")," 어노테이션은 2가지 attribute을 정의하는데, 이 중 optional 속성이 이번 trouble shooting과 관련이 있다."),"\n",l.createElement(t.pre,null,l.createElement(t.code,{className:"language-java"},"@Target({ElementType.METHOD, ElementType.FIELD})\n@Retention(RetentionPolicy.RUNTIME)\npublic @interface Basic {\n    FetchType fetch() default FetchType.EAGER;\n    boolean optional() default true;\n}\n")),"\n",l.createElement(t.p,null,l.createElement(t.code,null,"optional")," 속성은 해당 attribute가 null을 허용하는지를 정의한다. 기본값으로 ",l.createElement(t.code,null,"true"),"가 설정되어있지만, Jakarta Persistence는 primitive type에 대해서는 해당 속성을 무효화한다."),"\n",l.createElement(t.blockquote,null,"\n",l.createElement(t.p,null,"… Jakarta Persistence also says that it will be ignored if the type is primitive. As long as the type is not primitive, Hibernate will honor this value."),"\n"),"\n",l.createElement(t.p,null,"이에 따라 hibernate는 primitive type에 대해 DDL 매핑시 not null 제약조건을 삽입하는것 같다."),"\n",l.createElement("br"),"\n",l.createElement(t.h2,{id:"how",style:{position:"relative"}},l.createElement(t.a,{href:"#how","aria-label":"how permalink",className:"header-links before"},l.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"How"),"\n",l.createElement(t.h4,{id:"wrapper-타입-채택",style:{position:"relative"}},l.createElement(t.a,{href:"#wrapper-%ED%83%80%EC%9E%85-%EC%B1%84%ED%83%9D","aria-label":"wrapper 타입 채택 permalink",className:"header-links before"},l.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"wrapper 타입 채택"),"\n",l.createElement(t.p,null,"hibernate가 primitive type에 대해 not null 제약조건을 삽입하니, wrapper 타입을 이용하면 null을 허용하게 된다."),"\n",l.createElement(t.pre,null,l.createElement(t.code,{className:"language-java"},"public class NieContext {\n\t@Enumerated(EnumType.STRING)\n\tprivate NieProcessType lastProcess;\n\tprivate Integer articleCursor;\n}\n")),"\n",l.createElement("br"),"\n",l.createElement(t.p,null,"DDL에 not null 제약조건이 사라졌다. 덕분에 빈 생성자를 이용한 테스트 역시 무사히 통과했다."),"\n",l.createElement(t.pre,null,l.createElement(t.code,null,"Hibernate: \n    \n    create table nie (\n       nie_id bigint not null,\n        created_at timestamp,\n        updated_at timestamp,\n        article_id bigint not null,\n        article_cursor integer,       // <---\n        last_process varchar(255),\n        status varchar(255),\n        group_user_id bigint,\n        primary key (nie_id)\n    )\n")),"\n",l.createElement("br"),"\n",l.createElement("br"),"\n",l.createElement(t.h2,{id:"reference",style:{position:"relative"}},l.createElement(t.a,{href:"#reference","aria-label":"reference permalink",className:"header-links before"},l.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Reference"),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,l.createElement(t.a,{href:"https://docs.jboss.org/hibernate/orm/6.1/userguide/html_single/Hibernate_User_Guide.html#basic-basic-annotation",target:"_self",rel:"nofollow"},"https://docs.jboss.org/hibernate/orm/6.1/userguide/html_single/Hibernate_User_Guide.html#basic-basic-annotation")),"\n"))}var c=function(e={}){const{wrapper:t}=Object.assign({},(0,a.ah)(),e.components);return t?l.createElement(t,e,l.createElement(r,e)):r(e)},i=n(5670),s=n(1326),o=n(4517),m=n(698),u=n(8627),d=n(662),h=n(1873);const p=({data:e,children:t,serverData:n})=>{const{prevPost:a,nextPost:r}=e,c={...e.mdx.frontmatter,timeToRead:e.mdx.fields.timeToRead};return l.createElement(m.Z,{data:e},l.createElement(i.Z,null,l.createElement(o.Z,c),l.createElement(s.Z,null,t),l.createElement(d.Z,{prev:a,next:r}),l.createElement(u.Z)))};function E(e){return l.createElement(p,e,l.createElement(c,e))}}}]);
//# sourceMappingURL=component---src-templates-article-page-jsx-content-file-path-home-runner-work-leobang-17-github-io-leobang-17-github-io-documents-spring-primitive-type에-non-null을-매핑하는-이유-md-212deda71004ba587488.js.map