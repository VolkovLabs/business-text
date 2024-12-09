import { Locator } from '@playwright/test';
import { DashboardPage, expect, Panel } from '@grafana/plugin-e2e';
import { TEST_IDS } from '../../src/constants/tests';
import { getLocatorSelectors, LocatorSelectors } from './selectors';

const getTextSelectors = getLocatorSelectors(TEST_IDS.text);

/**
 * Base Content element
 */
class ContentElement {
  protected readonly locator: Locator;

  constructor(locator: Locator) {
    this.locator = locator;
  }

  public get() {
    return this.locator;
  }

  private getMsg(msg: string): string {
    return `Element: ${msg}`;
  }

  public async checkPresence() {
    return expect(this.get(), this.getMsg('Check Element Presence')).toBeVisible();
  }

  public async checkColor(color: string) {
    return expect(this.get(), this.getMsg('Check Color')).toHaveCSS('color', color);
  }

  public async checkBackgroundColor(color: string) {
    return expect(this.get(), this.getMsg('Check Background color')).toHaveCSS('background-color', color);
  }
}

/**
 * Content Helper
 */
class RowHelper {
  private readonly locator: Locator;

  constructor(parentLocator: Locator) {
    this.locator = parentLocator;
  }

  public get() {
    return this.locator;
  }

  private getMsg(msg: string): string {
    return `Row: ${msg}`;
  }

  public async checkPresence() {
    return expect(this.get(), this.getMsg('Check Row Presence')).toBeVisible();
  }

  public async checkTextContent(text: string) {
    return expect(this.get(), this.getMsg('Check RowbText content')).toHaveText(text);
  }
}

/**
 * Content Helper
 */
class ContentHelper {
  public selectors: LocatorSelectors<typeof TEST_IDS.text>;

  constructor(public readonly parentLocator: Locator) {
    this.selectors = this.getSelectors(parentLocator);
  }

  private getMsg(msg: string): string {
    return `Content: ${msg}`;
  }

  public get() {
    return this.selectors.content();
  }

  public async checkPresence() {
    return expect(this.selectors.content(), this.getMsg('Check Presence')).toBeVisible();
  }

  private getSelectors(locator: Locator) {
    return getTextSelectors(locator);
  }

  public async checkTextContent(text: string) {
    return expect(this.selectors.content(), this.getMsg('Check Text content')).toHaveText(text);
  }

  public getRow(rowNumber: number) {
    const locator = this.selectors.content().nth(rowNumber);
    return new RowHelper(locator);
  }

  public async compareScreenshot(name: string) {
    return expect(this.selectors.content(), this.getMsg(`Check name Screenshot`)).toHaveScreenshot(name);
  }

  public getContentElement(testId: string): ContentElement {
    return new ContentElement(this.get().getByTestId(testId));
  }
}

/**
 * Panel Helper
 */
export class PanelHelper {
  private readonly locator: Locator;
  private readonly panel: Panel;
  private readonly title: string;
  private readonly selectors: LocatorSelectors<typeof TEST_IDS.panel>;

  constructor(dashboardPage: DashboardPage, panelTitle: string) {
    this.panel = dashboardPage.getPanelByTitle(panelTitle);
    this.title = panelTitle;
    this.locator = this.panel.locator;
    this.selectors = getLocatorSelectors(TEST_IDS.panel)(this.locator);
  }

  private getMsg(msg: string): string {
    return `Panel: ${msg}`;
  }

  public async checkIfNoErrors() {
    return expect(this.panel.getErrorIcon(), this.getMsg('Check If No Errors')).not.toBeVisible();
  }

  public async checkPresence() {
    return expect(this.selectors.root(), this.getMsg(`Check ${this.title} Presence`)).toBeVisible();
  }

  public async checkNotPresence() {
    return expect(this.selectors.root(), this.getMsg(`Check ${this.title} not Presence`)).not.toBeVisible();
  }

  public getContent(): ContentHelper {
    return new ContentHelper(this.locator);
  }
}
