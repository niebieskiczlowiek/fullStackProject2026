import Movie from "@/types/movie";
import { apiFetch } from "./client";

export const MovieService = {
    getPopular: () => apiFetch<Movie[]>("/movie/popular"), // to fix
    getDetails: (id: number) => apiFetch<Movie>(`/movie/${id}`)
}