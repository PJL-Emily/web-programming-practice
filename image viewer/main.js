var pics = ["https://cdn.hk01.com/di/media/images/cis/5e4270c8a5e2c82bd6096139.jpg/KNyBGtInTJ6vNZG50MWr4YRe57jWFOUilG8xy5RvMcs?v=w1920", 
			"https://img.ltn.com.tw/Upload/playing/page/2019/09/14/190914-21024-01-WvNZA.jpg", 
			"https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2020/06/09/99/8004813.jpg&x=0&y=0&sw=0&sh=0&sl=W&fw=800&exp=3600&w=930", 
			"http://s2.lookerideas.com/imgs/201904/08/2/1554703244388.jpg"]

var display = document.getElementById("display");
var prev_button = document.getElementById("previous");
var next_button = document.getElementById("next");

picnum = Number(1);
display.src = pics[picnum];

prev_button.addEventListener(
	"click", function() {
		console.log("prev");
		prev_button.disabled = picnum <= 1? true: false;
		picnum--;
		display.src = pics[picnum];
		console.log(picnum);
		next_button.disabled = picnum < pics.length - 1? false: true;
	}
);

// function previousImage() {
// 	console.log("prev");
// 	console.log(picnum);
// 	if (picnum <= 1) {
// 		prev_button.disabled = true;
// 	} else {
// 		prev_button.disabled = false;
// 	}
// 	console.log(prev_button.disabled);
// 	picnum--;
// 	display.src = pics[picnum];
// }

next_button.addEventListener(
	"click", function() {
		console.log("next");
		next_button.disabled = picnum < pics.length - 2? false: true;
		picnum++;
		display.src = pics[picnum];
		console.log(picnum);
		prev_button.disabled = picnum < 1? true: false;
	}
);