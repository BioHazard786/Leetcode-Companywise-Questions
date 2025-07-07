import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LeetCode Company-wise Questions",
    short_name: "LeetCode Practice",
    description:
      "Explore and filter LeetCode problems categorized by companies like Google, Microsoft, Amazon, and more.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/favicon-light.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon-light.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon-dark.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon-dark.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    prefer_related_applications: false,
    categories: ["education", "productivity", "developer"],
    orientation: "any",
    lang: "en",
    scope: "/",
  };
}
