import { useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Button,
  Form,
  Select,
  Checkbox,
  Radio,
  InputNumber,
  DatePicker,
} from "antd";
import {
  useForm,
  Controller,
  type Path,
  type DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FieldConfig } from "@config/entity.types";
import { buildZodSchema } from "../../utils/buildZodSchema";
import { z } from "zod";
import dayjs from "dayjs";

interface Props<T extends Record<string, unknown>> {
  fields: readonly FieldConfig[];
  initialValues?: Partial<T>;
  onSubmit: (values: Omit<T, "id">) => void;
}

export function DynamicForm<T extends Record<string, unknown>>({
  fields,
  initialValues,
  onSubmit,
}: Props<T>) {
  const schema = buildZodSchema(fields);
  type FormValues = z.infer<typeof schema>;

  const computedDefaults = fields.reduce((acc, field) => {
    if (field.defaultValue !== undefined) {
      acc[field.name] = field.defaultValue;
    }
    return acc;
  }, {} as Record<string, unknown>);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...computedDefaults,
      ...initialValues,
    } as DefaultValues<FormValues>,
    mode: "onBlur",
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues as DefaultValues<FormValues>);
    }
  }, [initialValues, reset]);

  const renderInput = (
    field: FieldConfig,
    controllerField: {
      value: unknown;
      onChange: (...event: unknown[]) => void;
      onBlur: () => void;
    }
  ) => {
    const safeString = typeof controllerField.value === "string" ? controllerField.value : "";

    switch (field.type) {
      case "date": {
        const dateValue = controllerField.value ? dayjs(String(controllerField.value)) : null;
        return (
          <DatePicker
            style={{ width: "100%" }}
            placeholder={field.placeholder || "Select date"}
            disabled={field.disabled}
            value={dateValue && dateValue.isValid() ? dateValue : null}
            onChange={(date) => {
              controllerField.onChange(date ? date.format("YYYY-MM-DD") : null);
            }}
            onBlur={controllerField.onBlur}
          />
        );
      }

      case "checkbox":
        return (
          <Checkbox
            checked={Boolean(controllerField.value)}
            disabled={field.disabled}
            onChange={(e) => controllerField.onChange(e.target.checked)}
          >
            {field.label}
          </Checkbox>
        );

      case "select":
        return (
          <Select
            value={controllerField.value}
            options={field.options}
            placeholder={field.placeholder}
            disabled={field.disabled}
            onChange={(value) => controllerField.onChange(value)}
            onBlur={controllerField.onBlur}
          />
        );

      case "number":
        return (
          <InputNumber
            style={{ width: "100%" }}
            value={typeof controllerField.value === "number" ? controllerField.value : undefined}
            placeholder={field.placeholder}
            disabled={field.disabled}
            onChange={(value) => controllerField.onChange(value ?? undefined)}
            onBlur={controllerField.onBlur}
            defaultValue={field?.defaultValue as number}
          />
        );

      case "textarea":
        return (
          <Input.TextArea
            value={safeString}
            placeholder={field.placeholder}
            disabled={field.disabled}
            onChange={(e) => controllerField.onChange(e.target.value)}
            onBlur={() => {
              controllerField.onChange(safeString.trim());
              controllerField.onBlur();
            }}
            defaultValue={field?.defaultValue as string}
          />
        );

      case "radio":
        return (
          <Radio.Group
            options={field.options}
            value={controllerField.value}
            disabled={field.disabled}
            onChange={(e) => controllerField.onChange(e.target.value)}
            onBlur={controllerField.onBlur}
          />
        );

      default:
        return (
          <Input
            type={field.type}
            value={safeString}
            placeholder={field.placeholder}
            disabled={field.disabled}
            onChange={(e) => controllerField.onChange(e.target.value)}
            onBlur={() => {
              controllerField.onChange(safeString.trim());
              controllerField.onBlur();
            }}
            defaultValue={field.defaultValue as string}
          />
        );
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit((values) => onSubmit(values as Omit<T, "id">))}
    >
      <Row gutter={[16, 0]}>
        {fields.map((fieldConfig) => {
          const fieldName = fieldConfig.name as Path<FormValues>;
          const error = errors[fieldName];

          return (
            <Col xs={24} sm={12} key={fieldConfig.name}>
              <Form.Item
                label={fieldConfig.label}
                required={fieldConfig.required || fieldConfig.validation?.required}
                validateStatus={error ? "error" : ""}
                help={error ? String(error.message) : null}
              >
                <Controller
                  name={fieldName}
                  control={control}
                  render={({ field: controllerField }) => renderInput(fieldConfig, controllerField)}
                />
              </Form.Item>
            </Col>
          );
        })}
      </Row>

      <Form.Item style={{ marginTop: 24 }}>
        <Button type="primary" htmlType="submit" size="large" block>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}