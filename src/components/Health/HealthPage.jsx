import React, {useEffect, useState} from 'react';
import Papa from 'papaparse';
import './HealthPage.css';

const HealthPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
        fetch('/newsData/health_news.csv')
            .then((response) => response.text())
            .then((csvText) => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        setArticles(results.data);
                        setLoading(false);
                    },
                    error: (error) => {
                        console.error('Lỗi đọc CSV:', error);
                        setLoading(false);
                    }
                });
            })
            .catch((err) => console.error("Không tìm thấy file CSV:", err));
    }, []);

    const handleReadMore = (article) => {
        setSelectedArticle(article);
        window.scrollTo(0, 0);
    };

    const handleBack = () => {
        setSelectedArticle(null);
    };

    if (loading) return <div className="loading">Đang tải dữ liệu báo chí...</div>;

    // Chi tiết bào báo
    if (selectedArticle) {
        const listImages = selectedArticle['Danh sách ảnh']
            ? selectedArticle['Danh sách ảnh'].split('\n').filter(img => img.trim() !== '')
            : [];
        return (
            <div className="health-page article-detail-view">
                <button className="back-btn" onClick={handleBack}>
                    ← Quay lại danh sách
                </button>

                <div className="article-meta">
          <span className="health-section-label">
            {selectedArticle['Chuyên mục lớn']} &gt; {selectedArticle['Chuyên mục con']}
          </span>
                </div>

                <h1 className="detail-title">{selectedArticle['Tiêu đề']}</h1>

                <div className="detail-sapo">
                    <strong>{selectedArticle['Tóm tắt']}</strong>
                </div>

                {/*thumbnail*/}
                {selectedArticle['Thumbnail'] && (
                    <div className="detail-hero-container">
                        <img
                            src={selectedArticle['Thumbnail']}
                            alt={selectedArticle['Tiêu đề']}
                            className="detail-hero-img"
                            onError={(e) => e.target.style.display = 'none'} // Ẩn nếu lỗi
                        />
                    </div>
                )}

                <div className="detail-content">
                    {selectedArticle['Nội dung'] && selectedArticle['Nội dung'].split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>

                {/*ảnh*/}
                {listImages.length > 0 && (
                    <div className="detail-gallery">
                        <h3>Hình ảnh trong bài viết</h3>
                        <div className="gallery-grid">
                            {listImages.map((imgUrl, idx) => (
                                // Ẩn ảnh nếu trùng với thumbnail để đỡ lặp (tuỳ chọn)
                                imgUrl.trim() !== selectedArticle['Thumbnail']?.trim() && (
                                    <div key={idx} className="gallery-item">
                                        <img src={imgUrl} alt={`Ảnh chi tiết ${idx + 1}`} loading="lazy"/>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                )}

                <div className="original-link">
                    <a href={selectedArticle['URL']} target="_blank" rel="noreferrer">
                        Xem bài gốc trên Thanh Niên
                    </a>
                </div>
            </div>
        );
    }

    // list tiêu đề
    return (
        <div className="health-page">
            <header className="health-header">
                <span className="health-section-label">DỮ LIỆU CRAWL</span>
                <h1 className="health-title">Tin Tức Sức Khỏe</h1>
            </header>

            <main className="health-main-layout">
                <div className="health-content-col">
                    {articles.map((item, index) => (
                        <article key={index} className="health-card">

                            {/* thumbnail */}
                            {item['Thumbnail'] && (
                                <div className="health-card-thumb" onClick={() => handleReadMore(item)}>
                                    <img
                                        src={item['Thumbnail']}
                                        alt={item['Tiêu đề']}
                                        loading="lazy"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                </div>
                            )}

                            <div className="health-card-content">
                <span className="health-card-category">
                  {item['Chuyên mục lớn']} / {item['Chuyên mục con']}
                </span>

                                <h3 className="health-card-title" onClick={() => handleReadMore(item)}>
                                    {item['Tiêu đề']}
                                </h3>

                                <p className="health-card-desc">
                                    {item['Tóm tắt'] ? item['Tóm tắt'].substring(0, 120) + '...' : ''}
                                </p>

                                <button
                                    className="read-more-btn"
                                    onClick={() => handleReadMore(item)}
                                >
                                    Đọc tiếp
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                {/* SIDEBAR */}
                <aside className="health-sidebar">
                    <section className="health-sidebar-block">
                        <h2 className="health-section-heading">Bài mới nhất</h2>
                        <ul className="health-sidebar-list">
                            {articles.slice(0, 5).map((item, idx) => (
                                <li key={idx} className="health-sidebar-item">
                  <span
                      className="health-sidebar-link"
                      onClick={() => handleReadMore(item)}
                      style={{cursor: 'pointer'}}
                  >
                    {item['Tiêu đề']}
                  </span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </aside>
            </main>
        </div>
    );
};

export default HealthPage;