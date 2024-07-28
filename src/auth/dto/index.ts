import { z } from "zod";
import { createZodDto } from "@wahyubucil/nestjs-zod-openapi";

export const loginSchema = z.object({
    email: z
        .string()
        .email({ message: "email is not valid!" })
        .openapi({ description: "email of the user" }),
    password: z.string(),
});

export class LoginDto extends createZodDto(loginSchema) {}
export class RegisterDto extends createZodDto(loginSchema) {}

export type LoginDtoType = z.infer<typeof loginSchema>;
