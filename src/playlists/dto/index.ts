import { z } from "zod";

const PlaylistModel = z.object({
    id: z.string().nanoid(),
    name: z.string(),
    published: z.boolean(),
});

export default PlaylistModel;

export * from "./create";
