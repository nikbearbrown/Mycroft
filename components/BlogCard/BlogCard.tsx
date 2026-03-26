import Image from "next/image"
import Link from "next/link"
import type { BlogPost } from "@/types"

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-col h-full">
      <div className="relative h-[200px] w-full rounded-lg overflow-hidden mb-4">
        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
      </div>
      <div className="mb-2 text-sm font-medium text-muted-foreground">{post.category}</div>
      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
      <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>
      <Link href={`/blog/${post.slug}`} className="text-sm font-medium mt-auto">
        Learn More
      </Link>
    </div>
  )
}
