import { z } from "zod";

const PlaylistModel = z.object({
    id: z.number().int(),
    name: z.string(),
    published: z.boolean(),
});

export default PlaylistModel;

export * from "./create";
