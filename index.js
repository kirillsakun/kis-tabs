import './main.scss';

class Tabs {
  constructor({
    tabSelector,
    btnSelector,
    navSelector,
    activeClass = 'js--active',
    eventType = 'click',
    initialTab = 0,
    hasMovingBackground = false,
    movingBackgroundClass = 'tabs__background',
    searchParameterName,
    tabNameAttribute = 'data-tab-name',
  }) {
    this.tabs = document.querySelectorAll(tabSelector);
    this.tabsNames = new Array(this.tabs.length);
    this.btns = document.querySelectorAll(btnSelector);
    this.nav = navSelector || this.btns[0]?.parentNode;
    this.activeClass = activeClass;
    this.eventType = eventType;
    this.initialTab = initialTab;
    this.currentTabIndex = 0;
    this.prev = [];
    this.movingBackground = undefined;
    this.hasMovingBackground = hasMovingBackground;
    this.movingBackgroundClass = movingBackgroundClass;
    this.searchParameterName = searchParameterName;
    this.tabNameAttribute = tabNameAttribute;
  }

  init() {
    this.initBtns();
    this.initUnderline();
    this.initSearchParamsLogic();
    this.setInitTabIndex();


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

    // set active class to current tab
    this.tabs.forEach((tab) => {
      tab.classList.remove(this.activeClass);
    });
    this.tabs[i].classList.add(this.activeClass);

    // set active class to current button
    if (this.btns.length) {
      this.btns.forEach((btn) => {
        btn.classList.remove(this.activeClass);
      });
      this.btns[i].classList.add(this.activeClass);
    }

    // set background position
    if (this.hasMovingBackground) {
      this.movingBackground.style.left = `${this.btns[i].offsetLeft}px`;
      this.movingBackground.style.top = `${this.btns[i].offsetTop}px`;
      this.movingBackground.style.width = `${this.btns[i].offsetWidth}px`;
      this.movingBackground.style.height = `${this.btns[i].offsetHeight}px`;
    }

    // set url parameter
    if (this.searchParameterName) {
      const url = new URL(window.location);
      url.searchParams.set(this.searchParameterName, this.tabsNames[i]);
      // eslint-disable-next-line no-restricted-globals
      history.replaceState(null, null, url.toString());
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

  initSearchParamsLogic() {
    if (!this.searchParameterName) { return; }

    for (let i = 0; i < this.tabs.length; i += 1) {
      this.tabsNames[i] = this.tabs[i].getAttribute(this.tabNameAttribute) || `${i}`;
    }
  }

  setInitTabIndex() {
    if (typeof this.initialTab === 'number') {
      this.currentTabIndex = this.initialTab;
    } else {
      this.currentTabIndex = this.tabsNames.indexOf(this.initialTab);
    }
    return this.currentTabIndex;
  }
}

export default Tabs;
