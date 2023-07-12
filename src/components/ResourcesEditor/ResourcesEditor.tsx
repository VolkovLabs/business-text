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
import { StandardEditorProps } from '@grafana/data';
import { Button, Icon, InlineField, InlineFieldRow, Input, useTheme2 } from '@grafana/ui';
import { TestIds } from '../../constants';
import { PanelOptions, Resource, ResourceType } from '../../types';
import { Collapse } from '../Collapse';
import { Styles } from './styles';

/**
 * Properties
 */
interface Props extends StandardEditorProps<Resource[], any, PanelOptions> {
  type: ResourceType;
}

/**
 * Reorder
 * @param list
 * @param startIndex
 * @param endIndex
 */
export const reorder = <T,>(list: T[], startIndex: number, endIndex: number) => {
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
export const ResourcesEditor: React.FC<Props> = ({ value, onChange, type }) => {
  /**
   * Styles and Theme
   */
  const theme = useTheme2();
  const styles = Styles(theme);

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
    onChangeItems(items.concat([{ id: uuidv4(), url: newItem, type }]));
    onToggleItem(newItem);
  }, [items, newItem, onChangeItems, onToggleItem, type]);

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
                        headerTestId={TestIds.resourcesEditor.item(url)}
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
                              data-testid={TestIds.resourcesEditor.buttonRemove}
                            />
                            <Icon name="draggabledots" {...provided.dragHandleProps} className={styles.dragIcon} />
                          </>
                        }
                        isOpen={collapseState[id]}
                        onToggle={() => onToggleItem(id)}
                      >
                        <InlineField grow={true}>
                          <Input
                            value={url}
                            onChange={(event) => {
                              onChangeItem({
                                id,
                                type,
                                url: event.currentTarget.value,
                              });
                            }}
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

      <InlineFieldRow className={styles.newGroup} data-testid={TestIds.resourcesEditor.newItem}>
        <InlineField label="New Item" grow={true} error="Item with the same name already exists.">
          <Input
            placeholder="Resource url"
            value={newItem}
            onChange={(event) => setNewItem(event.currentTarget.value)}
            data-testid={TestIds.resourcesEditor.newItemName}
          />
        </InlineField>
        <Button
          icon="plus"
          title="Add Item"
          disabled={!newItem}
          onClick={onAddNewItem}
          data-testid={TestIds.resourcesEditor.buttonAddNew}
        >
          Add
        </Button>
      </InlineFieldRow>
    </>
  );
};

/**
 * Styles Resources Editor
 */
export const StylesResourcesEditor: React.FC<StandardEditorProps> = (props) => (
  <ResourcesEditor type={ResourceType.STYLES} {...props} />
);

/**
 * Scripts Resources Editor
 */
export const ScriptsResourcesEditor: React.FC<StandardEditorProps> = (props) => (
  <ResourcesEditor type={ResourceType.SCRIPTS} {...props} />
);
