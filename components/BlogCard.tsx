import { BlogPost } from "@/types";
import {getBlogExcerpt} from "@/lib/blogFunctions";
import {formatDate} from "@/lib/utils";
import cards from '@/styles/cards.module.css';

interface Props {
    post: BlogPost;
    featured?: boolean;
}

export default function BlogCard({ post, featured = false }: Props) {
    return (
        <div className={`${cards.blogCardContainer} ${featured ? cards.featuredCard : ''}`}>
            {
                featured ?
                    <div
                        className={cards.cardImgBgFeatured}
                        style={{ backgroundImage: `url(${post.cover_image})` }} >
                    </div>


            : <div
                    className={cards.cardImgBg}
                    style={{ backgroundImage: `url(${post.cover_image})` }}
                />
            }
            <div className={cards.blogCardContent}>
                <div className={cards.blogMetadata}>
                    <span className={cards.taxonomy}>{post.category.name}</span>
                    <span className={cards.date}>{formatDate(post.published_at)}</span>
                </div>
                <div className={cards.blogCardText}>
                    <h3 className={cards.title}>{post.title}</h3>
                    <p>{getBlogExcerpt(post.content, 150)}</p>
                </div>
            </div>

        </div>
    );
}