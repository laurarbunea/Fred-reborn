# NZTA Front-end Prototype

Hello,

If you're reading this, then you're probably building something great for the NZTA. 

This repository contains the prototypes that Optimal Usability and Springload have been testing with users. It's a work in progress, and will be finalised over the coming weeks.

Visit the live prototype here:

## [http://nzta.springload.co.nz/pattern-library/](http://nzta.springload.co.nz/pattern-library/)

(Username and password required)


## Setup

The prototype is a super light-weight node.js application. Getting up and running is easy: 

* Install node if you don't yet have it > [node.js installer](http://nodejs.org/download/);
* Check out this repo to a directory somewhere `~/sites/nzta` for instance.
* Run `npm install`
* Start the site with `grunt`
* Visit `http://localhost:3012` in your browser


### Pattern library

The pattern library lives at `/pattern-library/`. From here you can access the CSS and JS required to build the components, as well as seeing examples of the forms, iconography, type and grid. 

This documentation will grow in the coming weeks as we migrate the learnings from the Driver Licences and Traffic Info sections into the CSS. For now, there should be enough to start building out transactional forms.

### Templates

We've utilised the nunjucks templating engine. It's a really nice Javascript templating engine that runs server-side in node.js, and in the browser. This allows us to render the same views in both places, and share a common syntax. The nunjucks browser-based loader is included automatically in the core Javascript.


### Forms

We've described the forms using some hack-ish javascript in `routes/forms/`


### Pages

Static content pages are generated from JSON files `pages` directory.

Most of the pages have a template, these live in `templates/pages`


### SaSS/CSS, client-side Javascript

* `grunt watch` to build the JS/CSS and develop.
* `grunt js` to build the JS
* `grunt sass` to compile sass
* `grunt icon` to compile icons (via grunticon)
* `grunt all` to generate everything




