var MobileNav = function() {

};

MobileNav.prototype = {
    init: function() {
        var nav = document.querySelectorAll("[data-navigation]");
        var menu = document.getElementById("menu");

        if (!nav.length) {
            return;
        }

        this.listeners = [];

        // Strip the hash if the nav is opened.
        if (window.location.hash === "#menu") {
            window.location.hash = "";
        }

        this.duration = 200;

        this.sandboxNavClicks = this.sandboxNavClicks.bind(this);
        this.animationEnd = this.animationEnd.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleEscape = this.handleEscape.bind(this);
        this.click = this.click.bind(this);

        for (var i = 0; i < nav.length; ++i) {

            var el = nav[i];

            if (el) {
                el.addEventListener("click", this.sandboxNavClicks, false);
                el.addEventListener("keydown", this.handleKeyUp, false);
                this.listeners.push(el);
            }
        }

        this.menu = menu;
        this.$menu = $(menu);
        this.isOpen = false;
        this.triggers = nav;
    },

    handleKeyUp: function(e) {

        var KEY_ESCAPE = 27;
        var KEY_SPACE = 32;
        var menu = this.menu;


        switch(e.keyCode) {
            case KEY_SPACE:
                this.triggerOpen();

                var first = menu.querySelector("a");
                first.focus();


                e.preventDefault();
                e.stopPropagation();
                break;

            case KEY_ESCAPE:
                this.triggerClose();
                e.preventDefault();
                e.stopPropagation();
                break;
        }
    },

    handleEscape: function(e) {
        var KEY_ESCAPE = 27;
        var doc = document.documentElement;

        if (e.keyCode === KEY_ESCAPE) {
            this.triggerClose();
            if (this.triggers.length) {
                this.triggers[0].focus();
            }
        }
    },

    hashChange: function() {
        var doc = document.documentElement;
        var bod = document.body;

        if (window.location.hash === "#menu") {
            bod.classList.add("menu--active");
            doc.addEventListener("click", this.click);
        } else {
            bod.classList.remove("menu--active");
            doc.removeEventListener("click", this.click);
        }
    },

    click: function(e) {
        var doc = document.documentElement;
        var bod = document.body;

        this.triggerClose();
        doc.removeEventListener("click", this.click);

    },

    toggle: function() {
        if (this.isOpen) {
            this.triggerClose();
        } else {
            this.triggerOpen();
        }
    },

    triggerClose: function() {
        var repaint;
        var doc = document.documentElement;
        var bod = document.body;
        var menu = this.menu;
        var $menu = this.$menu;

        bod.classList.remove("menu--active");

        if (window.animation) {
            menu.classList.remove("anim-nav-in");
            repaint = document.body.offsetLeft;
            menu.classList.add("anim-nav-out");
            menu.addEventListener(window.animation.animationEnd, this.animationEnd, false);
            setTimeout(this.animationEnd, this.duration + 20);

        } else {
            $menu.fadeOut(this.duration, function() {
                this.hideMenu();
            }.bind(this));
        }

        doc.removeEventListener("click", this.click);
        menu.removeEventListener("click", this.preventClick);
        doc.removeEventListener("keyup", this.handleEscape);
    },

    triggerOpen: function() {
        var repaint;
        var doc = document.documentElement;
        var bod = document.body;
        var menu = this.menu;
        var $menu = this.$menu;

        bod.classList.add("menu--active");

        if (window.animation) {
            menu.classList.remove("anim-nav-out");

            menu.style.display = "block";
            menu.classList.add("anim-nav-in");
        } else {
            $menu.fadeIn(this.duration);
        }

        this.isOpen = true;



        doc.addEventListener("click", this.click);
        doc.addEventListener("keyup", this.handleEscape);
        menu.addEventListener("click", this.preventClick);
    },

    sandboxNavClicks: function(e) {
        this.toggle();
        e.preventDefault();
        e.stopPropagation();
    },
    preventClick: function(e) {
        e.stopPropagation();
    },
    animationEnd: function(e) {
        var menu = this.menu;
        if (window.animation) {
            menu.removeEventListener(window.animation.animationEnd, this.animationEnd, false);

        }
        menu.classList.remove("anim-nav-out");
        this.hideMenu();
    },

    hideMenu: function() {
        var menu = this.menu;
        menu.style.display = "none";
        this.isOpen = false;
    }
};

module.exports = new MobileNav();

