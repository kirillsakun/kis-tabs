import './main.scss';

class Tabs {
  constructor({
    tabSelector,
    btnSelector,
    navSelector,
    activeClass = 'js--active',
    eventType = 'click',
    current = 0,
    underlined = false,
    underlineClass = 'tabs__underline',
  }) {
    this.tabs = document.querySelectorAll(tabSelector);
    this.btns = document.querySelectorAll(btnSelector);
    this.nav = navSelector || this.btns[0]?.parentNode;
    this.activeClass = activeClass;
    this.eventType = eventType;
    this.current = current;
    this.prev = [];
    this.underline = undefined;
    this.underlined = underlined;
    this.underlineClass = underlineClass;
  }

  init() {
    this.initBtns();
    this.initUnderline();

    this.goTo(this.current);
    return this;
  }

  goTo(i) {
    if (this.prev.length && this.prev[this.prev.length - 1] === i) {
      this.prev.pop();
    } else {
      this.prev.push(this.current);
    }

    this.current = i;

    this.tabs.forEach((tab) => {
      tab.classList.remove(this.activeClass);
    });
    this.tabs[i].classList.add(this.activeClass);

    if (this.btns.length) {
      this.btns.forEach((btn) => {
        btn.classList.remove(this.activeClass);
      });
      this.btns[i].classList.add(this.activeClass);
    }

    if (this.underlined) {
      this.underline.style.left = `${this.btns[i].offsetLeft}px`;
      this.underline.style.width = `${this.btns[i].offsetWidth}px`;
    }

    return this.tabs[i];
  }

  goToNext() {
    return this.goTo(this.current + 1);
  }

  goToPrev() {
    return this.goTo(this.prev[this.prev.length - 1]);
  }

  initBtns() {
    if (!this.btns.length) { return; }

    this.btns.forEach((btn, i) => {
      btn.addEventListener(this.eventType, () => {
        this.goTo(i);
      });
    });
  }

  initUnderline() {
    if (!this.underlined) { return; }
    let underline = this.nav.querySelector(`.${this.underlineClass}`);

    if (!underline) {
      underline = document.createElement('span');
      underline.classList.add(this.underlineClass);
      this.nav.append(underline);
    }

    this.underline = underline;
  }
}

export default Tabs;
