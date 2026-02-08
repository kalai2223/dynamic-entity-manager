import { z } from "zod";
import type { FieldConfig } from "@config/entity.types";

export const buildZodSchema = (fields: readonly FieldConfig[]) => {
  const shape: Record<string, z.ZodType> = {};

  fields.forEach((field) => {
    const isRequired = field.required || field.validation?.required;
    const rules = field.validation;

    if (field.type === "number") {
      const numSchema = z.number({ 
        error: `${field.label} must be a number` 
      });

      shape[field.name] = isRequired 
        ? numSchema 
        : numSchema.optional().nullable();
      return;
    }

    if (field.type === "date") {
      const dateSchema = z.string().refine((val) => !isRequired || val !== "", {
        message: `${field.label} is required`,
      });
      
      shape[field.name] = isRequired 
        ? dateSchema 
        : dateSchema.optional().nullable().or(z.literal(""));
      return;
    }

    let strSchema = z.string({
      error: `${field.label} must be a string`,
    });

    if (field.type === "password") {
      strSchema = strSchema
        .regex(/[A-Za-z]/, { message: `${field.label} must contain at least one letter` })
        .regex(/[0-9]/, { message: `${field.label} must contain at least one number` })
        .regex(/[^A-Za-z0-9]/, { message: `${field.label} must contain at least one special character` });
    }

    if (isRequired) {
      strSchema = strSchema.min(1, { message: `${field.label} is required` });
    }

    if (rules?.minLength) {
      strSchema = strSchema.min(rules.minLength, {
        message: `${field.label} must be at least ${rules.minLength} characters`,
      });
    }

    if (rules?.maxLength) {
      strSchema = strSchema.max(rules.maxLength, {
        message: `${field.label} must be at most ${rules.maxLength} characters`,
      });
    }

    if (rules?.pattern) {
      strSchema = strSchema.regex(rules.pattern.value, {
        message: rules.pattern.message,
      });
    }

    /* OPTIONAL LOGIC */
    if (!isRequired) {
      shape[field.name] = strSchema.optional().nullable().or(z.literal(""));
    } else {
      shape[field.name] = strSchema;
    }
  });

  return z.object(shape);
};