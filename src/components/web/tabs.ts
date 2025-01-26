const Tabs = {
    Solids: {

    },
    Liquids: {

    },
    Gas: {

    }
}

export class TabsHandler {
    tabs: HTMLElement;
    tabButtons: Element[] = [];
    onTabsChanged: ((id: string) => void)[] = [];
    constructor(string: string, defaultSelected: string) {
        this.tabs = document.querySelector(string)!;

        this.tabs.querySelectorAll('.tabs__button').forEach((tab) => {
            this.tabButtons.push(tab);
            (tab as HTMLButtonElement).addEventListener('click', () => {
                this.setActiveButton(tab.id);
            })
        })

        this.setActiveButton(defaultSelected);
    }

    setActiveButton(id: string) {
        this.tabButtons.forEach((button) => {
            if (button.id == id) {
                button.classList.add("tabs__button_selected");
            } else {
                button.classList.remove("tabs__button_selected");
            }
        });

        this.onTabsChanged.forEach((fn) => {
            fn(id);
        })
    }
}