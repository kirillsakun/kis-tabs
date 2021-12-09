import './main.scss';

class Tabs {
  constructor({
    tabSelector,
    btnSelector,
    navSelector,
    activeClass = 'js--active',
    eventType = 'click',
    initialTabIndex = 0,
    hasMovingBackground = false,
    movingBackgroundClass = 'tabs__background',
    // useSearchParams = false,
    // name = 'tab',
    // tabNameAttribute = 'data-tab-name',
  }) {
    this.tabs = document.querySelectorAll(tabSelector);
    this.btns = document.querySelectorAll(btnSelector);
    this.nav = navSelector || this.btns[0]?.parentNode;
    this.activeClass = activeClass;
    this.eventType = eventType;
    this.currentTabIndex = initialTabIndex;
    this.prev = [];
    this.movingBackground = undefined;
    this.hasMovingBackground = hasMovingBackground;
    this.movingBackgroundClass = movingBackgroundClass;
    // this.useSearchParams = useSearchParams;
    // this.name = name;
    // this.tabNameAttribute = tabNameAttribute;
  }

  init() {
    this.initBtns();
    this.initUnderline();
    // this.initSearchParamsLogic();

    this.goTo(this.currentTabIndex);
    return this;
  }

  goTo(i) {
    if (this.prev.length && this.prev[this.prev.length - 1] === i) {
      this.prev.pop();
    } else {
      this.prev.push(this.currentTabIndex);
    }

    this.currentTabIndex = i;

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

    if (this.hasMovingBackground) {
      this.movingBackground.style.left = `${this.btns[i].offsetLeft}px`;
      this.movingBackground.style.top = `${this.btns[i].offsetTop}px`;
      this.movingBackground.style.width = `${this.btns[i].offsetWidth}px`;
      this.movingBackground.style.height = `${this.btns[i].offsetHeight}px`;
    }

    return this.tabs[i];
  }

  goToNext() {
    return this.goTo(this.currentTabIndex + 1);
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
    if (!this.hasMovingBackground) { return; }
    let movingBackground = this.nav.querySelector(`.${this.movingBackgroundClass}`);

    if (!movingBackground) {
      movingBackground = document.createElement('span');
      movingBackground.classList.add(this.movingBackgroundClass);
      this.nav.append(movingBackground);
    }

    this.movingBackground = movingBackground;
  }
}

export default Tabs;
