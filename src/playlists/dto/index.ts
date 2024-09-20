import { z } from "zod";

const PlaylistModel = z.object({
    id: z.string(),
    name: z.string(),
    published: z.boolean(),
});

export default PlaylistModel;

export * from "./create";
