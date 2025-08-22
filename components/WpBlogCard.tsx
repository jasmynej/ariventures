import type {PostCardFieldsFragment} from "@/wordpress/gql/graphql";
import cards from '@/styles/cards.module.css';
import blogs from '@/styles/blog.module.css'
import buttons from '@/styles/buttons.module.css';
import {getBlogExcerpt} from "@/lib/blogFunctions";
import { useRouter } from 'next/navigation';
import {formatDate} from "@/lib/utils";

interface PostCardProps {
    post: PostCardFieldsFragment;
    featured?: boolean
}

export default function WpBlogCard({post, featured = false} :PostCardProps){
    const router = useRouter();
    const primaryCategory = post.categories?.nodes?.[0]?.name ?? 'Uncategorized';
    return (
        <div className={`${cards.blogCardContainer} ${featured ? cards.featuredCard : ''}`}>
            <div className={cards.blogCardContent}>
                {
                    featured ?
                        <div
                            className={cards.cardImgBgFeatured}
                            style={{ backgroundImage: `url(${post.featuredImage?.node.sourceUrl})` }} >
                        </div>


                        : <div
                            className={cards.cardImgBg}
                            style={{ backgroundImage: `url(${post.featuredImage?.node.sourceUrl})` }}
                        />
                }
                <div className={cards.blogCardText}>
                    <div className={cards.metadata}>
                        <p className={blogs.category}>{primaryCategory}</p>
                        <p className={blogs.date}>{post.date ? formatDate(post.date) : ''}</p>
                    </div>
                    <h3 className={cards.title}>{post.title}</h3>
                    <p>
                        {getBlogExcerpt(post.excerpt, 150)}
                    </p>
                    <div onClick={() => router.push(`/blog/${post.slug}`)} className={cards.ctaText}>
                        <p>Read More <i className="fi fi-tr-arrow-small-right"></i></p>
                    </div>
                </div>

            </div>
        </div>
    )
}