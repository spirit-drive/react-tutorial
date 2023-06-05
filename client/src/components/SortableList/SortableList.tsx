import React, { FC, Component, createRef, RefObject } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import cn from 'clsx';
import { SortableListItems } from 'src/components/SortableList/types';
import { getItems, getList } from 'src/components/SortableList/helpers';
import { SortableListBase } from './SortableListBase';
import { SortableListCells } from './SortableListCells';
import { SortableItemView, SortableItemProps } from './SortableItemView';
import s from './SortableList.sass';

export type SortableListProps<T> = {
  className?: string;
  list: T[];
  sortable?: boolean;
  onChange?: (list: T[]) => void;
  onStartSortable?: () => void;
  onFinishSortable?: () => void;
  elementView?: FC<SortableItemProps<T>>;
  itemClassName?: string;
};

export type SortableListState<T> = {
  items: SortableListItems<T>;
};

export class SortableList<T> extends Component<SortableListProps<T>, SortableListState<T>> {
  bases: RefObject<HTMLElement[]>;

  root: RefObject<HTMLDivElement>;

  static defaultProps = {
    elementView: SortableItemView,
    sortable: true,
  };

  constructor(props: SortableListProps<T>) {
    super(props);
    const { list } = this.props;
    this.state = {
      items: getItems(list),
    };
    this.bases = { current: [] };
    this.root = createRef();
  }

  shouldComponentUpdate(nextProps: Readonly<SortableListProps<T>>, nextState: Readonly<SortableListState<T>>): boolean {
    const { list, ...otherProps } = nextProps;
    const { items, ...otherState } = nextState;
    if (this.props.list !== list && JSON.stringify(list) !== JSON.stringify(getItems(this.state.items))) return false;
    if (JSON.stringify(this.state.items) !== JSON.stringify(items)) return true;
    return shallowCompare(this, otherProps, otherState);
  }

  componentDidUpdate(prevProps: Readonly<SortableListProps<T>>): void {
    const { list } = this.props;

    if (prevProps.list !== list) {
      // todo
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ items: getItems(list) });
    }
  }

  reorder = (id1: string, id2: string): void => {
    this.setState((prevState) => {
      const index1 = prevState.items.findIndex((i) => i.id === id1);
      const index2 = prevState.items.findIndex((i) => i.id === id2);
      const newState = [...prevState.items];
      newState.splice(index2, 0, ...newState.splice(index1, 1));
      return { items: newState };
    });
  };

  onFinish = (): void => {
    const { onFinishSortable } = this.props;
    onFinishSortable?.();
    const { onChange } = this.props;
    const { items } = this.state;
    if (onChange) onChange(getList(items));
  };

  render(): JSX.Element {
    const { className, itemClassName, elementView, sortable, onStartSortable } = this.props;
    const { items } = this.state;
    return (
      <div ref={this.root} className={cn(s.root, className)}>
        <SortableListBase itemClassName={itemClassName} elementView={elementView} bases={this.bases} items={items} />
        <SortableListCells
          itemClassName={itemClassName}
          onStartSortable={onStartSortable}
          onFinishSortable={this.onFinish}
          sortable={sortable}
          elementView={elementView}
          reorder={this.reorder}
          root={this.root}
          bases={this.bases}
          items={items}
        />
      </div>
    );
  }
}
