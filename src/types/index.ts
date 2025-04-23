import { z } from "zod";

// Enum of supported component types
export const ComponentTypeEnum = z.enum([
  "button",
  "card",
  "modal",
  "form",
  "navbar",
  "landing", // if you’re including landing pages now
]);

// Schema to validate incoming generation requests
export const GenerateComponentSchema = z.object({
  name: z.string().min(1, "Component name is required."),
  type: ComponentTypeEnum,
});

// Infer useful TypeScript types from Zod schema
export type ComponentType = z.infer<typeof ComponentTypeEnum>;
export type GenerateComponentInput = z.infer<typeof GenerateComponentSchema>;
