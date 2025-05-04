---
title: Using eleventy with Nunjucks to make this page
layout: page.njk
author: HeyImKyu
date: 2025-04-30
tags: ['pages', 'eleventy']
description: If you're curious how i made this page, have a look
img_src: "https://camo.githubusercontent.com/a8fd40da329959002004098b4343e77dab6bc025709a91dd9d184609ba111e02/68747470733a2f2f7777772e313174792e6465762f696d672f6c6f676f2d6769746875622e737667"
img_alt: "11ty logo"
---

**Oh boy.**

So this was a bit of a long one.

Lemme walk you through the process i took to get this page working, with all its features, weird stuff and prettiness :3

# 1. The idea and finding the right tools

So, my initial idea was to just get a static page up and running to display cool projects that I've done, I'm proud of and i want to show people.

That means first of all i would have just done a normal, static webpage, hosted by GitHub and redirected to with a CNAME on my domain.

But of course nothing can ever be too extravagant, right? :3

So i decided to use a static site generator, in part because <a class="link" href="https://kittygirl.online/">Nova</a> was playing around with those already and i also wanted to do some research into how they work.
She was using <a href="https://www.getzola.org/" class="link">Zola</a> at the time and I also tried that out a little bit, but i felt very limited by it's features, so i went looking for alternatives.

Not long after i stumbled upon <a href="https://www.11ty.dev/" class="link">11ty (Eleventy)</a> to use in conjuction with <a href="https://mozilla.github.io/nunjucks/" class="link">Nunjucks</a>.

I liked what i saw at first — i was looking at <a href="https://github.com/radwan503/BlogWithNunjucks--JamStack/" class="link">this example / starter project</a> by <a href="https://github.com/radwan503" class="link">radwan503</a> — and saw the potential of this technology for use with my website.

So off to learning another new framework.

I also yoinked the source code of <a href="https://femboy.boo/" class="link">femboy.boo</a>, a website made by <a href="https://github.com/UwUDev" class="link">UwuDev</a> as a template to get started.

# 2. Explanation of every part of this website

**I will hide any of the code blocks inside expandables, because they can get pretty long and clutter up the page**

## 2.1 Main page

The main page is basically just taken from femboy.boo, but adjusted a bunch and — of course — made modular with Nunjucks.

I'm going to explain the main way it's made up here.

<details>
<summary>
So first of all, we have a <code>base.njk</code>:
</summary>
{% raw %}
```html
<!DOCTYPE html>
<html lang="en">
  <head>
  {# [...] #}
  </head>
  <body>
    {% if not hide_main_link %}
      <a class="main-page-link link" href="{{ "/" | url }}">
        <div class="flex">
          <div id="back-to-main-arrow"></div>
          back to main page
        </div>
      </a>
    {% endif %}

    {% include "partials/darktoggle.njk" %}
    {{ content | safe }}
  </body>
</html>
```
{% endraw %}
</details>

This base-teplate is used for every page, so it includes all important head tags, the 'back to main page' link that is displayed on every page except the main page itself (hence the 'if not hide_main_link' that is being set on the main page) and the dark mode toggle that should be present on every page.

You can get to an explanation of dark-toggle <a href="#22-the-dark-mode-toggle" class="link">here.</a>

<div class="jumppoint" id="index-njk"></div>
The actual content of the main page is then stored in an `index.njk` that uses the `base.njk` as it's `layout` parameter.

<details>
<summary>
See here:
</summary>
{% raw %}
```html
---
title: "Kyu's Portfolio :3"
layout: base.njk
show_about: true
show_hall: true
show_pages: true
hide_main_link: true
---

{% from "partials/cards.njk" import card %}

{% include "partials/navbar.njk" %}

  <div class="hero">
    <div>
      <h10 class="hero-title">Henlo :3</h10>
      <p>Welcome to my super ultra-high quality portfolio website ^-^</p>
      <p>I'm still working on this right now, but i hope to get this finished soon :3</p>
      <p>For now, you can just sit here and look at the pretty colors moving to the right.</p>
    </div>
    {% include "partials/blob.html" %}
  </div>

  <div style="margin-top: 15vh"></div>

  <div class="arrow bounce"></div>

  <div style="margin-top: 15vh"></div>

  <div class="cards">
    <div class="card-uwu card-header" data-tilt data-tilt-speed="1200" data-tilt-easing="cubic-bezier(.03,.98,.52,.99)" data-tilt-reverse="1" data-tilt-max="3">
      <h10 class="card-header">Click on any of these cards to find out more about them!</h10>
    </div>

    <div id="column-l" class="cards-column">
      {% call card("Kyus Ax-Shell", "https://github.com/HeyImKyu/Ax-Shell") %}
        <p>My heavily modified fork of <a class="link" href="https://github.com/Axenide/">Axenide's</a> Ax-Shell</p>
        <p>Ax-Shell is a bar for the <a class="link" href="https://hyprland.org/">Hyprland</a> window manager</p>
        <p>A lot of my implementation has been merged into the base implementation now, but i still like to keep working on my own fork for my custom needs and wants</p>
        <p>It is hosted using <a href="https://github.com/Fabric-Development/fabric" class="link">Fabric</a>, a python library for hosting bars or arbitrary windows in wayland compositors</p>
        <p>For more information on Fabric, please check the card on the right</p>
        <center>
          <img style="max-width: 85%; max-height: 75%;"
            src="https://github.com/user-attachments/assets/f52da9e7-31dd-4e7f-b0bb-f859816cde27" alt="Image of Ax-Shell">
        </center>
      {% endcall %}

      {# all other cards #}  
    </div>
  </div>


  <script src="{{ "/js/tilt.min.js" | url }}"></script>
  <script src="{{ "/js/scroll.js" | url }}"></script>
```
{% endraw %}
</details>

In the first few lines you can also see the tags for the nav-bar that will be explained <a href="#23-the-navbar" class="link">later</a>.

## 2.2 The dark mode toggle
text
<details>
<summary>
The layout for the darkmode toggle itself is just an html file:
</summary>
{% raw %}
```html
<div id="darkmode-container">
    <label class="darkmode-label" for="darkmode-switch">
        <input type="checkbox" id="darkmode-switch" />
        <div class="darkmode-sunmoon">
            <div class="darkmode-darkside"></div>
        </div>
        <div class="darkmode-clouds">
            <img src="{{ "/assets/darkmode-toggle/cloud_1.svg" | url }}" alt="" class="darkmode-cloud darkmode-cloud-1" />
            <img src="{{ "/assets/darkmode-toggle/cloud_2.svg" | url }}" alt="" class="darkmode-cloud darkmode-cloud-2" />
            <img src="{{ "/assets/darkmode-toggle/cloud_3.svg" | url }}" alt="" class="darkmode-cloud darkmode-cloud-3" />
            <img src="{{ "/assets/darkmode-toggle/cloud_4.svg" | url }}" alt="" class="darkmode-cloud darkmode-cloud-4" />
            <img src="{{ "/assets/darkmode-toggle/stars.svg" | url }}" alt="" class="darkmode-stars" />
        </div>
    </label>
</div>
```
{% endraw %}
</details>

<br/>

<details>
<summary>
That is then styled with a rather complicated css file:
</summary>
{% raw %}
```css
:root {
    --darkmode-toggle-bg-color: #cde7ff;
    --darkmode-toggle-switch-width: 50px;
    --darkmode-toggle-switch-height: 30px;
    --darkmode-toggle-switch-round: 50px;
    --darkmode-toggle-switch-padding-x: 5px;
    --darkmode-toggle-switch-bg: linear-gradient(to bottom, #73bbff, #a2d1fd);
    --darkmode-toggle-switch-dark-bg: linear-gradient(to top, #2b3347, #181d27);
    --darkmode-toggle-border-width: 2px;
    --darkmode-toggle-border-gradient: linear-gradient(to bottom, #a2d1fd, #cde7ff);
    --darkmode-toggle-border-dark-gradient: linear-gradient(to bottom, #000000, #6c7384);
    --darkmode-toggle-sunmoon-size: 20px;
    --darkmode-toggle-transition: all 0.5s ease;
    --darkmode-tooggle-border-color-light: #90C9FE;
    --darkmode-tooggle-border-color-dark: #565C6B;
}

#darkmode-container {
    position: absolute;
    top: 1em;
    right: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--darkmode-toggle-switch-round);
}

.darkmode-label {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--darkmode-toggle-switch-width);
    height: var(--darkmode-toggle-switch-height);
    border-radius: var(--darkmode-toggle-switch-round);
    cursor: pointer;
    transition: var(--darkmode-toggle-transition);
    background: var(--darkmode-toggle-switch-bg);
    border: var(--darkmode-toggle-border-width) solid var(--darkmode-tooggle-border-color-light);
    overflow: hidden;
}

.dark .darkmode-label {
    border: var(--darkmode-toggle-border-width) solid var(--darkmode-tooggle-border-color-dark);
}

.darkmode-label::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: var(--darkmode-toggle-switch-round);
    opacity: 0;
    background: var(--darkmode-toggle-switch-dark-bg);
    transition: var(--darkmode-toggle-transition);
}

.dark .darkmode-label::before {
    opacity: 1;
}

.darkmode-label input {
    display: none;
}

.darkmode-sunmoon {
    position: absolute;
    width: var(--darkmode-toggle-sunmoon-size);
    height: var(--darkmode-toggle-sunmoon-size);
    border-radius: 50%;
    transition: var(--darkmode-toggle-transition);
    left: var(--darkmode-toggle-switch-padding-x);
    z-index: 1;
    background-color: #FFC187;
    box-shadow: 0px 0px 11.7px 0px #FFC187, 0px 0px 20px 0px #ffc18768, -2px -2px 5px 0px #ffab5c inset;
}

.dark .darkmode-sunmoon {
    left: calc(100% - var(--darkmode-toggle-sunmoon-size) - var(--darkmode-toggle-switch-padding-x));
    background-color: #dee5f3;
    box-shadow: 0px 0px 51.7px 0px #dee5f3;
}

.darkmode-darkside {
    position: absolute;
    top: 0.5px;
    left: 0.5px;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    background-color: #FFC187;
    transition: var(--darkmode-toggle-transition);
}

.dark .darkmode-darkside {
    background-color: #565c6b;
}

.darkmode-clouds {
    border-radius: var(--darkmode-toggle-switch-round);
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
}

.darkmode-cloud {
    position: absolute;
    width: 60%;
    transition: var(--darkmode-toggle-transition);
}

.darkmode-cloud-1 {
    bottom: -45%;
    left: 0;
}

.darkmode-cloud-2 {
    bottom: -15%;
    left: 25px;
}

.darkmode-cloud-3 {
    bottom: -20%;
    right: 0px;
}

.darkmode-cloud-4 {
    bottom: -06%;
    right: -25px;
}


.dark .darkmode-cloud-1 {
    bottom: -35%;
    left: -110px;
}

.dark .darkmode-cloud-2 {
    bottom: -15%;
    left: -110px;
    transition: all 0.7s ease;
}

.dark .darkmode-cloud-3 {
    bottom: -15%;
    right: -110px;
}

.dark .darkmode-cloud-4 {
    bottom: -5%;
    right: -110px;
    transition: all 0.7s ease;
}

.darkmode-stars {
    position: absolute;
    top: 150%;
    left: 0;
    transform: translateY(-50%);
    pointer-events: none;
    transition: var(--darkmode-toggle-transition);
}

.dark .darkmode-stars {
    top: 70%;
}
```
{% endraw %}
</details>

What's interesting about this part is the logic behind it:

First of all, we need to tell 11ty that we want to store a variable.

We can do that with a file in `_data`, in my case `_data/darktoggle.js`:
```js
module.exports =  {
  darkmode: false
};
```

The real logic then is contained within another javascript file — `src/js/darktoggle.js` — and importet in `base.njk` using
```html
<script src="{{ "/js/darktoggle.js" | url }}"></script>
```

<details>
<summary>
The logic looks like this:
</summary>
{% raw %}
```js
document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.querySelector(
    '.darkmode-label input[type="checkbox"]'
    );
    toggleSwitch.checked = localStorage.getItem('darkmode') === 'true';

    function switchTheme(dark) {
        if (dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        localStorage.setItem('darkmode', dark);
    }

    function switchThemeListener(e) {
        switchTheme(e.target.checked)
    }

    switchTheme(toggleSwitch.checked);
    toggleSwitch.addEventListener("change", switchThemeListener, false);
});
```
{% endraw %}
</details>

As you can see, I am storing the `darkmode` variable in local browser storage and depending on the value, I add a `.dark` class to the html.

## 2.3 The NavBar

Again, just like with the dark mode toggle, the nav bar is a partial include contained in the `_includes` folder and called upon with
{% raw %}
```njk
{% include "partials/navbar.njk" %}
```
{% endraw %}

<details>
<summary>
It is built like this:
</summary>
{% raw %}
```html
<div class="nav">
    <div class="title">{{ title }}</div>

    <div class="menu">
        {% if show_about %} <a href="{{ "/about" | url }}">About Me</a> {% endif %}
        {% if show_hall %} <a href="{{ "/hall" | url }}">Kyuties</a> {% endif %}
        {% if show_pages %} <a href="{{ "/pages/pages" | url }}">Pages</a> {% endif %}
        <a href="https://github.com/HeyImKyu/portfolio">Source Code</a>
    </div>
</div>
```
{% endraw %}
</details>

As you can see there is a bunch of conditional cases here that show or hide the links to the according pages.
These can then individually be enabled or disabled like seen in the header of the <a href="#index-njk" class="link">index.njk of the main page</a>.

I think this is a really nice approach to doing things modularly like this. That way, the nav-bar can just be reused in every page that should display a navigation bar, while still getting the option of showing or hiding different parts of it.

## 2.4 About page & Kyuties page

With the knowledge from above about the main page, the dark toggle and the nav bar, you should understand everything thats part of the about page.
It's actually a lot less complicated.

## 2.5 Pages

Okay, let's get to the interesting part: Pages!

The `Pages` page is where I started to grasp the full capabilities of 11ty paired with Nunjucks.

We're talking about fully dynamic generation of 
<ul class="markers">
    <li><a href="#251-table-of-content" class="link">Tables of Content</a></li>
    <li><a href="#252-articles" class="link">entire articles</a></li>
    <li><a href="#253-the-article-lists--page-overviews" class="link">and even autogenerated lists depending on the available tags and articles</a></li>
</ul>

Let's go through these:

### 2.5.1 Table of content

I got heavily inspired by the <a href="https://github.com/mozilla/nunjucks/blob/master/docs/_plugins/page_toc.rb" class="link">toc implementation in the Nunjucks documentation</a> but of course this had to be converted to a javascript plugin to work with 11ty.

<details>
<summary>
Thats exactly what i did here
</summary>
{% raw %}
```js
const fs = require("fs");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const { JSDOM } = require("jsdom");

module.exports = function(eleventyConfig) {
  eleventyConfig.addShortcode("page_toc", function(pagePath) {
    let content = fs.readFileSync(pagePath, "utf8");

    content = content.replace(/^---[\s\S]*?---/, ""); // Strip frontmatter
    content = content.replace(/{% api %}\n([^\n]*)/, "### $1"); // Custom tag

    const slugMap = {};
    const md = markdownIt({
      html: false,
    }).use(markdownItAnchor, {
      slugify: s => {
        let slug = s
          .toLowerCase()
          .trim()
          .replace(/[:]/g, "")             // remove colons
          .replace(/\s+/g, "-")            // spaces to hyphens
          .replace(/[^\w-]/g, "");         // strip remaining non-word chars

        let orig = slug;
        let i = 1;
        while (slugMap[slug]) {
          slug = orig + i++;
        }
        slugMap[slug] = true;
        return slug;
      }
    });

    const rendered = md.render(content);
    const dom = new JSDOM(rendered);
    const document = dom.window.document;
    const tocItems = [...document.querySelectorAll("h1, h2, h3")].map(h => {
      const level = h.tagName.toLowerCase();
      return `<li class="${level}"><a href="#${h.id}">${h.textContent}</a></li>`;
    });

    return `<ul class="toc">${tocItems.join("\n")}</ul>`;
  });
};
```
{% endraw %}
</details>

This plugin is then imported into eleventy as explained later in <a href="#3-eleventy-configuration" class="link">"Eleventy configuration"</a>.

This plugin then automatically goes through the current html file and reads `h1`, `h2` and `h3` tags, and puts them together in a list.

### 2.5.2 Articles

An article on my website is called a `Page`.

I can create a new page, simply by putting a new Markdown file in the `pages` subfolder in my `src`.

I then like to also give that md file it's tags in the header, which is not entirely necessary, but makes for some cool features like article lists (or here page overviews).

So — let's explain how one of these pages works.

Every page starts off with a header again:
```md
{% raw %}
---
title: Using eleventy with Nunjucks to make this page
layout: page.njk
author: HeyImKyu
date: 2025-04-30
tags: ['pages', 'eleventy']
description: If you're curious how i made this page, have a look
img_src: "<your url here>"
img_alt: "11ty logo"
---

**Oh boy.**

So this was a bit of a long one.
```
{% endraw %}

It consists of a bunch of properties, all of which are used either on the page itself (e.g. title) or in the pages overview (e.g. description).

<details>
<summary>
The <code>layout</code> parameter is using <code>page.njk</code> as a value and that file looks as follows:
</summary>
{% raw %}
```html
---
layout: 'base.njk'
show_about: true
show_hall: true
show_pages: true
---      

{% include "partials/navbar.njk" %}

<div class="toc">
    <p><strong>{{ page.title }}</strong></p>
    {% page_toc page.inputPath %}
</div>

<div class="page-content">
    {{ content | safe }}  
</div>
<div class="bottom-buffer"></div>
```
{% endraw %}
</details>

As you can see, the layout file `page.njk` is itself using a layout of `base.njk`.
The layout files can be nested!

I don't think i have to say much about this file other than that; it just also has the <a href="#23-the-navbar" class="link">nav bar</a>, the <a href="#251-table-of-content" class="link">toc</a> and the page content in there.

and of course, we've saved the best for last:

### 2.5.3 The article lists / page overviews

Okay, let's begin slowly. For every `tag` used in a md file, 11ty automatically creates a `collection`. This collection can be accessed via `collections.<tag-name>`, for example:
{% raw %}
```html
{%- for page in collections.pages | reverse -%}
    <div>{{ page.title }}</div>
{%- endfor -%}
```
{% endraw %}

<details>
<summary>
And this is exactly what I <b>was</b> doing in <code>pages.njk</code>:
</summary>
{% raw %}
```html
---
title: "Pages Overview"
layout: base.njk
show_about: true
show_hall: true
show_pages: false
unlisted: true
---

{% include "partials/navbar.njk" %}
{% include "partials/subpages_list.njk" %}

<div class="pages-container">
    {%- for page in collections.pages | reverse -%}
      {% if not page.data.unlisted %}
        {% include "page-summary.njk" %}  
      {% endif %}
    {%- endfor -%}
</div>

<script src="{{ "/js/tilt.min.js" | url }}"></script>
```
{% endraw %}
</details>

Except — if I did that, I would have to create a page like that for *every single tag I created* — And that's of course not what we want!

So instead 11ty offers this cool technique how you can create dynamic pages. 

<details>
<summary>
I called my file for this <code>_tag.njk</code>
</summary>
{% raw %}
```md
---
layout: base.njk
pagination:
  data: collections
  size: 1
  alias: tag
permalink: "/pages/{{ tag }}/index.html"
eleventyComputed:
  title: "{{ tag | title }} Overview"
  for_tag: "{{ tag }}"
  unlisted: true
  show_about: true
  show_hall: true
  show_pages: false
---

{% include "partials/navbar.njk" %}
{% include "partials/subpages_list.njk" %}

<div class="pages-container">
  {%- for page in collections[for_tag] | reverse -%}
    {% include "page-summary.njk" %}
  {%- endfor -%}
</div>

<script src="{{ "/js/tilt.min.js" | url }}"></script>
```
{% endraw %}
</details>

Let's go through it together:

We again use the `base.njk` as a layout for our soon-to-be created file. That's easy. 

I think it's easier to show the `pagination` property as pseudo-code:
{% raw %}

```js
foreach (var tag in collections) {
    var overviewFile = create_file_with({
        title: "{{ tag | title }} Overview"
        for_tag: "{{ tag }}"
        unlisted: true
        show_about: true
        show_hall: true
        show_pages: false
    })
    with open("/pages/{{ tag }}/index.html") {
        write(overviewFile)
    }
}
```
{% endraw %}

The files will then of course also all contain the `content` of this `_tag_` file ^^

Yeah, and that's everything. Now a new `index.html` will be created in a subfolder in `pages/<tag>/index.html`. Pretty cool, right?

Anyway, let's get to the last point

# 3. Eleventy configuration

To make all of my pages work, i needed some custom configuration for eleventy.

The most important things for me were:

 <ul class="markers">
    <li>Displaying dates in german format which i fixed with <a href="https://github.com/techmsi/nunjucks-date" class="link">nunjucks-date</a></li>
    <li>Checkboxes for the Markdown parser which i got with <a href="https://github.com/linsir/markdown-it-task-checkbox" class="link">markdown-it-task-checkbox</a></li>
    <li>and syntax highlighting for codeblocks which is made possible by <a href="https://github.com/11ty/eleventy-plugin-syntaxhighlight" class="link">eleventy-plugin-syntaxhighlight</a></li>
    <li>I also needed to alter the markdown behaviour for markdowns which i did with <a href="https://github.com/valeriangalliat/markdown-it-anchor" class="link">markdown-it-anchor</a></li>
</ul>

I'm also passing through some values directly to the output folder and i tried around with global variables a bit.

<details>
<summary>
Finally, here's the full file:
</summary>
{% raw %}
```js
module.exports = function(eleventyConfig) {
  const passthroughs = [
    "src/assets",
    "src/js",
    "src/css"
  ]
  
  const config = {
    "testglobal": "meowmeow",
  };

  // ------- adding the stuff
  
  for (const item in config) {
    eleventyConfig.addGlobalData(item, config[item]);
  }

  for (const item of passthroughs) {
    eleventyConfig.addPassthroughCopy(item);
  }

  // ------- plugins

  var nunjucksDate = require("nunjucks-date");
  // http://momentjs.com/docs/#/displaying/format/
  nunjucksDate.setDefaultFormat("DD.MM.YYYY");
  eleventyConfig.addFilter("date", nunjucksDate);

  const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
  eleventyConfig.addPlugin(syntaxHighlight);

  const checkboxMD = require("markdown-it-task-checkbox");
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(checkboxMD,
    {
      disabled: false,
      divWrap: false,
      divClass: 'checkbox',
      idPrefix: 'cbx_',
      ulClass: 'task-list',
      liClass: 'task-list-item'
    }
  ));

  const anchorMD = require("markdown-it-anchor");
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(anchorMD,
    {
      slugify: (s) => {
        let slug = s
          .toLowerCase()
          .trim()
          .replace(/[:]/g, "")             // remove colons
          .replace(/\s+/g, "-")            // spaces to hyphens
          .replace(/[^\w-]/g, "");         // strip remaining non-word chars

        return slug;
      }
    }
  ));

  eleventyConfig.addPlugin(require("./_plugins/page_toc"));

  return {
    dir: {
      input: "src",   // read source files from "src"
      output: "_site" // output result into "_site"
    }
  }
}
```
{% endraw %}
</details>

# 4. Final words

I am really enjoying working on this website and it's been basically all I've been doing for the past few days.

I also really hope someone at some point will read any of this ^^"

If you do, hit me up on discord <a href="https://discord.com/users/216542472438939649" class="link">@heyimkyu</a> :3

Would actually really appreciate it ^-^

Thanks for reading <3
