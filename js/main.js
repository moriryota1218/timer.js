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
  let timeToCountDown = 4 * 1000;
  let timerId;

// 残り時間をブラウザに表示するために、ミリ秒を渡すと分や秒に直してくれる関数を作る
  function updateTimer(t) {
    let d = new Date(t);
    let m = d.getMinutes();
    let s = d.getSeconds();
    let ms = d.getMilliseconds();
    // 桁が足りない時は0で埋める処理
    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    ms = ('00' + ms).slice(-3);

    timer.textContent = m + ':' + s + '.' + ms;
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
    startTime = Date.now();
    countDown();
  });
}
