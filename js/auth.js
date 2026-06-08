/**
 * auth.js - PrimeFix 로그인 모달 & 인증 상태 관리
 * 모든 페이지에서 공통으로 사용
 */

(function () {
    // ─── 모달 HTML 주입 ───────────────────────────────────────────
    const modalHTML = `
    <div id="auth-overlay" style="
        display:none; position:fixed; inset:0; z-index:9999;
        background:rgba(0,0,0,0.7); backdrop-filter:blur(8px);
        align-items:center; justify-content:center;
    ">
        <div id="auth-modal" style="
            position:relative; width:100%; max-width:420px; margin:0 16px;
            background:rgba(15,23,42,0.98);
            border:1px solid rgba(255,255,255,0.12);
            border-radius:24px; padding:36px;
            box-shadow:0 40px 80px rgba(0,0,0,0.6);
            animation: modalPop 0.35s cubic-bezier(.34,1.56,.64,1) forwards;
        ">
            <style>
                @keyframes modalPop {
                    from { opacity:0; transform:scale(0.88) translateY(20px); }
                    to   { opacity:1; transform:scale(1) translateY(0); }
                }
                #auth-modal input {
                    width:100%; box-sizing:border-box;
                    background:rgba(255,255,255,0.07);
                    border:1px solid rgba(255,255,255,0.12);
                    color:#fff; border-radius:12px;
                    padding:12px 12px 12px 42px;
                    font-size:14px; font-family:inherit;
                    transition:all .25s; outline:none;
                }
                #auth-modal input:focus {
                    border-color:#60a5fa;
                    background:rgba(255,255,255,0.1);
                    box-shadow:0 0 0 3px rgba(96,165,250,0.18);
                }
                #auth-modal input::placeholder { color:rgba(255,255,255,0.3); }
                .auth-input-wrap { position:relative; margin-bottom:12px; }
                .auth-input-wrap i {
                    position:absolute; left:14px; top:50%; transform:translateY(-50%);
                    color:rgba(255,255,255,0.3); font-size:13px; pointer-events:none;
                }
                .auth-tab-btn {
                    flex:1; padding-bottom:12px; font-size:14px; font-weight:700;
                    color:rgba(255,255,255,0.35); border:none; background:none;
                    border-bottom:2px solid transparent; cursor:pointer;
                    transition:all .25s; font-family:inherit;
                }
                .auth-tab-btn.on { color:#60a5fa; border-bottom-color:#60a5fa; }
                .auth-submit {
                    width:100%; padding:13px; border-radius:12px; border:none;
                    background:linear-gradient(135deg,#3b82f6,#6366f1);
                    color:#fff; font-size:14px; font-weight:700;
                    cursor:pointer; transition:all .25s; font-family:inherit;
                    margin-top:4px;
                }
                .auth-submit:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(99,102,241,.4); }
                .auth-submit:active { transform:translateY(0); }
                .auth-msg {
                    border-radius:10px; padding:10px 14px;
                    font-size:13px; margin-bottom:12px; display:none;
                }
                .auth-msg.err { background:rgba(239,68,68,.15); border:1px solid rgba(239,68,68,.3); color:#fca5a5; }
                .auth-msg.ok  { background:rgba(34,197,94,.15);  border:1px solid rgba(34,197,94,.3);  color:#86efac; }
                .auth-close-btn {
                    position:absolute; top:16px; right:16px;
                    background:rgba(255,255,255,0.07); border:none; color:rgba(255,255,255,0.5);
                    width:32px; height:32px; border-radius:50%; cursor:pointer;
                    display:flex; align-items:center; justify-content:center;
                    font-size:14px; transition:all .2s;
                }
                .auth-close-btn:hover { background:rgba(255,255,255,0.15); color:#fff; }
                .auth-hint { text-align:center; font-size:12px; color:rgba(255,255,255,0.3); margin-top:16px; }
                .auth-hint button { background:none; border:none; color:#60a5fa; cursor:pointer; font-weight:700; font-family:inherit; font-size:12px; }
                .auth-hint button:hover { color:#93c5fd; }
                .auth-divider { border:none; border-top:1px solid rgba(255,255,255,0.07); margin:16px 0; }
            </style>

            <!-- Close -->
            <button class="auth-close-btn" id="auth-close-btn"><i class="fas fa-times"></i></button>

            <!-- Logo -->
            <div style="text-align:center; margin-bottom:24px;">
                <div style="
                    display:inline-flex; align-items:center; justify-content:center;
                    width:52px; height:52px; border-radius:14px;
                    background:linear-gradient(135deg,#3b82f6,#6366f1);
                    margin-bottom:12px; box-shadow:0 8px 20px rgba(99,102,241,.35);
                "><i class="fas fa-robot" style="color:#fff; font-size:22px;"></i></div>
                <div style="font-size:20px; font-weight:900; color:#fff; letter-spacing:-0.5px;">PRIME<span style="color:#60a5fa;">FIX</span></div>
                <div style="font-size:12px; color:rgba(255,255,255,0.35); margin-top:2px;">스마트 팩토리 솔루션 포털</div>
            </div>

            <!-- Tabs -->
            <div style="display:flex; border-bottom:1px solid rgba(255,255,255,0.08); margin-bottom:20px;">
                <button class="auth-tab-btn on" id="atab-login" onclick="authSwitchTab('login')">로그인</button>
                <button class="auth-tab-btn" id="atab-signup" onclick="authSwitchTab('signup')">회원가입</button>
            </div>

            <!-- Message -->
            <div class="auth-msg" id="auth-msg"></div>

            <!-- Login Form -->
            <form id="auth-login-form" onsubmit="authDoLogin(event)">
                <div class="auth-input-wrap">
                    <i class="fas fa-user"></i>
                    <input type="text" id="alog-id" placeholder="아이디" required autocomplete="username">
                </div>
                <div class="auth-input-wrap">
                    <i class="fas fa-lock"></i>
                    <input type="password" id="alog-pw" placeholder="비밀번호" required autocomplete="current-password">
                </div>
                <button type="submit" class="auth-submit"><i class="fas fa-sign-in-alt" style="margin-right:6px;"></i>로그인하기</button>
            </form>

            <!-- Signup Form -->
            <form id="auth-signup-form" onsubmit="authDoSignup(event)" style="display:none;">
                <div class="auth-input-wrap">
                    <i class="fas fa-id-card"></i>
                    <input type="text" id="asig-id" placeholder="아이디 (영문/숫자, 3~20자)" required>
                </div>
                <div class="auth-input-wrap">
                    <i class="fas fa-user"></i>
                    <input type="text" id="asig-name" placeholder="이름" required>
                </div>
                <div class="auth-input-wrap">
                    <i class="fas fa-envelope"></i>
                    <input type="email" id="asig-email" placeholder="이메일" required>
                </div>
                <div class="auth-input-wrap">
                    <i class="fas fa-phone"></i>
                    <input type="tel" id="asig-phone" placeholder="연락처 (선택)">
                </div>
                <div class="auth-input-wrap">
                    <i class="fas fa-lock"></i>
                    <input type="password" id="asig-pw" placeholder="비밀번호 (6자 이상)" required minlength="6" autocomplete="new-password">
                </div>
                <button type="submit" class="auth-submit"><i class="fas fa-user-plus" style="margin-right:6px;"></i>회원가입하기</button>
            </form>

            <!-- Hint -->
            <div class="auth-hint" id="auth-hint">
                계정이 없으신가요? <button onclick="authSwitchTab('signup')">회원가입</button>
            </div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // ─── 오버레이 클릭 시 닫기 ───────────────────────────────────
    document.getElementById('auth-overlay').addEventListener('click', function(e) {
        if (e.target === this) authCloseModal();
    });
    document.getElementById('auth-close-btn').addEventListener('click', authCloseModal);

    // ESC 키로 닫기
    document.addEventListener('keydown', e => { if (e.key === 'Escape') authCloseModal(); });

    // ─── 헤더 상태 업데이트 ───────────────────────────────────────
    authUpdateHeader();

    // login.html 로 가는 링크들을 모달 트리거로 교체
    document.querySelectorAll('a[href="login.html"]').forEach(a => {
        a.href = '#';
        a.addEventListener('click', e => { e.preventDefault(); authOpenModal('login'); });
    });
})();

// ─── 전역 함수들 ──────────────────────────────────────────────────

function authOpenModal(tab = 'login') {
    authSwitchTab(tab);
    authClearMsg();
    const overlay = document.getElementById('auth-overlay');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // re-trigger animation
    const modal = document.getElementById('auth-modal');
    modal.style.animation = 'none';
    modal.offsetHeight; // reflow
    modal.style.animation = '';
}

function authCloseModal() {
    document.getElementById('auth-overlay').style.display = 'none';
    document.body.style.overflow = '';
    authClearMsg();
}

function authSwitchTab(tab) {
    authClearMsg();
    const isLogin = tab === 'login';
    document.getElementById('auth-login-form').style.display  = isLogin ? '' : 'none';
    document.getElementById('auth-signup-form').style.display = isLogin ? 'none' : '';
    document.getElementById('atab-login').classList.toggle('on', isLogin);
    document.getElementById('atab-signup').classList.toggle('on', !isLogin);
    document.getElementById('auth-hint').innerHTML = isLogin
        ? '계정이 없으신가요? <button onclick="authSwitchTab(\'signup\')">회원가입</button>'
        : '이미 계정이 있으신가요? <button onclick="authSwitchTab(\'login\')">로그인</button>';
}

function authShowMsg(text, type = 'err') {
    const el = document.getElementById('auth-msg');
    el.textContent = text;
    el.className = 'auth-msg ' + type;
    el.style.display = 'block';
}
function authClearMsg() {
    const el = document.getElementById('auth-msg');
    if (el) el.style.display = 'none';
}

function authDoLogin(e) {
    e.preventDefault();
    const id = document.getElementById('alog-id').value.trim();
    const pw = document.getElementById('alog-pw').value;
    const users = JSON.parse(localStorage.getItem('pf_users') || '[]');
    const user = users.find(u => u.id === id && u.pw === pw);

    if (!user) { authShowMsg('아이디 또는 비밀번호가 올바르지 않습니다.', 'err'); return; }

    user.lastLogin = new Date().toLocaleString('ko-KR');
    const idx = users.findIndex(u => u.id === id);
    users[idx] = user;
    localStorage.setItem('pf_users', JSON.stringify(users));
    localStorage.setItem('pf_currentUser', JSON.stringify(user));

    authShowMsg('로그인 성공! 환영합니다, ' + user.name + '님 😊', 'ok');
    setTimeout(() => {
        authCloseModal();
        authUpdateHeader();
    }, 900);
}

function authDoSignup(e) {
    e.preventDefault();
    const id    = document.getElementById('asig-id').value.trim();
    const name  = document.getElementById('asig-name').value.trim();
    const email = document.getElementById('asig-email').value.trim();
    const phone = document.getElementById('asig-phone').value.trim();
    const pw    = document.getElementById('asig-pw').value;

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(id)) {
        authShowMsg('아이디는 영문·숫자·언더바만, 3~20자로 입력하세요.', 'err'); return;
    }
    const users = JSON.parse(localStorage.getItem('pf_users') || '[]');
    if (users.find(u => u.id === id)) { authShowMsg('이미 사용 중인 아이디입니다.', 'err'); return; }

    const newUser = {
        id, name, email, phone, pw,
        joinDate: new Date().toLocaleDateString('ko-KR'),
        lastLogin: new Date().toLocaleString('ko-KR'),
        role: 'Member'
    };
    users.push(newUser);
    localStorage.setItem('pf_users', JSON.stringify(users));
    localStorage.setItem('pf_currentUser', JSON.stringify(newUser));

    authShowMsg('회원가입 완료! 환영합니다, ' + name + '님 🎉', 'ok');
    setTimeout(() => {
        authCloseModal();
        authUpdateHeader();
    }, 1000);
}

function authLogout() {
    localStorage.removeItem('pf_currentUser');
    authUpdateHeader();
    // 마이페이지면 메인으로
    if (location.pathname.includes('mypage')) location.href = 'index.html';
}

function authUpdateHeader() {
    const user = JSON.parse(localStorage.getItem('pf_currentUser') || 'null');

    // 1. GNB Utility Links (Tailwind-style: index.html, newsroom.html, ir.html, maintenance.html, preventive-maintenance.html, robot-control.html, smart-factory.html)
    document.querySelectorAll('header nav div.hidden.lg\\:flex.items-center.gap-6, header nav div.hidden.lg\\:flex.gap-6').forEach(el => {
        if (!el.id) el.id = 'utility-links';
    });

    const utilLinks = document.getElementById('utility-links');
    if (utilLinks) {
        if (user) {
            utilLinks.innerHTML = `
                <a href="mypage.html" class="flex items-center gap-2 hover:text-blue-500 transition-colors">
                    <span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#6366f1);font-size:11px;font-weight:900;color:#fff;">${(user.name || user.id).charAt(0).toUpperCase()}</span>
                    <span>${user.id}님</span>
                </a>
                <a href="mypage.html" class="hover:text-blue-500 transition-colors">나의 정보</a>
                <div class="w-[1px] h-3 bg-current opacity-15"></div>
                <button onclick="authLogout()" class="hover:text-red-500 transition-colors opacity-60 hover:opacity-100" style="background:none;border:none;cursor:pointer;font-family:inherit;font-size:inherit;font-weight:inherit;">로그아웃</button>`;
        } else {
            utilLinks.innerHTML = `
                <a href="#" onclick="authOpenModal('login');return false;" class="hover:text-blue-500 transition-colors">로그인</a>
                <a href="#" onclick="authOpenModal('signup');return false;" class="hover:text-blue-500 transition-colors">회원가입</a>`;
        }
    }

    // 2. GNB User Links (Main.css-style: inquiry_board.html, free_board.html, company-info.html)
    const userLinks = document.querySelectorAll('.user-links');
    userLinks.forEach(ul => {
        if (user) {
            ul.innerHTML = `
                <span class="user-display" style="color: #3b82f6; font-weight: 700;">${user.id}님</span>
                <a href="#" onclick="authLogout(); return false;" style="color: #ef4444;">로그아웃</a>
                <a href="mypage.html">나의 정보</a>`;
        } else {
            ul.innerHTML = `
                <a href="#" onclick="authOpenModal('login'); return false;">로그인</a>
                <a href="mypage.html">나의 정보</a>`;
        }
    });

    // 3. Mobile Menu (index.html)
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        const authSection = mobileMenu.querySelector('.mobile-auth-section');
        if (authSection) authSection.remove();
        const div = document.createElement('div');
        div.className = 'mobile-auth-section';
        div.innerHTML = `<hr class="border-slate-100">` + (user
            ? `<a href="mypage.html" class="font-bold text-slate-800">${user.id}님의 마이페이지</a>
               <a href="#" onclick="authLogout();return false;" class="font-bold text-red-500">로그아웃</a>`
            : `<a href="#" onclick="authOpenModal('login');return false;" class="font-bold text-slate-800">로그인</a>
               <a href="#" onclick="authOpenModal('signup');return false;" class="font-bold text-blue-600">회원가입</a>`);
        mobileMenu.appendChild(div);
    }
}
