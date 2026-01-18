## ● 成果圖
<img width="600" height="680" alt="image" src="https://github.com/user-attachments/assets/d3e355fb-d6cc-40e4-8a05-f31352d5e93d" />

## ● 程式碼：
```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <title>Sticky Footer 範例</title>
    <style>
        /* 核心機制：設定 body 為 Flex 容器 */
        body {
            margin: 0;
            display: flex;          /* 啟用彈性盒子 */
            flex-direction: column; /* 讓子元素垂直排列 */
            min-height: 100vh;      /* 讓 body 最小高度等於整個螢幕 */
            font-family: sans-serif;
        }

        header {
            background-color: #1a237e;
            color: white;
            padding: 20px;
            text-align: center;
        }

        /* 核心機制：讓 main 自動撐開所有剩餘空間 */
        main {
            flex: 1;                /* 這個 1 代表「伸展權重」，它會吃掉所有空白處 */
            padding: 40px;
            background-color: #ffffff;
        }

        footer {
            background-color: #333;
            color: white;
            padding: 20px;
            text-align: center;
        }

        /* 裝飾用樣式 */
        .card {
            border: 2px dashed #ccc;
            padding: 20px;
            border-radius: 8px;
        }
    </style>
</head>
<body>

    <header>
        <h1>這是導覽列 (Header)</h1>
    </header>

    <main>
        <div class="card">
            <h2>主要內容區域 (Main)</h2>
            <p>目前內容很少，但因為設定了 <code>flex: 1</code>，這個區域會自動伸展，把 Footer 推到螢幕最下方。</p>
            <p>試著在這邊增加很多文字，當內容超過螢幕高度時，Footer 會正常地出現在頁面最末端。</p>
        </div>
    </main>

    <footer>
        <p>© 2026 版權所有 - 永遠在底部的頁腳</p>
    </footer>

</body>
</html>
```
## ● 成果圖
<img width="600" height="680" alt="image" src="https://github.com/user-attachments/assets/246507c3-e22e-457d-bb66-0731fc5d0882" />

## ● 程式碼
```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>立法院 - 2025-12-25 聖誕聚會</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <style>
        /* --- 基礎樣式 --- */
        body {
            font-family: "Noto Sans TC", "Arial", sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        /* --- 1. 導覽列樣式 (深藍色底) --- */
        .navbar-static {
            background-color: #1a237e;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* 頂部微細線 */
        }

        .navbar-full {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 40px;
        }

        .logo {
            font-size: 1.5em;
            font-weight: bold;
            color: white;
            display: flex;
            align-items: center;
        }
        .logo-circle {
            background-color: #ffcc00;
            color: #1a237e;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1em;
            margin-right: 8px;
            font-weight: 700;
        }

        .nav-links {
            list-style: none;
            display: flex;
            margin: 0;
            padding: 0;
        }

        .nav-links li {
            margin-left: 30px;
        }

        .nav-links a {
            color: white;
            text-decoration: none;
            font-weight: 500;
            padding: 8px 15px;
            transition: all 0.3s;
        }

        .nav-links a:hover {
            border-bottom: 2px solid #ffcc00;
        }
        .nav-links a.active-dark {
            background-color: #004d99;
            border-radius: 4px;
            color: white !important;
            border-bottom: none; 
        }

        /* --- 2. 活動詳情 Banner 樣式 (新增漸層與分隔線) --- */
        .event-banner {
            /* 使用深藍到更深藍的線性漸層 */
            background: linear-gradient(135deg, #1a237e 0%, #0d1241 100%);
            color: white;
            padding: 80px 20px 60px 20px;
            text-align: center;
            position: relative;
            /* 底部金色裝飾線 */
            border-bottom: 4px solid #ffcc00;
        }

        .event-banner h1 {
            font-size: 3.5em;
            margin: 0;
            letter-spacing: 2px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3); /* 文字陰影增加立體感 */
        }
        
        /* --- 3. 主要內容區域 --- */
        .event-content-area {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 20px;
            text-align: left;
            font-size: 1.1em;
            flex: 1;
        }

        .member-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            margin-top: 30px;
        }

        .member-item {
            width: 100px; 
            text-align: center;
            margin-right: 20px;
            margin-bottom: 30px;
            flex-shrink: 0;
        }

        /* 重點修改：member-item2 的慢慢浮現動畫 */
        .member-item2 {
            width: 100px; 
            text-align: center;
            margin-right: auto;
            margin-left: auto;
            margin-bottom: 30px;
            flex-shrink: 0;
            
            /* 設定動畫屬性 */
            opacity: 0; /* 起始完全透明 */
            animation: slow-fade-in 30s ease-in forwards; /* 30秒慢慢浮現 */
        }

        /* 定義浮現動畫關鍵影格 */
        @keyframes slow-fade-in {
            0% {
                opacity: 0;
                filter: blur(5px); /* 可選：起始增加一點模糊感 */
            }
            100% {
                opacity: 1;
                filter: blur(0);
            }
        }

        .member-name-placeholder {
            font-size: 0.9em;
            color: #666;
            margin-bottom: 5px;
            white-space: nowrap;
        }

        .member-image-wrapper {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            border: 5px solid #fff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            margin: 0 auto 10px auto;
        }

        .member-image-wrapper img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover; 
            background: radial-gradient(circle at center, #ff0000 0%, #1a237e 70%); 
        }
        
        .member-title {
            font-weight: bold;
            font-size: 1.2em;
            color: #111;
        }

        .image-container-final {
            width: 100%; 
            max-width: 600px; 
            height: 350px; 
            margin: 30px auto; 
            border-radius: 12px; 
            overflow: hidden; 
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); 
            display: block;
        }

        .event-image-final {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover; 
        }

        /* --- 4. 頁腳樣式 --- */
        footer {
            text-align: center;
            padding: 30px;
            background-color: #1a237e; 
            color: white;
            font-size: 0.8em;
            border-top: 1px solid rgba(255,255,255,0.1);
        }

        /* ============================================================
           手機版本優化 (Mobile Optimization) 
           ============================================================ */
        @media (max-width: 768px) {
            .navbar-full {
                flex-direction: column;
                padding: 15px 10px;
            }
            .nav-links {
                margin-top: 15px;
                width: 100%;
                justify-content: center;
                border-top: 1px solid rgba(255,255,255,0.1); /* 手機版選單分隔線 */
                padding-top: 10px;
            }
            .nav-links li {
                margin: 0 8px;
            }
            .nav-links a {
                padding: 5px 5px;
                font-size: 0.85em;
            }

            .event-banner {
                padding: 30px 15px;
                border-bottom-width: 3px; /* 手機版分隔線稍細 */
            }
            .event-banner h1 {
                font-size: 1.8em;
            }

            .member-list {
                justify-content: center;
            }
            .member-item {
                margin: 0 10px 20px 10px;
                width: 85px;
            }
            .member-image-wrapper {
                width: 80px;
                height: 80px;
            }
            .member-title {
                font-size: 1em;
            }

            .event-content-area {
                text-align: center;
                padding: 30px 15px;
            }
            .image-container-final {
                height: 250px;
            }
        }
    </style>
</head>
<body>

    <header class="navbar-static">
        <nav class="navbar-full">
            <div class="logo">
                <div class="logo-circle">立</div> 
                立法院 
            </div>
            <ul class="nav-links">
                <li><a href="index.html">首頁</a></li>
                <li><a href="about.html">關於我們</a></li> 
                <li><a href="members.html">成員介紹</a></li> 
                <li><a href="events.html" class="active-dark">活動行程</a></li>
            </ul>
        </nav>
    </header>

    <section class="event-banner">
        <div class="banner-content">
            <h1>模板</h1>
        </div>
    </section>

    <main class="event-content-area">
        
        <div class="event-info">

            <hr style="border: 0; border-top: 1px solid #ddd; margin: 30px 0;">
            
        </div>
        
    </main>

    <footer>
        <p>© 2025 立法院 Legislature. All rights reserved.</p>
    </footer>

</body>
</html>
```
