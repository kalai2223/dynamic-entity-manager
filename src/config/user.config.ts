import { buildZodSchema } from "@/utils/buildZodSchema";
import type { FieldConfig } from "@config/entity.types";
import type z from "zod";

export const userConfig: readonly FieldConfig[] = [
  
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    required: true,
    placeholder: "Enter first name",
    validation: {
      minLength: 2,
      maxLength: 30,
      pattern: {
        value: /^[A-Za-z\s]+$/,
        message:
          "First name must contain only letters and spaces",
      },
    },
    showInTable: true,
  },

  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    required: true,
    placeholder: "Enter last name",
    validation: {
      minLength: 2,
      maxLength: 30,
      pattern: {
        value: /^[A-Za-z\s]+$/,
        message:
          "Last name must contain only letters and spaces",
      },
    },
    showInTable: true,
  },

  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
    placeholder: "example@email.com",
    validation: {
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        message: "Please enter a valid email address",
      },
    },
    showInTable: true,
  },

  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    required: true,
    placeholder: "10 digit phone number",
    validation: {
      pattern: {
        value: /^[0-9]{10}$/,
        message: "Phone number must be exactly 10 digits",
      },
    },
    showInTable: true,
  },
  {
    name: "createdDate",
    label: "Created Date",
    type: "date",
    defaultValue: new Date().toISOString(),
    showInTable: false,
  },
  // {
  //   name: "dateOfBirth",
  //   label: "Date of Birth",
  //   type: "date",
  //   showInTable: true,
  // },
  // {
  //   name: "address",
  //   label:"Address",
  //   type: "textarea",
  //   showInTable: false,
  //   placeholder:"Enter your complete address"
  // }
];

export const userSchema = buildZodSchema(userConfig);

export type UserFormValues = z.infer<typeof userSchema>;

export type UserEntity = UserFormValues & { id: string };