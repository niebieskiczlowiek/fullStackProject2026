import { Film } from "@/types/film";
import * as z from "zod";

export const filmSchema = z.unknown().transform((data) => {
    const raw = data as Film;

    const scaledRating = raw.vote_average
        ? Number((raw.vote_average)/2).toFixed(1)
        : 0;

    return {
        ...raw,
        release_date: new Date(raw.release_date),
        vote_average: scaledRating
    } as Film;
})