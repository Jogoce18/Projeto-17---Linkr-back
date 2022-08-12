import getMetadataUrl from "./getMetadataUrl.js";
import verboseLog from "../utils/verboseLog.js";

const joinUrlMetadataCommentsAndLikesWithPostData = async (posts) => {
    try {
        const formattedPosts = await Promise.all(
            posts.map(async (post) => {
               
                const urlMetadata = await getMetadataUrl(post.url);
               
                if (urlMetadata === -1)
                    throw new Error("Error in getMetadataUrl");
                return {
                    ...post,
                    urlMetadata,
                };
            }),
        );
        return formattedPosts;
    } catch (err) {
        verboseLog(err);
        return -1;
    }
};

export default joinUrlMetadataCommentsAndLikesWithPostData;