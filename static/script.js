document.addEventListener('DOMContentLoaded', () => {
    // 1. 카테고리 필터링
    const buttons = document.querySelectorAll('.cat-btn');
    const cards = document.querySelectorAll('.card');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');
            cards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 2. 피부/얼굴 색상 30종
    const SKIN_COLORS = [
        { name: "클래식 옐로우", color: "#FFCF00" }, { name: "라이트 누드", color: "#FCE2C4" },
        { name: "미디엄 누드", color: "#E0B389" }, { name: "탠 브라운", color: "#C68E56" },
        { name: "다크 브라운", color: "#6A4527" }, { name: "에스프레소", color: "#3B2219" },
        { name: "스노우 화이트", color: "#FFFFFF" }, { name: "페일 블루", color: "#A5C8E4" },
        { name: "에일리언 그린", color: "#74C653" }, { name: "오크 다크그린", color: "#3E7A31" },
        { name: "사이버 사이언", color: "#00D2FF" }, { name: "로열 블루", color: "#1D4ED8" },
        { name: "네온 퍼플", color: "#9333EA" }, { name: "파스텔 라벤더", color: "#C4B5FD" },
        { name: "마젠타 핑크", color: "#EC4899" }, { name: "선셋 오렌지", color: "#F97316" },
        { name: "크림슨 레드", color: "#DC2626" }, { name: "루비 버건디", color: "#831843" },
        { name: "피치 코랄", color: "#FDBA74" }, { name: "레몬 라임", color: "#84CC16" },
        { name: "민트 에메랄드", color: "#10B981" }, { name: "틸 터쿼이즈", color: "#0D9488" },
        { name: "미디엄 그레이", color: "#94A3B8" }, { name: "다크 슬레이트", color: "#475569" },
        { name: "옵시디언 블랙", color: "#1E293B" }, { name: "골드 브론즈", color: "#D97706" },
        { name: "샴페인 펄", color: "#FEF08A" }, { name: "아쿠아 마린", color: "#67E8F9" },
        { name: "로즈 골드", color: "#FDA4AF" }, { name: "코스믹 실버", color: "#E2E8F0" }
    ];

    // 3. 눈썹, 눈, 입 조합 표정 30종
    const FACES = [
        { name: "클래식 스마일", browL: "brow-normal", browR: "brow-normal", eyeL: "eye-dot", eyeR: "eye-dot", mouth: "smile" },
        { name: "자신만만 썩소", browL: "brow-raised", browR: "brow-normal", eyeL: "eye-dot", eyeR: "eye-dot", mouth: "smirk" },
        { name: "호탕한 폭소", browL: "brow-raised", browR: "brow-raised", eyeL: "eye-closed", eyeR: "eye-closed", mouth: "grin" },
        { name: "깜짝 놀람", browL: "brow-raised", browR: "brow-raised", eyeL: "eye-dot", eyeR: "eye-dot", mouth: "shock" },
        { name: "장난꾸러기 윙크", browL: "brow-normal", browR: "brow-raised", eyeL: "eye-wink", eyeR: "eye-dot", mouth: "tongue" },
        { name: "비장한 분노", browL: "brow-angry-left", browR: "brow-angry-right", eyeL: "eye-angry", eyeR: "eye-angry", mouth: "angry" },
        { name: "선글라스 요원", browL: "brow-normal", browR: "brow-normal", eyeL: "eye-sunglass", eyeR: "eye-sunglass", mouth: "smirk" },
        { name: "해적 안대", browL: "brow-angry-left", browR: "brow-normal", eyeL: "eye-eyepatch", eyeR: "eye-dot", mouth: "grin" },
        { name: "걱정 가득", browL: "brow-worried-left", browR: "brow-worried-right", eyeL: "eye-dot", eyeR: "eye-dot", mouth: "sad" },
        { name: "단호한 결의", browL: "brow-angry-left", browR: "brow-angry-right", eyeL: "eye-dot", eyeR: "eye-dot", mouth: "open" },
        { name: "귀여운 애교", browL: "brow-raised", browR: "brow-raised", eyeL: "eye-dot", eyeR: "eye-wink", mouth: "smile" },
        { name: "잠자는 얼굴", browL: "brow-normal", browR: "brow-normal", eyeL: "eye-closed", eyeR: "eye-closed", mouth: "open" },
        { name: "시스 전사", browL: "brow-angry-left", browR: "brow-angry-right", eyeL: "eye-angry", eyeR: "eye-angry", mouth: "smirk" },
        { name: "제다이 집중", browL: "brow-normal", browR: "brow-angry-right", eyeL: "eye-dot", eyeR: "eye-dot", mouth: "smile" },
        { name: "사이버 전사", browL: "brow-normal", browR: "brow-normal", eyeL: "eye-sunglass", eyeR: "eye-dot", mouth: "smirk" },
        { name: "겁에 질림", browL: "brow-worried-left", browR: "brow-worried-right", eyeL: "eye-dot", eyeR: "eye-dot", mouth: "shock" },
        { name: "승리의 미소", browL: "brow-raised", browR: "brow-normal", eyeL: "eye-dot", eyeR: "eye-wink", mouth: "grin" },
        { name: "차가운 악당", browL: "brow-angry-left", browR: "brow-angry-right", eyeL: "eye-dot", eyeR: "eye-dot", mouth: "angry" },
        { name: "의기양양", browL: "brow-raised", browR: "brow-raised", eyeL: "eye-dot", eyeR: "eye-dot", mouth: "tongue" },
        { name: "어리둥절", browL: "brow-raised", browR: "brow-worried-right", eyeL: "eye-dot", eyeR: "eye-dot", mouth: "open" },
        { name: "닌자 집중", browL: "brow-angry-left", browR: "brow-angry-right", eyeL: "eye-angry", eyeR: "eye-angry", mouth: "open" },
        { name: "레이서 쾌남", browL: "brow-normal", browR: "brow-raised", eyeL: "eye-dot", eyeR: "eye-wink", mouth: "grin" },
        { name: "마법사 현자", browL: "brow-normal", browR: "brow-normal", eyeL: "eye-dot", eyeR: "eye-dot", mouth: "smile" },
        { name: "의심의 눈초리", browL: "brow-raised", browR: "brow-angry-right", eyeL: "eye-dot", eyeR: "eye-angry", mouth: "smirk" },
        { name: "피곤한 하루", browL: "brow-worried-left", browR: "brow-worried-right", eyeL: "eye-closed", eyeR: "eye-closed", mouth: "sad" },
        { name: "히어로 각성", browL: "brow-angry-left", browR: "brow-angry-right", eyeL: "eye-dot", eyeR: "eye-dot", mouth: "grin" },
        { name: "바이킹 전사", browL: "brow-angry-left", browR: "brow-angry-right", eyeL: "eye-angry", eyeR: "eye-angry", mouth: "angry" },
        { name: "우주 비행사", browL: "brow-normal", browR: "brow-normal", eyeL: "eye-dot", eyeR: "eye-dot", mouth: "open" },
        { name: "스파이 요원", browL: "brow-normal", browR: "brow-normal", eyeL: "eye-sunglass", eyeR: "eye-sunglass", mouth: "smile" },
        { name: "익살꾼 광대", browL: "brow-raised", browR: "brow-raised", eyeL: "eye-wink", eyeR: "eye-dot", mouth: "tongue" }
    ];

    // 4. 실제 디테일 레고 옷 30종
    const TOPS = [
        { name: "소방관 방열복 (형광띠)", color: "#EA580C", collar: "#FACC15", badge: "🔥", zip: "#FACC15", belt: "#1E293B" },
        { name: "경찰관 제복 (뱃지+타이)", color: "#1E3A8A", collar: "#FFFFFF", badge: "⭐", zip: "#111827", belt: "#0F172A" },
        { name: "제다이 마스터 튜닉", color: "#78350F", collar: "#D97706", badge: "⚡", zip: "#B45309", belt: "#451A03" },
        { name: "시스 아머 로브", color: "#111827", collar: "#DC2626", badge: "🔴", zip: "#991B1B", belt: "#450A0A" },
        { name: "NASA 우주비행사 슈트", color: "#F8FAFC", collar: "#2563EB", badge: "🚀", zip: "#3B82F6", belt: "#1E40AF" },
        { name: "의사 수술복 & 청진기", color: "#0284C7", collar: "#E0F2FE", badge: "🩺", zip: "#38BDF8", belt: "#0369A1" },
        { name: "턱시도 정장 & 보타이", color: "#000000", collar: "#FFFFFF", badge: "👔", zip: "#FFFFFF", belt: "#18181B" },
        { name: "중세 기사 체인메일 갑옷", color: "#64748B", collar: "#94A3B8", badge: "🛡️", zip: "#CBD5E1", belt: "#334155" },
        { name: "사이버펑크 네온 재킷", color: "#7C3AED", collar: "#22D3EE", badge: "💠", zip: "#EC4899", belt: "#1E1B4B" },
        { name: "해적 선장 금장 코트", color: "#991B1B", collar: "#FACC15", badge: "☠️", zip: "#EAB308", belt: "#451A03" },
        { name: "바이킹 털가죽 튜닉", color: "#573516", collar: "#A16207", badge: "🪓", zip: "#78350F", belt: "#291807" },
        { name: "마법사 성좌 로브", color: "#4C1D95", collar: "#C4B5FD", badge: "🔮", zip: "#8B5CF6", belt: "#2E1065" },
        { name: "슈퍼히어로 에메랄드 슈트", color: "#059669", collar: "#34D399", badge: "⚡", zip: "#10B981", belt: "#064E3B" },
        { name: "닌자 암살자 도복", color: "#1F2937", collar: "#DC2626", badge: "🗡️", zip: "#4B5563", belt: "#111827" },
        { name: "레이싱 챔피언 점퍼", color: "#FBBF24", collar: "#B91C1C", badge: "🏁", zip: "#DC2626", belt: "#18181B" },
        { name: "카우보이 가죽 베스트", color: "#92400E", collar: "#FDE68A", badge: "🤠", zip: "#78350F", belt: "#451A03" },
        { name: "탑건 파일럿 보머재킷", color: "#4D3820", collar: "#E4E4E7", badge: "✈️", zip: "#A1A1AA", belt: "#271E14" },
        { name: "택티컬 군용 방탄조끼", color: "#365314", collar: "#65A30D", badge: "🎖️", zip: "#4D7C0F", belt: "#1A2E05" },
        { name: "하와이안 서핑 셔츠", color: "#F43F5E", collar: "#38BDF8", badge: "🌺", zip: "#FB7185", belt: "#0284C7" },
        { name: "스트리트 어반 후드티", color: "#475569", collar: "#E2E8F0", badge: "🎧", zip: "#64748B", belt: "#1E293B" },
        { name: "체크무늬 워크 셔츠", color: "#0284C7", collar: "#1E293B", badge: "📐", zip: "#0369A1", belt: "#0F172A" },
        { name: "네온 그래피티 라이더", color: "#D946EF", collar: "#F43F5E", badge: "⚡", zip: "#E879F9", belt: "#701A75" },
        { name: "산악 구조대 윈드브레이커", color: "#0D9488", collar: "#F97316", badge: "🏔️", zip: "#14B8A6", belt: "#115E59" },
        { name: "특급 호텔 셰프 조리복", color: "#F8FAFC", collar: "#000000", badge: "🍴", zip: "#E2E8F0", belt: "#334155" },
        { name: "황금 황실 로열 아머", color: "#EAB308", collar: "#FEF08A", badge: "👑", zip: "#FDE047", belt: "#854D0E" },
        { name: "북극 탐험대 방한 파카", color: "#0284C7", collar: "#F8FAFC", badge: "❄️", zip: "#38BDF8", belt: "#0C4A6E" },
        { name: "정글 사파리 탐험 셔츠", color: "#4D7C0F", collar: "#FEF08A", badge: "🧭", zip: "#65A30D", belt: "#365314" },
        { name: "메카닉 테크 수트", color: "#334155", collar: "#EF4444", badge: "⚙️", zip: "#F87171", belt: "#0F172A" },
        { name: "딥 다이버 잠수복", color: "#0F766E", collar: "#FACC15", badge: "⚓", zip: "#14B8A6", belt: "#134E4A" },
        { name: "클래식 레드 티셔츠", color: "#DC2626", collar: "#FFFFFF", badge: "🧱", zip: "#EF4444", belt: "#1E293B" }
    ];

    // 5. 바지 30종
    const PANTS = [
        { name: "소방관 방화 바지", color: "#C2410C" }, { name: "경찰 제복 바지", color: "#172554" },
        { name: "다크 네이비 진", color: "#1E293B" }, { name: "클래식 블루 진", color: "#2563EB" },
        { name: "블랙 슬랙스", color: "#0F172A" }, { name: "차콜 그레이 팬츠", color: "#334155" },
        { name: "카키 카고 팬츠", color: "#78716C" }, { name: "베이지 치노", color: "#D6D3D1" },
        { name: "스노우 화이트", color: "#F8FAFC" }, { name: "크림슨 레드", color: "#DC2626" },
        { name: "선셋 오렌지", color: "#EA580C" }, { name: "머스터드 옐로우", color: "#CA8A04" },
        { name: "밀리터리 올리브", color: "#3F6212" }, { name: "포레스트 그린", color: "#166534" },
        { name: "에메랄드 틸", color: "#0F766E" }, { name: "스카이 사이언", color: "#0284C7" },
        { name: "로열 코발트", color: "#1D4ED8" }, { name: "딥 퍼플", color: "#6B21A8" },
        { name: "바이올렛 라벤더", color: "#8B5CF6" }, { name: "마젠타 핫핑크", color: "#BE185D" },
        { name: "버건디 와인", color: "#881337" }, { name: "초콜릿 브라운", color: "#451A03" },
        { name: "골드 메탈릭", color: "#EAB308" }, { name: "실버 아머 팬츠", color: "#94A3B8" },
        { name: "네온 라임 팬츠", color: "#65A30D" }, { name: "다크 청록", color: "#134E4A" },
        { name: "사이버 핑크", color: "#EC4899" }, { name: "스틸 그레이", color: "#64748B" },
        { name: "스모크 블랙", color: "#18181B" }, { name: "제다이 웜브라운", color: "#78350F" }
    ];

    let currentSkin = SKIN_COLORS[0];
    let currentFace = FACES[0];
    let currentTop = TOPS[0];
    let currentPants = PANTS[0];

    const figStud = document.getElementById('figStud');
    const figHead = document.getElementById('figHead');
    const browLeft = document.getElementById('browLeft');
    const browRight = document.getElementById('browRight');
    const eyeLeft = document.getElementById('eyeLeft');
    const eyeRight = document.getElementById('eyeRight');
    const legoMouth = document.getElementById('legoMouth');

    const figTorso = document.getElementById('figTorso');
    const torsoCollar = document.getElementById('torsoCollar');
    const torsoBadge = document.getElementById('torsoBadge');
    const torsoZipper = document.getElementById('torsoZipper');
    const torsoBelt = document.getElementById('torsoBelt');
    const figArmLeft = document.getElementById('figArmLeft');
    const figArmRight = document.getElementById('figArmRight');

    const figHip = document.getElementById('figHip');
    const figLegLeft = document.getElementById('figLegLeft');
    const figLegRight = document.getElementById('figLegRight');

    function updatePreview() {
        figStud.style.backgroundColor = currentSkin.color;
        figHead.style.backgroundColor = currentSkin.color;

        browLeft.className = `eyebrow left ${currentFace.browL}`;
        browRight.className = `eyebrow right ${currentFace.browR}`;

        eyeLeft.className = `eye left ${currentFace.eyeL}`;
        eyeRight.className = `eye right ${currentFace.eyeR}`;

        legoMouth.className = `mouth ${currentFace.mouth}`;

        figTorso.style.backgroundColor = currentTop.color;
        figArmLeft.style.backgroundColor = currentTop.color;
        figArmRight.style.backgroundColor = currentTop.color;

        torsoCollar.style.borderColor = currentTop.collar;
        torsoBadge.textContent = currentTop.badge;
        torsoZipper.style.backgroundColor = currentTop.zip;
        torsoBelt.style.backgroundColor = currentTop.belt;

        figHip.style.backgroundColor = currentPants.color;
        figLegLeft.style.backgroundColor = currentPants.color;
        figLegRight.style.backgroundColor = currentPants.color;
    }

    const skinContainer = document.getElementById('skinOptions');
    SKIN_COLORS.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = `opt-item ${idx === 0 ? 'selected' : ''}`;
        div.innerHTML = `<div class="color-circle" style="background-color: ${item.color};"></div><span>${item.name}</span>`;
        div.addEventListener('click', () => {
            document.querySelectorAll('#skinOptions .opt-item').forEach(el => el.classList.remove('selected'));
            div.classList.add('selected');
            currentSkin = item;
            updatePreview();
        });
        skinContainer.appendChild(div);
    });

    const faceContainer = document.getElementById('faceOptions');
    FACES.forEach((face, idx) => {
        const div = document.createElement('div');
        div.className = `opt-item ${idx === 0 ? 'selected' : ''}`;
        div.innerHTML = `<span style="font-size:1.3rem; margin-bottom:4px;">🙂</span><span>${face.name}</span>`;
        div.addEventListener('click', () => {
            document.querySelectorAll('#faceOptions .opt-item').forEach(el => el.classList.remove('selected'));
            div.classList.add('selected');
            currentFace = face;
            updatePreview();
        });
        faceContainer.appendChild(div);
    });

    const topContainer = document.getElementById('topOptions');
    TOPS.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = `opt-item ${idx === 0 ? 'selected' : ''}`;
        div.innerHTML = `
            <div class="cloth-icon-preview" style="background-color: ${item.color};">
                <span>${item.badge}</span>
            </div>
            <span>${item.name}</span>
        `;
        div.addEventListener('click', () => {
            document.querySelectorAll('#topOptions .opt-item').forEach(el => el.classList.remove('selected'));
            div.classList.add('selected');
            currentTop = item;
            updatePreview();
        });
        topContainer.appendChild(div);
    });

    const pantsContainer = document.getElementById('pantsOptions');
    PANTS.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = `opt-item ${idx === 0 ? 'selected' : ''}`;
        div.innerHTML = `<div class="color-circle" style="background-color: ${item.color};"></div><span>${item.name}</span>`;
        div.addEventListener('click', () => {
            document.querySelectorAll('#pantsOptions .opt-item').forEach(el => el.classList.remove('selected'));
            div.classList.add('selected');
            currentPants = item;
            updatePreview();
        });
        pantsContainer.appendChild(div);
    });

    const customModal = document.getElementById('customModal');
    const customLegoBtn = document.getElementById('customLegoBtn');
    const closeCustomModal = document.getElementById('closeCustomModal');
    const modalBackdrop = document.querySelector('.custom-modal-backdrop');

    customLegoBtn.addEventListener('click', () => customModal.classList.remove('hidden'));
    closeCustomModal.addEventListener('click', () => customModal.classList.add('hidden'));
    modalBackdrop.addEventListener('click', () => customModal.classList.add('hidden'));

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(`tab-${btn.getAttribute('data-tab')}`).classList.add('active');
        });
    });

    document.getElementById('randomizeFigBtn').addEventListener('click', () => {
        currentSkin = SKIN_COLORS[Math.floor(Math.random() * SKIN_COLORS.length)];
        currentFace = FACES[Math.floor(Math.random() * FACES.length)];
        currentTop = TOPS[Math.floor(Math.random() * TOPS.length)];
        currentPants = PANTS[Math.floor(Math.random() * PANTS.length)];
        updatePreview();
    });

    document.getElementById('resetFigBtn').addEventListener('click', () => {
        currentSkin = SKIN_COLORS[0];
        currentFace = FACES[0];
        currentTop = TOPS[0];
        currentPants = PANTS[0];
        updatePreview();
    });

    document.getElementById('orderFigBtn').addEventListener('click', () => {
        alert("못만들지요~ 아쉽네요 😜\n(현재 브릭 공장이 무기한 휴업 중입니다!)");
    });

    // 4. 레고 미니게임 & 실시간 랭킹 시스템
    const gameModal = document.getElementById('gameModal');
    const gameOpenBtn = document.getElementById('gameOpenBtn');
    const closeGameModal = document.getElementById('closeGameModal');
    const gameBackdrop = document.getElementById('gameBackdrop');
    const startGameBtn = document.getElementById('startGameBtn');
    const gameStartOverlay = document.getElementById('gameStartOverlay');
    const playerNameInput = document.getElementById('playerNameInput');
    const displayPlayerName = document.getElementById('displayPlayerName');
    const gameScoreEl = document.getElementById('gameScore');
    const gameLivesEl = document.getElementById('gameLives');
    const rankingList = document.getElementById('rankingList');
    const canvas = document.getElementById('legoGameCanvas');
    const ctx = canvas.getContext('2d');

    let gameRunning = false;
    let score = 0;
    let lives = 3;
    let animationId = null;
    let currentPlayerName = "익명";

    const basket = {
        x: canvas.width / 2 - 35,
        y: canvas.height - 30,
        width: 70,
        height: 18,
        speed: 7,
        dx: 0
    };

    let items = [];
    const brickColors = ['#e3000b', '#ffd500', '#00d2ff', '#059669', '#9333ea'];

    // 랭킹 목록 불러오기
    async function fetchLeaderboard() {
        try {
            const res = await fetch('/api/leaderboard');
            const data = await res.json();
            renderRanking(data.leaderboard);
        } catch (e) {
            rankingList.innerHTML = '<div class="ranking-loading">랭킹 불러오기 실패</div>';
        }
    }

    function renderRanking(board) {
        if (!board || board.length === 0) {
            rankingList.innerHTML = '<div class="ranking-loading">등록된 랭커가 없습니다.</div>';
            return;
        }

        rankingList.innerHTML = '';
        board.forEach((item, idx) => {
            const div = document.createElement('div');
            let topClass = '';
            if (idx === 0) topClass = 'top-1';
            else if (idx === 1) topClass = 'top-2';
            else if (idx === 2) topClass = 'top-3';

            div.className = `ranking-item ${topClass}`;
            div.innerHTML = `
                <span class="rank-idx">${idx + 1}</span>
                <span class="rank-name">${item.name}</span>
                <span class="rank-score">${item.score}점</span>
            `;
            rankingList.appendChild(div);
        });
    }

    function spawnItem() {
        if (!gameRunning) return;
        const isBomb = Math.random() < 0.25;
        items.push({
            x: Math.random() * (canvas.width - 30),
            y: -20,
            width: isBomb ? 24 : 32,
            height: isBomb ? 24 : 16,
            speed: 2.5 + Math.random() * 2.5,
            isBomb: isBomb,
            color: brickColors[Math.floor(Math.random() * brickColors.length)]
        });
    }

    let spawnInterval = null;

    function drawBasket() {
        ctx.fillStyle = '#ffcf00';
        ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
        ctx.strokeStyle = '#ca8a04';
        ctx.lineWidth = 2;
        ctx.strokeRect(basket.x, basket.y, basket.width, basket.height);

        ctx.fillStyle = '#e3000b';
        ctx.fillRect(basket.x + 8, basket.y - 4, 12, 4);
        ctx.fillRect(basket.x + 28, basket.y - 4, 12, 4);
        ctx.fillRect(basket.x + 48, basket.y - 4, 12, 4);
    }

    function drawItems() {
        items.forEach(item => {
            if (item.isBomb) {
                ctx.font = '20px sans-serif';
                ctx.fillText('💣', item.x, item.y + 18);
            } else {
                ctx.fillStyle = item.color;
                ctx.fillRect(item.x, item.y, item.width, item.height);
                ctx.strokeStyle = 'rgba(0,0,0,0.3)';
                ctx.lineWidth = 1.5;
                ctx.strokeRect(item.x, item.y, item.width, item.height);

                ctx.fillStyle = item.color;
                ctx.fillRect(item.x + 4, item.y - 3, 8, 3);
                ctx.fillRect(item.x + 18, item.y - 3, 8, 3);
            }
        });
    }

    function updateGame() {
        if (!gameRunning) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        basket.x += basket.dx;
        if (basket.x < 0) basket.x = 0;
        if (basket.x + basket.width > canvas.width) basket.x = canvas.width - basket.width;

        drawBasket();

        for (let i = items.length - 1; i >= 0; i--) {
            const item = items[i];
            item.y += item.speed;

            if (
                item.x < basket.x + basket.width &&
                item.x + item.width > basket.x &&
                item.y < basket.y + basket.height &&
                item.y + item.height > basket.y
            ) {
                if (item.isBomb) {
                    lives--;
                    updateLivesUI();
                    if (lives <= 0) {
                        endGame();
                        return;
                    }
                } else {
                    score += 10;
                    gameScoreEl.textContent = score;
                }
                items.splice(i, 1);
                continue;
            }

            if (item.y > canvas.height) {
                if (!item.isBomb) {
                    lives--;
                    updateLivesUI();
                    if (lives <= 0) {
                        endGame();
                        return;
                    }
                }
                items.splice(i, 1);
            }
        }

        drawItems();
        animationId = requestAnimationFrame(updateGame);
    }

    function updateLivesUI() {
        let hearts = '';
        for (let i = 0; i < lives; i++) hearts += '❤️';
        gameLivesEl.textContent = hearts || '💀';
    }

    function startGame() {
        const inputName = playerNameInput.value.trim();
        currentPlayerName = inputName ? inputName : "익명의브릭러";
        displayPlayerName.textContent = currentPlayerName;

        score = 0;
        lives = 3;
        items = [];
        gameScoreEl.textContent = score;
        updateLivesUI();
        gameRunning = true;
        gameStartOverlay.classList.add('hidden');

        if (spawnInterval) clearInterval(spawnInterval);
        spawnInterval = setInterval(spawnItem, 800);

        if (animationId) cancelAnimationFrame(animationId);
        updateGame();
    }

    async function endGame() {
        gameRunning = false;
        clearInterval(spawnInterval);
        cancelAnimationFrame(animationId);

        // 서버에 점수 등록
        try {
            const res = await fetch('/api/leaderboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: currentPlayerName, score: score })
            });
            const data = await res.json();
            if (data.leaderboard) renderRanking(data.leaderboard);
        } catch (e) {
            console.error('랭킹 등록 실패', e);
        }

        gameStartOverlay.classList.remove('hidden');
        gameStartOverlay.innerHTML = `
            <h3>게임 오버! 💥</h3>
            <p><strong style="color:#38bdf8;">${currentPlayerName}</strong>님의 최종 점수: <strong style="color:#ffd500; font-size:1.3rem;">${score}점</strong></p>
            <p style="font-size:0.8rem; color:#94a3b8;">점수가 랭킹에 즉시 반영되었습니다!</p>
            <div class="player-name-form" style="margin-top:4px;">
                <input type="text" id="playerNameInput" value="${currentPlayerName}" maxlength="8">
            </div>
            <button id="restartGameBtn" class="game-start-btn">다시 도전하기 🔄</button>
        `;
        document.getElementById('restartGameBtn').addEventListener('click', startGame);
    }

    gameOpenBtn.addEventListener('click', () => {
        gameModal.classList.remove('hidden');
        fetchLeaderboard();
    });

    function closeGame() {
        gameModal.classList.add('hidden');
        gameRunning = false;
        clearInterval(spawnInterval);
        cancelAnimationFrame(animationId);
    }

    closeGameModal.addEventListener('click', closeGame);
    gameBackdrop.addEventListener('click', closeGame);
    startGameBtn.addEventListener('click', startGame);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') basket.dx = -basket.speed;
        if (e.key === 'ArrowRight') basket.dx = basket.speed;
    });

    window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') basket.dx = 0;
    });

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        basket.x = mouseX - basket.width / 2;
    });

    // 5. 챗봇 상호작용
    const chatToggle = document.getElementById('chatToggle');
    const chatBox = document.getElementById('chatBox');
    const closeChat = document.getElementById('closeChat');
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');

    chatToggle.addEventListener('click', () => chatBox.classList.toggle('hidden'));
    closeChat.addEventListener('click', () => chatBox.classList.add('hidden'));

    async function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;

        appendMessage(text, 'user-msg');
        userInput.value = '';

        const loadingDiv = appendMessage('생각 중...', 'bot-msg');

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });
            const data = await res.json();
            loadingDiv.textContent = data.reply || data.error;
        } catch (err) {
            loadingDiv.textContent = '오류가 발생했습니다. 다시 시도해주세요.';
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function appendMessage(text, className) {
        const msg = document.createElement('div');
        msg.className = className;
        msg.textContent = text;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return msg;
    }

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    updatePreview();
});