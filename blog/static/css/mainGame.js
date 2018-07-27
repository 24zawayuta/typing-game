var rand = new Array();
var count = 0;
var queNum = 5;
var numnum = 0;
var total=-1;
var sttime=0;
var fintime=0;
var successcount=0;
var besttime=new Array(700,700,700);
var copytime=new Array(700,700,700);
var newcheck=0;
var missmax=0;
var leng="";//計算により生成される文字列の入力
var rankleng=""
//キー状態管理変数の定義
var KEYS = new Array(256);
//キーの状態を false （押されていない）で初期化
for(var i=0; i<KEYS.length; i++) {
    KEYS[i] = false;
}
//キーが押された時に呼び出される処理を指定
window.onkeydown = function(e) {
    //キーボードによる自動スクロールの防止
    e.preventDefault();
    //キーを押された状態に更新
    KEYS[e.keyCode] = true;
    typeGame();
};
//キーが離された時に呼び出される処理を指定
window.onkeyup = function(e) {
    //キーを離された状態に更新
    KEYS[e.keyCode] = false;
};
var kCode = new Array(65,66,67,68,69,70,71,72,73,
                        74,75,76,77,78,79,80,81,82,
                        83,84,85,86,87,88,89,90);//キーコード
var Alphabet = new Array("a","b","c","d","e","f","g","h","i",
                         "j","k","l","m","n","o","p","q","r",
                         "s","t","u","v","w","x","y","z");//対応するアルファベット
var misschar = new Array(0,0,0,0,0);


/*--------------------------------------------*/

//タイピングゲームの問題をセットする
function gameSet(){
  //問題文とカウント数をクリアする
  for(var i=0; i<KEYS.length; i++) {
    KEYS[i] = false;
  }
  count = 0;
  numnum=0;
  total=-1;
  for (var i = 0;i < queNum ;i++){
    rand[i] = Math.floor( Math.random() * 26 );
  }
  document.getElementById("frame").innerHTML = '\0';
}

//キー入力を受け取る
function typeGame(){
    //入力されたキーコードと、問題文のキーコードを比較
	if(KEYS[32]){//空白受付
		document.getElementById("frame").innerHTML = Alphabet[rand[numnum]];
		total=-1;
		DD = new Date();
        stHours = DD.getHours();
        stMinutes = DD.getMinutes();
        stSeconds = DD.getSeconds();
		count=0;
	}
	total++;
    if(KEYS[kCode[rand[count]]]&&KEYS[32]!=true){//一致したら
        //カウント数を＋１にする
        count++;
        if (count < queNum){
            document.getElementById("frame").innerHTML = Alphabet[rand[count]];
        }else{
			if(total==count){//成功時
				successcount+=1;
	            DD2 = new Date();
				finSeconds = DD2.getSeconds();
				for(var j=0;j<3;j++){
				    copytime[j]=besttime[j];
				}
				for(var j=0;j<3;j++){
						if(Number(finSeconds)-Number(stSeconds)<=besttime[j]){/*ここ*/
							besttime[j]=Number(finSeconds)-Number(stSeconds);
							for(var s=j;s<2;s++){
								besttime[s+1]=copytime[s];//ランキング書き直し
							}
							break;
						}
				}
				for(var j=0;j<3;j++){
					if(besttime[j]!=700){
						rankleng+="Rank "+(Number(j)+Number(1))+":"+besttime[j]+";";
					}
				}
				document.getElementById("rank").innerHTML=rankleng;
				document.getElementById("success").innerHTML =successcount+"回目の成功!!<br>thistime:"+(finSeconds-stSeconds)+"<br><img src='static/css/success.jpg'>";
				document.getElementById("fail").innerHTML=""; 
			}
			else{//失敗時
			    DD2 = new Date();
				finSeconds = DD2.getSeconds();
				for(var i=0;i<queNum;i++){
					if(misschar[i]==1){
					 leng+=Alphabet[rand[i]]+',';
					}
				}
				document.getElementById("success").innerHTML="";
				document.getElementById("fail").innerHTML = 'マッチング率：'+(count*100/total).toFixed(0)+'%<br>間違えたキー:'+leng;
				for(var i=0;i<queNum;i++){
					misschar[i]=0;
				}
			}
			total=-1;
			count=0;
			numnum=0;
		    leng="";
			rankleng="";
			gameSet();
			newcheck=0;
        }
		
    }
	else{       
         if(newcheck>0){
         misschar[count]=1;
        }
        newcheck++;
	}
}
gameSet();