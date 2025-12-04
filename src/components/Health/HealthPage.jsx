import React, { useEffect, useState } from 'react';
import './HealthPage.css';

const HEALTH_URL = 'https://thanhnien.vn/suc-khoe.htm';

// Proxy CORS chỉ dùng cho môi trường học tập/dev.
const DEV_PROXY = 'https://api.allorigins.win/raw?url=';

// Lưu ý: Việc sử dụng nội dung từ Báo Thanh Niên cần tuân thủ bản quyền.
const normalizeUrl = (href) => {
  if (!href) return HEALTH_URL;
  try {
    return new URL(href, HEALTH_URL).href;
  } catch {
    return HEALTH_URL;
  }
};

const extractArticles = (doc) => {
  const candidates = [];

  const possibleSelectors = [
    'article.story',
    '.story', // generic
    '.cate__item', // chuyên mục
  ];

  possibleSelectors.forEach((sel) => {
    doc.querySelectorAll(sel).forEach((el) => {
      if (candidates.includes(el)) return;
      candidates.push(el);
    });
  });

  if (candidates.length === 0) {
    const main = doc.querySelector('main') || doc.body;
    const links = Array.from(main.querySelectorAll('a'))
      .filter((a) => a.textContent && a.textContent.trim().length > 30);
    return links.slice(0, 20).map((a) => ({
      title: a.textContent.trim(),
      link: normalizeUrl(a.getAttribute('href')),
      description: '',
      image: '',
      section: 'Tin mới',
    }));
  }

  const articles = candidates.map((el) => {
    const titleLink =
      el.querySelector('a[title]') ||
      el.querySelector('h2 a, h3 a, h4 a') ||
      el.querySelector('a');

    const title = titleLink ? titleLink.textContent.trim() : el.textContent.trim().slice(0, 120);
    const link = titleLink ? normalizeUrl(titleLink.getAttribute('href')) : HEALTH_URL;

    const descEl =
      el.querySelector('.story__summary') ||
      el.querySelector('.cate__summary') ||
      el.querySelector('p');

    const description = descEl ? descEl.textContent.trim() : '';

    const imgEl =
      el.querySelector('img') ||
      el.querySelector('figure img');

    const image = imgEl ? imgEl.getAttribute('src') || imgEl.getAttribute('data-src') || '' : '';

    // Thử đoán chuyên mục con
    const sectionEl =
      el.closest('[data-zone-name]') ||
      el.closest('.zone') ||
      el.closest('.section');

    const sectionName =
      (sectionEl && (sectionEl.getAttribute('data-zone-name') || sectionEl.getAttribute('data-section-name'))) ||
      '';

    return {
      title,
      link,
      description,
      image: image ? normalizeUrl(image) : '',
      section: sectionName || 'Tin nổi bật',
    };
  });

  // Lọc trùng tiêu đề
  const seen = new Set();
  const unique = [];
  for (const a of articles) {
    const key = a.title.toLowerCase();
    if (seen.has(key) || !a.title) continue;
    seen.add(key);
    unique.push(a);
  }

  return unique.slice(0, 24);
};

const HealthPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError('');
      try {
        // proxy để tránh CORS trong môi trường dev.
        const targetUrl = encodeURIComponent(HEALTH_URL);
        const res = await fetch(`${DEV_PROXY}${targetUrl}`, {
          method: 'GET',
        });

        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const parsed = extractArticles(doc);
        setArticles(parsed);
      } catch (e) {
        console.error(e);
        setError(
          'Không thể tải tin trực tiếp từ thanhnien.vn (có thể do CORS hoặc giới hạn truy cập). ' +
            'Trong môi trường thực tế, hãy sử dụng một backend/proxy được cho phép và tuân thủ bản quyền.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const hero = articles[0];
  const secondary = articles.slice(1, 4);
  const list = articles.slice(4);

  return (
    <div className="health-page">
      <header className="health-header">
        <span className="health-section-label">Chuyên mục</span>
        <h1 className="health-title">Sức khỏe</h1>
        <p className="health-subtitle">
          Cập nhật tin tức sức khỏe mới nhất: dinh dưỡng, bệnh lý, lối sống lành mạnh, y tế thông minh...
        </p>
      </header>

      {loading && (
        <div className="health-status health-status-loading">
          Đang tải tin tức sức khỏe...
        </div>
      )}

      {error && (
        <div className="health-status health-status-error">
          {error}
        </div>
      )}

      {!loading && !error && articles.length > 0 && (
        <main className="health-layout">
          <section className="health-main-column">
            {hero && (
              <article className="health-hero-card">
                {hero.image && (
                  <a href={hero.link} target="_blank" rel="noreferrer" className="health-hero-image-wrapper">
                    <img src={hero.image} alt={hero.title} className="health-hero-image" />
                  </a>
                )}
                <div className="health-hero-content">
                  <a
                    href={hero.link}
                    target="_blank"
                    rel="noreferrer"
                    className="health-hero-title"
                  >
                    {hero.title}
                  </a>
                  {hero.description && (
                    <p className="health-hero-desc">{hero.description}</p>
                  )}
                  <div className="health-hero-meta">
                    <span className="health-tag">Tin nổi bật</span>
                    <span className="health-source">Nguồn: Thanh Niên</span>
                  </div>
                </div>
              </article>
            )}

            {secondary.length > 0 && (
              <div className="health-secondary-grid">
                {secondary.map((item) => (
                  <article key={item.link} className="health-secondary-card">
                    {item.image && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="health-secondary-image-wrapper"
                      >
                        <img src={item.image} alt={item.title} className="health-secondary-image" />
                      </a>
                    )}
                    <div className="health-secondary-content">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="health-secondary-title"
                      >
                        {item.title}
                      </a>
                      {item.description && (
                        <p className="health-secondary-desc">{item.description}</p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}

            {list.length > 0 && (
              <section className="health-list-section">
                <h2 className="health-section-heading">Tin mới</h2>
                <div className="health-list">
                  {list.map((item) => (
                    <a
                      key={item.link}
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="health-list-item"
                    >
                      <div className="health-list-text">
                        <h3 className="health-list-title">{item.title}</h3>
                        {item.description && (
                          <p className="health-list-desc">{item.description}</p>
                        )}
                        <div className="health-list-meta">
                          <span className="health-source">Thanh Niên</span>
                          {item.section && <span className="health-dot">•</span>}
                          {item.section && (
                            <span className="health-section-chip">{item.section}</span>
                          )}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </section>

          <aside className="health-sidebar">
            <section className="health-sidebar-block">
              <h2 className="health-section-heading">Khỏe đẹp mỗi ngày</h2>
              <ul className="health-sidebar-list">
                {articles.slice(0, 6).map((item) => (
                  <li key={item.link} className="health-sidebar-item">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="health-sidebar-link"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="health-sidebar-block">
              <h2 className="health-section-heading">Chủ đề nổi bật</h2>
              <div className="health-tags">
                <button type="button" className="health-tag-btn">Tiểu đường</button>
                <button type="button" className="health-tag-btn">Huyết áp</button>
                <button type="button" className="health-tag-btn">Giảm cân</button>
                <button type="button" className="health-tag-btn">Dinh dưỡng</button>
                <button type="button" className="health-tag-btn">Thận - tiết niệu</button>
                <button type="button" className="health-tag-btn">Tim mạch</button>
              </div>
            </section>
          </aside>
        </main>
      )}
    </div>
  );
};

export default HealthPage;


