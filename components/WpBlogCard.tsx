import type {PostCardFieldsFragment} from "@/wordpress/gql/graphql";
import cards from '@/styles/cards.module.css';
import buttons from '@/styles/buttons.module.css';
import {getBlogExcerpt} from "@/lib/blogFunctions";
import { useRouter } from 'next/navigation';

interface PostCardProps {
    post: PostCardFieldsFragment;
    featured?: boolean
}

export default function WpBlogCard({post, featured = false} :PostCardProps){
    const router = useRouter();
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
                    <h3 className={cards.title}>{post.title}</h3>
                    <p>
                        {getBlogExcerpt(post.excerpt, 100)}
                    </p>
                </div>
                <button className={buttons.primary}
                        onClick={() => router.push(`/blog/${post.slug}`)}>
                    Read More
                </button>
            </div>
        </div>
    )
}