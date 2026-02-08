import { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  message,
  Space,
  Card,
  Grid,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import {
  userConfig,
  type UserFormValues,
  type UserEntity,
} from "@config/user.config";

import { DynamicForm } from "@components/DynamicForm";
import { EntityTable } from "@components/EntityTable";

import { useAppDispatch, useAppSelector } from "@app/hook";

import {
  fetchEntity,
  createEntityAction,
  updateEntityAction,
  deleteEntityAction,
} from "@features/entity/entitySlice";

const { useBreakpoint } = Grid;

const ENTITY = "users";

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const screens = useBreakpoint();

  const [open, setOpen] = useState(false);

  const [editing, setEditing] =
    useState<UserEntity | null>(null);

  const entityState = useAppSelector(
    (state) => state.entities[ENTITY]
  );

  const users: UserEntity[] = entityState?.data
    ? [...(entityState.data as UserEntity[])].sort(
      (a, b) => Number(b.id) - Number(a.id)
    )
    : [];

  const loading = entityState?.loading ?? false;

  useEffect(() => {
    dispatch(fetchEntity(ENTITY));
  }, [dispatch]);

  const handleOpenDrawer = (
    record: UserEntity | null = null
  ) => {
    setEditing(record);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
  };

  const handleSubmit = async (
    values: UserFormValues
  ) => {
    try {
      if (editing) {
        await dispatch(
          updateEntityAction({
            entity: ENTITY,
            id: editing.id,
            payload: values,
          })
        ).unwrap();

        message.success("User updated successfully");
      } else {
        await dispatch(
          createEntityAction({
            entity: ENTITY,
            payload: values,
          })
        ).unwrap();

        message.success("User created successfully");
      }

      handleClose();
    } catch {
      message.error("Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(
        deleteEntityAction({
          entity: ENTITY,
          id,
        })
      ).unwrap();

      message.success("User deleted successfully");
    } catch {
      message.error("Delete failed");
    }
  };

  return (
    <Card variant="borderless">
      <Space
        orientation="vertical"
        style={{ width: "100%" }}
        size="large"
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <h2 style={{ margin: 0 }}>
            User Management
          </h2>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleOpenDrawer()}
            block={!screens.sm}
          >
            Add User
          </Button>
        </header>

        <main>
          <EntityTable<UserEntity>
            fields={userConfig}
            data={users}
            loading={loading}
            onEdit={handleOpenDrawer}
            onDelete={handleDelete}
          />
        </main>
      </Space>
      <aside>
        <Drawer
          title={editing ? "Edit User" : "Add User"}
          open={open}
          onClose={handleClose}
          size={!screens.sm ? "100%" : 720}
          destroyOnHidden
        >
          <DynamicForm<UserFormValues>
            key={editing?.id ?? "new"}
            fields={userConfig}
            initialValues={editing ?? undefined}
            onSubmit={handleSubmit}
          />
        </Drawer>
      </aside>
    </Card>
  );
}
