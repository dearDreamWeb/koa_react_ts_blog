import request from "../requrest";

// 掘金热门文章
export async function goldArticles(options: any) {
    const data = { ...options };
    return request("/resources/goldArticles", {
        method: "get",
        data,
    });
}

// github热门文章
export async function githubArticles(options: any) {
    const data = { ...options };
    return request("/resources/githubArticles", {
        method: "get",
        data,
    });
}