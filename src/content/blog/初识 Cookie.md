---
title: 初识 Cookie
tags: ['cookie', 'js', 'web']
slug: known-cookie
---
> a small piece of data
> 

服务器发送给用户浏览器的一小段数据，用户浏览器的后续请求会带上这段数据。为 stateless HTTP 提供重要数据存储的能力。

目前主要有以下三个用途：

- 会话管理：登录态、购物车等需要服务器记住的数据
- 个性化：用户偏好、主题等其他设置
- 追踪：记录分析用户行为

# Cookie 如何产生

## Set-Cookie header

服务端通过设置响应中的 Set-Cookie header 来将 cookie 送到客户端。设置多条 cookie 时，需要多次设置。

```plaintext
Set-Cookie: <cookie-name>=<cookie-value>
```

之后，客户端的后续请求，都会在请求的 cookie header 中，携带这段数据。

```plaintext
HTTP/1.1 200 OK
set-cookie: hello-cookie=hello
Cache-Control: no-store, must-revalidate
X-Powered-By: Next.js
Content-Type: text/html; charset=utf-8
```

```plaintext
GET /api HTTP/1.1
Accept: */*
Connection: keep-alive
Cookie: hello-cookie=hello
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin
User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/121.0.0.0
```

## 控制 cookie 的生命周期

通过 `Expires` 或 `Max-Age` 属性来设置 cookie 的生命周期，由此也可以将 cookie 分成两类：

- Permanent cookies: 在 `Expires` 或 `Max-Age` 符合后删除
- Session cookies: 在会话结束后删除（默认，即不设置 `Max-Age` 或 `Expires`）

注意，`Expires` 的值是 UTCString，`Max-Age` 的值单位为秒

```plaintext
set-cookie: hello-cookie=hello; Max-Age=60;
```

## 其他控制属性

- secure: 只允许 https 请求携带
- http-only: 只用于网络传输，无法使用 JavaScript 通过 `Document.cookie` 进行访问
- domain: 设置允许的域名。
    - 如果设置了，那么子域名也会允许；
    - 如果不设置，只允许当前域名（不包含子域名）
- path: 允许的路径。默认为当前路径。设置的值生效包含子路径。
- same-site: 保障 cookie 只会在安全的网站/请求中携带
    - Strict:  只会在 SameSite 网站间发送 cookie
    - Lax(default): 在 Strict 的基础上，从其他网站导航到目标网站/非 same-site 网站发起的 GET 请求也会携带 cookie
    - None: 任何网站都能携带，必须同时设置 secure

## Third-party cookies

非 same-site 的 cookies 都称为第三方 cookie，是一种常见的用户隐私追踪。

SameSite 的概念：domain 适配并且 schema 相同

| URL | Description | same-site | same-origin |
| --- | --- | --- | --- |
| http://www.example.org | Identical URL | ✅ | ✅ |
| http://www.example.org:80 | Identical URL (implicit port) | ✅ | ✅ |
| http://www.example.org:8080 | Different port | ✅ | ❌ |
| http://sub.example.org | Different subdomain | ✅ | ❌ |
| https://www.example.org | Different scheme | ❌ | ❌ |
| http://www.example.evil | Different TLD | ❌ | ❌ |

## Document.cookie

get: `allCookies = document.cookie` 获取所有的 cookies

set: `document.cookie = newCookie;`每次设置一项 cookie。作为客户端的 api，与服务端的 set-cookie header 操作类似