// NANONI — site scripts (依存ライブラリなし)

(function () {
  'use strict';

  /* ---- フッターの年号 ---------------------------------------------- */

  var year = document.getElementById('year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  /* ---- モバイルナビゲーション -------------------------------------- */

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    var setNavOpen = function (open) {
      nav.dataset.open = String(open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    };

    toggle.addEventListener('click', function () {
      setNavOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        setNavOpen(false);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setNavOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---- 年齢確認 ------------------------------------------------------
     酒類を扱うため、20歳未満の閲覧・購入をお断りする確認を表示します。

     記録先は sessionStorage です。同じタブで見て回る間は再表示しませんが、
     タブやブラウザを閉じると記録が消え、次に訪れたときはまた確認します。
     ずっと記憶させたい場合は、下の sessionStorage を localStorage に
     書き換えてください（その場合、一度「はい」を押すと再表示されません）。

     注意: これは自己申告による簡易確認です。実際の年齢確認は、決済・配送を
     担当するプラットフォーム側および配達時の身分証確認で行ってください。
  -------------------------------------------------------------------- */

  var gate = document.getElementById('age-gate');
  if (!gate) { return; }

  var STORAGE_KEY = 'nanoni:age-verified';

  // sessionStorage はプライベートモード等で例外を投げることがあるため保護する
  var store = {
    get: function (key) {
      try { return window.sessionStorage.getItem(key); } catch (e) { return null; }
    },
    set: function (key, value) {
      try { window.sessionStorage.setItem(key, value); } catch (e) { /* 保存できなくても続行 */ }
    }
  };

  // 以前の版で localStorage に残った記録を消しておく（残っていると再表示されない）
  try { window.localStorage.removeItem(STORAGE_KEY); } catch (e) { /* 失敗しても続行 */ }

  if (store.get(STORAGE_KEY) === 'yes') {
    return;
  }

  var confirmBtn = document.getElementById('age-gate-yes');
  var denyBtn = document.getElementById('age-gate-no');
  var denied = document.getElementById('age-gate-denied');
  var lastFocused = document.activeElement;

  var closeGate = function () {
    gate.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) { lastFocused.focus(); }
  };

  gate.hidden = false;
  document.body.style.overflow = 'hidden';
  if (confirmBtn) { confirmBtn.focus(); }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', function () {
      store.set(STORAGE_KEY, 'yes');
      closeGate();
    });
  }

  if (denyBtn) {
    denyBtn.addEventListener('click', function () {
      if (denied) { denied.hidden = false; }
    });
  }

  // モーダルの外へフォーカスが逃げないようにする
  gate.addEventListener('keydown', function (event) {
    if (event.key !== 'Tab') { return; }

    var focusable = gate.querySelectorAll('button, [href]');
    if (!focusable.length) { return; }

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
