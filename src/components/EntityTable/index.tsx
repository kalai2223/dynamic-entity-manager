import { Table, Button, Space, Popconfirm, type TableProps, Tooltip } from "antd";
import type { BaseEntity, FieldConfig } from "@config/entity.types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface Props<T extends BaseEntity> {
  fields: readonly FieldConfig[];
  data: T[];
  loading: boolean;
  onEdit: (record: T) => void;
  onDelete: (id: string) => void;
  responsive?: boolean;
}

export function EntityTable<T extends BaseEntity>({
  fields,
  data,
  loading,
  onEdit,
  onDelete,
}: Props<T>) {
  const columns: TableProps<T>['columns'] = [
    ...fields
      .filter((f) => f.showInTable)
      .map((field) => ({
        title: field.label,
        dataIndex: field.name,
        key: field.name,
        ellipsis: true,
      })),
    {
      title: "Actions",
      key: "actions",
      fixed: 'right' as const,
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => onEdit(record)} style={{ padding: 0 }}>
            <Tooltip title='Edit'><EditOutlined /></Tooltip>
          </Button>
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger style={{ padding: 0 }}>
              <Tooltip title='Delete'> <DeleteOutlined /></Tooltip>
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table<T>
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ responsive: true, pageSize: 10 }}
    />
  );
}