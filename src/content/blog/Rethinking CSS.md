---
title: 'Rethinking CSS'
tags: ['css']
---

> 💡 Atomic CSS 原子化CSS

# 目录
# What

又称为 Functional-CSS

我们可能写过一些 helper classes

```css
.clearfix
.grid-*
.hidden
```

我们经常会写很多遍相同键值对的css

```css
margin: auto;
color: white;
```

定义：Atomic CSS is the approach to CSS architecture that favors small, single-purpose classes with names based on visual function.

Functional CSS将复杂度从css样式表转移到模板中

> Functional CSS is just shifting complexity out of stylesheets and into templates. — Vince Speelman Front End Engineer at TED
> 

# Why

CSS的高可复用性，从而减少了总的CSS文件体积，加快WebAPP的加载速度。

强制要求一套规范化的设计，不再有奇奇怪怪的尺寸和不一致的颜色

<aside>
🤷‍♂️ 然而这对设计师的要求高，需要设计支撑得起

</aside>

但是反过来想，在没有设计师的情况下，依照着Atomic CSS库的规范，也能写出不那么难看的WebAPP。