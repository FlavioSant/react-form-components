import { CheckboxTreeList, TreeItem } from './CheckboxTreeList';

import styles from './CheckboxTree.module.scss';

type CheckboxTreeProps = {
  items: TreeItem[];
  setItems: (newItems: TreeItem[]) => void;
};

export const CheckboxTree = ({ items, setItems }: CheckboxTreeProps) => {
  const updateParent = (items: TreeItem[], parent_id: string | null) => {
    const parentIndex = items.findIndex(item => item.acessoId === parent_id);
    const parent = items[parentIndex];

    if (!parent) {
      return;
    }

    items[parentIndex] = { ...parent, checked: true };

    updateParent(items, parent.parentId);
  };

  const updateChildren = (
    items: TreeItem[],
    acesso_id: string,
    checked: boolean,
  ) => {
    const children = items.filter(item => item.parentId === acesso_id);

    if (!children.length) {
      return;
    }

    for (const child of children) {
      const childIndex = items.findIndex(
        item => item.acessoId === child.acessoId,
      );

      items[childIndex] = { ...child, checked };

      updateChildren(items, child.acessoId, checked);
    }
  };

  const onToggleCheck = (acesso_id: string) => {
    const index = items.findIndex(item => item.acessoId === acesso_id);
    const item = items[index];

    const newItems = [...items];

    newItems[index] = { ...item, checked: !item.checked };

    if (!item.checked) {
      updateParent(newItems, item.parentId);
    }

    updateChildren(newItems, item.acessoId, !item.checked);

    setItems(newItems);
  };

  const onToggleOpen = (acesso_id: string) => {
    const index = items.findIndex(item => item.acessoId === acesso_id);
    const item = items[index];

    const newItems = [...items];

    newItems[index] = { ...item, open: !item.open };

    setItems(newItems);
  };

  return (
    <div className={styles['tree-view-container']}>
      <CheckboxTreeList
        items={items}
        parentItems={items.filter(item => item.parentId === null)}
        onToggleOpen={onToggleOpen}
        onToggleCheck={onToggleCheck}
      />
    </div>
  );
};
