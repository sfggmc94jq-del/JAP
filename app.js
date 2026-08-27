
const kana = {
hiragana: {
 main: [
  ["あ","a","あ い う え お","a i u e o"],["か","ka","か き く け こ","ka ki ku ke ko"],["さ","sa","さ し す せ そ","sa shi su se so"],
  ["た","ta","た ち つ て と","ta chi tsu te to"],["な","na","な に ぬ ね の","na ni nu ne no"],["は","ha","は ひ ふ へ ほ","ha hi fu he ho"],
  ["ま","ma","ま み む め も","ma mi mu me mo"],["や","ya","や ゆ よ","ya yu yo"],["ら","ra","ら り る れ ろ","ra ri ru re ro"],["わ","wa","わ を ん","wa wo n"]
 ],
 dakuten: [
  ["が","ga","が ぎ ぐ げ ご","ga gi gu ge go"],["ざ","za","ざ じ ず ぜ ぞ","za ji zu ze zo"],["だ","da","だ ぢ づ で ど","da dji dzu de do"],
  ["ば","ba","ば び ぶ べ ぼ","ba bi bu be bo"],["ぱ","pa","ぱ ぴ ぷ ぺ ぽ","pa pi pu pe po"]
 ],
 combo: [
  ["きゃ","kya","きゃ きゅ きょ","kya kyu kyo"],["しゃ","sha","しゃ しゅ しょ","sha shu sho"],["ちゃ","cha","ちゃ ちゅ ちょ","cha chu cho"],
  ["にゃ","nya","にゃ にゅ にょ","nya nyu nyo"],["ひゃ","hya","ひゃ ひゅ ひょ","hya hyu hyo"],["みゃ","mya","みゃ みゅ みょ","mya myu myo"],
  ["りゃ","rya","りゃ りゅ りょ","rya ryu ryo"],["ぎゃ","gya","ぎゃ ぎゅ ぎょ","gya gyu gyo"],["じゃ","ja","じゃ じゅ じょ","ja ju jo"],
  ["ぢゃ","dya","ぢゃ ぢゅ ぢょ","dya dyu dyo"],["びゃ","bya","びゃ びゅ びょ","bya byu byo"],["ぴゃ","pya","ぴゃ ぴゅ ぴょ","pya pyu pyo"]
 ]
},
katakana: {
 main: [
  ["ア","a","ア イ ウ エ オ","a i u e o"],["カ","ka","カ キ ク ケ コ","ka ki ku ke ko"],["サ","sa","サ シ ス セ ソ","sa shi su se so"],
  ["タ","ta","タ チ ツ テ ト","ta chi tsu te to"],["ナ","na","ナ ニ ヌ ネ ノ","na ni nu ne no"],["ハ","ha","ハ ヒ フ ヘ ホ","ha hi fu he ho"],
  ["マ","ma","マ ミ ム メ モ","ma mi mu me mo"],["ヤ","ya","ヤ ユ ヨ","ya yu yo"],["ラ","ra","ラ リ ル レ ロ","ra ri ru re ro"],["ワ","wa","ワ ヲ ン","wa wo n"]
 ],
 dakuten: [
  ["ガ","ga","ガ ギ グ ゲ ゴ","ga gi gu ge go"],["ザ","za","ザ ジ ズ ゼ ゾ","za ji zu ze zo"],["ダ","da","ダ ヂ ヅ デ ド","da dji dzu de do"],
  ["バ","ba","バ ビ ブ ベ ボ","ba bi bu be bo"],["パ","pa","パ ピ プ ペ ポ","pa pi pu pe po"]
 ],
 combo: [
  ["キャ","kya","キャ キュ キョ","kya kyu kyo"],["シャ","sha","シャ シュ ショ","sha shu sho"],["チャ","cha","チャ チュ チョ","cha chu cho"],
  ["ニャ","nya","ニャ ニュ ニョ","nya nyu nyo"],["ヒャ","hya","ヒャ ヒュ ヒョ","hya hyu hyo"],["ミャ","mya","ミャ ミュ ミョ","mya myu myo"],
  ["リャ","rya","リャ リュ リョ","rya ryu ryo"],["ギャ","gya","ギャ ギュ ギョ","gya gyu gyo"],["ジャ","ja","ジャ ジュ ジョ","ja ju jo"],
  ["ヂャ","dya","ヂャ ヂュ ヂョ","dya dyu dyo"],["ビャ","bya","ビャ ビュ ビョ","bya byu byo"],["ピャ","pya","ピャ ピュ ピョ","pya pyu pyo"]
 ]
}};
const aliases = {si:"shi",ti:"chi",tu:"tsu",hu:"fu",zi:"ji","di":"dji","du":"dzu","ji":"ji","jya":"ja","jyu":"ju","jyo":"jo","sya":"sha","syu":"shu","syo":"sho","tya":"cha","tyu":"chu","tyo":"cho"};
let mode="hiragana", selected=new Set(), deck=[], index=0, stats={}, deferredPrompt=null;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function key(section,i){return `${mode}:${section}:${i}`}
function render(){
 ["main","dakuten","combo"].forEach(section=>{
  const box=$("#"+(section==="main"?"mainGroups":section==="dakuten"?"dakutenGroups":"comboGroups")); box.innerHTML="";
  kana[mode][section].forEach((g,i)=>{
   const b=document.createElement("button"); b.className="group"+(selected.has(key(section,i))?" selected":"");
   b.innerHTML=`<span class="jp">${g[0]}</span><span class="romaji">${g[3]}</span>`;
   b.onclick=()=>{const k=key(section,i); selected.has(k)?selected.delete(k):selected.add(k); render();};
   box.appendChild(b);
  });
 });
 $("#selectionHint").textContent=selected.size?`${selected.size} group${selected.size===1?"":"s"} selected.`:"Choose at least one group.";
}
$$(".mode").forEach(b=>b.onclick=()=>{mode=b.dataset.mode; selected.clear(); $$(".mode").forEach(x=>x.classList.toggle("active",x===b)); render();});
$$("[data-select]").forEach(b=>b.onclick=()=>{
 const section=b.dataset.select, items=kana[mode][section], keys=items.map((_,i)=>key(section,i)), all=keys.every(k=>selected.has(k));
 keys.forEach(k=>all?selected.delete(k):selected.add(k)); render();
});
function normalize(s){s=s.trim().toLowerCase(); return aliases[s]||s}
function buildDeck(){
 let out=[];
 selected.forEach(k=>{const [,section,i]=k.split(":"); const g=kana[mode][section][+i]; const chars=g[2].split(" "), romaji=g[3].split(" "); chars.forEach((c,j)=>out.push({char:c,answer:romaji[j]}));});
 for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}
 return out;
}
function show(id){["setupScreen","quizScreen","resultsScreen"].forEach(x=>$("#"+x).classList.toggle("hidden",x!==id))}
function start(){if(!selected.size)return; deck=buildDeck(); index=0; stats={}; deck.forEach(x=>stats[x.char]={wrong:0,first:true}); show("quizScreen"); ask();}
function ask(){const q=deck[index]; $("#kanaPrompt").textContent=q.char; $("#progress").textContent=`${index+1} / ${deck.length}`; $("#answerInput").value=""; $("#feedback").innerHTML="&nbsp;"; $("#feedback").className="feedback"; setTimeout(()=>$("#answerInput").focus(),50)}
function check(){
 const q=deck[index], val=normalize($("#answerInput").value);
 if(!val)return;
 const acceptable=[q.answer];
 if(q.answer==="shi")acceptable.push("si"); if(q.answer==="chi")acceptable.push("ti"); if(q.answer==="tsu")acceptable.push("tu"); if(q.answer==="fu")acceptable.push("hu");
 if(q.answer==="ji")acceptable.push("zi"); if(q.answer==="ja")acceptable.push("jya"); if(q.answer==="ju")acceptable.push("jyu"); if(q.answer==="jo")acceptable.push("jyo");
 if(acceptable.includes(val)){
  $("#feedback").textContent="Correct"; $("#feedback").className="feedback good"; setTimeout(next,220);
 }else{
  stats[q.char].wrong++; stats[q.char].first=false; $("#feedback").textContent="Not quite — try again."; $("#feedback").className="feedback bad"; $("#answerInput").select();
 }
}
function next(){index++; if(index>=deck.length)finish(); else ask()}
function skip(){const q=deck[index]; stats[q.char].wrong++; stats[q.char].first=false; deck.push(deck.splice(index,1)[0]); ask();}
function finish(){
 show("resultsScreen");
 const entries=Object.entries(stats), first=entries.filter(([,v])=>v.first).length, wrong=entries.reduce((a,[,v])=>a+v.wrong,0);
 $("#correctCount").textContent=first; $("#attemptCount").textContent=wrong;
 const review=entries.filter(([,v])=>v.wrong).sort((a,b)=>b[1].wrong-a[1].wrong);
 $("#reviewList").innerHTML=review.length?review.map(([c,v])=>`<span class="review-chip"><b>${c}</b>${v.wrong} miss${v.wrong===1?"":"es"}</span>`).join(""):'<span class="muted">No misses this round.</span>';
}
$("#startBtn").onclick=start; $("#submitBtn").onclick=check; $("#skipBtn").onclick=skip; $("#quitBtn").onclick=()=>show("setupScreen"); $("#groupsBtn").onclick=()=>show("setupScreen"); $("#againBtn").onclick=start;
$("#answerInput").addEventListener("keydown",e=>{if(e.key==="Enter")check()});
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;$("#installBtn").classList.remove("hidden")});
$("#installBtn").onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$("#installBtn").classList.add("hidden")}};
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));
render();
