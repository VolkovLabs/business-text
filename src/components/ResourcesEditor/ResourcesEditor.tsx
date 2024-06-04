import { StandardEditorProps } from '@grafana/data';
import { config } from '@grafana/runtime';
import { Alert, Button, Icon, InlineField, InlineFieldRow, Input, useStyles2 } from '@grafana/ui';
import { Collapse } from '@volkovlabs/components';
import React, { useCallback, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

import { TEST_IDS } from '../../constants';
import { PanelOptions, Resource } from '../../types';
import { getStyles } from './ResourceEditor.styles';

/**
 * Properties
 */
type Props = StandardEditorProps<Resource[], { isDeprecated: boolean }, PanelOptions>;

/**
 * Reorder
 * @param list
 * @param startIndex
 * @param endIndex
 */
const reorder = <T,>(list: T[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Get Item Style
 */
const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
  /**
   * styles we need to apply on draggables
   */
  ...draggableStyle,
});

/**
 * Resources Editor
 */
export const ResourcesEditor: React.FC<Props> = ({ value, onChange, item: { settings } }) => {
  /**
   * Styles and Theme
   */
  const styles = useStyles2(getStyles);

  /**
   * States
   */
  const [items, setItems] = useState<Resource[]>(value || []);
  const [newItem, setNewItem] = useState('');
  const [collapseState, setCollapseState] = useState<Record<string, boolean>>({});

  /**
   * Change Items
   */
  const onChangeItems = useCallback(
    (items: Resource[]) => {
      setItems(items);
      onChange(items);
    },
    [onChange]
  );

  /**
   * Drag End
   */
  const onDragEnd = useCallback(
    (result: DropResult) => {
      /**
       * Dropped outside the list
       */
      if (!result.destination) {
        return;
      }

      onChangeItems(reorder(items, result.source.index, result.destination.index));
    },
    [items, onChangeItems]
  );

  /**
   * Toggle collapse state for item
   */
  const onToggleItem = useCallback((name: string) => {
    setCollapseState((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }, []);

  /**
   * Add new item
   */
  const onAddNewItem = useCallback(() => {
    setNewItem('');
    onChangeItems(items.concat([{ id: uuidv4(), url: newItem }]));
    onToggleItem(newItem);
  }, [items, newItem, onChangeItems, onToggleItem]);

  /**
   * Change item
   */
  const onChangeItem = useCallback(
    (updatedItem: Resource) => {
      onChangeItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
    },
    [items, onChangeItems]
  );

  /**
   * Remove item
   */
  const onRemoveItem = useCallback(
    (id: string) => {
      onChangeItems(items.filter((item) => item.id !== id));
    },
    [items, onChangeItems]
  );

  /**
   * Disabled sanitize
   */
  if (!config?.disableSanitizeHtml) {
    return (
      <Alert title="Unavailable" severity="info" data-testid={TEST_IDS.resourcesEditor.infoMessage}>
        Please disable sanitize HTML to use external resources.
      </Alert>
    );
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="groups-editor">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map(({ url, id }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      className={styles.group}
                    >
                      <Collapse
                        title={<div className={styles.groupHeader}>{url}</div>}
                        headerTestId={TEST_IDS.resourcesEditor.itemLabel(url)}
                        contentTestId={TEST_IDS.resourcesEditor.itemContent(url)}
                        actions={
                          <>
                            <Button
                              icon="trash-alt"
                              variant="secondary"
                              fill="text"
                              size="sm"
                              className={styles.removeButton}
                              onClick={() => {
                                onRemoveItem(id);
                              }}
                              data-testid={TEST_IDS.resourcesEditor.buttonRemove}
                            />
                            <div className={styles.dragHandle} {...provided.dragHandleProps}>
                              <Icon name="draggabledots" className={styles.dragIcon} />
                            </div>
                          </>
                        }
                        isOpen={collapseState[id]}
                        onToggle={() => onToggleItem(id)}
                      >
                        <InlineField grow label="URL">
                          <Input
                            value={url}
                            onChange={(event) => {
                              onChangeItem({
                                id,
                                url: event.currentTarget.value,
                              });
                            }}
                            data-testid={TEST_IDS.resourcesEditor.fieldUrl}
                          />
                        </InlineField>
                      </Collapse>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <InlineFieldRow className={styles.newGroup} data-testid={TEST_IDS.resourcesEditor.newItem}>
        <InlineField label="New Resource" grow>
          <Input
            placeholder="URL"
            value={newItem}
            onChange={(event) => setNewItem(event.currentTarget.value)}
            data-testid={TEST_IDS.resourcesEditor.newItemName}
          />
        </InlineField>
        <Button
          icon="plus"
          title="Add Resource"
          disabled={!newItem}
          onClick={onAddNewItem}
          data-testid={TEST_IDS.resourcesEditor.buttonAddNew}
        >
          Add
        </Button>
      </InlineFieldRow>
      {settings?.isDeprecated && (
        <Alert title="Deprecation" severity="warning">
          External Scripts are deprecated and will be removed in the upcoming release. Please follow{' '}
          <a
            href="https://volkovlabs.io/plugins/volkovlabs-dynamictext-panel/external/"
            className={styles.link}
            target="__blank"
          >
            on the documentation
          </a>
        </Alert>
      )}
    </>
  );
};
