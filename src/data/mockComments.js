/**
 * Mock comments
 */

export const mockComments = [
    {
        id: 1,
        author: 'Nguyễn Văn A',
        time: '1 giờ trước',
        content: 'hú hú',
        likes: 15,
        replies: []
    },
    {
        id: 2,
        author: 'Trần Thị B',
        time: '45 phút trước',
        content: 'khẹc khẹc',
        likes: 5,
        replies: []
    },
    {
        id: 3,
        author: 'Lê Hoàng C',
        time: '2 giờ trước',
        content: 'hay này',
        likes: 8,
        replies: []
    },
    {
        id: 4,
        author: 'Phạm Thu D',
        time: '3 giờ trước',
        content: 'hbchcs',
        likes: 12,
        replies: []
    }
];

/**
 * Helper function để lấy comments cho bài viết
 * @param {string|number} articleId - ID của bài viết
 * @returns {Array} Danh sách comments
 */
export const getCommentsByArticleId = (articleId) => {
    // đang trả về mock data
    return mockComments;
};

/**
 * Helper function để thêm comment mới
 * @param {string} author - Tên tác giả
 * @param {string} content - Nội dung comment
 * @param {string|number} articleId - ID bài viết
 * @returns {Object} Comment mới
 */
export const createComment = (author, content, articleId) => {
    return {
        id: mockComments.length + 1,
        author: author,
        time: 'Vừa xong',
        content: content,
        likes: 0,
        replies: [],
        articleId: articleId
    };
};

