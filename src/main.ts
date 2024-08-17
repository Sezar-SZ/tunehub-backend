import "@wahyubucil/nestjs-zod-openapi/boot";

import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";

import { patchNestjsSwagger } from "@wahyubucil/nestjs-zod-openapi"; // <-- add this. Import the patch for NestJS Swagger

import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT"],
        credentials: true,
    });

    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle("TuneHub")
        .setDescription("The TuneHub API description")
        .setVersion("1.0")
        .addTag("TuneHub")
        .build();

    patchNestjsSwagger({ schemasSort: "alpha" }); // <-- add this. This function should run before the `SwaggerModule.createDocument` function.

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("swagger", app, document);

    app.use(cookieParser(process.env.COOKIE_SECRET));
    await app.listen(5000);
}
bootstrap();
