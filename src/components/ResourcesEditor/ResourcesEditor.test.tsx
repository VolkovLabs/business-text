import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { TestIds } from '../../constants';
import { ResourcesEditor } from './ResourcesEditor';

/**
 * Mock react-beautiful-dnd
 */
jest.mock('react-beautiful-dnd', () => ({
  ...jest.requireActual('react-beautiful-dnd'),
  DragDropContext: jest.fn(({ children }) => children),
  Droppable: jest.fn(({ children }) => children({})),
  Draggable: jest.fn(({ children }) =>
    children(
      {
        draggableProps: {},
      },
      {}
    )
  ),
}));

/**
 * Props
 */
type Props = React.ComponentProps<typeof ResourcesEditor>;

describe('ResourcesEditor', () => {
  /**
   * Get Tested Component
   * @param props
   */
  const getComponent = (props: Partial<Props>) => <ResourcesEditor name="Default" {...(props as any)} />;

  it('Should render items', () => {
    render(
      getComponent({
        value: [
          {
            id: '1',
            url: 'abc',
          },
          {
            id: '2',
            url: 'aaa',
          },
        ],
      })
    );

    expect(screen.getByTestId(TestIds.resourcesEditor.itemLabel('abc'))).toBeInTheDocument();
    expect(screen.getByTestId(TestIds.resourcesEditor.itemLabel('aaa'))).toBeInTheDocument();
  });

  it('Should render component if no value', () => {
    render(
      getComponent({
        value: null as any,
      })
    );

    expect(screen.getByTestId(TestIds.resourcesEditor.newItem)).toBeInTheDocument();
  });

  it('Should add new item', async () => {
    const onChange = jest.fn();

    render(
      getComponent({
        value: [
          {
            id: '1',
            url: 'abc',
          },
          {
            id: '2',
            url: 'aaa',
          },
        ],
        onChange,
      })
    );

    await act(() =>
      fireEvent.change(screen.getByTestId(TestIds.resourcesEditor.newItemName), { target: { value: 'bbb' } })
    );

    expect(screen.getByTestId(TestIds.resourcesEditor.buttonAddNew)).toBeInTheDocument();
    expect(screen.getByTestId(TestIds.resourcesEditor.buttonAddNew)).not.toBeDisabled();

    await act(() => fireEvent.click(screen.getByTestId(TestIds.resourcesEditor.buttonAddNew)));

    expect(onChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          url: 'bbb',
        }),
      ])
    );
  });

  it('Should update item', async () => {
    const onChange = jest.fn();

    render(
      getComponent({
        value: [
          {
            id: '1',
            url: 'abc',
          },
          {
            id: '2',
            url: 'aaa',
          },
        ],
        onChange,
      })
    );

    const itemLabel = screen.getByTestId(TestIds.resourcesEditor.itemLabel('aaa'));

    /**
     * Check item presence
     */
    expect(itemLabel).toBeInTheDocument();

    await act(() => fireEvent.click(itemLabel));

    const itemContent = screen.getByTestId(TestIds.resourcesEditor.itemContent('aaa'));
    /**
     * Check content presence
     */
    expect(itemContent).toBeInTheDocument();

    /**
     * Change
     */
    await act(() =>
      fireEvent.change(within(itemContent).getByTestId(TestIds.resourcesEditor.fieldUrl), {
        target: { value: 'aaa123' },
      })
    );

    expect(onChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        {
          id: '2',
          url: 'aaa123',
        },
      ])
    );
  });

  it('Should remove item', async () => {
    const onChange = jest.fn();

    render(
      getComponent({
        value: [
          {
            id: '1',
            url: 'abc',
          },
          {
            id: '2',
            url: 'aaa',
          },
        ],
        onChange,
      })
    );

    const item = screen.getByTestId(TestIds.resourcesEditor.itemLabel('aaa'));

    /**
     * Check item presence
     */
    expect(item).toBeInTheDocument();

    /**
     * Remove
     */
    await act(() => fireEvent.click(within(item).getByTestId(TestIds.resourcesEditor.buttonRemove)));

    expect(onChange).toHaveBeenCalledWith([
      {
        id: '1',
        url: 'abc',
      },
    ]);
  });

  it('Should reorder items', async () => {
    let onDragEndHandler: (result: DropResult) => void = () => {};
    jest.mocked(DragDropContext).mockImplementation(({ children, onDragEnd }: any) => {
      onDragEndHandler = onDragEnd;
      return children;
    });
    const onChange = jest.fn();

    render(
      getComponent({
        value: [
          {
            id: '1',
            url: 'abc',
          },
          {
            id: '2',
            url: 'aaa',
          },
        ],
        onChange,
      })
    );

    /**
     * Simulate drop item 1 to index 0
     */
    await act(() =>
      onDragEndHandler({
        destination: {
          index: 0,
        },
        source: {
          index: 1,
        },
      } as any)
    );

    expect(onChange).toHaveBeenCalledWith([
      {
        id: '2',
        url: 'aaa',
      },
      {
        id: '1',
        url: 'abc',
      },
    ]);
  });

  it('Should not reorder items if drop outside the list', async () => {
    let onDragEndHandler: (result: DropResult) => void = () => {};
    jest.mocked(DragDropContext).mockImplementation(({ children, onDragEnd }: any) => {
      onDragEndHandler = onDragEnd;
      return children;
    });
    const onChange = jest.fn();

    render(
      getComponent({
        value: [
          {
            id: '1',
            url: 'abc',
          },
          {
            id: '2',
            url: 'aaa',
          },
        ],
        onChange,
      })
    );

    /**
     * Simulate drop item 1 to outside the list
     */
    await act(() =>
      onDragEndHandler({
        destination: null,
        source: {
          index: 1,
        },
      } as any)
    );

    expect(onChange).not.toHaveBeenCalled();
  });
});
