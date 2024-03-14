/**
 * Tests Identifiers
 */
export const TEST_IDS = {
  panel: {
    root: 'data-testid panel',
    fieldFrame: 'data-testid panel field-frame',
  },
  text: {
    content: 'data-testid text content',
    error: 'data-testid text error',
    errorContent: 'data-testid text error-content',
  },
  textEditor: {
    root: 'data-testid text-editor',
  },
  resourcesEditor: {
    buttonAddNew: 'data-testid resources-editor button-add-new',
    buttonRemove: 'data-testid resources-editor button-remove',
    itemLabel: (name: string) => `data-testid resources-editor item-label-${name}`,
    itemContent: (name: string) => `data-testid resources-editor item-content-${name}`,
    fieldUrl: 'data-testid resources-editor field-url',
    newItem: 'data-testid resources-editor new-item',
    newItemName: 'data-testid resources-editor new-item-name',
    infoMessage: 'data-testid resources-editor info-message',
  },
};
