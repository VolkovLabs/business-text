/**
 * Tests Identifiers
 */
export const TestIds = {
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
    buttonAddNew: 'data-testid fields-editor button-add-new',
    buttonRemove: 'data-testid fields-editor button-remove',
    item: (name: string) => `data-testid fields-editor item-${name}`,
    newItem: 'data-testid fields-editor new-item',
    newItemName: 'fields-editor new-item-name',
  },
};
