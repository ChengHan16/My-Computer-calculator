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
    <main class="event-content-area" style="position: relative;">
        <div class="profile-header" style="position: relative;">
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
```HTML
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>立法院 - 成員介紹：丁俊齊</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <style>
        /* --- 基礎樣式與防溢出 --- */
        html { scroll-behavior: smooth; }
        html, body { max-width: 100%; overflow-x: hidden; margin: 0; padding: 0; }

        body {
            font-family: "Noto Sans TC", "Arial", sans-serif;
            background-color: #f4f4f4;
            color: #333;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        /* --- 1. 導覽列樣式 --- */
        .navbar-static {
            background-color: #1a237e;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            width: 100%;
        }

        .navbar-full {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            max-width: 1100px;
            margin: 0 auto;
        }

        .logo {
            font-size: 1.5em;
            font-weight: bold;
            color: white;
            display: flex;
            align-items: center;
            text-decoration: none;
        }

        .logo-circle {
            background-color: #ffcc00;
            color: #1a237e;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
            font-weight: 700;
        }

        .nav-links {
            list-style: none;
            display: flex;
            margin: 0;
            padding: 0;
        }

        .nav-links li { margin-left: 30px; }
        .nav-links a { color: white; text-decoration: none; font-weight: 500; padding: 8px 15px; transition: 0.3s; }
        .nav-links a:hover { border-bottom: 2px solid #ffcc00; }
        .nav-links a.active-dark { background-color: #004d99; border-radius: 4px; color: white !important; }

        /* --- 2. Banner 樣式 (固定高度) --- */
        .event-banner {
            background: linear-gradient(135deg, #1a237e 0%, #0d1241 100%);
            color: white;
            padding: 60px 20px;
            text-align: center;
            border-bottom: 4px solid #ffcc00;
            height: 240px; 
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            overflow: hidden;
        }

        .event-banner h1 { font-size: 3.5em; margin: 0; letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }

        .banner-info-wrap {
            display: flex;
            flex-direction: column; 
            align-items: center;
            gap: 10px;
            margin-top: 15px;
            font-size: 1.1em;
            color: #ffcc00;
        }

        /* --- 3. 主要內容區域 --- */
        .event-content-area {
            max-width: 1100px;
            margin: 0 auto;
            padding: 40px 20px;
            flex: 1;
        }

        .profile-header {
            display: flex;
            align-items: center;
            gap: 40px;
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            margin-bottom: 40px;
        }

        .photo-section { flex-shrink: 0; text-align: center; }
        .avatar-img {
            width: 200px; height: 200px; border-radius: 12px;
            border: 4px solid #f0f0f0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            object-fit: cover;
        }


        /*按鈕設定位置*/
        .ig-btn {
            text-decoration: none;
            background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
            color: white;
            padding: 8px 18px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 15px rgba(188, 24, 136, 0.3);
            transition: all 0.3s ease;
        }

        .ig-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(188, 24, 136, 0.5);
            color: white;
        }

        .fb-link-card {
            position: absolute;
            top: 85px; /* 維持原位 */
            right: 35px;
            z-index: 5;
        }

        .fb-btn {
            text-decoration: none;
            /* 修改為 Facebook 官方藍色 */
            background: #1877F2; 
            color: white;
            padding: 8px 18px;
            border-radius: 25px; /* 維持圓角膠囊狀 */
            font-size: 14px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
            /* 修改陰影顏色為 Facebook 藍的擴散感 */
            box-shadow: 0 4px 15px rgba(24, 119, 242, 0.3);
            transition: all 0.3s ease;
        }

        .fb-btn:hover {
            /* 滑過時稍微加深藍色 */
            background: #166fe5;
            transform: translateY(-3px);
            /* 加強 Facebook 藍的發光效果 */
            box-shadow: 0 6px 20px rgba(24, 119, 242, 0.5);
            color: white;
        }

        .fb-btn i {
            font-size: 16px; /* 控制 f 圖標的大小 */
            margin-right: 5px; /* 與文字 Facebook 之間的距離 */
            display: inline-block;
            vertical-align: middle;
        }
        /*按鈕設定位置 end*/

        .lang-dropdown {
            position: relative;
            display: inline-block;
        }

        /* 延續網頁風格的黑金按鈕 */
        .btn-gold-outline {
            background: rgba(26, 35, 126, 0.05);
            color: #1a237e;
            border: 2.5px solid #ffd000;
            padding: 8px 18px;
            font-size: 14px;
            font-weight: 600;
            border-radius: 10px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 2px 8px rgba(255, 204, 0, 0.1);
        }

        .btn-gold-outline:hover {
            background: #ffcc00;
            color: #1a237e;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 204, 0, 0.2);
        }

        .dropdown-arrow {
            font-size: 10px;
            transition: transform 0.3s ease;
        }

        /* 下拉選單主體：黑金半透明風格 */
        .dropdown-content {
            display: none;
            position: absolute;
            top: calc(100% + 10px); /* 距離按鈕下方 10px */
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            min-width: 140px;
            border-radius: 12px;
            border: 1px solid #ffcc00;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            backdrop-filter: blur(10px);
            overflow: hidden;
            z-index: 1001;
            /* 動畫前置準備 */
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease;
        }

        /* 選項顯示狀態 */
        .dropdown-content.show {
            display: block;
            opacity: 1;
            transform: translateY(0);
        }

        /* 選單內的項目 */
        .dropdown-item {
            color: #1a237e;
            padding: 12px 20px;
            text-decoration: none;
            display: block;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s ease;
            text-align: center;
        }

        .dropdown-item:not(:last-child) {
            border-bottom: 1px solid rgba(255, 204, 0, 0.1);
        }

        .dropdown-item:hover {
            background: #1a237e;
            color: #ffcc00;
        }

        /* 手機版適配 */
        @media (max-width: 768px) {
            .lang-switch-container {
                justify-content: center;
                padding: 10px;
            }
            .dropdown-content {
                right: 50%;
                transform: translateX(50%) translateY(10px);
            }
            .dropdown-content.show {
                transform: translateX(50%) translateY(0);
            }
        }

        /* --- 5. 其他元件 --- */
        .back-to-top {
            position: fixed; bottom: 30px; right: 30px;
            width: 50px; height: 50px; background-color: #1a237e;
            color: white; border-radius: 50%; display: flex;
            justify-content: center; align-items: center; z-index: 1000;
            border: 2px solid #ffcc00; transition: 0.3s;
            text-decoration: none;
        }

        footer { text-align: center; padding: 25px; background-color: #1a237e; color: white; font-size: 0.9em; }

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

        /* =============================================
           響應式優化 (RWD)
           ============================================= */
        @media (max-width: 768px) {
            .navbar-full { flex-direction: column; padding: 10px 5px; }
            .nav-links { 
                margin-top: 10px; width: 100%; justify-content: center; display: flex;
                flex-wrap: nowrap; padding: 10px 0 5px 0; border-top: 1px solid rgba(255,255,255,0.1);
            }
            .nav-links li { margin: 0 4px; flex-shrink: 1; }
            .nav-links a { padding: 5px 8px; font-size: clamp(12px, 3.2vw, 14px); white-space: nowrap; }

            .profile-header { flex-direction: column; text-align: center; padding: 30px 20px; }
            .info-brief h1 { font-size: 32px; }
            .blue-line { margin: 15px auto; }
            
            .member-grid { grid-template-columns: 1fr; gap: 20px; }

            /* 1. 調整導覽列外殼，縮小內距 */
            .navbar-full { 
                flex-direction: column; 
                padding: 10px 5px; 
            }

            /* 2. 調整導覽連結容器 */
            .event-card-simple {
                padding: 20px 15px;      /* 縮小手機版內距 */
                width: 100%;             /* 寬度跟隨父層的 350px */
                box-sizing: border-box;  /* 關鍵：確保 padding 不會撐破 350px */
            }

            /* 調整日期圓圈，讓 350px 內的空間分配合理 */
            .event-date-circle {
                width: 55px;
                height: 55px;
                margin-right: 15px;
            }

            /* 1. 調整導覽列外殼，縮小內距 */
            .navbar-full { 
                flex-direction: column; 
                padding: 10px 5px; 
            }

            /* 2. 調整導覽連結容器 */
            .nav-links { 
                margin-top: 10px; 
                width: 100%; 
                justify-content: center; /* 置中 */
                display: flex;
                flex-wrap: nowrap;      /* 關鍵：強制絕對不換行 */
                padding: 12px 0 5px 0;
                border-top: 1px solid rgba(255,255,255,0.1);
            }

            /* 3. 調整清單項目 */
            .nav-links li { 
                margin: 0 4px;          /* 縮小項目間的間距 */
                flex-shrink: 1;         /* 允許項目在必要時縮小 */
            }

            /* 4. 調整文字大小與行為 */
            .nav-links a { 
                padding: 5px 8px;       /* 縮小按鈕內距 */
                
                /* 使用 clamp 讓字體在 12px 到 14px 之間隨螢幕自動縮放 */
                font-size: clamp(12px, 3.2vw, 14px); 
                
                white-space: nowrap;    /* 關鍵：文字絕對不換行 */
                letter-spacing: -0.5px; /* 稍微縮小字距，節省空間 */
            }

            .ig-link-card {
                /* 1. 將絕對定位取消，按鈕會回到 HTML 結構的最下方 */
                position: static !important;
                /* 2. 設置適當的上間距 (文字與按鈕之間) */
                margin-top: -30px !important;                
                /* 3. 設置下間距 (按鈕與卡片底部之間) */
                margin-bottom: 5px !important;          
                /* 4. 水平置中顯示 */
                width: 100%;
                display: flex;
                justify-content: center;
            }

            .lang-switch-container{
                /* 1. 將絕對定位取消，按鈕會回到 HTML 結構的最下方 */
                position: static !important;
                /* 2. 設置適當的上間距 (文字與按鈕之間) */
                margin-top: -30px !important;                
                /* 3. 設置下間距 (按鈕與卡片底部之間) */
                margin-bottom: 5px !important;          
                /* 4. 水平置中顯示 */
                width: 100%;
                display: flex;
                justify-content: center;
            }
        }
        
    </style>
</head>
<body>

    <header class="navbar-static">
        <nav class="navbar-full">
            <div class="logo"><div class="logo-circle">立</div> 立法院 Legislature</div>
            <ul class="nav-links">
                <li><a href="index.html">首頁</a></li>
                <li><a href="about.html">關於我們</a></li> 
                <li><a href="members.html"class="active-dark">成員介紹</a></li> 
                <li><a href="events.html">活動行程</a></li>
                <li><a href="Other.html">其他</a></li>
            </ul>
        </nav>
    </header>

    <section class="event-banner">
        <h1>成員簡介</h1>
        <div class="banner-info-wrap">
            <span>國立東華大學 電資訊工程院</span>
            <span>人工智慧與資訊安全前瞻研究組</span>
        </div>
    </section>

    <main class="event-content-area" style="position: relative;">
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
                        <a href="info-Ting-chun_chi - zh-TW.html" class="dropdown-item">繁體中文</a>
                        <a href="info-Ting-chun_chi - JP.html" class="dropdown-item">日本語</a>
                        <a href="info-Ting-chun_chi - en.html" class="dropdown-item">English</a>
                    </div>
                </div>

                <div class="social-link-item">
                    <a href="https://www.instagram.com/ssindychen1/" target="_blank" class="ig-btn">
                        <i class="fa-brands fa-instagram"></i> Instagram
                    </a>
                </div>

                <div class="social-link-item">
                    <a href="https://www.facebook.com/ding.jun.qi.991619?locale=zh_TW" target="_blank" class="fb-btn">
                        <i class="fa-brands fa-facebook-f"></i> Facebook
                    </a>
                </div>
            </div>
        </div>

    <a href="#" class="back-to-top"><i class="fa-solid fa-chevron-up"></i></a>

    <footer>
        <p>© 2026 立法院 Legislature - 數位資訊發展處 版權所有</p>
    </footer>

</body>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const langBtn = document.getElementById('langBtn');
            const langMenu = document.getElementById('langMenu');
            const arrow = langBtn.querySelector('.dropdown-arrow');

            langBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const isOpen = langMenu.classList.contains('show');
                
                // 切換選單
                langMenu.classList.toggle('show');
                
                // 箭頭旋轉動畫
                arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
            });

            // 點擊空白處關閉
            document.addEventListener('click', function(e) {
                if (!langBtn.contains(e.target)) {
                    langMenu.classList.remove('show');
                    arrow.style.transform = 'rotate(0deg)';
                }
            });
        });
        </script>
</html>
```
