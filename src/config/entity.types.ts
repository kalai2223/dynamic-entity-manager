import type { Dayjs } from "dayjs";
import type { userConfig } from "@/config/user.config";

export interface BaseEntity {
  id: string;
}

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  pattern?: {
    value: RegExp;
    message: string;
  };
}

export interface FieldOption {
  label: string;
  value: string | number;
}

export interface FieldConfig {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "tel"
    | "date"
    | "password"
    | "select"
    | "checkbox"
    | "radio"
    | "textarea"
    | "number";
  required?: boolean;
  showInTable?: boolean;
  options?: FieldOption[]; // for select, radio, checkbox
  validation?: ValidationRules;
  defaultValue?: string | number | boolean | Dayjs ;
  disabled?: boolean;
  placeholder?: string;
}

export type UserFieldNames = (typeof userConfig)[number]["name"];

export type UserEntity = {
  id: string;
} & {
  [K in UserFieldNames]: string;
};

export interface EntityState<T extends BaseEntity> {
  data: T[];
  loading: boolean;
  error: string | null;
}

export interface EntitiesState {
  [entity: string]: EntityState<BaseEntity>;
}