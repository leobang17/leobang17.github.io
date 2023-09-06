---
title: "Github Pages에 커스텀 도메인 적용하기 (feat. Gatsby)"
createdAt: 2023-09-06
---


[Github Pages](https://docs.github.com/ko/pages)를 이용해 웹페이지를 호스팅하는 경우 깃허브 측에서 `<username>.github.io`의 도메인을 기본으로 제공한다. 예를들어, 나는 깃허브 아이디가 `leobang17`이니 내 경우의 기본 도메인은 `leobang17.github.io`인 셈. 

github에서 제공하는 기본 도메인 대신 본인이 구매한 *커스텀 도메인*을 이용할 수도 있다. Github Pages의 커스텀 도메인 설정은 **publising source의 root에 존재하는 `CNAME` 레코드**의 내용을 따른다.

> ...  If you are publishing from a branch, custom domains are stored in a *CNAME file in the root of your publishing source*.

<br />

## Gatsby 웹페이지와 Github Pages 호스팅

`gatsby build` 커맨드를 실행하면 Gatsby에 의해 빌드 및 번들링된 정적 파일들이 `/public` 디렉토리에 생성된다. 그리고 보통은 이 `/public` 디렉토리를 publising source로 이용하게 된다. 

따라서 Gatsby 정적 페이지를 Github Pages에 호스팅할 때 커스텀 도메인을 설정하는 과정은 다음과 같이 나눌 수 있다:

1. `gatsby build` 커맨드를 실행해 `/public` 디렉토리에 빌드 결과물을 생성한다.

2. **`/public` 디렉토리에 `CNAME` 파일**을 생성한다.

   ```
   # /public/CNAME << filepath
   www.yourdomain.com
   ```

3. 빌드 결과 생성된 **`/public` 디렉토리를 Github Pages의 publishing source로 설정**하여 배포한다.

   - 이 과정을 직접 수행해도 되지만, 나의 경우 [`gh-pages` 라이브러리](https://www.npmjs.com/package/gh-pages)를 이용해 간소화했다.
   - 다음 Docs 내용를 참고해 직접 [publishing source를 설정](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)할 수 있다. 
     - remote 브랜치의 특정 디렉토리를 publishing source로 설정하거나,
     - github actions workflow를 이용해 publising source를 지정하거나 (Beta)



이미 Gatsby 웹페이지를 Github Pages로 호스팅하고 있다면 1번과 3번은 갖추어져있는 상태일테니 2번만 추가해주면된다. 즉, 어떤 방법을 쓰든 **publishing source (Gatsby의 경우 `/public` 디렉토리)에 `CNAME` 레코드 파일을 생성**하기만 하면 된다. 

<br />

### 1. 호스팅이 끝난 후 직접 설정하기 

[Github Pages Docs의 Apex 도메인 설정하기](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site?platform=mac#configuring-an-apex-domain) 참고. 레포지토리의 `Settings > Pages` 탭에 들어가 **Custom Domain**을 수동으로 설정해준다.

![직접 커스텀 도메인 설정](./imgs/직접-커스텀도메인-설정.png)


배포가 끝난 후 직접 바꾸어주는 방식이므로 매 빌드/배포 마다 커스텀 도메인을 직접 설정해주어야 한다는 번거로움이 있다. 사실 이 과정이 너무 귀찮아서 밑의 해결방법을 찾아보게 되었다.

<br />

### 2. 스크립트를 이용해 빌드 이후 CNAME 레코드 생성하기 (자동화)

`/public` 디렉토리 안에 `CNAME` 레코드 파일을 생성하는 스크립트를 페이지 빌드가 끝난 후 실행한다. (i.e. `echo www.yourdomain.com > ./public/CNAME`)

내 경우엔 [`gh-pages` Docs의 custom domain 항목](https://github.com/tschaub/gh-pages#deploying-to-github-pages-with-custom-domain)를 참고해 `package.json` 스크립트에 추가했지만 github actions를 이용해 배포하고 있다면 github actions가 실행할 workflow 스크립트에 넣어주어도 된다. 

<br />

### 3. static 폴더 이용하기 (자동화)

gatsby 프로젝트의 root에 위치한 `static` 폴더는 특별한 역할을 한다. 해당 폴더 안에 저장된 모든 파일은 빌드 시점에 `/public` 폴더로 동일하게 복사된다. 

> You can create a folder named `static` at the root of your project. Every file you put into that folder will be copied into the `public` folder. E.g. if you add a file named `sun.jpg` to the static folder, it’ll be copied to `public/sun.jpg`

따라서 `static` 폴더에 `CNAME` 파일을 미리 생성해놓으면 gatsby에 의해 `/public` 폴더에 `CNAME` 파일이 복사된다. 

```text
# /static/CNAME << filepath 
www.yourdomain.com
```

<br />
<br />

## References

- [Gatsby Docs - static 폴더 이용하기](https://www.gatsbyjs.com/docs/how-to/images-and-media/static-folder/#adding-assets-outside-of-the-module-system)
- [Github Pages Docs - Custom Domain 설정과 CNAME 레코드](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages#custom-domain-names-that-are-unsupported)