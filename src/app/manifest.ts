import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LeetCode Company-wise Questions",
    short_name: "LeetCode Practice",
    description:
      "Explore and filter LeetCode problems categorized by companies like Google, Microsoft, Amazon, and more.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["education", "productivity", "developer"],
    orientation: "portrait",
  };
}
