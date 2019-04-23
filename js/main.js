'use strict'
{
  // HTMLの各要素を取得
  let timer = document.getElementById('timer');
  let min = document.getElementById('min');
  let sec = document.getElementById('sec');
  let reset = document.getElementById('reset');
  let start = document.getElementById('start');

  let startTime; //変数startTimeを宣言
  let timeLeft;
  // let timeToCountDown = 4 * 1000;
  let timeToCountDown = 0;
  let timerId;
  let isRuning = false; //カウントダウンが始まっていない状態

// 残り時間をブラウザに表示するために、ミリ秒を渡すと分や秒に直してくれる関数を作る
  function updateTimer(t) {
    let d = new Date(t);
    let m = d.getMinutes();
    let s = d.getSeconds();
    let ms = d.getMilliseconds();
    let timerString;
    // 桁が足りない時は0で埋める処理
    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    ms = ('00' + ms).slice(-3);
    // タイマーの数値をタブのタイトルに反映させる
    timerString = m + ':' + s + '.' + ms;
    timer.textContent = timerString;
    document.title = timerString;
  }

  // 関数countDownを宣言
  // setTimeout を使って、次の処理を指定したミリ秒後に実行させる
  function countDown() {
    timerId = setTimeout(function() {
      // let elapsedTime = Date.now() - startTime;
      // timeLeft = TimeToCountDown - elapsedTime;
      timeLeft = timeToCountDown - (Date.now() - startTime); //elapsedTimeの計算式を直接代入
      // timeLeftが0より小さくなったらclearTimeoutを呼ぶ
      if (timeLeft < 0) {
        isRuning = false;
        start.textContent = 'Start';
        clearTimeout(timerId);
        timeLeft = 0;
        timeToCountDown = 0;
        updateTimer(timeLeft);
        return;
      }
      updateTimer(timeLeft);
      countDown(); //カウントダウンのフィードバック
    }, 10);
  }
// startボタンを押した時のイベントを作成
  start.addEventListener('click',function(){
    if (isRuning === false) {
      isRuning = true;
      start.textContent = 'Stop';
      startTime = Date.now();
      countDown();
    } else {
      isRuning = false;
      start.textContent = 'Start';
      timeToCountDown = timeLeft;
      clearTimeout(timerId);
    }
  });

  min.addEventListener('click',function(){
    // カウントダウン中に操作できないようにする
    if (isRuning === true) {
      return;
    }
    // timeToCountDownを60秒分増やしていく処理
    timeToCountDown += 60 * 1000;
    // 60分を超えたら0になるようにする
    if (timeToCountDown >= 60 * 60 * 1000) {
      timeToCountDown = 0;
    }
    updateTimer(timeToCountDown);
  });

  sec.addEventListener('click',function(){
    // カウントダウン中に操作できないようにする
    if (isRuning === true) {
      return;
    }
    // timeToCountDownを1秒分増やしていく処理
    timeToCountDown += 1000;
    // 60分を超えたら0になるようにする
    if (timeToCountDown >= 60 * 60 * 1000) {
      timeToCountDown = 0;
    }

    updateTimer(timeToCountDown);
  });

  reset.addEventListener('click',function(){
    // timeToCountDownを0にしていく処理
    timeToCountDown = 0;
    updateTimer(timeToCountDown);
  });
}
