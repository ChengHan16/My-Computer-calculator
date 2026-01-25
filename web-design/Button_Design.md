```css
/* 右上角功能容器 */
.header-actions {
    position: absolute; /* 相對於 profile-header 定位 */
    top: 20px;          /* 距離頂部 20px */
    right: 20px;        /* 距離右側 20px */
    display: flex;
    flex-direction: column; /* 讓按鈕上下排列 */
    align-items: flex-end;  /* 讓按鈕靠右對齊 */
    gap: 12px;          /* 設定按鈕之間的間距，防止重疊 */
    z-index: 10;        /* 確保選單彈出時不會被其他內容遮擋 */
}

/* 確保按鈕本身不會因為容器縮放而變形 */
.lang-dropdown, .social-link-item {
    width: auto;
}

/* 如果是手機版，建議取消絕對定位以防重疊 */
@media (max-width: 768px) {
    .header-actions {
        position: static;   /* 回復普通流向 */
        margin-top: 20px;
        align-items: center; /* 居中對齊 */
        width: 100%;
    }
}
```
```html
<div class="profile-header" style="position: relative;">
    <div class="photo-section">
        <img src="https://github.com/ChengHan16/Legislature-Family-Website/blob/main/image/Ding_Junqi.png?raw=true" alt="丁俊齊照片" class="avatar-img">
    </div>
    <div class="info-brief">
        <span class="nickname">TING-CHUN-CHI</span>
        <h1>丁俊齊</h1>
        <div class="blue-line"></div>
        <div style="font-size: 1.1em; color: #444; line-height: 2;">
            <strong>學術背景：</strong>國立東華大學 電資訊工程院<br>
            <strong>技術核心：</strong>網路科學(Network Science)、資訊安全、電腦機械<br>
            <strong>核心專長：</strong>Deep Learning / Edge Computing / High-Performance Computing
        </div>
    </div>

    <div class="header-actions">
        <div class="lang-dropdown">
            <button class="lang-btn btn-gold-outline" id="langBtn">
                <i class="fa-solid fa-language"></i> Language
                <i class="fa-solid fa-chevron-down dropdown-arrow"></i>
            </button>
            <div class="dropdown-content" id="langMenu">
                <a href="info-zh-TW.html" class="dropdown-item">繁體中文</a>
                <a href="info-JP.html" class="dropdown-item">日本語</a>
                <a href="info-en.html" class="dropdown-item">English</a>
            </div>
        </div>

        <div class="social-link-item">
            <a href="https://www.instagram.com/ssindychen1/" target="_blank" class="ig-btn">
                <i class="fa-brands fa-instagram"></i> Instagram
            </a>
        </div>
    </div>
</div>
```
