import { Checkbox } from '../Checkbox';
import { CaretRight } from 'phosphor-react';

import styles from './CheckboxTreeList.module.scss';

export type TreeItem = {
  acessoId: string;
  nome: string;
  parentId: string | null;
  checked: boolean;
  open: boolean;
};

type CheckboxTreeListProps = {
  items: TreeItem[];
  parentItems: TreeItem[];
  onToggleCheck: (acesso_id: string) => void;
  onToggleOpen: (acesso_id: string) => void;
};

export const CheckboxTreeList = ({
  items,
  parentItems,
  onToggleCheck,
  onToggleOpen,
}: CheckboxTreeListProps) => {
  return (
    <ul className={styles['tree-item-list']}>
      {parentItems.map(node => {
        const children = items.filter(item => item.parentId === node.acessoId);

        return (
          <li
            key={node.acessoId}
            className={`${styles['tree-item']} ${
              node.open ? styles['is-open'] : ''
            }`}
          >
            <div className={styles['tree-item-description']}>
              {children.length > 0 && (
                <button
                  type="button"
                  onClick={() => onToggleOpen(node.acessoId)}
                  className={`${styles['tree-item-chevron-button']} ${
                    node.open ? styles['rotate-icon'] : ''
                  }`}
                >
                  <CaretRight size={16} />
                </button>
              )}
              <Checkbox
                label={node.nome}
                name={node.acessoId}
                checked={node.checked}
                onChange={() => onToggleCheck(node.acessoId)}
              />
            </div>

            {children.length > 0 && (
              <CheckboxTreeList
                items={items}
                parentItems={children}
                onToggleCheck={onToggleCheck}
                onToggleOpen={onToggleOpen}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};
