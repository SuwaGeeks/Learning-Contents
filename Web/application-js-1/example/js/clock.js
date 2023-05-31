// 開始時間を記録しておく変数
let startTime = null;

// タイマーの時間を表示する場所を覚えておく変数
let timerStringDOM;

// タイマーを識別するID
let timerId = null;

// 現在の経過時間を記録しておく変数
let currentTimerTime = 0;

// ここに記述したイベントは、htmlが完全に読み込まれた後から実行される。
window.onload = function() {
  timerStringDOM = document.getElementById('timerString');

  // 開始する前は00:00と表示
  timerStringDOM.innerHTML = '00:00'
};

// ミリ秒を経過時間の文字列に直す関数
function msecToSecString(time) {
  // 単位をミリ秒から秒へ変換
  time = Math.floor(time / 1000);

  // 秒数
  const seconds = time % 60;
  // 分数
  const minutes = Math.floor(time / 60);

  // 取得した数値をも2桁の文字列になるように、必要に応じて0を補う
  const secondStr = (seconds < 10 ? '0' : '') + String(seconds);
  const minutesStr = (minutes < 10 ? '0' : '') + String(minutes);

  return minutesStr + ":" + secondStr;
}

// タイマーの時刻を更新する処理
function UpdateTimer() {
  // 現在の時刻を取得
  const nowTime = new Date().getTime();

  // タイマーの表示を更新
  timerStringDOM.innerHTML = msecToSecString(nowTime - startTime);
}

// スタートボタンが押されたときの処理
function OnStartButtonClick() {
  // もしstartTimeの中身が空だったら、変数startTimeに開始時間を所持しておく
  // 現在の時間は、基準時からの経過時間(単位：ミリ秒)
  if(startTime == null) {
    startTime = new Date().getTime() - currentTimerTime;
  }

  // 1秒(=1000ミリ秒)ごとにタイマーを更新する処理を記述する
  if(timerId == null) {
    timerId = setInterval(UpdateTimer, 1000);
  }
}

// ストップボタンが押されたときの処理
function OnStopButtonClick() {
  if(timerId != null) {
    // タイマーIDで指定したタイマーをストップする
    clearInterval(timerId);
    timerId = null;

    // 現在までの経過時間を記録してタイマーの表示を更新
    const nowTime = new Date().getTime();
    currentTimerTime = nowTime - startTime;

    timerStringDOM.innerHTML = msecToSecString(currentTimerTime);

    // 開始時間をリセット
    startTime = null;
  }
}

// リセットボタンが押されたときの処理
function OnResetButtonClick() {
  // 一度タイマーを止める
  OnStopButtonClick();

  // startTimeを空にする
  startTime = null;

  // 表示時間を00:00にする
  timerStringDOM.innerHTML = '00:00';

  // 経過時間をリセット
  currentTimerTime = 0;
}