import { Table, Button, Space, Popconfirm, type TableProps, Tooltip } from "antd";
import { useLayoutEffect, useState } from "react";
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
  const [pageSize, setPageSize] = useState(10);

  useLayoutEffect(() => {
    const calculatePageSize = () => {
      const screenHeight = window.innerHeight;

      const tableHeight = screenHeight * 0.5; // 50% of UI
      const rowHeight = 54; // Ant Design default row height

      const calculatedPageSize = Math.floor(tableHeight / rowHeight);

      setPageSize(calculatedPageSize > 0 ? calculatedPageSize : 5);
    };

    calculatePageSize();
    window.addEventListener("resize", calculatePageSize);

    return () => window.removeEventListener("resize", calculatePageSize);
  }, []);


  const columns: TableProps<T>["columns"] = [
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
      fixed: "right" as const,
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => onEdit(record)}
            style={{ padding: 0 }}
          >
            <Tooltip title="Edit">
              <EditOutlined />
            </Tooltip>
          </Button>

          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger style={{ padding: 0 }}>
              <Tooltip title="Delete">
                <DeleteOutlined />
              </Tooltip>
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
      pagination={
        data.length > pageSize
          ? { responsive: true, pageSize }
          : false
      }
      scroll={data.length > 0 ? undefined : { y: undefined }}
      rowKey={(record) => record.id}
    />
  );
}
