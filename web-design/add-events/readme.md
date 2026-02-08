```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>私人管理頁面 - 立法院系統整合</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="./css/authenticated.css">
    <style>
        /* --- 頁面寬度與容器控制 --- */
        .event-content-area, .upload-container {
            max-width: 1100px !important;
            margin: 0 auto !important;
            width: 100%;
        }

        /* --- 標題重新設計 --- */
.section-title {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    
    max-width: 1100px !important;
    margin: 60px auto 35px;
    width: 100%;
    
    color: var(--ly-blue);
    font-size: 2em;
    font-weight: 900;
    letter-spacing: 6px;
    
    /* 標題背景微調：增加行政層次感 */
    background: linear-gradient(to right, transparent, rgba(0, 49, 83, 0.02), transparent);
    padding: 20px 0;
    position: relative;
}

/* 標題下方的漸層裝飾線 */
.section-title::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%; /* 線條寬度 */
    height: 4px; /* 線條厚度 */
    border-radius: 2px;
    
    /* 使用您指定的色彩進行漸層設計：從深藍到透明 */
    background: linear-gradient(to right, 
        var(--ly-blue) 0%, 
        var(--ly-blue-trans) 50%, 
        transparent 100%
    );
}

.section-title i {
    margin-right: 20px;
    color: var(--ly-blue);
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}
        #event-form-section {
            background: white;
            padding: 40px;
            padding-bottom: 60px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            border-top: 5px solid var(--ly-gold);
            max-width: 1100px !important;
            margin: 0 auto !important;
            width: 100%;
            box-sizing: border-box;
        }

        .btn-confirm {
            border: none;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .btn-confirm:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }

        /* --- 專業小尺寸按鈕 --- */
.btn-action-small {
    padding: 6px 14px;
    font-size: 0.85em;
    border-radius: 15px;
    border: 1px solid transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.3s ease;
    font-weight: 500;
}

/* 編輯按鈕：穩重的深藍風格 */
.btn-edit {
    background: white;
    color: var(--ly-blue);
    border-color: var(--ly-blue);
}
.btn-edit:hover {
    background: var(--ly-blue-trans);
    color: white;
}

/* 刪除按鈕：謹慎的灰紅風格 */
.btn-delete {
    background: white;
    color: #b33a3a;
    border-color: #e0e0e0;
}
.btn-delete:hover {
    background: #b33a3a;
    color: white;
    border-color: #b33a3a;
}
/* --- 專業極小化並排按鈕 --- */
.card-actions {
    margin-left: auto;
    display: flex;
    flex-direction: column; /* 上下並排 */
    gap: 4px;
}

.btn-action-small {
    padding: 3px 8px; /* 縮小按鈕 */
    font-size: 0.75em; /* 縮小字體 */
    border-radius: 4px;
    border: 1px solid transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    transition: all 0.2s ease;
    white-space: nowrap; /* 文字不換行 */
    width: 100%; /* 確保上下按鈕等寬 */
}

.btn-edit {
    background: #f0f4f8;
    color: var(--ly-blue);
    border-color: var(--ly-blue);
}

.btn-delete {
    background: #fffafa;
    color: #b33a3a;
    border-color: #ffcccc;
}
/* 活動展開詳情面板 */
.event-detail-panel {
    display: none; /* 預設隱藏 */
    background: #ffffff;
    border-radius: 15px;
    padding: 30px;
    margin-top: 15px;
    box-shadow: inset 0 2px 10px rgba(0,0,0,0.05);
    border-left: 5px solid var(--ly-gold);
    width: 100%;
    box-sizing: border-box;
}

/* 詳情內的欄位樣式 */
.detail-row { margin-bottom: 20px; }
.detail-label { font-weight: bold; color: var(--ly-blue); display: block; margin-bottom: 8px; font-size: 1.1em; }
.detail-content { color: #444; line-height: 1.6; }

/* 展開後的成員頭像清單 */
.detail-member-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 10px;
}
.member-avatar-box {
    text-align: center;
    width: 80px;
}
.member-avatar-box img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid #eee;
    object-fit: cover;
}
.member-avatar-box span {
    display: block;
    font-size: 0.85em;
    margin-top: 5px;
    color: var(--ly-blue);
    font-weight: bold;
}
/* --- 置中彈出詳情面板 (最上層) --- */
.detail-modal {
    display: none; 
    position: fixed; 
    z-index: 5000; /* 確保在最上層 */
    left: 0; top: 0; width: 100%; height: 100%;
    background: rgba(0, 49, 83, 0.6); /* 使用半透明主藍作為遮罩 */
    justify-content: center; align-items: center;
}

.detail-modal-content {
    background: white;
    width: 90%;
    max-width: 800px; /* 寬度置中顯示 */
    max-height: 85vh;
    border-radius: 20px;
    padding: 40px;
    overflow-y: auto;
    position: relative;
    border-top: 8px solid var(--ly-gold);
    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}

/* --- 按鈕重新設計：顏色與不換行 --- */
.card-footer-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #eee;
}

.btn-action-premium {
    padding: 10px 24px;
    font-size: 0.95em;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s;
    white-space: nowrap; /* 強制文字不換行 */
    font-weight: 600;
}

/* 編輯按鈕：深藍底白字，更顯專業 */
.btn-edit-new {
    background-color: var(--ly-blue);
    color: white;
}
.btn-edit-new:hover {
    background-color: #004a7c;
    box-shadow: 0 4px 12px rgba(0,49,83,0.3);
}

/* 刪除按鈕：淡紅底深紅字，警示但不刺眼 */
.btn-delete-new {
    background-color: #fff0f0;
    color: #d93025;
    border: 1px solid #f8d7da;
}
.btn-delete-new:hover {
    background-color: #d93025;
    color: white;
}
/* --- 專業儲存與取消按鈕 --- */
.btn-large-admin {
    padding: 14px 45px;
    font-size: 1.1em;
    font-weight: 900;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s;
    letter-spacing: 2px;
    border: none;
    display: flex;
    align-items: center;
    gap: 10px;
    white-space: nowrap;
}

/* 儲存按鈕：深藍金邊風格 */
.btn-save-edit {
    background: var(--ly-blue);
    color: white;
    border-bottom: 4px solid #001f35;
}
.btn-save-edit:hover {
    background: #004070;
    transform: translateY(-2px);
}

/* 取消按鈕：專業灰階風格 */
.btn-cancel-edit {
    background: #e0e0e0;
    color: #444;
    border-bottom: 4px solid #bbb;
}
.btn-cancel-edit:hover {
    background: #d0d0d0;
}

/* --- 拖移排序視覺反饋 --- */
.draggable-item.dragging {
    opacity: 0.5;
    border: 2px dashed var(--ly-gold);
}
/* --- 專業警告紅字設計：投票截止時間 --- */
.vote-deadline-alert {
    color: #d93025; /* 專業行政紅 */
    background-color: #fce8e6;
    padding: 8px 15px;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 900;
    font-size: 0.95em;
    border: 1px solid #fad2cf;
    margin-top: 10px;
    white-space: nowrap;
}

/* --- 圖片上傳預覽容器 --- */
#image-upload-preview-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 15px;
}
.upload-preview-item {
    width: 120px;
    height: 120px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
.upload-preview-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* --- 儲存後顯示的圖片樣式 (適中、陰影、無邊框) --- */
.event-display-image {
    max-width: 100%;       /* 寬度隨網頁調整 */
    height: auto;
    max-height: 400px;     /* 限制高度避免過大 */
    border-radius: 12px;   /* 圓角增加專業感 */
    border: none !important; /* 強制無邊框 */
    box-shadow: 0 10px 30px rgba(0,0,0,0.15); /* 專業立體陰影 */
    margin: 15px 0;
    display: block;
    object-fit: contain;
}

/* 新增圖片欄位按鈕樣式 */
.tag-btn-img {
    background: #fdf7e3;
    border: 1.5px solid var(--ly-gold);
    color: #856404;
}
.tag-btn-img:hover {
    background: var(--ly-gold);
    color: white;
}

/* 拖移排序時的視覺反饋 */
.draggable-item.dragging {
    opacity: 0.4;
    border: 2px dashed var(--ly-gold);
    background: #fff9e6;
}

        .form-group { margin-bottom: 25px; }
        .form-group label { font-weight: bold; color: var(--ly-blue); display: block; margin-bottom: 5px; }
        .form-input { 
            width: 100%; padding: 12px; border: 1px solid var(--border-color); 
            border-radius: 8px; margin-top: 8px; box-sizing: border-box;
            transition: border-color 0.3s;
        }
        .form-input:focus { border-color: var(--ly-gold); outline: none; }

        .field-adder-bar { 
            display: flex; flex-wrap: wrap; gap: 12px; margin: 20px 0; 
            padding: 20px; background: #f8f9fa; border-radius: 12px;
            border: 1px solid #eee;
        }
        .tag-btn { 
            background: white; border: 1.5px solid var(--ly-blue); color: var(--ly-blue); 
            padding: 6px 16px; border-radius: 20px; cursor: pointer; font-size: 0.9em; 
            transition: all 0.3s; font-weight: 500;
        }
        .tag-btn:hover { background: var(--ly-blue); color: white; transform: translateY(-2px); }

        .draggable-item { 
            display: flex; align-items: center; background: #fff; 
            border: 1px solid #e0e0e0; padding: 15px; margin-bottom: 12px; 
            border-radius: 10px; cursor: grab; transition: box-shadow 0.2s;
        }
        .drag-handle { margin-right: 18px; color: #bbb; font-size: 1.1em; }

        .member-preview-list { 
            display: flex; flex-wrap: wrap; gap: 10px; padding: 15px; 
            background: #fafafa; border: 1.5px dashed #d0d0d0; border-radius: 10px;
            min-height: 50px; align-items: center;
        }

        .picker-grid { 
            display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); 
            gap: 15px; max-height: 450px; overflow-y: auto; padding: 15px;
        }
        .picker-item { 
            text-align: center; padding: 15px 10px; border: 2px solid #f0f0f0; 
            border-radius: 12px; cursor: pointer; transition: all 0.3s ease;
            background: white;
        }
        .picker-item.selected { 
            border-color: var(--ly-gold); 
            background: rgba(207, 169, 0, 0.08); 
        }
        .picker-item img { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; margin-bottom: 8px; }

        .modal {
            display: none; position: fixed; z-index: 3000; left: 0; top: 0; width: 100%; height: 100%;
            background-color: rgba(0,0,0,0.5); justify-content: center; align-items: center;
        }
        .modal-content {
            background-color: #fff; padding: 25px; border-radius: 15px; width: 90%;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2); border-top: 6px solid var(--ly-gold);
        }

        .mini-member-card-rich {
            display: flex; align-items: center; background: var(--ly-blue); color: white;
            padding: 5px 12px 5px 6px; border-radius: 20px; font-size: 0.85em; gap: 8px;
        }
        .mini-member-card-rich img { width: 24px; height: 24px; border-radius: 50%; object-fit: cover; }

        .event-grid-container {
            display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 20px; padding-bottom: 40px; max-width: 1100px; margin: 0 auto;
        }

        .info-card-item {
            background: white; border-radius: 12px; padding: 20px; display: flex;
            align-items: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            border-left: 5px solid var(--ly-gold); transition: 0.3s; text-decoration: none;
        }
        .info-card-item:hover { transform: translateY(-5px); }

        .card-date-badge {
            background: var(--ly-blue); color: var(--ly-gold); min-width: 60px; height: 60px;
            border-radius: 50%; display: flex; flex-direction: column; justify-content: center;
            align-items: center; margin-right: 20px; font-weight: bold; border: 2px solid var(--ly-gold);
        }
        .card-date-badge span { font-size: 0.7em; }
        .card-info-text h4 { margin: 0; color: var(--ly-blue); font-size: 1.2em; }
        .card-info-text p { margin: 5px 0 0; color: #666; font-size: 0.9em; }

        /* --- 手機版專屬按鈕排列 --- */
        @media (max-width: 768px) {
            .card-footer-actions {
                flex-direction: column; /* 改為垂直排列 */
                gap: 15px; /* 增加間距 */
                align-items: center;
            }

            .btn-action-premium {
                width: 100%; /* 手機版按鈕撐滿寬度 */
                max-width: 300px; /* 限制最大寬度保持美感 */
                justify-content: center;
                padding: 12px 20px; /* 增加點擊區域面積 */
            }
        }
    </style>
</head>
<body>
    <div id="header-layout"></div>
    <div id="sidebar"></div>
    
    <main class="event-content-area">
        <div class="section-title"><i class="fas fa-gavel"></i> 活動辦理中心</div>
        
        <div style="text-align: center; margin-bottom: 40px;">
            <button class="btn-confirm" onclick="toggleEventForm()" style="background: var(--ly-blue); color: white; padding: 15px 40px; font-size: 1.1em;">
                <i class="fas fa-plus-circle"></i> 發起新活動
            </button>
        </div>

        <section id="event-form-section" class="upload-container" style="display: none;">
            <div class="form-group">
                <label>① 活動標題 <small style="color:red;">(必填)</small></label>
                <input type="text" id="ev-title" class="form-input" placeholder="請輸入標題">
            </div>

            <div id="dynamic-fields-container"></div>

        <div class="field-adder-bar">
            <button class="tag-btn" onclick="addField('headline', '大標題')">+ 大標題</button>
            <button class="tag-btn" onclick="addField('location', '地點')">+ 地點</button>
            <button class="tag-btn" onclick="addField('meetup', '集合時間')">+ 集合時間</button>
            <button class="tag-btn" onclick="addField('time', '活動時間')">+ 活動時間</button>
            <button class="tag-btn" onclick="addField('content_text', '活動內容')">+ 內容</button>
            <button class="tag-btn tag-btn-img" onclick="addField('image_upload', '活動照片')">
                <i class="fas fa-image"></i> + 圖片欄位
            </button>
        </div>

            <div class="section-title" style="font-size: 1.1em; margin-top: 30px;">參加成員名單</div>
            <div id="selected-members-preview" class="member-preview-list">
                <p style="color: #999; font-size: 0.9em;">尚未選擇成員</p>
            </div>
            <button class="btn-confirm" onclick="openMemberPicker()" style="background: var(--ly-gold); margin-top: 10px;">
                <i class="fas fa-users-cog"></i> 編輯參加成員名單
            </button>

            <div class="form-group" style="margin-top: 30px;">
                <label>⑦ 設定投票結束時間</label>
                <input type="datetime-local" id="ev-deadline" class="form-input">
            </div>

            <div style="margin-top: 40px; display: flex; gap: 20px; justify-content: center;">
                <button class="btn-large-admin btn-save-edit" onclick="confirmSubmitEvent()">
                    <i class="fas fa-plus-circle"></i> 確認新增活動
                </button>
                <button class="btn-large-admin btn-cancel-edit" onclick="cancelEventForm()">
                    <i class="fas fa-undo"></i> 取消
                </button>
            </div>
        </section>

        <div class="section-title"><i class="fas fa-list-check"></i> 已建立活動</div>
        <div id="event-list-display" class="event-grid-container"></div>
    </main>

    <div id="memberPickerModal" class="modal">
        <div class="modal-content" style="max-width: 600px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                <h3 style="margin:0; color: var(--ly-blue);">勾選參加成員</h3>
                <button onclick="handleModalClose()" style="border:none; background:none; font-size:1.5rem; cursor:pointer;">&times;</button>
            </div>
            <div id="picker-member-grid" class="picker-grid"></div>
            <div style="text-align: right; margin-top: 20px;">
                <button class="btn-confirm" onclick="saveSelectedMembers()" style="background: var(--ly-gold); color: white;">確認勾選</button>
            </div>
        </div>
    </div>

    <div id="customConfirmModal" class="modal">
        <div class="modal-content" style="max-width: 400px; text-align: center;">
            <i class="fas fa-question-circle" style="font-size: 3rem; color: var(--ly-gold); margin-bottom: 15px;"></i>
            <h3 style="margin-bottom: 10px;">發布確認</h3>
            <p>確定要新增此活動嗎？</p>
            <div style="margin-top: 25px; display: flex; gap: 10px; justify-content: center;">
                <button class="btn-confirm" id="confirmYes" style="background: #28a745; color: white; padding: 10px 25px;">確認新增</button>
                <button class="btn-confirm" id="confirmNo" style="background: #666; color: white; padding: 10px 25px;">返回編輯</button>
            </div>
        </div>
    </div>

    <div id="footer-layout"></div>

    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-storage-compat.js"></script>

    <script src="./js/dashboard.js"></script>

    <script>
    // --- 初始化全域變數 ---
    const auth = firebase.auth();
    const storage = firebase.storage();

    let currentSelectedUIDs = []; 
    let tempSelectedUIDs = [];   
    let uploadedImages = []; // 暫存圖片資料 
    let isMemberEdited = false;  
    let currentEditingId = null; // 全域變數紀錄目前編輯中的活動 ID

    // --- 3. 頁面初始化與編輯邏輯修正 ---
    document.addEventListener("DOMContentLoaded", async () => {
        if (typeof loadLayout === "function") await loadLayout('Dashboard'); 
        
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const uidDisplay = document.getElementById('displayUid');
                if (uidDisplay) uidDisplay.innerText = user.uid;
                startEventListen();
            } else {
                window.location.href = "login.html";
            }
        });

        if (typeof syncMemberData === "function") {
            await syncMemberData("班長", "歡迎登入立法院", "組織活動與通訊的集會所");
        }
    });

    // 展開/關閉區域
    function toggleEventForm() {
        const section = document.getElementById('event-form-section');
        if (!section) return;
        const isOpening = section.style.display === 'none';
        section.style.display = isOpening ? 'block' : 'none';
        if (isOpening) {
            section.style.marginBottom = "15px";
            window.scrollTo({ top: section.offsetTop - 50, behavior: 'smooth' });
        }
    }

    function cancelEventForm() {
        const section = document.getElementById('event-form-section');
        if (section) section.style.display = 'none';
    }

    // 動態欄位增減
    function addField(type, label) {
        const container = document.getElementById('dynamic-fields-container');
        const fieldId = Date.now();
        let inputHtml = '';

        if (type === 'image_upload') {
            inputHtml = `
                <div style="flex-grow:1;">
                    <label style="font-size:0.85em; color:var(--ly-blue); font-weight:bold;">${label}</label>
                    <input type="file" class="form-input ev-dynamic-file" accept="image/*" onchange="handleDynamicImage(this, '${fieldId}')" style="padding:5px;">
                    <div id="preview-${fieldId}" class="image-field-preview" style="margin-top:10px;"></div>
                    <input type="hidden" class="ev-dynamic-input" data-field-type="image_base64">
                </div>`;
        } else {
            const inputType = (type === 'time' || type === 'meetup') ? 'datetime-local' : 'text';
            inputHtml = `
                <div style="flex-grow:1;">
                    <label style="font-size:0.85em; color:var(--ly-blue); font-weight:bold;">${label}</label>
                    <input type="${inputType}" class="form-input ev-dynamic-input" placeholder="請輸入${label}內容">
                </div>`;
        }

        const html = `
            <div class="draggable-item" data-type="${type}" id="field-${fieldId}" draggable="true">
                <i class="fas fa-grip-lines drag-handle"></i>
                ${inputHtml}
                <button onclick="this.parentElement.remove()" style="border:none; background:none; color:#ff4d4d; cursor:pointer; margin-left:10px;">&times;</button>
            </div>`;
        
        container.insertAdjacentHTML('beforeend', html);
        initDragAndDrop(); 
    }

    function handleDynamicImage(input, fieldId) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const previewContainer = document.getElementById(`preview-${fieldId}`);
                if (previewContainer) {
                    previewContainer.innerHTML = `
                        <img src="${e.target.result}" 
                             class="event-display-image" 
                             style="max-height:150px; margin:10px 0; display:block;">`;
                }
                const parentDiv = input.parentElement;
                const hiddenInput = parentDiv.querySelector('.ev-dynamic-input');
                if (hiddenInput) hiddenInput.value = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    // 編輯功能
    async function editEvent(id) {
        currentEditingId = id;
        try {
            const doc = await db.collection("events").doc(id).get();
            if (!doc.exists) return alert("找不到活動資料");
            const data = doc.data();

            document.getElementById('ev-title').value = data.title;
            document.getElementById('ev-deadline').value = data.deadline || "";

            currentSelectedUIDs = data.participants || [];
            const selectedData = [];
            for (const uid of currentSelectedUIDs) {
                const mDoc = await db.collection("content").doc(uid).get();
                if (mDoc.exists) {
                    const m = mDoc.data();
                    selectedData.push({ id: uid, name: m.text, img: m.imageUrl });
                }
            }
            renderMemberPreview(selectedData);

            const container = document.getElementById('dynamic-fields-container');
            container.innerHTML = ""; 

            if (data.fields) {
                data.fields.forEach(f => {
                    addField(f.type, f.label);
                    const lastItem = container.querySelector('.draggable-item:last-child');
                    
                    if (f.type === 'image_upload') {
                        const hiddenInput = lastItem.querySelector('.ev-dynamic-input');
                        if (hiddenInput) hiddenInput.value = f.content; 
                        
                        const fieldId = lastItem.id.replace('field-', '');
                        const preview = document.getElementById(`preview-${fieldId}`);
                        if (preview && f.content) {
                            preview.innerHTML = `<img src="${f.content}" class="event-display-image" style="max-height:150px; margin:10px 0; display:block;">`;
                        }
                    } else {
                        const lastInput = lastItem.querySelector('.ev-dynamic-input');
                        if (lastInput) lastInput.value = f.content;
                    }
                });
            }

            updateFormButtons(true);
            document.getElementById('event-form-section').style.display = 'block';
            window.scrollTo({ top: document.getElementById('event-form-section').offsetTop - 100, behavior: 'smooth' });
            
        } catch (e) { 
            console.error("編輯讀取失敗:", e);
        }
    }

    // 拖移排序
    function initDragAndDrop() {
        const container = document.getElementById('dynamic-fields-container');
        const items = container.querySelectorAll('.draggable-item');

        items.forEach(item => {
            item.addEventListener('dragstart', () => item.classList.add('dragging'));
            item.addEventListener('dragend', () => item.classList.remove('dragging'));
        });

        container.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(container, e.clientY);
            const draggingItem = document.querySelector('.dragging');
            if (afterElement == null) {
                container.appendChild(draggingItem);
            } else {
                container.insertBefore(draggingItem, afterElement);
            }
        });
    }

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable-item:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // 成員選擇器
    async function openMemberPicker() {
        const grid = document.getElementById('picker-member-grid');
        grid.innerHTML = "讀取成員中...";
        const modal = document.getElementById('memberPickerModal');
        if (modal) modal.style.display = 'flex';
        tempSelectedUIDs = [...currentSelectedUIDs];
        isMemberEdited = false;

        const snapshot = await db.collection("content").orderBy("timestamp", "asc").get();
        grid.innerHTML = "";
        snapshot.forEach(doc => {
            const data = doc.data();
            const isSel = tempSelectedUIDs.includes(doc.id) ? "selected" : "";
            const item = document.createElement('div');
            item.className = `picker-item ${isSel}`;
            item.dataset.id = doc.id;
            item.dataset.name = data.text || '未命名';
            item.dataset.img = data.imageUrl || '';
            item.innerHTML = `<img src="${data.imageUrl || ''}" alt="Avatar"><div>${data.text || '未命名'}</div>`;
            item.onclick = () => {
                isMemberEdited = true;
                item.classList.toggle('selected');
                const uid = item.dataset.id;
                if (tempSelectedUIDs.includes(uid)) {
                    tempSelectedUIDs = tempSelectedUIDs.filter(id => id !== uid);
                } else {
                    tempSelectedUIDs.push(uid);
                }
            };
            grid.appendChild(item);
        });
    }

    function saveSelectedMembers() {
        const selectedData = [];
        document.querySelectorAll('.picker-item.selected').forEach(item => {
            selectedData.push({
                id: item.dataset.id,
                name: item.dataset.name,
                img: item.dataset.img
            });
        });
        currentSelectedUIDs = [...tempSelectedUIDs];
        renderMemberPreview(selectedData);
        document.getElementById('memberPickerModal').style.display = 'none';
    }

    function renderMemberPreview(selectedData = []) {
        const preview = document.getElementById('selected-members-preview');
        if (currentSelectedUIDs.length === 0) {
            preview.innerHTML = '<p style="color: #999; font-size: 0.9em;">尚未選擇成員</p>';
            return;
        }
        preview.innerHTML = selectedData.map(member => `
            <div class="mini-member-card-rich">
                <img src="${member.img || ''}" alt="${member.name}">
                <span>${member.name}</span>
            </div>`).join("");
    }

    function handleModalClose() {
        if(isMemberEdited && !confirm("資料尚未儲存是否確認關閉？")) return;
        document.getElementById('memberPickerModal').style.display = 'none';
    }

    // 確認發布功能
    function confirmSubmitEvent() {
        const title = document.getElementById('ev-title').value;
        if(!title) return alert("請填寫活動標題");

        const modal = document.getElementById('customConfirmModal');
        if (modal) modal.style.display = 'flex';

        document.getElementById('confirmYes').onclick = async () => {
            if (modal) modal.style.display = 'none';
            await executeSubmit(); 
        };
        document.getElementById('confirmNo').onclick = () => {
            if (modal) modal.style.display = 'none';
        };
    }

    // 送出功能（整合日期記錄與 Storage 處理）
    async function executeSubmit() {
        const title = document.getElementById('ev-title').value;
        const deadline = document.getElementById('ev-deadline').value;
        if (!title) return alert("請填寫活動標題");

        // 記錄當下日期 (yyyy/mm/dd)
        const now = new Date();
        const dateString = `${now.getFullYear()}/${(now.getMonth()+1).toString().padStart(2,'0')}/${now.getDate().toString().padStart(2,'0')}`;

        try {
            const dynamicFields = [];
            const items = document.querySelectorAll('.draggable-item');
            
            for (const it of items) {
                const type = it.getAttribute('data-type');
                const label = it.querySelector('label').innerText;
                let content = it.querySelector('.ev-dynamic-input').value;

                if (type === 'image_upload' && content.startsWith('data:image')) {
                    const fileName = `events/${Date.now()}_${Math.random().toString(36).substr(2, 9)}.jpg`;
                    const storageRef = firebase.storage().ref(fileName);
                    const snapshot = await storageRef.putString(content, 'data_url');
                    content = await snapshot.ref.getDownloadURL(); 
                }
                dynamicFields.push({ type, label, content });
            }

            const eventData = {
                title: title,
                fields: dynamicFields,
                participants: currentSelectedUIDs,
                deadline: deadline,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                creator: auth.currentUser.email
            };

            if (currentEditingId) {
                await db.collection("events").doc(currentEditingId).update(eventData);
                alert("活動資料已成功更新！");
            } else {
                eventData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
                eventData.formattedDate = dateString; // 新增日期記錄
                await db.collection("events").add(eventData);
                alert("新活動已成功發布！");
            }
            location.reload();
        } catch (e) {
            console.error("儲存失敗:", e);
            alert("儲存失敗，請檢查網路或 Storage 權限。");
        }
    }

    function updateFormButtons(isEdit) {
        const footerBtnArea = document.querySelector("#event-form-section div[style*='justify-content: center']");
        if (footerBtnArea) {
            footerBtnArea.innerHTML = isEdit ? `
                <button class="btn-large-admin btn-save-edit" onclick="confirmSubmitEvent()">
                    <i class="fas fa-check-double"></i> 儲存修改內容
                </button>
                <button class="btn-large-admin btn-cancel-edit" onclick="location.reload()">
                    <i class="fas fa-times"></i> 取消修改
                </button>` : `
                <button class="btn-large-admin" onclick="confirmSubmitEvent()" style="background: var(--ly-blue); color: white;">
                    <i class="fas fa-paper-plane"></i> 立即發布活動
                </button>
                <button class="btn-large-admin" onclick="cancelEventForm()" style="background: #666; color: white;">
                    <i class="fas fa-times"></i> 取消
                </button>`;
        }
    }

    function startEventListen() {
        const display = document.getElementById('event-list-display');
        db.collection("events").orderBy("createdAt", "desc").onSnapshot(snapshot => {
            display.innerHTML = "";
            snapshot.forEach(doc => {
                const ev = doc.data();
                const id = doc.id;
                const timeField = ev.fields ? ev.fields.find(f => f.type === 'time') : null;
                const dateStr = timeField ? timeField.content : "";
                const dateObj = dateStr ? new Date(dateStr) : new Date();
                
                const cardHtml = `
                    <div class="info-card-item" onclick="openDetailModal('${id}')" style="cursor:pointer;">
                        <div class="card-date-badge">
                            ${dateObj.getDate()}<span>${dateObj.toLocaleString('en-us', {month:'short'}).toUpperCase()}</span>
                        </div>
                        <div class="card-info-text">
                            <h4>${ev.title}</h4>
                            <p><i class="far fa-clock"></i> ${dateStr.replace('T', ' ')}</p>
                        </div>
                        <i class="fas fa-external-link-alt" style="margin-left:auto; color:#ccc; font-size:0.8em;"></i>
                    </div>`;
                display.insertAdjacentHTML('beforeend', cardHtml);
            });
        });
    }

    // 開啟詳情彈窗（整合標題平行日期顯示）
    async function openDetailModal(id) {
        const modal = document.getElementById('eventDetailModal');
        const inner = document.getElementById('modal-inner-content');
        const footer = document.getElementById('modal-footer-actions');
        
        modal.style.display = 'flex';
        inner.innerHTML = '<p style="text-align:center; padding:20px;">資料讀取中...</p>';
        
        try {
            const doc = await db.collection("events").doc(id).get();
            const ev = doc.data();

            // 標題與日期平行排列
            let html = `
                <div style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid var(--ly-blue-trans); margin-bottom: 20px; padding-bottom: 10px;">
                    <h2 style="color:var(--ly-blue); margin: 0;">${ev.title}</h2>
                    <span style="color: #666; font-size: 0.85em; font-weight: bold;">
                        新增日期：${ev.formattedDate || '無紀錄'}
                    </span>
                </div>`;

            if (ev.deadline) {
                html += `
                    <div style="text-align:center; margin-bottom:25px;">
                        <div class="vote-deadline-alert">
                            <i class="fas fa-exclamation-triangle"></i>
                            投票截止時間：${ev.deadline.replace('T', ' ')}
                        </div>
                    </div>`;
            }

            if (ev.fields) {
                ev.fields.forEach(f => {
                    if (f.type === 'image_upload' && f.content) {
                        html += `
                            <div class="detail-row" style="text-align:center;">
                                <span class="detail-label">● ${f.label}</span>
                                <img src="${f.content}" class="event-display-image">
                            </div>`;
                    } else {
                        html += `
                            <div class="detail-row">
                                <span class="detail-label">● ${f.label}</span>
                                <div class="detail-content">${f.content.replace('T', ' ')}</div>
                            </div>`;
                    }
                });
            }

            html += `<span class="detail-label">● 出席成員：</span><div class="detail-member-grid">`;
            if (ev.participants && ev.participants.length > 0) {
                for (const uid of ev.participants) {
                    const mDoc = await db.collection("content").doc(uid).get();
                    if (mDoc.exists) {
                        const m = mDoc.data();
                        html += `
                            <div class="member-avatar-box">
                                <img src="${m.imageUrl || ''}" alt="Avatar">
                                <span>${m.text || '成員'}</span>
                            </div>`;
                    }
                }
            } else {
                html += `<p style="color:#999; margin-left:10px;">尚未選擇成員</p>`;
            }
            html += `</div>`;

            inner.innerHTML = html;

            footer.innerHTML = `
                <button onclick="closeDetailModal();" class="btn-action-premium" style="background:#e0e0e0; color:#333;">
                    <i class="fas fa-arrow-left"></i> 返回列表
                </button>
                <button onclick="closeDetailModal(); editEvent('${id}');" class="btn-action-premium btn-edit-new">
                    <i class="fas fa-edit"></i> 編輯活動內容
                </button>
                <button onclick="closeDetailModal(); deleteEvent('${id}');" class="btn-action-premium btn-delete-new">
                    <i class="fas fa-trash-alt"></i> 刪除此項活動
                </button>
            `;
        } catch (e) {
            console.error("讀取詳情失敗:", e);
        }
    }

    function closeDetailModal() {
        document.getElementById('eventDetailModal').style.display = 'none';
    }

    // 刪除活動（同步刪除 Storage 檔案）
    async function deleteEvent(id) {
        if (!confirm("資料刪除後無法復原，確定要移除此活動及其所有圖片嗎？")) return;

        try {
            const doc = await db.collection("events").doc(id).get();
            if (!doc.exists) return alert("找不到該活動資料。");
            const ev = doc.data();

            if (ev.fields) {
                const imageDeletePromises = ev.fields
                    .filter(f => f.type === 'image_upload' && f.content && f.content.includes("firebasestorage"))
                    .map(f => {
                        const storageRef = firebase.storage().refFromURL(f.content);
                        return storageRef.delete().catch(err => console.warn("檔案不存在:", f.content));
                    });
                await Promise.all(imageDeletePromises);
            }

            await db.collection("events").doc(id).delete();
            alert("活動及其相關圖片已成功移除！");
            closeDetailModal();
        } catch (e) {
            console.error("刪除操作發生錯誤:", e);
            alert("刪除失敗，請檢查權限。");
        }
    }

    // 選單與登出功能
    window.toggleNav = function() {
        const sidebar = document.getElementById("mySidebar");
        const overlay = document.getElementById("overlay");
        if (sidebar.style.width === "250px") {
            sidebar.style.width = "0";
            overlay.style.display = "none";
        } else {
            sidebar.style.width = "250px";
            overlay.style.display = "block";
        }
    };

    function confirmLogout() { 
        if (confirm("確定登出系統？")) {
            auth.signOut().then(() => {
                alert("已成功登出");
                window.location.href = "login.html";
            });
        }
    }
</script>
    <div id="customConfirmModal" class="modal">
        <div class="modal-content" style="max-width: 400px; text-align: center;">
            <i class="fas fa-question-circle" style="font-size: 3rem; color: var(--ly-gold); margin-bottom: 15px;"></i>
            <h3 style="margin-bottom: 10px;">發布確認</h3>
            <p>確定要新增此活動嗎？</p>
            <div style="margin-top: 25px; display: flex; gap: 10px; justify-content: center;">
                <button class="btn-confirm" id="confirmYes" style="background: #28a745; color: white; padding: 10px 25px;">確認新增</button>
                <button class="btn-confirm" id="confirmNo" style="background: #666; color: white; padding: 10px 25px;">返回編輯</button>
            </div>
        </div>
    </div> <div id="footer-layout"></div>

    <div id="eventDetailModal" class="detail-modal">
    <div class="detail-modal-content">
        <button onclick="closeDetailModal()" style="position:absolute; right:20px; top:20px; border:none; background:none; font-size:1.5rem; cursor:pointer; color:#999;">&times;</button>
        <div id="modal-inner-content">
            </div>
        <div class="card-footer-actions" id="modal-footer-actions">
            </div>
    </div>
</body>
</html>
```
## OK
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>私人管理頁面 - 立法院系統整合</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="./css/authenticated.css">
    <style>
        /* --- 頁面寬度與容器控制 --- */
        .event-content-area, .upload-container {
            max-width: 1100px !important;
            margin: 0 auto !important;
            width: 100%;
        }

        /* --- 標題重新設計 --- */
.section-title {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    
    max-width: 1100px !important;
    margin: 60px auto 35px;
    width: 100%;
    
    color: var(--ly-blue);
    font-size: 2em;
    font-weight: 900;
    letter-spacing: 6px;
    
    /* 標題背景微調：增加行政層次感 */
    background: linear-gradient(to right, transparent, rgba(0, 49, 83, 0.02), transparent);
    padding: 20px 0;
    position: relative;
}

/* 標題下方的漸層裝飾線 */
.section-title::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%; /* 線條寬度 */
    height: 4px; /* 線條厚度 */
    border-radius: 2px;
    
    /* 使用您指定的色彩進行漸層設計：從深藍到透明 */
    background: linear-gradient(to right, 
        var(--ly-blue) 0%, 
        var(--ly-blue-trans) 50%, 
        transparent 100%
    );
}

.section-title i {
    margin-right: 20px;
    color: var(--ly-blue);
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}
        #event-form-section {
            background: white;
            padding: 40px;
            padding-bottom: 60px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            border-top: 5px solid var(--ly-gold);
            max-width: 1100px !important;
            margin: 0 auto !important;
            width: 100%;
            box-sizing: border-box;
        }

        .btn-confirm {
            border: none;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .btn-confirm:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }

        /* --- 專業小尺寸按鈕 --- */
.btn-action-small {
    padding: 6px 14px;
    font-size: 0.85em;
    border-radius: 15px;
    border: 1px solid transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.3s ease;
    font-weight: 500;
}

/* 編輯按鈕：穩重的深藍風格 */
.btn-edit {
    background: white;
    color: var(--ly-blue);
    border-color: var(--ly-blue);
}
.btn-edit:hover {
    background: var(--ly-blue-trans);
    color: white;
}

/* 刪除按鈕：謹慎的灰紅風格 */
.btn-delete {
    background: white;
    color: #b33a3a;
    border-color: #e0e0e0;
}
.btn-delete:hover {
    background: #b33a3a;
    color: white;
    border-color: #b33a3a;
}
/* --- 專業極小化並排按鈕 --- */
.card-actions {
    margin-left: auto;
    display: flex;
    flex-direction: column; /* 上下並排 */
    gap: 4px;
}

.btn-action-small {
    padding: 3px 8px; /* 縮小按鈕 */
    font-size: 0.75em; /* 縮小字體 */
    border-radius: 4px;
    border: 1px solid transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    transition: all 0.2s ease;
    white-space: nowrap; /* 文字不換行 */
    width: 100%; /* 確保上下按鈕等寬 */
}

.btn-edit {
    background: #f0f4f8;
    color: var(--ly-blue);
    border-color: var(--ly-blue);
}

.btn-delete {
    background: #fffafa;
    color: #b33a3a;
    border-color: #ffcccc;
}
/* 活動展開詳情面板 */
.event-detail-panel {
    display: none; /* 預設隱藏 */
    background: #ffffff;
    border-radius: 15px;
    padding: 30px;
    margin-top: 15px;
    box-shadow: inset 0 2px 10px rgba(0,0,0,0.05);
    border-left: 5px solid var(--ly-gold);
    width: 100%;
    box-sizing: border-box;
}

/* 詳情內的欄位樣式 */
.detail-row { margin-bottom: 20px; }
.detail-label { font-weight: bold; color: var(--ly-blue); display: block; margin-bottom: 8px; font-size: 1.1em; }
.detail-content { color: #444; line-height: 1.6; }

/* 展開後的成員頭像清單 */
.detail-member-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 10px;
}
.member-avatar-box {
    text-align: center;
    width: 80px;
}
.member-avatar-box img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid #eee;
    object-fit: cover;
}
.member-avatar-box span {
    display: block;
    font-size: 0.85em;
    margin-top: 5px;
    color: var(--ly-blue);
    font-weight: bold;
}
/* --- 置中彈出詳情面板 (最上層) --- */
.detail-modal {
    display: none; 
    position: fixed; 
    z-index: 5000; /* 確保在最上層 */
    left: 0; top: 0; width: 100%; height: 100%;
    background: rgba(0, 49, 83, 0.6); /* 使用半透明主藍作為遮罩 */
    justify-content: center; align-items: center;
}

.detail-modal-content {
    background: white;
    width: 90%;
    max-width: 800px; /* 寬度置中顯示 */
    max-height: 85vh;
    border-radius: 20px;
    padding: 40px;
    overflow-y: auto;
    position: relative;
    border-top: 8px solid var(--ly-gold);
    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}

/* --- 按鈕重新設計：顏色與不換行 --- */
.card-footer-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #eee;
}

.btn-action-premium {
    padding: 10px 24px;
    font-size: 0.95em;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s;
    white-space: nowrap; /* 強制文字不換行 */
    font-weight: 600;
}

/* 編輯按鈕：深藍底白字，更顯專業 */
.btn-edit-new {
    background-color: var(--ly-blue);
    color: white;
}
.btn-edit-new:hover {
    background-color: #004a7c;
    box-shadow: 0 4px 12px rgba(0,49,83,0.3);
}

/* 刪除按鈕：淡紅底深紅字，警示但不刺眼 */
.btn-delete-new {
    background-color: #fff0f0;
    color: #d93025;
    border: 1px solid #f8d7da;
}
.btn-delete-new:hover {
    background-color: #d93025;
    color: white;
}
/* --- 專業儲存與取消按鈕 --- */
.btn-large-admin {
    padding: 14px 45px;
    font-size: 1.1em;
    font-weight: 900;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s;
    letter-spacing: 2px;
    border: none;
    display: flex;
    align-items: center;
    gap: 10px;
    white-space: nowrap;
}

/* 儲存按鈕：深藍金邊風格 */
.btn-save-edit {
    background: var(--ly-blue);
    color: white;
    border-bottom: 4px solid #001f35;
}
.btn-save-edit:hover {
    background: #004070;
    transform: translateY(-2px);
}

/* 取消按鈕：專業灰階風格 */
.btn-cancel-edit {
    background: #e0e0e0;
    color: #444;
    border-bottom: 4px solid #bbb;
}
.btn-cancel-edit:hover {
    background: #d0d0d0;
}

/* --- 拖移排序視覺反饋 --- */
.draggable-item.dragging {
    opacity: 0.5;
    border: 2px dashed var(--ly-gold);
}
/* --- 專業警告紅字設計：投票截止時間 --- */
.vote-deadline-alert {
    color: #d93025; /* 專業行政紅 */
    background-color: #fce8e6;
    padding: 8px 15px;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 900;
    font-size: 0.95em;
    border: 1px solid #fad2cf;
    margin-top: 10px;
    white-space: nowrap;
}

/* --- 圖片上傳預覽容器 --- */
#image-upload-preview-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 15px;
}
.upload-preview-item {
    width: 120px;
    height: 120px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
.upload-preview-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* --- 儲存後顯示的圖片樣式 (適中、陰影、無邊框) --- */
.event-display-image {
    max-width: 100%;       /* 寬度隨網頁調整 */
    height: auto;
    max-height: 400px;     /* 限制高度避免過大 */
    border-radius: 12px;   /* 圓角增加專業感 */
    border: none !important; /* 強制無邊框 */
    box-shadow: 0 10px 30px rgba(0,0,0,0.15); /* 專業立體陰影 */
    margin: 15px 0;
    display: block;
    object-fit: contain;
}

/* 新增圖片欄位按鈕樣式 */
.tag-btn-img {
    background: #fdf7e3;
    border: 1.5px solid var(--ly-gold);
    color: #856404;
}
.tag-btn-img:hover {
    background: var(--ly-gold);
    color: white;
}

/* 拖移排序時的視覺反饋 */
.draggable-item.dragging {
    opacity: 0.4;
    border: 2px dashed var(--ly-gold);
    background: #fff9e6;
}

        .form-group { margin-bottom: 25px; }
        .form-group label { font-weight: bold; color: var(--ly-blue); display: block; margin-bottom: 5px; }
        .form-input { 
            width: 100%; padding: 12px; border: 1px solid var(--border-color); 
            border-radius: 8px; margin-top: 8px; box-sizing: border-box;
            transition: border-color 0.3s;
        }
        .form-input:focus { border-color: var(--ly-gold); outline: none; }

        .field-adder-bar { 
            display: flex; flex-wrap: wrap; gap: 12px; margin: 20px 0; 
            padding: 20px; background: #f8f9fa; border-radius: 12px;
            border: 1px solid #eee;
        }
        .tag-btn { 
            background: white; border: 1.5px solid var(--ly-blue); color: var(--ly-blue); 
            padding: 6px 16px; border-radius: 20px; cursor: pointer; font-size: 0.9em; 
            transition: all 0.3s; font-weight: 500;
        }
        .tag-btn:hover { background: var(--ly-blue); color: white; transform: translateY(-2px); }

        .draggable-item { 
            display: flex; align-items: center; background: #fff; 
            border: 1px solid #e0e0e0; padding: 15px; margin-bottom: 12px; 
            border-radius: 10px; cursor: grab; transition: box-shadow 0.2s;
        }
        .drag-handle { margin-right: 18px; color: #bbb; font-size: 1.1em; }

        .member-preview-list { 
            display: flex; flex-wrap: wrap; gap: 10px; padding: 15px; 
            background: #fafafa; border: 1.5px dashed #d0d0d0; border-radius: 10px;
            min-height: 50px; align-items: center;
        }

        .picker-grid { 
            display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); 
            gap: 15px; max-height: 450px; overflow-y: auto; padding: 15px;
        }
        .picker-item { 
            text-align: center; padding: 15px 10px; border: 2px solid #f0f0f0; 
            border-radius: 12px; cursor: pointer; transition: all 0.3s ease;
            background: white;
        }
        .picker-item.selected { 
            border-color: var(--ly-gold); 
            background: rgba(207, 169, 0, 0.08); 
        }
        .picker-item img { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; margin-bottom: 8px; }

        .modal {
            display: none; position: fixed; z-index: 3000; left: 0; top: 0; width: 100%; height: 100%;
            background-color: rgba(0,0,0,0.5); justify-content: center; align-items: center;
        }
        .modal-content {
            background-color: #fff; padding: 25px; border-radius: 15px; width: 90%;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2); border-top: 6px solid var(--ly-gold);
        }

        .mini-member-card-rich {
            display: flex; align-items: center; background: var(--ly-blue); color: white;
            padding: 5px 12px 5px 6px; border-radius: 20px; font-size: 0.85em; gap: 8px;
        }
        .mini-member-card-rich img { width: 24px; height: 24px; border-radius: 50%; object-fit: cover; }

        .event-grid-container {
            display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 20px; padding-bottom: 40px; max-width: 1100px; margin: 0 auto;
        }

        .info-card-item {
            background: white; border-radius: 12px; padding: 20px; display: flex;
            align-items: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            border-left: 5px solid var(--ly-gold); transition: 0.3s; text-decoration: none;
        }
        .info-card-item:hover { transform: translateY(-5px); }

        .card-date-badge {
            background: var(--ly-blue); color: var(--ly-gold); min-width: 60px; height: 60px;
            border-radius: 50%; display: flex; flex-direction: column; justify-content: center;
            align-items: center; margin-right: 20px; font-weight: bold; border: 2px solid var(--ly-gold);
        }
        .card-date-badge span { font-size: 0.7em; }
        .card-info-text h4 { margin: 0; color: var(--ly-blue); font-size: 1.2em; }
        .card-info-text p { margin: 5px 0 0; color: #666; font-size: 0.9em; }

        /* --- 強制鎖定遮罩 --- */
/* --- 修正版：絕對鎖定遮罩 --- */
#upload-overlay {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background: rgba(0, 49, 83, 0.98) !important; /* 近乎不透明的行政藍 */
    z-index: 200000 !important; /* 設定到 20 萬，確保壓過所有側邊欄與 Modal */
    
    /* 初始狀態：完全透明且縮小到角落 */
    opacity: 0;
    visibility: hidden;
    display: flex !important; /* 永遠保持 flex，由 visibility 控制 */
    
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    transition: opacity 0.3s ease; /* 增加平滑感 */
}

/* 當啟動時的 class */
#upload-overlay.active {
    opacity: 1 !important;
    visibility: visible !important;
}

.loader-spinner {
    width: 70px; height: 70px;
    border: 8px solid rgba(255, 255, 255, 0.1);
    border-top: 8px solid #cfaf3c; /* 立法院金 */
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 25px;
}

        /* --- 手機版專屬按鈕排列 --- */
        @media (max-width: 768px) {
            .card-footer-actions {
                flex-direction: column; /* 改為垂直排列 */
                gap: 15px; /* 增加間距 */
                align-items: center;
            }

            .btn-action-premium {
                width: 100%; /* 手機版按鈕撐滿寬度 */
                max-width: 300px; /* 限制最大寬度保持美感 */
                justify-content: center;
                padding: 12px 20px; /* 增加點擊區域面積 */
            }
        }
    </style>
</head>
<body>
        
    <div id="upload-overlay">
        <div class="loader-spinner"></div>
        <div style="font-size: 1.2em; font-weight: bold; letter-spacing: 2px;">資料上傳中，請稍候...</div>
        <p style="margin-top: 10px; opacity: 0.8;">正在同步雲端資料庫，請勿關閉視窗</p>
    </div>

    <div id="header-layout"></div>
    <div id="sidebar"></div>
    
    <main class="event-content-area">
        <div class="section-title"><i class="fas fa-gavel"></i> 活動辦理中心</div>
        
        <div style="text-align: center; margin-bottom: 40px;">
            <button class="btn-confirm" onclick="toggleEventForm()" style="background: var(--ly-blue); color: white; padding: 15px 40px; font-size: 1.1em;">
                <i class="fas fa-plus-circle"></i> 發起新活動
            </button>
        </div>

        <section id="event-form-section" class="upload-container" style="display: none;">
            <div class="form-group">
                <label>① 活動標題 <small style="color:red;">(必填)</small></label>
                <input type="text" id="ev-title" class="form-input" placeholder="請輸入標題">
            </div>

            <div id="dynamic-fields-container"></div>

        <div class="field-adder-bar">
            <button class="tag-btn" onclick="addField('headline', '大標題')">+ 大標題</button>
            <button class="tag-btn" onclick="addField('location', '地點')">+ 地點</button>
            <button class="tag-btn" onclick="addField('meetup', '集合時間')">+ 集合時間</button>
            <button class="tag-btn" onclick="addField('time', '活動時間')">+ 活動時間</button>
            <button class="tag-btn" onclick="addField('content_text', '活動內容')">+ 內容</button>
            <button class="tag-btn tag-btn-img" onclick="addField('image_upload', '活動照片')">
                <i class="fas fa-image"></i> + 圖片欄位
            </button>
        </div>

            <div class="section-title" style="font-size: 1.1em; margin-top: 30px;">參加成員名單</div>
            <div id="selected-members-preview" class="member-preview-list">
                <p style="color: #999; font-size: 0.9em;">尚未選擇成員</p>
            </div>
            <button class="btn-confirm" onclick="openMemberPicker()" style="background: var(--ly-gold); margin-top: 10px;">
                <i class="fas fa-users-cog"></i> 編輯參加成員名單
            </button>

            <div class="form-group" style="margin-top: 30px;">
                <label>⑦ 設定投票結束時間</label>
                <input type="datetime-local" id="ev-deadline" class="form-input">
            </div>

            <div style="margin-top: 40px; display: flex; gap: 20px; justify-content: center;">
                <button class="btn-large-admin btn-save-edit" onclick="confirmSubmitEvent()">
                    <i class="fas fa-plus-circle"></i> 確認新增活動
                </button>
                <button class="btn-large-admin btn-cancel-edit" onclick="cancelEventForm()">
                    <i class="fas fa-undo"></i> 取消
                </button>
            </div>
        </section>

        <div class="section-title"><i class="fas fa-list-check"></i> 已建立活動</div>
        <div id="event-list-display" class="event-grid-container"></div>
    </main>

    <div id="memberPickerModal" class="modal">
        <div class="modal-content" style="max-width: 600px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                <h3 style="margin:0; color: var(--ly-blue);">勾選參加成員</h3>
                <button onclick="handleModalClose()" style="border:none; background:none; font-size:1.5rem; cursor:pointer;">&times;</button>
            </div>
            <div id="picker-member-grid" class="picker-grid"></div>
            <div style="text-align: right; margin-top: 20px;">
                <button class="btn-confirm" onclick="saveSelectedMembers()" style="background: var(--ly-gold); color: white;">確認勾選</button>
            </div>
        </div>
    </div>

    <div id="customConfirmModal" class="modal">
        <div class="modal-content" style="max-width: 400px; text-align: center;">
            <i class="fas fa-question-circle" style="font-size: 3rem; color: var(--ly-gold); margin-bottom: 15px;"></i>
            <h3 style="margin-bottom: 10px;">發布確認</h3>
            <p>確定要新增此活動嗎？</p>
            <div style="margin-top: 25px; display: flex; gap: 10px; justify-content: center;">
                <button class="btn-confirm" id="confirmYes" style="background: #28a745; color: white; padding: 10px 25px;">確認新增</button>
                <button class="btn-confirm" id="confirmNo" style="background: #666; color: white; padding: 10px 25px;">返回編輯</button>
            </div>
        </div>
    </div>

    <div id="footer-layout"></div>

    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-storage-compat.js"></script>

    <script src="./js/dashboard.js"></script>

    <script>
    // --- 初始化全域變數 ---
    const auth = firebase.auth();
    const storage = firebase.storage();

    let currentSelectedUIDs = []; 
    let tempSelectedUIDs = [];   
    let uploadedImages = []; // 暫存圖片資料 
    let isMemberEdited = false;  
    let currentEditingId = null; // 全域變數紀錄目前編輯中的活動 ID

    // --- 3. 頁面初始化與編輯邏輯修正 ---
    document.addEventListener("DOMContentLoaded", async () => {
        if (typeof loadLayout === "function") await loadLayout('Dashboard'); 
        
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const uidDisplay = document.getElementById('displayUid');
                if (uidDisplay) uidDisplay.innerText = user.uid;
                startEventListen();
            } else {
                window.location.href = "login.html";
            }
        });

        if (typeof syncMemberData === "function") {
            await syncMemberData("班長", "歡迎登入立法院", "組織活動與通訊的集會所");
        }
    });

    // 展開/關閉區域
    function toggleEventForm() {
        const section = document.getElementById('event-form-section');
        if (!section) return;
        const isOpening = section.style.display === 'none';
        section.style.display = isOpening ? 'block' : 'none';
        if (isOpening) {
            section.style.marginBottom = "15px";
            window.scrollTo({ top: section.offsetTop - 50, behavior: 'smooth' });
        }
    }

    function cancelEventForm() {
        const section = document.getElementById('event-form-section');
        if (section) section.style.display = 'none';
    }

    // 動態欄位增減
    function addField(type, label) {
        const container = document.getElementById('dynamic-fields-container');
        const fieldId = Date.now();
        let inputHtml = '';

        if (type === 'image_upload') {
            inputHtml = `
                <div style="flex-grow:1;">
                    <label style="font-size:0.85em; color:var(--ly-blue); font-weight:bold;">${label}</label>
                    <input type="file" class="form-input ev-dynamic-file" accept="image/*" onchange="handleDynamicImage(this, '${fieldId}')" style="padding:5px;">
                    <div id="preview-${fieldId}" class="image-field-preview" style="margin-top:10px;"></div>
                    <input type="hidden" class="ev-dynamic-input" data-field-type="image_base64">
                </div>`;
        } else {
            const inputType = (type === 'time' || type === 'meetup') ? 'datetime-local' : 'text';
            inputHtml = `
                <div style="flex-grow:1;">
                    <label style="font-size:0.85em; color:var(--ly-blue); font-weight:bold;">${label}</label>
                    <input type="${inputType}" class="form-input ev-dynamic-input" placeholder="請輸入${label}內容">
                </div>`;
        }

        const html = `
            <div class="draggable-item" data-type="${type}" id="field-${fieldId}" draggable="true">
                <i class="fas fa-grip-lines drag-handle"></i>
                ${inputHtml}
                <button onclick="this.parentElement.remove()" style="border:none; background:none; color:#ff4d4d; cursor:pointer; margin-left:10px;">&times;</button>
            </div>`;
        
        container.insertAdjacentHTML('beforeend', html);
        initDragAndDrop(); 
    }

    function handleDynamicImage(input, fieldId) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const previewContainer = document.getElementById(`preview-${fieldId}`);
                if (previewContainer) {
                    previewContainer.innerHTML = `
                        <img src="${e.target.result}" 
                             class="event-display-image" 
                             style="max-height:150px; margin:10px 0; display:block;">`;
                }
                const parentDiv = input.parentElement;
                const hiddenInput = parentDiv.querySelector('.ev-dynamic-input');
                if (hiddenInput) hiddenInput.value = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    // 編輯功能
    async function editEvent(id) {
        currentEditingId = id;
        try {
            const doc = await db.collection("events").doc(id).get();
            if (!doc.exists) return alert("找不到活動資料");
            const data = doc.data();

            document.getElementById('ev-title').value = data.title;
            document.getElementById('ev-deadline').value = data.deadline || "";

            currentSelectedUIDs = data.participants || [];
            const selectedData = [];
            for (const uid of currentSelectedUIDs) {
                const mDoc = await db.collection("content").doc(uid).get();
                if (mDoc.exists) {
                    const m = mDoc.data();
                    selectedData.push({ id: uid, name: m.text, img: m.imageUrl });
                }
            }
            renderMemberPreview(selectedData);

            const container = document.getElementById('dynamic-fields-container');
            container.innerHTML = ""; 

            if (data.fields) {
                data.fields.forEach(f => {
                    addField(f.type, f.label);
                    const lastItem = container.querySelector('.draggable-item:last-child');
                    
                    if (f.type === 'image_upload') {
                        const hiddenInput = lastItem.querySelector('.ev-dynamic-input');
                        if (hiddenInput) hiddenInput.value = f.content; 
                        
                        const fieldId = lastItem.id.replace('field-', '');
                        const preview = document.getElementById(`preview-${fieldId}`);
                        if (preview && f.content) {
                            preview.innerHTML = `<img src="${f.content}" class="event-display-image" style="max-height:150px; margin:10px 0; display:block;">`;
                        }
                    } else {
                        const lastInput = lastItem.querySelector('.ev-dynamic-input');
                        if (lastInput) lastInput.value = f.content;
                    }
                });
            }

            updateFormButtons(true);
            document.getElementById('event-form-section').style.display = 'block';
            window.scrollTo({ top: document.getElementById('event-form-section').offsetTop - 100, behavior: 'smooth' });
            
        } catch (e) { 
            console.error("編輯讀取失敗:", e);
        }
    }

    // 拖移排序
    function initDragAndDrop() {
        const container = document.getElementById('dynamic-fields-container');
        const items = container.querySelectorAll('.draggable-item');

        items.forEach(item => {
            item.addEventListener('dragstart', () => item.classList.add('dragging'));
            item.addEventListener('dragend', () => item.classList.remove('dragging'));
        });

        container.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(container, e.clientY);
            const draggingItem = document.querySelector('.dragging');
            if (afterElement == null) {
                container.appendChild(draggingItem);
            } else {
                container.insertBefore(draggingItem, afterElement);
            }
        });
    }

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable-item:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // 成員選擇器
    async function openMemberPicker() {
        const grid = document.getElementById('picker-member-grid');
        grid.innerHTML = "讀取成員中...";
        const modal = document.getElementById('memberPickerModal');
        if (modal) modal.style.display = 'flex';
        tempSelectedUIDs = [...currentSelectedUIDs];
        isMemberEdited = false;

        const snapshot = await db.collection("content").orderBy("timestamp", "asc").get();
        grid.innerHTML = "";
        snapshot.forEach(doc => {
            const data = doc.data();
            const isSel = tempSelectedUIDs.includes(doc.id) ? "selected" : "";
            const item = document.createElement('div');
            item.className = `picker-item ${isSel}`;
            item.dataset.id = doc.id;
            item.dataset.name = data.text || '未命名';
            item.dataset.img = data.imageUrl || '';
            item.innerHTML = `<img src="${data.imageUrl || ''}" alt="Avatar"><div>${data.text || '未命名'}</div>`;
            item.onclick = () => {
                isMemberEdited = true;
                item.classList.toggle('selected');
                const uid = item.dataset.id;
                if (tempSelectedUIDs.includes(uid)) {
                    tempSelectedUIDs = tempSelectedUIDs.filter(id => id !== uid);
                } else {
                    tempSelectedUIDs.push(uid);
                }
            };
            grid.appendChild(item);
        });
    }

    function saveSelectedMembers() {
        const selectedData = [];
        document.querySelectorAll('.picker-item.selected').forEach(item => {
            selectedData.push({
                id: item.dataset.id,
                name: item.dataset.name,
                img: item.dataset.img
            });
        });
        currentSelectedUIDs = [...tempSelectedUIDs];
        renderMemberPreview(selectedData);
        document.getElementById('memberPickerModal').style.display = 'none';
    }

    function renderMemberPreview(selectedData = []) {
        const preview = document.getElementById('selected-members-preview');
        if (currentSelectedUIDs.length === 0) {
            preview.innerHTML = '<p style="color: #999; font-size: 0.9em;">尚未選擇成員</p>';
            return;
        }
        preview.innerHTML = selectedData.map(member => `
            <div class="mini-member-card-rich">
                <img src="${member.img || ''}" alt="${member.name}">
                <span>${member.name}</span>
            </div>`).join("");
    }

    function handleModalClose() {
        if(isMemberEdited && !confirm("資料尚未儲存是否確認關閉？")) return;
        document.getElementById('memberPickerModal').style.display = 'none';
    }

    // 確認發布功能
    function confirmSubmitEvent() {
        const title = document.getElementById('ev-title').value;
        if(!title) return alert("請填寫活動標題");

        const modal = document.getElementById('customConfirmModal');
        if (modal) modal.style.display = 'flex';

        // 點擊「確認新增」
        document.getElementById('confirmYes').onclick = async () => {
    const overlay = document.getElementById('upload-overlay');
    if (overlay) {
        overlay.classList.add('active');
        console.log("遮罩已強制啟動");
    }

    // 關閉確認視窗
    if (modal) modal.style.display = 'none';

    // 給瀏覽器 10ms 時間渲染遮罩畫面
    await new Promise(resolve => setTimeout(resolve, 10));

    try {
        await executeSubmit(); 
    } catch (err) {
        console.error("處理失敗", err);
        if (overlay) overlay.classList.remove('active');
    }
};

        document.getElementById('confirmNo').onclick = () => {
            if (modal) modal.style.display = 'none';
        };
    }

    // 送出功能（整合日期記錄與 Storage 處理）
    async function executeSubmit() {
        const title = document.getElementById('ev-title').value;
        const deadline = document.getElementById('ev-deadline').value;
        if (!title) return alert("請填寫活動標題");

        // 記錄當下日期 (yyyy/mm/dd)
        const now = new Date();
        const dateString = `${now.getFullYear()}/${(now.getMonth()+1).toString().padStart(2,'0')}/${now.getDate().toString().padStart(2,'0')}`;

        try {
            const dynamicFields = [];
            const items = document.querySelectorAll('.draggable-item');
            
            for (const it of items) {
                const type = it.getAttribute('data-type');
                const label = it.querySelector('label').innerText;
                let content = it.querySelector('.ev-dynamic-input').value;

                if (type === 'image_upload' && content.startsWith('data:image')) {
                    const fileName = `events/${Date.now()}_${Math.random().toString(36).substr(2, 9)}.jpg`;
                    const storageRef = firebase.storage().ref(fileName);
                    const snapshot = await storageRef.putString(content, 'data_url');
                    content = await snapshot.ref.getDownloadURL(); 
                }
                dynamicFields.push({ type, label, content });
            }

            const eventData = {
                title: title,
                fields: dynamicFields,
                participants: currentSelectedUIDs,
                deadline: deadline,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                creator: auth.currentUser.email
            };

            if (currentEditingId) {
                await db.collection("events").doc(currentEditingId).update(eventData);
                alert("活動資料已成功更新！");
            } else {
                eventData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
                eventData.formattedDate = dateString; // 新增日期記錄
                await db.collection("events").add(eventData);
                alert("新活動已成功發布！");
            }
            location.reload();
        } catch (e) {
            console.error("儲存失敗:", e);
            alert("儲存失敗，請檢查網路或 Storage 權限。");
        }
    }

    function updateFormButtons(isEdit) {
        const footerBtnArea = document.querySelector("#event-form-section div[style*='justify-content: center']");
        if (footerBtnArea) {
            footerBtnArea.innerHTML = isEdit ? `
                <button class="btn-large-admin btn-save-edit" onclick="confirmSubmitEvent()">
                    <i class="fas fa-check-double"></i> 儲存修改內容
                </button>
                <button class="btn-large-admin btn-cancel-edit" onclick="location.reload()">
                    <i class="fas fa-times"></i> 取消修改
                </button>` : `
                <button class="btn-large-admin" onclick="confirmSubmitEvent()" style="background: var(--ly-blue); color: white;">
                    <i class="fas fa-paper-plane"></i> 立即發布活動
                </button>
                <button class="btn-large-admin" onclick="cancelEventForm()" style="background: #666; color: white;">
                    <i class="fas fa-times"></i> 取消
                </button>`;
        }
    }

    function startEventListen() {
        const display = document.getElementById('event-list-display');
        db.collection("events").orderBy("createdAt", "desc").onSnapshot(snapshot => {
            display.innerHTML = "";
            snapshot.forEach(doc => {
                const ev = doc.data();
                const id = doc.id;
                const timeField = ev.fields ? ev.fields.find(f => f.type === 'time') : null;
                const dateStr = timeField ? timeField.content : "";
                const dateObj = dateStr ? new Date(dateStr) : new Date();
                
                const cardHtml = `
                    <div class="info-card-item" onclick="openDetailModal('${id}')" style="cursor:pointer;">
                        <div class="card-date-badge">
                            ${dateObj.getDate()}<span>${dateObj.toLocaleString('en-us', {month:'short'}).toUpperCase()}</span>
                        </div>
                        <div class="card-info-text">
                            <h4>${ev.title}</h4>
                            <p><i class="far fa-clock"></i> ${dateStr.replace('T', ' ')}</p>
                        </div>
                        <i class="fas fa-external-link-alt" style="margin-left:auto; color:#ccc; font-size:0.8em;"></i>
                    </div>`;
                display.insertAdjacentHTML('beforeend', cardHtml);
            });
        });
    }

    // 開啟詳情彈窗（整合標題平行日期顯示）
    async function openDetailModal(id) {
        const modal = document.getElementById('eventDetailModal');
        const inner = document.getElementById('modal-inner-content');
        const footer = document.getElementById('modal-footer-actions');
        
        modal.style.display = 'flex';
        inner.innerHTML = '<p style="text-align:center; padding:20px;">資料讀取中...</p>';
        
        try {
            const doc = await db.collection("events").doc(id).get();
            const ev = doc.data();

            // 標題與日期平行排列
            let html = `
                <div style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid var(--ly-blue-trans); margin-bottom: 20px; padding-bottom: 10px;">
                    <h2 style="color:var(--ly-blue); margin: 0;">${ev.title}</h2>
                    <span style="color: #666; font-size: 0.85em; font-weight: bold;">
                        新增日期：${ev.formattedDate || '無紀錄'}
                    </span>
                </div>`;

            if (ev.deadline) {
                html += `
                    <div style="text-align:center; margin-bottom:25px;">
                        <div class="vote-deadline-alert">
                            <i class="fas fa-exclamation-triangle"></i>
                            投票截止時間：${ev.deadline.replace('T', ' ')}
                        </div>
                    </div>`;
            }

            if (ev.fields) {
                ev.fields.forEach(f => {
                    if (f.type === 'image_upload' && f.content) {
                        html += `
                            <div class="detail-row" style="text-align:center;">
                                <span class="detail-label">● ${f.label}</span>
                                <img src="${f.content}" class="event-display-image">
                            </div>`;
                    } else {
                        html += `
                            <div class="detail-row">
                                <span class="detail-label">● ${f.label}</span>
                                <div class="detail-content">${f.content.replace('T', ' ')}</div>
                            </div>`;
                    }
                });
            }

            html += `<span class="detail-label">● 出席成員：</span><div class="detail-member-grid">`;
            if (ev.participants && ev.participants.length > 0) {
                for (const uid of ev.participants) {
                    const mDoc = await db.collection("content").doc(uid).get();
                    if (mDoc.exists) {
                        const m = mDoc.data();
                        html += `
                            <div class="member-avatar-box">
                                <img src="${m.imageUrl || ''}" alt="Avatar">
                                <span>${m.text || '成員'}</span>
                            </div>`;
                    }
                }
            } else {
                html += `<p style="color:#999; margin-left:10px;">尚未選擇成員</p>`;
            }
            html += `</div>`;

            inner.innerHTML = html;

            footer.innerHTML = `
                <button onclick="closeDetailModal();" class="btn-action-premium" style="background:#e0e0e0; color:#333;">
                    <i class="fas fa-arrow-left"></i> 返回列表
                </button>
                <button onclick="closeDetailModal(); editEvent('${id}');" class="btn-action-premium btn-edit-new">
                    <i class="fas fa-edit"></i> 編輯活動內容
                </button>
                <button onclick="closeDetailModal(); deleteEvent('${id}');" class="btn-action-premium btn-delete-new">
                    <i class="fas fa-trash-alt"></i> 刪除此項活動
                </button>
            `;
        } catch (e) {
            console.error("讀取詳情失敗:", e);
        }
    }

    function closeDetailModal() {
        document.getElementById('eventDetailModal').style.display = 'none';
    }

    // 刪除活動（同步刪除 Storage 檔案）
    async function deleteEvent(id) {
        if (!confirm("資料刪除後無法復原，確定要移除此活動及其所有圖片嗎？")) return;

        try {
            const doc = await db.collection("events").doc(id).get();
            if (!doc.exists) return alert("找不到該活動資料。");
            const ev = doc.data();

            if (ev.fields) {
                const imageDeletePromises = ev.fields
                    .filter(f => f.type === 'image_upload' && f.content && f.content.includes("firebasestorage"))
                    .map(f => {
                        const storageRef = firebase.storage().refFromURL(f.content);
                        return storageRef.delete().catch(err => console.warn("檔案不存在:", f.content));
                    });
                await Promise.all(imageDeletePromises);
            }

            await db.collection("events").doc(id).delete();
            alert("活動及其相關圖片已成功移除！");
            closeDetailModal();
        } catch (e) {
            console.error("刪除操作發生錯誤:", e);
            alert("刪除失敗，請檢查權限。");
        }
    }

    // 選單與登出功能
    window.toggleNav = function() {
        const sidebar = document.getElementById("mySidebar");
        const overlay = document.getElementById("overlay");
        if (sidebar.style.width === "250px") {
            sidebar.style.width = "0";
            overlay.style.display = "none";
        } else {
            sidebar.style.width = "250px";
            overlay.style.display = "block";
        }
    };

    function confirmLogout() { 
        if (confirm("確定登出系統？")) {
            auth.signOut().then(() => {
                alert("已成功登出");
                window.location.href = "login.html";
            });
        }
    }
</script>
    <div id="customConfirmModal" class="modal">
        <div class="modal-content" style="max-width: 400px; text-align: center;">
            <i class="fas fa-question-circle" style="font-size: 3rem; color: var(--ly-gold); margin-bottom: 15px;"></i>
            <h3 style="margin-bottom: 10px;">發布確認</h3>
            <p>確定要新增此活動嗎？</p>
            <div style="margin-top: 25px; display: flex; gap: 10px; justify-content: center;">
                <button class="btn-confirm" id="confirmYes" style="background: #28a745; color: white; padding: 10px 25px;">確認新增</button>
                <button class="btn-confirm" id="confirmNo" style="background: #666; color: white; padding: 10px 25px;">返回編輯</button>
            </div>
        </div>
    </div> <div id="footer-layout"></div>

    <div id="eventDetailModal" class="detail-modal">
    <div class="detail-modal-content">
        <button onclick="closeDetailModal()" style="position:absolute; right:20px; top:20px; border:none; background:none; font-size:1.5rem; cursor:pointer; color:#999;">&times;</button>
        <div id="modal-inner-content">
            </div>
        <div class="card-footer-actions" id="modal-footer-actions">
            </div>
    </div>


</body>
</html>
```
## OK
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>私人管理頁面 - 立法院系統整合</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="./css/authenticated.css">
    <style>
        /* --- 頁面寬度與容器控制 --- */
        .event-content-area, .upload-container {
            max-width: 1100px !important;
            margin: 0 auto !important;
            width: 100%;
        }

        /* --- 標題重新設計 --- */
.section-title {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    
    max-width: 1100px !important;
    margin: 60px auto 35px;
    width: 100%;
    
    color: var(--ly-blue);
    font-size: 2em;
    font-weight: 900;
    letter-spacing: 6px;
    
    /* 標題背景微調：增加行政層次感 */
    background: linear-gradient(to right, transparent, rgba(0, 49, 83, 0.02), transparent);
    padding: 20px 0;
    position: relative;
}

/* 標題下方的漸層裝飾線 */
.section-title::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%; /* 線條寬度 */
    height: 4px; /* 線條厚度 */
    border-radius: 2px;
    
    /* 使用您指定的色彩進行漸層設計：從深藍到透明 */
    background: linear-gradient(to right, 
        var(--ly-blue) 0%, 
        var(--ly-blue-trans) 50%, 
        transparent 100%
    );
}

.section-title i {
    margin-right: 20px;
    color: var(--ly-blue);
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}
        #event-form-section {
            background: white;
            padding: 40px;
            padding-bottom: 60px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            border-top: 5px solid var(--ly-gold);
            max-width: 1100px !important;
            margin: 0 auto !important;
            width: 100%;
            box-sizing: border-box;
        }

        .btn-confirm {
            border: none;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .btn-confirm:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }

        /* --- 專業小尺寸按鈕 --- */
.btn-action-small {
    padding: 6px 14px;
    font-size: 0.85em;
    border-radius: 15px;
    border: 1px solid transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.3s ease;
    font-weight: 500;
}

/* 編輯按鈕：穩重的深藍風格 */
.btn-edit {
    background: white;
    color: var(--ly-blue);
    border-color: var(--ly-blue);
}
.btn-edit:hover {
    background: var(--ly-blue-trans);
    color: white;
}

/* 刪除按鈕：謹慎的灰紅風格 */
.btn-delete {
    background: white;
    color: #b33a3a;
    border-color: #e0e0e0;
}
.btn-delete:hover {
    background: #b33a3a;
    color: white;
    border-color: #b33a3a;
}
/* --- 專業極小化並排按鈕 --- */
.card-actions {
    margin-left: auto;
    display: flex;
    flex-direction: column; /* 上下並排 */
    gap: 4px;
}

.btn-action-small {
    padding: 3px 8px; /* 縮小按鈕 */
    font-size: 0.75em; /* 縮小字體 */
    border-radius: 4px;
    border: 1px solid transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    transition: all 0.2s ease;
    white-space: nowrap; /* 文字不換行 */
    width: 100%; /* 確保上下按鈕等寬 */
}

.btn-edit {
    background: #f0f4f8;
    color: var(--ly-blue);
    border-color: var(--ly-blue);
}

.btn-delete {
    background: #fffafa;
    color: #b33a3a;
    border-color: #ffcccc;
}
/* 活動展開詳情面板 */
.event-detail-panel {
    display: none; /* 預設隱藏 */
    background: #ffffff;
    border-radius: 15px;
    padding: 30px;
    margin-top: 15px;
    box-shadow: inset 0 2px 10px rgba(0,0,0,0.05);
    border-left: 5px solid var(--ly-gold);
    width: 100%;
    box-sizing: border-box;
}

/* 詳情內的欄位樣式 */
.detail-row { margin-bottom: 20px; }
.detail-label { font-weight: bold; color: var(--ly-blue); display: block; margin-bottom: 8px; font-size: 1.1em; }
.detail-content { color: #444; line-height: 1.6; }

/* 展開後的成員頭像清單 */
.detail-member-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 10px;
}
.member-avatar-box {
    text-align: center;
    width: 80px;
}
.member-avatar-box img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid #eee;
    object-fit: cover;
}
.member-avatar-box span {
    display: block;
    font-size: 0.85em;
    margin-top: 5px;
    color: var(--ly-blue);
    font-weight: bold;
}
/* --- 置中彈出詳情面板 (最上層) --- */
.detail-modal {
    display: none; 
    position: fixed; 
    z-index: 5000; /* 確保在最上層 */
    left: 0; top: 0; width: 100%; height: 100%;
    background: rgba(0, 49, 83, 0.6); /* 使用半透明主藍作為遮罩 */
    justify-content: center; align-items: center;
}

.detail-modal-content {
    background: white;
    width: 90%;
    max-width: 800px; /* 寬度置中顯示 */
    max-height: 85vh;
    border-radius: 20px;
    padding: 40px;
    overflow-y: auto;
    position: relative;
    border-top: 8px solid var(--ly-gold);
    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}

/* --- 按鈕重新設計：顏色與不換行 --- */
.card-footer-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #eee;
}

.btn-action-premium {
    padding: 10px 24px;
    font-size: 0.95em;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s;
    white-space: nowrap; /* 強制文字不換行 */
    font-weight: 600;
}

/* 編輯按鈕：深藍底白字，更顯專業 */
.btn-edit-new {
    background-color: var(--ly-blue);
    color: white;
}
.btn-edit-new:hover {
    background-color: #004a7c;
    box-shadow: 0 4px 12px rgba(0,49,83,0.3);
}

/* 刪除按鈕：淡紅底深紅字，警示但不刺眼 */
.btn-delete-new {
    background-color: #fff0f0;
    color: #d93025;
    border: 1px solid #f8d7da;
}
.btn-delete-new:hover {
    background-color: #d93025;
    color: white;
}
/* --- 專業儲存與取消按鈕 --- */
.btn-large-admin {
    padding: 14px 45px;
    font-size: 1.1em;
    font-weight: 900;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s;
    letter-spacing: 2px;
    border: none;
    display: flex;
    align-items: center;
    gap: 10px;
    white-space: nowrap;
}

/* 儲存按鈕：深藍金邊風格 */
.btn-save-edit {
    background: var(--ly-blue);
    color: white;
    border-bottom: 4px solid #001f35;
}
.btn-save-edit:hover {
    background: #004070;
    transform: translateY(-2px);
}

/* 取消按鈕：專業灰階風格 */
.btn-cancel-edit {
    background: #e0e0e0;
    color: #444;
    border-bottom: 4px solid #bbb;
}
.btn-cancel-edit:hover {
    background: #d0d0d0;
}

/* --- 拖移排序視覺反饋 --- */
.draggable-item.dragging {
    opacity: 0.5;
    border: 2px dashed var(--ly-gold);
}
/* --- 專業警告紅字設計：投票截止時間 --- */
.vote-deadline-alert {
    color: #d93025; /* 專業行政紅 */
    background-color: #fce8e6;
    padding: 8px 15px;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 900;
    font-size: 0.95em;
    border: 1px solid #fad2cf;
    margin-top: 10px;
    white-space: nowrap;
}

/* --- 圖片上傳預覽容器 --- */
#image-upload-preview-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 15px;
}
.upload-preview-item {
    width: 120px;
    height: 120px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
.upload-preview-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* --- 儲存後顯示的圖片樣式 (適中、陰影、無邊框) --- */
.event-display-image {
    max-width: 100%;       /* 寬度隨網頁調整 */
    height: auto;
    max-height: 400px;     /* 限制高度避免過大 */
    border-radius: 12px;   /* 圓角增加專業感 */
    border: none !important; /* 強制無邊框 */
    box-shadow: 0 10px 30px rgba(0,0,0,0.15); /* 專業立體陰影 */
    margin: 15px 0;
    display: block;
    object-fit: contain;
}

/* 新增圖片欄位按鈕樣式 */
.tag-btn-img {
    background: #fdf7e3;
    border: 1.5px solid var(--ly-gold);
    color: #856404;
}
.tag-btn-img:hover {
    background: var(--ly-gold);
    color: white;
}

/* 拖移排序時的視覺反饋 */
.draggable-item.dragging {
    opacity: 0.4;
    border: 2px dashed var(--ly-gold);
    background: #fff9e6;
}

        .form-group { margin-bottom: 25px; }
        .form-group label { font-weight: bold; color: var(--ly-blue); display: block; margin-bottom: 5px; }
        .form-input { 
            width: 100%; padding: 12px; border: 1px solid var(--border-color); 
            border-radius: 8px; margin-top: 8px; box-sizing: border-box;
            transition: border-color 0.3s;
        }
        .form-input:focus { border-color: var(--ly-gold); outline: none; }

        .field-adder-bar { 
            display: flex; flex-wrap: wrap; gap: 12px; margin: 20px 0; 
            padding: 20px; background: #f8f9fa; border-radius: 12px;
            border: 1px solid #eee;
        }
        .tag-btn { 
            background: white; border: 1.5px solid var(--ly-blue); color: var(--ly-blue); 
            padding: 6px 16px; border-radius: 20px; cursor: pointer; font-size: 0.9em; 
            transition: all 0.3s; font-weight: 500;
        }
        .tag-btn:hover { background: var(--ly-blue); color: white; transform: translateY(-2px); }

        .draggable-item { 
            display: flex; align-items: center; background: #fff; 
            border: 1px solid #e0e0e0; padding: 15px; margin-bottom: 12px; 
            border-radius: 10px; cursor: grab; transition: box-shadow 0.2s;
        }
        .drag-handle { margin-right: 18px; color: #bbb; font-size: 1.1em; }

        .member-preview-list { 
            display: flex; flex-wrap: wrap; gap: 10px; padding: 15px; 
            background: #fafafa; border: 1.5px dashed #d0d0d0; border-radius: 10px;
            min-height: 50px; align-items: center;
        }

        .picker-grid { 
            display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); 
            gap: 15px; max-height: 450px; overflow-y: auto; padding: 15px;
        }
        .picker-item { 
            text-align: center; padding: 15px 10px; border: 2px solid #f0f0f0; 
            border-radius: 12px; cursor: pointer; transition: all 0.3s ease;
            background: white;
        }
        .picker-item.selected { 
            border-color: var(--ly-gold); 
            background: rgba(207, 169, 0, 0.08); 
        }
        .picker-item img { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; margin-bottom: 8px; }

        .modal {
            display: none; position: fixed; z-index: 3000; left: 0; top: 0; width: 100%; height: 100%;
            background-color: rgba(0,0,0,0.5); justify-content: center; align-items: center;
        }
        .modal-content {
            background-color: #fff; padding: 25px; border-radius: 15px; width: 90%;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2); border-top: 6px solid var(--ly-gold);
        }

        .mini-member-card-rich {
            display: flex; align-items: center; background: var(--ly-blue); color: white;
            padding: 5px 12px 5px 6px; border-radius: 20px; font-size: 0.85em; gap: 8px;
        }
        .mini-member-card-rich img { width: 24px; height: 24px; border-radius: 50%; object-fit: cover; }

        .event-grid-container {
            display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 20px; padding-bottom: 40px; max-width: 1100px; margin: 0 auto;
        }

        .info-card-item {
            background: white; border-radius: 12px; padding: 20px; display: flex;
            align-items: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            border-left: 5px solid var(--ly-gold); transition: 0.3s; text-decoration: none;
        }
        .info-card-item:hover { transform: translateY(-5px); }

        .card-date-badge {
            background: var(--ly-blue); color: var(--ly-gold); min-width: 60px; height: 60px;
            border-radius: 50%; display: flex; flex-direction: column; justify-content: center;
            align-items: center; margin-right: 20px; font-weight: bold; border: 2px solid var(--ly-gold);
        }
        .card-date-badge span { font-size: 0.7em; }
        .card-info-text h4 { margin: 0; color: var(--ly-blue); font-size: 1.2em; }
        .card-info-text p { margin: 5px 0 0; color: #666; font-size: 0.9em; }

        /* --- 強制鎖定遮罩 --- */
/* --- 修正版：絕對鎖定遮罩 --- */
#upload-overlay {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background: rgba(0, 49, 83, 0.98) !important; /* 近乎不透明的行政藍 */
    z-index: 200000 !important; /* 設定到 20 萬，確保壓過所有側邊欄與 Modal */
    
    /* 初始狀態：完全透明且縮小到角落 */
    opacity: 0;
    visibility: hidden;
    display: flex !important; /* 永遠保持 flex，由 visibility 控制 */
    
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    transition: opacity 0.3s ease; /* 增加平滑感 */
}

/* 當啟動時的 class */
#upload-overlay.active {
    opacity: 1 !important;
    visibility: visible !important;
}

.loader-spinner {
    width: 70px; height: 70px;
    border: 8px solid rgba(255, 255, 255, 0.1);
    border-top: 8px solid #cfaf3c; /* 立法院金 */
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 25px;
}
/* 預設隱藏所有管理功能按鈕 */
#confirmYes, 
.admin-actions, 
.btn-save-edit, 
.btn-delete-event {
    display: none !important;
}

/* 當驗證通過時，由 JS 加入此 class 來顯示 */
.auth-passed {
    display: block !important;
}
.auth-passed-flex {
    display: flex !important;
}

        /* --- 手機版專屬按鈕排列 --- */
        @media (max-width: 768px) {
            .card-footer-actions {
                flex-direction: column; /* 改為垂直排列 */
                gap: 15px; /* 增加間距 */
                align-items: center;
            }

            .btn-action-premium {
                width: 100%; /* 手機版按鈕撐滿寬度 */
                max-width: 300px; /* 限制最大寬度保持美感 */
                justify-content: center;
                padding: 12px 20px; /* 增加點擊區域面積 */
            }
        }
    </style>
</head>
<body>
        
    <div id="upload-overlay">
        <div class="loader-spinner"></div>
        <div style="font-size: 1.2em; font-weight: bold; letter-spacing: 2px;">資料上傳中，請稍候...</div>
        <p style="margin-top: 10px; opacity: 0.8;">正在同步雲端資料庫，請勿關閉視窗</p>
    </div>

    <div id="header-layout"></div>
    <div id="sidebar"></div>
    
    <main class="event-content-area">
        <div class="section-title"><i class="fas fa-gavel"></i> 活動辦理中心</div>
        
        <div style="text-align: center; margin-bottom: 40px;">
            <button class="btn-confirm" onclick="toggleEventForm()" style="background: var(--ly-blue); color: white; padding: 15px 40px; font-size: 1.1em;">
                <i class="fas fa-plus-circle"></i> 發起新活動
            </button>
        </div>

        <section id="event-form-section" class="upload-container" style="display: none;">
            <div class="form-group">
                <label>① 活動標題 <small style="color:red;">(必填)</small></label>
                <input type="text" id="ev-title" class="form-input" placeholder="請輸入標題">
            </div>

            <div id="dynamic-fields-container"></div>

        <div class="field-adder-bar">
            <button class="tag-btn" onclick="addField('headline', '大標題')">+ 大標題</button>
            <button class="tag-btn" onclick="addField('location', '地點')">+ 地點</button>
            <button class="tag-btn" onclick="addField('meetup', '集合時間')">+ 集合時間</button>
            <button class="tag-btn" onclick="addField('time', '活動時間')">+ 活動時間</button>
            <button class="tag-btn" onclick="addField('content_text', '活動內容')">+ 內容</button>
            <button class="tag-btn tag-btn-img" onclick="addField('image_upload', '活動照片')">
                <i class="fas fa-image"></i> + 圖片欄位
            </button>
        </div>

            <div class="section-title" style="font-size: 1.1em; margin-top: 30px;">參加成員名單</div>
            <div id="selected-members-preview" class="member-preview-list">
                <p style="color: #999; font-size: 0.9em;">尚未選擇成員</p>
            </div>
            <button class="btn-confirm" onclick="openMemberPicker()" style="background: var(--ly-gold); margin-top: 10px;">
                <i class="fas fa-users-cog"></i> 編輯參加成員名單
            </button>

            <div class="form-group" style="margin-top: 30px;">
                <label>⑦ 設定投票結束時間</label>
                <input type="datetime-local" id="ev-deadline" class="form-input">
            </div>

            <div style="margin-top: 40px; display: flex; gap: 20px; justify-content: center;">
                <button class="btn-large-admin btn-save-edit" onclick="confirmSubmitEvent()">
                    <i class="fas fa-plus-circle"></i> 確認新增活動
                </button>
                <button class="btn-large-admin btn-cancel-edit" onclick="cancelEventForm()">
                    <i class="fas fa-undo"></i> 取消
                </button>
            </div>
        </section>

        <div class="section-title"><i class="fas fa-list-check"></i> 已建立活動</div>
        <div id="event-list-display" class="event-grid-container"></div>
    </main>

    <div id="memberPickerModal" class="modal">
        <div class="modal-content" style="max-width: 600px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                <h3 style="margin:0; color: var(--ly-blue);">勾選參加成員</h3>
                <button onclick="handleModalClose()" style="border:none; background:none; font-size:1.5rem; cursor:pointer;">&times;</button>
            </div>
            <div id="picker-member-grid" class="picker-grid"></div>
            <div style="text-align: right; margin-top: 20px;">
                <button class="btn-confirm" onclick="saveSelectedMembers()" style="background: var(--ly-gold); color: white;">確認勾選</button>
            </div>
        </div>
    </div>

    <div id="customConfirmModal" class="modal">
        <div class="modal-content" style="max-width: 400px; text-align: center;">
            <i class="fas fa-question-circle" style="font-size: 3rem; color: var(--ly-gold); margin-bottom: 15px;"></i>
            <h3 style="margin-bottom: 10px;">發布確認</h3>
            <p>確定要新增此活動嗎？</p>
            <div style="margin-top: 25px; display: flex; gap: 10px; justify-content: center;">
                <button class="btn-confirm" id="confirmYes" style="background: #28a745; color: white; padding: 10px 25px;">確認新增</button>
                <button class="btn-confirm" id="confirmNo" style="background: #666; color: white; padding: 10px 25px;">返回編輯</button>
            </div>
        </div>
    </div>

    <div id="footer-layout"></div>

    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-storage-compat.js"></script>

    <script src="./js/dashboard.js"></script>

    <script>
    // --- 初始化全域變數 ---
    const auth = firebase.auth();
    const storage = firebase.storage();
    // 設定授權 Email 名單
    const AUTHORIZED_EMAILS = ["wu@ll.com", "boss@ll.com"];

    let currentSelectedUIDs = []; 
    let tempSelectedUIDs = [];   
    let uploadedImages = []; // 暫存圖片資料 
    let isMemberEdited = false;  
    let currentEditingId = null; // 全域變數紀錄目前編輯中的活動 ID

    // --- 3. 頁面初始化與編輯邏輯修正 ---
    document.addEventListener("DOMContentLoaded", async () => {
        if (typeof loadLayout === "function") await loadLayout('Dashboard'); 
        
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userEmail = user.email;
                console.log("當前登入者:", userEmail);

                // 檢查是否為授權成員
                if (AUTHORIZED_EMAILS.includes(userEmail)) {
                    console.log("權限驗證通過");
                    
                    // 顯示「確認新增」按鈕
                    const confirmBtn = document.getElementById('confirmYes');
                    if (confirmBtn) confirmBtn.classList.add('auth-passed');

                    // 顯示頁面上的「儲存修改」按鈕
                    const saveBtn = document.querySelector('.btn-save-edit');
                    if (saveBtn) saveBtn.classList.add('auth-passed');
                    
                    // 這裡可以觸發一個自定義函式來顯示列表中的編輯/刪除按鈕
                    showAdminControls(); 
                } else {
                    console.warn("未授權的帳號");
                }
            } else {
                window.location.href = "login.html";
            }
        });

        // 顯示列表中按鈕的函式
        function showAdminControls() {
            // 針對所有動態生成的編輯與刪除按鈕進行顯示
            const adminNodes = document.querySelectorAll('.admin-actions, .btn-delete-event');
            adminNodes.forEach(node => {
                node.classList.add('auth-passed-flex');
            });
        }

        if (typeof syncMemberData === "function") {
            await syncMemberData("班長", "歡迎登入立法院", "組織活動與通訊的集會所");
        }
    });

    // 展開/關閉區域
    function toggleEventForm() {
        const section = document.getElementById('event-form-section');
        if (!section) return;
        const isOpening = section.style.display === 'none';
        section.style.display = isOpening ? 'block' : 'none';
        if (isOpening) {
            section.style.marginBottom = "15px";
            window.scrollTo({ top: section.offsetTop - 50, behavior: 'smooth' });
        }
    }

    function cancelEventForm() {
        const section = document.getElementById('event-form-section');
        if (section) section.style.display = 'none';
    }

    // 動態欄位增減
    function addField(type, label) {
        const container = document.getElementById('dynamic-fields-container');
        const fieldId = Date.now();
        let inputHtml = '';

        if (type === 'image_upload') {
            inputHtml = `
                <div style="flex-grow:1;">
                    <label style="font-size:0.85em; color:var(--ly-blue); font-weight:bold;">${label}</label>
                    <input type="file" class="form-input ev-dynamic-file" accept="image/*" onchange="handleDynamicImage(this, '${fieldId}')" style="padding:5px;">
                    <div id="preview-${fieldId}" class="image-field-preview" style="margin-top:10px;"></div>
                    <input type="hidden" class="ev-dynamic-input" data-field-type="image_base64">
                </div>`;
        } else {
            const inputType = (type === 'time' || type === 'meetup') ? 'datetime-local' : 'text';
            inputHtml = `
                <div style="flex-grow:1;">
                    <label style="font-size:0.85em; color:var(--ly-blue); font-weight:bold;">${label}</label>
                    <input type="${inputType}" class="form-input ev-dynamic-input" placeholder="請輸入${label}內容">
                </div>`;
        }

        const html = `
            <div class="draggable-item" data-type="${type}" id="field-${fieldId}" draggable="true">
                <i class="fas fa-grip-lines drag-handle"></i>
                ${inputHtml}
                <button onclick="this.parentElement.remove()" style="border:none; background:none; color:#ff4d4d; cursor:pointer; margin-left:10px;">&times;</button>
            </div>`;
        
        container.insertAdjacentHTML('beforeend', html);
        initDragAndDrop(); 
    }

    function handleDynamicImage(input, fieldId) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const previewContainer = document.getElementById(`preview-${fieldId}`);
                if (previewContainer) {
                    previewContainer.innerHTML = `
                        <img src="${e.target.result}" 
                             class="event-display-image" 
                             style="max-height:150px; margin:10px 0; display:block;">`;
                }
                const parentDiv = input.parentElement;
                const hiddenInput = parentDiv.querySelector('.ev-dynamic-input');
                if (hiddenInput) hiddenInput.value = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    // 編輯功能
    async function editEvent(id) {
        currentEditingId = id;
        try {
            const doc = await db.collection("events").doc(id).get();
            if (!doc.exists) return alert("找不到活動資料");
            const data = doc.data();

            document.getElementById('ev-title').value = data.title;
            document.getElementById('ev-deadline').value = data.deadline || "";

            currentSelectedUIDs = data.participants || [];
            const selectedData = [];
            for (const uid of currentSelectedUIDs) {
                const mDoc = await db.collection("content").doc(uid).get();
                if (mDoc.exists) {
                    const m = mDoc.data();
                    selectedData.push({ id: uid, name: m.text, img: m.imageUrl });
                }
            }
            renderMemberPreview(selectedData);

            const container = document.getElementById('dynamic-fields-container');
            container.innerHTML = ""; 

            if (data.fields) {
                data.fields.forEach(f => {
                    addField(f.type, f.label);
                    const lastItem = container.querySelector('.draggable-item:last-child');
                    
                    if (f.type === 'image_upload') {
                        const hiddenInput = lastItem.querySelector('.ev-dynamic-input');
                        if (hiddenInput) hiddenInput.value = f.content; 
                        
                        const fieldId = lastItem.id.replace('field-', '');
                        const preview = document.getElementById(`preview-${fieldId}`);
                        if (preview && f.content) {
                            preview.innerHTML = `<img src="${f.content}" class="event-display-image" style="max-height:150px; margin:10px 0; display:block;">`;
                        }
                    } else {
                        const lastInput = lastItem.querySelector('.ev-dynamic-input');
                        if (lastInput) lastInput.value = f.content;
                    }
                });
            }

            updateFormButtons(true);
            document.getElementById('event-form-section').style.display = 'block';
            window.scrollTo({ top: document.getElementById('event-form-section').offsetTop - 100, behavior: 'smooth' });
            
        } catch (e) { 
            console.error("編輯讀取失敗:", e);
        }
    }

    // 拖移排序
    function initDragAndDrop() {
        const container = document.getElementById('dynamic-fields-container');
        const items = container.querySelectorAll('.draggable-item');

        items.forEach(item => {
            item.addEventListener('dragstart', () => item.classList.add('dragging'));
            item.addEventListener('dragend', () => item.classList.remove('dragging'));
        });

        container.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(container, e.clientY);
            const draggingItem = document.querySelector('.dragging');
            if (afterElement == null) {
                container.appendChild(draggingItem);
            } else {
                container.insertBefore(draggingItem, afterElement);
            }
        });
    }

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable-item:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // 成員選擇器
    async function openMemberPicker() {
        const grid = document.getElementById('picker-member-grid');
        grid.innerHTML = "讀取成員中...";
        const modal = document.getElementById('memberPickerModal');
        if (modal) modal.style.display = 'flex';
        tempSelectedUIDs = [...currentSelectedUIDs];
        isMemberEdited = false;

        const snapshot = await db.collection("content").orderBy("timestamp", "asc").get();
        grid.innerHTML = "";
        snapshot.forEach(doc => {
            const data = doc.data();
            const isSel = tempSelectedUIDs.includes(doc.id) ? "selected" : "";
            const item = document.createElement('div');
            item.className = `picker-item ${isSel}`;
            item.dataset.id = doc.id;
            item.dataset.name = data.text || '未命名';
            item.dataset.img = data.imageUrl || '';
            item.innerHTML = `<img src="${data.imageUrl || ''}" alt="Avatar"><div>${data.text || '未命名'}</div>`;
            item.onclick = () => {
                isMemberEdited = true;
                item.classList.toggle('selected');
                const uid = item.dataset.id;
                if (tempSelectedUIDs.includes(uid)) {
                    tempSelectedUIDs = tempSelectedUIDs.filter(id => id !== uid);
                } else {
                    tempSelectedUIDs.push(uid);
                }
            };
            grid.appendChild(item);
        });
    }

    function saveSelectedMembers() {
        const selectedData = [];
        document.querySelectorAll('.picker-item.selected').forEach(item => {
            selectedData.push({
                id: item.dataset.id,
                name: item.dataset.name,
                img: item.dataset.img
            });
        });
        currentSelectedUIDs = [...tempSelectedUIDs];
        renderMemberPreview(selectedData);
        document.getElementById('memberPickerModal').style.display = 'none';
    }

    function renderMemberPreview(selectedData = []) {
        const preview = document.getElementById('selected-members-preview');
        if (currentSelectedUIDs.length === 0) {
            preview.innerHTML = '<p style="color: #999; font-size: 0.9em;">尚未選擇成員</p>';
            return;
        }
        preview.innerHTML = selectedData.map(member => `
            <div class="mini-member-card-rich">
                <img src="${member.img || ''}" alt="${member.name}">
                <span>${member.name}</span>
            </div>`).join("");
    }

    function handleModalClose() {
        if(isMemberEdited && !confirm("資料尚未儲存是否確認關閉？")) return;
        document.getElementById('memberPickerModal').style.display = 'none';
    }

    // 確認發布功能
    function confirmSubmitEvent() {
        const title = document.getElementById('ev-title').value;
        if(!title) return alert("請填寫活動標題");

        const modal = document.getElementById('customConfirmModal');
        if (modal) modal.style.display = 'flex';

        // 點擊「確認新增」
        document.getElementById('confirmYes').onclick = async () => {
    const overlay = document.getElementById('upload-overlay');
    if (overlay) {
        overlay.classList.add('active');
        console.log("遮罩已強制啟動");
    }

    // 關閉確認視窗
    if (modal) modal.style.display = 'none';

    // 給瀏覽器 10ms 時間渲染遮罩畫面
    await new Promise(resolve => setTimeout(resolve, 10));

    try {
        await executeSubmit(); 
    } catch (err) {
        console.error("處理失敗", err);
        if (overlay) overlay.classList.remove('active');
    }
};

        document.getElementById('confirmNo').onclick = () => {
            if (modal) modal.style.display = 'none';
        };
    }

    // 送出功能（整合日期記錄與 Storage 處理）
    async function executeSubmit() {
        const user = auth.currentUser;
        
        // 最終防線：檢查 Email 是否在名單內
        if (!user || !AUTHORIZED_EMAILS.includes(user.email)) {
            alert("錯誤：您的帳號無權限執行新增或修改操作。");
            return; // 終止程式碼執行
        }

        // --- 原本的遮罩與上傳邏輯 ---
        const overlay = document.getElementById('upload-overlay');
        if (overlay) overlay.classList.add('active');

        const title = document.getElementById('ev-title').value;
        const deadline = document.getElementById('ev-deadline').value;
        if (!title) return alert("請填寫活動標題");

        // 記錄當下日期 (yyyy/mm/dd)
        const now = new Date();
        const dateString = `${now.getFullYear()}/${(now.getMonth()+1).toString().padStart(2,'0')}/${now.getDate().toString().padStart(2,'0')}`;

        try {
            const dynamicFields = [];
            const items = document.querySelectorAll('.draggable-item');
            
            for (const it of items) {
                const type = it.getAttribute('data-type');
                const label = it.querySelector('label').innerText;
                let content = it.querySelector('.ev-dynamic-input').value;

                if (type === 'image_upload' && content.startsWith('data:image')) {
                    const fileName = `events/${Date.now()}_${Math.random().toString(36).substr(2, 9)}.jpg`;
                    const storageRef = firebase.storage().ref(fileName);
                    const snapshot = await storageRef.putString(content, 'data_url');
                    content = await snapshot.ref.getDownloadURL(); 
                }
                dynamicFields.push({ type, label, content });
            }

            const eventData = {
                title: title,
                fields: dynamicFields,
                participants: currentSelectedUIDs,
                deadline: deadline,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                creator: auth.currentUser.email
            };

            if (currentEditingId) {
                await db.collection("events").doc(currentEditingId).update(eventData);
                alert("活動資料已成功更新！");
            } else {
                eventData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
                eventData.formattedDate = dateString; // 新增日期記錄
                await db.collection("events").add(eventData);
                alert("新活動已成功發布！");
            }
            location.reload();
        } catch (e) {
            console.error("儲存失敗:", e);
            alert("儲存失敗，請檢查網路或 Storage 權限。");
        }
    }

    function updateFormButtons(isEdit) {
        const footerBtnArea = document.querySelector("#event-form-section div[style*='justify-content: center']");
        if (footerBtnArea) {
            footerBtnArea.innerHTML = isEdit ? `
                <button class="btn-large-admin btn-save-edit" onclick="confirmSubmitEvent()">
                    <i class="fas fa-check-double"></i> 儲存修改內容
                </button>
                <button class="btn-large-admin btn-cancel-edit" onclick="location.reload()">
                    <i class="fas fa-times"></i> 取消修改
                </button>` : `
                <button class="btn-large-admin" onclick="confirmSubmitEvent()" style="background: var(--ly-blue); color: white;">
                    <i class="fas fa-paper-plane"></i> 立即發布活動
                </button>
                <button class="btn-large-admin" onclick="cancelEventForm()" style="background: #666; color: white;">
                    <i class="fas fa-times"></i> 取消
                </button>`;
        }
    }

    function startEventListen() {
        const display = document.getElementById('event-list-display');
        db.collection("events").orderBy("createdAt", "desc").onSnapshot(snapshot => {
            display.innerHTML = "";
            snapshot.forEach(doc => {
                const ev = doc.data();
                const id = doc.id;
                const timeField = ev.fields ? ev.fields.find(f => f.type === 'time') : null;
                const dateStr = timeField ? timeField.content : "";
                const dateObj = dateStr ? new Date(dateStr) : new Date();
                
                const cardHtml = `
                    <div class="info-card-item" onclick="openDetailModal('${id}')" style="cursor:pointer;">
                        <div class="card-date-badge">
                            ${dateObj.getDate()}<span>${dateObj.toLocaleString('en-us', {month:'short'}).toUpperCase()}</span>
                        </div>
                        <div class="card-info-text">
                            <h4>${ev.title}</h4>
                            <p><i class="far fa-clock"></i> ${dateStr.replace('T', ' ')}</p>
                        </div>
                        <i class="fas fa-external-link-alt" style="margin-left:auto; color:#ccc; font-size:0.8em;"></i>
                    </div>`;
                display.insertAdjacentHTML('beforeend', cardHtml);
            });
        });
    }

    // 開啟詳情彈窗（整合標題平行日期顯示）
    async function openDetailModal(id) {
        const modal = document.getElementById('eventDetailModal');
        const inner = document.getElementById('modal-inner-content');
        const footer = document.getElementById('modal-footer-actions');
        
        modal.style.display = 'flex';
        inner.innerHTML = '<p style="text-align:center; padding:20px;">資料讀取中...</p>';
        
        try {
            const doc = await db.collection("events").doc(id).get();
            const ev = doc.data();

            // 標題與日期平行排列
            let html = `
                <div style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid var(--ly-blue-trans); margin-bottom: 20px; padding-bottom: 10px;">
                    <h2 style="color:var(--ly-blue); margin: 0;">${ev.title}</h2>
                    <span style="color: #666; font-size: 0.85em; font-weight: bold;">
                        新增日期：${ev.formattedDate || '無紀錄'}
                    </span>
                </div>`;

            if (ev.deadline) {
                html += `
                    <div style="text-align:center; margin-bottom:25px;">
                        <div class="vote-deadline-alert">
                            <i class="fas fa-exclamation-triangle"></i>
                            投票截止時間：${ev.deadline.replace('T', ' ')}
                        </div>
                    </div>`;
            }

            if (ev.fields) {
                ev.fields.forEach(f => {
                    if (f.type === 'image_upload' && f.content) {
                        html += `
                            <div class="detail-row" style="text-align:center;">
                                <span class="detail-label">● ${f.label}</span>
                                <img src="${f.content}" class="event-display-image">
                            </div>`;
                    } else {
                        html += `
                            <div class="detail-row">
                                <span class="detail-label">● ${f.label}</span>
                                <div class="detail-content">${f.content.replace('T', ' ')}</div>
                            </div>`;
                    }
                });
            }

            html += `<span class="detail-label">● 出席成員：</span><div class="detail-member-grid">`;
            if (ev.participants && ev.participants.length > 0) {
                for (const uid of ev.participants) {
                    const mDoc = await db.collection("content").doc(uid).get();
                    if (mDoc.exists) {
                        const m = mDoc.data();
                        html += `
                            <div class="member-avatar-box">
                                <img src="${m.imageUrl || ''}" alt="Avatar">
                                <span>${m.text || '成員'}</span>
                            </div>`;
                    }
                }
            } else {
                html += `<p style="color:#999; margin-left:10px;">尚未選擇成員</p>`;
            }
            html += `</div>`;

            inner.innerHTML = html;

            footer.innerHTML = `
                <button onclick="closeDetailModal();" class="btn-action-premium" style="background:#e0e0e0; color:#333;">
                    <i class="fas fa-arrow-left"></i> 返回列表
                </button>
                <button onclick="closeDetailModal(); editEvent('${id}');" class="btn-action-premium btn-edit-new">
                    <i class="fas fa-edit"></i> 編輯活動內容
                </button>
                <button onclick="closeDetailModal(); deleteEvent('${id}');" class="btn-action-premium btn-delete-new">
                    <i class="fas fa-trash-alt"></i> 刪除此項活動
                </button>
            `;
        } catch (e) {
            console.error("讀取詳情失敗:", e);
        }
    }

    function closeDetailModal() {
        document.getElementById('eventDetailModal').style.display = 'none';
    }

    // 刪除活動（同步刪除 Storage 檔案）
    async function deleteEvent(id) {
        if (!confirm("資料刪除後無法復原，確定要移除此活動及其所有圖片嗎？")) return;

        try {
            const doc = await db.collection("events").doc(id).get();
            if (!doc.exists) return alert("找不到該活動資料。");
            const ev = doc.data();

            if (ev.fields) {
                const imageDeletePromises = ev.fields
                    .filter(f => f.type === 'image_upload' && f.content && f.content.includes("firebasestorage"))
                    .map(f => {
                        const storageRef = firebase.storage().refFromURL(f.content);
                        return storageRef.delete().catch(err => console.warn("檔案不存在:", f.content));
                    });
                await Promise.all(imageDeletePromises);
            }

            await db.collection("events").doc(id).delete();
            alert("活動及其相關圖片已成功移除！");
            closeDetailModal();
        } catch (e) {
            console.error("刪除操作發生錯誤:", e);
            alert("刪除失敗，請檢查權限。");
        }
    }

    // 選單與登出功能
    window.toggleNav = function() {
        const sidebar = document.getElementById("mySidebar");
        const overlay = document.getElementById("overlay");
        if (sidebar.style.width === "250px") {
            sidebar.style.width = "0";
            overlay.style.display = "none";
        } else {
            sidebar.style.width = "250px";
            overlay.style.display = "block";
        }
    };

    function confirmLogout() { 
        if (confirm("確定登出系統？")) {
            auth.signOut().then(() => {
                alert("已成功登出");
                window.location.href = "login.html";
            });
        }
    }
</script>
    <div id="customConfirmModal" class="modal">
        <div class="modal-content" style="max-width: 400px; text-align: center;">
            <i class="fas fa-question-circle" style="font-size: 3rem; color: var(--ly-gold); margin-bottom: 15px;"></i>
            <h3 style="margin-bottom: 10px;">發布確認</h3>
            <p>確定要新增此活動嗎？</p>
            <div style="margin-top: 25px; display: flex; gap: 10px; justify-content: center;">
                <button class="btn-confirm" id="confirmYes" style="background: #28a745; color: white; padding: 10px 25px;">確認新增</button>
                <button class="btn-confirm" id="confirmNo" style="background: #666; color: white; padding: 10px 25px;">返回編輯</button>
            </div>
        </div>
    </div> <div id="footer-layout"></div>

    <div id="eventDetailModal" class="detail-modal">
    <div class="detail-modal-content">
        <button onclick="closeDetailModal()" style="position:absolute; right:20px; top:20px; border:none; background:none; font-size:1.5rem; cursor:pointer; color:#999;">&times;</button>
        <div id="modal-inner-content">
            </div>
        <div class="card-footer-actions" id="modal-footer-actions">
            </div>
    </div>


</body>
</html>
```
