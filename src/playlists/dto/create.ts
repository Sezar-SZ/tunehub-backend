import { z } from "zod";
import PlaylistModel from ".";

export const createPlaylistSchema = PlaylistModel.omit({
    id: true,
});
export type CreatePlaylistDto = z.infer<typeof createPlaylistSchema>;

export const updatePlaylistSchema = PlaylistModel;
export type UpdatePlaylistSchema = z.infer<typeof updatePlaylistSchema>;
