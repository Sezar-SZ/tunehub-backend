import { z } from "zod";
import PlaylistModel from ".";

export const createPlaylistSchema = PlaylistModel.omit({
    id: true,
});
export type CreatePlaylistDto = z.infer<typeof createPlaylistSchema>;
