// PROTOTYPE — shared props for the awwwards-redesign home page variants.
// Delete this folder once a direction wins.
import { Blog } from "@/types/blog";
import { Repository } from "@/types/repository";

export interface HomeVariantProps {
  repos: Repository[];
  reposLoading: boolean;
  posts: Blog[];
}
