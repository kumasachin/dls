import type React from 'react';
import { Card } from '../../atoms/Card/Card';
import { Spinner } from '../../atoms/Spinner/Spinner';
import { Text } from '../../atoms/Text/Text';

export interface TableColumn<T> {
  id: string;
  header: string;
  accessor: (item: T) => React.ReactNode;
  width?: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  selectedId?: string;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyMessage = 'No data available',
  onRowClick,
  selectedId,
}: TableProps<T>) {
  return (
    <Card style={{ overflow: 'hidden', padding: 0 }}>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <Spinner />
        </div>
      ) : data.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <Text>{emptyMessage}</Text>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    style={{
                      textAlign: 'left',
                      padding: '12px 16px',
                      fontWeight: 500,
                      width: column.width,
                    }}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                const id = keyExtractor(item);
                return (
                  <tr
                    key={id}
                    style={{
                      borderBottom: '1px solid #e0e0e0',
                      backgroundColor: selectedId === id ? '#f5f5f5' : 'white',
                      cursor: onRowClick ? 'pointer' : 'default',
                    }}
                    onClick={() => onRowClick?.(item)}
                  >
                    {columns.map((column) => (
                      <td key={`${id}-${column.id}`} style={{ padding: '12px 16px' }}>
                        {column.accessor(item)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

export default Table;
