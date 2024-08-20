import { act, fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { TEST_IDS } from '../../constants';
import { ContentPartialsEditor } from './ContentPartialsEditor';

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
type Props = React.ComponentProps<typeof ContentPartialsEditor>;

describe('ResourcesEditor', () => {
  /**
   * Get Tested Component
   * @param props
   */
  const getComponent = (props: Partial<Props>) => (
    <ContentPartialsEditor name="Default" item={{}} {...(props as any)} />
  );

  it('Should render items', () => {
    render(
      getComponent({
        value: [
          {
            id: '1',
            url: 'abc',
            name: 'abc',
          },
          {
            id: '2',
            url: 'aaa',
            name: 'aaa',
          },
        ],
      })
    );

    expect(screen.getByTestId(TEST_IDS.partialsEditor.itemLabel('abc'))).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.partialsEditor.itemLabel('aaa'))).toBeInTheDocument();
  });

  it('Should render component if no value', () => {
    render(
      getComponent({
        value: null as any,
      })
    );

    expect(screen.getByTestId(TEST_IDS.partialsEditor.newItem)).toBeInTheDocument();
  });

  it('Should add new item', async () => {
    const onChange = jest.fn();

    render(
      getComponent({
        value: [
          {
            id: '1',
            url: 'abc',
            name: 'abc',
          },
          {
            id: '2',
            url: 'aaa',
            name: 'aaa',
          },
        ],
        onChange,
      })
    );

    await act(() =>
      fireEvent.change(screen.getByTestId(TEST_IDS.partialsEditor.newItemName), { target: { value: 'bbb' } })
    );

    await act(() =>
      fireEvent.change(screen.getByTestId(TEST_IDS.partialsEditor.newItemURL), { target: { value: 'bbb' } })
    );

    expect(screen.getByTestId(TEST_IDS.partialsEditor.buttonAddNew)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.partialsEditor.buttonAddNew)).not.toBeDisabled();

    await act(() => fireEvent.click(screen.getByTestId(TEST_IDS.partialsEditor.buttonAddNew)));

    expect(onChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          url: 'bbb',
        }),
      ])
    );
  });

  it('Should update item url', async () => {
    const onChange = jest.fn();

    render(
      getComponent({
        value: [
          {
            id: '1',
            url: 'abc',
            name: 'abc',
          },
          {
            id: '2',
            url: 'aaa',
            name: 'aaa',
          },
        ],
        onChange,
      })
    );

    const itemLabel = screen.getByTestId(TEST_IDS.partialsEditor.itemLabel('aaa'));

    /**
     * Check item presence
     */
    expect(itemLabel).toBeInTheDocument();

    await act(() => fireEvent.click(itemLabel));

    const itemContent = screen.getByTestId(TEST_IDS.partialsEditor.itemContent('aaa'));
    /**
     * Check content presence
     */
    expect(itemContent).toBeInTheDocument();

    /**
     * Change
     */
    await act(() =>
      fireEvent.change(within(itemContent).getByTestId(TEST_IDS.partialsEditor.fieldUrl), {
        target: { value: 'aaa123' },
      })
    );

    expect(onChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        { id: '1', name: 'abc', url: 'abc' },
        { id: '2', name: 'aaa', url: 'aaa123' },
      ])
    );
  });

  it('Should update item name', async () => {
    const onChange = jest.fn();

    render(
      getComponent({
        value: [
          {
            id: '1',
            url: 'abc',
            name: 'abc',
          },
          {
            id: '2',
            url: 'aaa',
            name: 'aaa',
          },
        ],
        onChange,
      })
    );

    const itemLabel = screen.getByTestId(TEST_IDS.partialsEditor.itemLabel('aaa'));

    /**
     * Check item presence
     */
    expect(itemLabel).toBeInTheDocument();

    await act(() => fireEvent.click(itemLabel));

    const itemContent = screen.getByTestId(TEST_IDS.partialsEditor.itemContent('aaa'));
    /**
     * Check content presence
     */
    expect(itemContent).toBeInTheDocument();

    /**
     * Change
     */
    await act(() =>
      fireEvent.change(within(itemContent).getByTestId(TEST_IDS.partialsEditor.fieldName), {
        target: { value: 'aaa123' },
      })
    );

    expect(onChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        { id: '1', name: 'abc', url: 'abc' },
        { id: '2', name: 'aaa123', url: 'aaa' },
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
            name: 'abc',
          },
          {
            id: '2',
            url: 'aaa',
            name: 'aaa',
          },
        ],
        onChange,
      })
    );

    const item = screen.getByTestId(TEST_IDS.partialsEditor.itemLabel('aaa'));

    /**
     * Check item presence
     */
    expect(item).toBeInTheDocument();

    /**
     * Remove
     */
    await act(() => fireEvent.click(within(item).getByTestId(TEST_IDS.partialsEditor.buttonRemove)));

    expect(onChange).toHaveBeenCalledWith([
      {
        id: '1',
        url: 'abc',
        name: 'abc',
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
            name: 'abc',
          },
          {
            id: '2',
            url: 'aaa',
            name: 'aaa',
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
        name: 'aaa',
      },
      {
        id: '1',
        url: 'abc',
        name: 'abc',
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
            name: 'abc',
          },
          {
            id: '2',
            url: 'aaa',
            name: 'aaa',
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
