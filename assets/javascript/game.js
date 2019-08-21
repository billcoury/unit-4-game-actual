$(document).ready(function(){
	var starWars = {
		hero: "",
		heroHP: 0,
		heroAP: 0,
		dark: "",
		darkHP: 0,
		darkCAP: 0,
		darkSS: 0,
		level: 6,
		skillsCounter: 1,
		poisonCounter: 0,
		bombardment: 0,
		rally: 0,
		fight: false,
		nextMatch: false,	
		heroWin: false,
		darkWin: false,	
		endGame: false,

		falcon: [100, 4, "falcon", true, "Hyperdrive", false, "Where It Counts", false, "Bombardment", false],
		xwing: [120, 4, "xwing", true, "Poison", false, "Sneak Attack", false, "Red 5", false],
		interceptor: [200, 6, "interceptor", true],
		tiefighter: [250, 15, "tiefighter", true],

		interceptorSkills: ["Force Drain", "Mask", "Knights"],
		tiefighterSkills: ["Force Lightning", "Force Destruction", "Force Rage"],

		heroDisplay: function() {			
			if(starWars.hero === starWars.falcon) {				
				$("#arenaHero").attr("src", "assets/images/falcon.jpg");
				$(".statsTextHeroes").html("falcon:<br> 100 HP<br>Attack Power: 4<br> Power Increment: 4");		
				$(".statsTextHeroes").append("<br><br>Skills: <br>");
				$(".statsTextHeroes").append("1: Hyperdrive: Block 100% damage<br>");
				$(".statsTextHeroes").append("2: Where It Counts: Gain 50% of current AP<br>");
				$(".statsTextHeroes").append("3: Bombardment: Inflict 1-50 damage<br>");
				starWars.heroDisplaymicro();
				$("#falcon").addClass("faded");
			}
			else if(starWars.hero === starWars.xwing) {
				$("#arenaHero").attr("src", "assets/images/xwing.jpg");				
				$(".statsTextHeroes").html("xwing:<br> 120 HP<br>Attack Power: 4<br> Power Increment: 4");
				$(".statsTextHeroes").append("<br><br>Skills: <br>");
				$(".statsTextHeroes").append("1: Poison: Prevent enemy skill<br>");
				$(".statsTextHeroes").append("2: Sneak: Deal 1.3 times AP <br>");
				$(".statsTextHeroes").append("3: Rally: Deal and block 3-12 damage<br>");
				starWars.heroDisplaymicro();
				$("#xwing").addClass("faded");
			}
		},

		heroDisplaymicro: function() {
			$("#arenaHero, .statsTextHeroes").removeClass("invisible");
			$("#arenaHero, .statsTextHeroes").hide();
			$("#arenaHero, .statsTextHeroes").delay(400).fadeIn("slow");	
		},

		darkDisplay: function() {			
			if(starWars.dark === starWars.interceptor) {								
				$("#arenaDark").attr("src", "assets/images/interceptor.jpg");
				$(".statsTextDark").html("interceptor:<br> 200 HP<br> Counter Attack Power: 6");
				$(".statsTextDark").append("<br><br>Skills: <br>");
				$(".statsTextDark").append("Force Drain: Current Hero HP / 10<br>");
				$(".statsTextDark").append("Mask: CAP * 3<br>"); 
				$(".statsTextDark").append("Knights: Initial Hero AP * 2");
				starWars.darkDisplaymicro();									
				$("#interceptor").addClass("faded");
			}

			else if(starWars.dark === starWars.tiefighter) {
				$("#arenaDark").attr("src", "assets/images/tiefighter.jpg");
				$(".statsTextDark").html("Vader:<br> 250 HP <br> Counter Attack Power: 15");
				$(".statsTextDark").append("<br><br>Skills: <br>");
				$(".statsTextDark").append("Force Lightning: Current CAP * 2<br>");
				$(".statsTextDark").append("Force Destruction: Hero HP / 2<br>"); 
				$(".statsTextDark").append("Force Rage: Increment CAP by 5");
				starWars.darkDisplaymicro();
				$("#tiefighter").addClass("faded");
			}
		},

		darkDisplaymicro: function() {
			$("#arenaDark, .statsTextDark").removeClass("invisible");
			$("#arenaDark, .statsTextDark").hide();						
			$("#arenaDark, .statsTextDark").delay(400).fadeIn("slow");		
		},

		fightStart: function() {
			if (starWars.hero !== "" && starWars.dark !== "") {
				$("#msgBox").html("Use your skills wisely to defeat a Sith.<br>")
				$("#msgBox").append("Skill descriptions are on the left.<br>")
				$("#theButton").html("Attack");
				$("#heroHP").html(starWars.hero[0]);
				$("#heroAP").html(starWars.hero[1]);
				heroHP = starWars.hero[0];
				heroAP = starWars.hero[1];
				$("#darkHP").html(starWars.dark[0]);
				$("#darkCAP").html(starWars.dark[1]);
				darkHP = starWars.dark[0];
				darkCAP = starWars.dark[1];
				$("#heroRTstats, #darkRTStats").removeClass("invisible");
				$("specialBox").empty();
				starWars.fight = true;
			}			
		},

		attack: function() {
			if (heroHP > 0 && darkHP > 0)	{
				darkHP -= heroAP;
				heroHP -= darkCAP;
				heroAP += starWars.hero[1];
				
				starWars.secondSkill();
				starWars.thirdSkill();

				$("#specialBox").html(starWars.hero[2] + " inflicts " + heroAP + " damage<br>");
				if (starWars.hero[2] === "falcon" && starWars.hero[7] === true) {
					$("#specialBox").append(starWars.hero[2] + " uses Where It Counts - increasing AP by " + (Math.floor(heroAP / 3)) + "<br>");
					starWars.hero[7] = false;					
				}	
				else if (starWars.hero[2] === "falcon" && starWars.hero[9] === true) {
					$("#specialBox").append(starWars.hero[2] + " uses Bombardment - inflicting extra " + starWars.bombardment + " damage<br>");
					starWars.hero[9] = false;
				}						
				else if (starWars.hero[2] === "xwing" && starWars.hero[7] === true) {
					$("#specialBox").append(starWars.hero[2] + " uses Sneak - inflicting extra " + (Math.floor(heroAP * 0.3)) + " damage<br>");
					starWars.hero[7] = false;
				}
				else if (starWars.hero[2] === "xwing" && starWars.hero[9] === true) {
					$("#specialBox").append(starWars.hero[2] + " uses Rally - inflicting extra " + starWars.rally + " damage<br>");
					$("#specialBox").append(starWars.hero[2] + " blocks " + starWars.rally + " damage<br>");
					starWars.hero[9] = false;
				}			

				$("#specialBox").append(starWars.dark[2] + " inflicts " + darkCAP + " damage<br>");

				starWars.firstSkill();

				starWars.darkSpecialSkill();
				heroHP -= starWars.darkSS;
				starWars.skillsCounter ++;				

				if (heroHP <= 0) {
					//$("#msgBox").html(starWars.dark[2] + " has overwhelmed you");
					$("#specialBox").append("<br><br>" + starWars.dark[2] + " has overwhelmed you")
					heroHP = 0;
					if (starWars.hero[2] === 'falcon') {
						starWars.falcon[3] = false;
					}
					if (starWars.hero[2] === 'xwing') {
						starWars.xwing[3] = false;
					}	
					starWars.dark[0] = darkHP;
					starWars.nextMatch = true;
					starWars.darkWin = true;
					starWars.endGameFunc();
					$("#theButton").html("Continue");
					$("#skill1, #skill2, #skill3").addClass("faded");
				}
				if (darkHP <= 0) {			
					//$("#msgBox").html("The Empire is no match to the " + starWars.hero[2]);
					$("#specialBox").append("<br><br>" + "The Empire is no match to the " + starWars.hero[2]);
					darkHP = 0;
					if (starWars.dark[2] === 'interceptor') {
						starWars.interceptor[3] = false;
					}		
					if (starWars.dark[2] === 'tiefighter') {
						starWars.tiefighter[3] = false;
					}		
					starWars.hero[0] = heroHP;
					starWars.nextMatch = true;
					starWars.heroWin = true;	
					starWars.endGameFunc();				
					$("#theButton").html("Continue");
					$("#skill1, #skill2, #skill3").addClass("faded");	
				}
				
				starWars.skillsCounterFunc();
				$("#heroHP").html(heroHP);
				$("#darkHP").html(darkHP);
				$("#heroAP").html(heroAP);
				$("#darkCAP").html(darkCAP);
				
			}
		},	

		firstSkill: function() {
			if (starWars.hero[2] === "falcon" && starWars.hero[5] === true) {
				var totalDmg = darkCAP + starWars.darkSS;
				heroHP += totalDmg;
				$("#specialBox").html(starWars.dark[2] + " attempts to inflict " + totalDmg + " damage<br>");
				$("#specialBox").append("falcon blocks " + totalDmg + " damage<br>");
				starWars.hero[5] = false;
			}				
		},

		secondSkill: function() {
			if (starWars.hero[2] === "falcon" && starWars.hero[7] === true) {
				darkHP += heroAP;
				heroAP = Math.floor(heroAP * 1.5);
			}
			else if (starWars.hero[2] === "xwing" && starWars.hero[7] === true) {
				heroAP -= starWars.hero[1];
				darkHP -= Math.floor((heroAP - starWars.hero[1]) * 0.3);
				//starWars.hero[7] = false;
			}
		},

		thirdSkill: function() {
			if (starWars.hero[2] === "falcon" && starWars.hero[9] === true) {
				starWars.bombardment = Math.floor(Math.random() * 50) + 1;
				darkHP -= starWars.bombardment;				
			}
			else if (starWars.hero[2] === "xwing" && starWars.hero[9] === true) {
				starWars.rally = Math.floor(Math.random() * 9) + 3;
				darkHP -= starWars.rally;
				heroHP += starWars.rally
			}
		},

		skillsCounterFunc: function() {
			if (starWars.heroWin === false && starWars.darkWin === false)
				if ((starWars.skillsCounter % 2) === 0) {
					$("#skill1, #skill2, #skill3").removeClass("faded");
				}
				else if ((starWars.skillsCounter % 2) === 1) {
					$("#skill1, #skill2, #skill3").addClass("faded");
				}
		},

		darkSpecialSkill: function() {
			var randomNumber = Math.floor(Math.random() * starWars.level);

			if (starWars.hero[2] === "xwing" && starWars.hero[5] === true && starWars.poisonCounter > 0  ) {									
						starWars.darkSS = 0;
						starWars.poisonCounter--;
						//if (starWars.poisonCounter === 0) {
						//	starWars.hero[5] === false;
						//}
						if (starWars.poisonCounter === 0) {
							darkHP -= heroAP;
							$("#specialBox").append(starWars.hero[2] + " uses Poison to interrupt spells<br>");	
						}
						if (randomNumber < 3) {
							if (starWars.dark[2] === "interceptor") {
								$("#specialBox").append(starWars.dark[2] + " failed to cast " + starWars.interceptorSkills[randomNumber] + " due to poison");
							}
							else if (starWars.dark[2] === "tiefighter") {
								$("#specialBox").append(starWars.dark[2] + " failed to cast " + starWars.tiefighterSkills[randomNumber] + " due to poison");
							}
						}
			}

			else if (starWars.poisonCounter === 0) {
				if (starWars.dark[2] === "interceptor") {
					switch (randomNumber) {
						case 0:
							starWars.darkSS = Math.floor(heroHP / 10);
							break;
						case 1:
							starWars.darkSS = starWars.dark[1] * 3;
							break;
						case 2:
							starWars.darkSS = 2 * starWars.hero[1];
							break;
						case 3: 
						case 4:
						case 5:
							starWars.darkSS = 0;
							break;
					}

					starWars.firstSkill();
					if (starWars.darkSS !== 0) {
						$("#specialBox").append("interceptor inflicts " + starWars.interceptorSkills[randomNumber] + " for an additional " + starWars.darkSS + " damage");
					}
				}
				if (starWars.dark[2] === "tiefighter") {
					switch (randomNumber) {
						case 0:
							starWars.darkSS = darkCAP * 2;
							break;
						case 1:
							starWars.darkSS = Math.floor(heroHP / 2);
							break;
						case 2:						
							starWars.darkSS = 0;
							darkCAP += 5;
							$("#specialBox").append("tiefighter uses "+ starWars.tiefighterSkills[randomNumber] + " increasing his CAP by five");
							break;
						case 3: 
						case 4:
						case 5:
							starWars.darkSS = 0;
							break;
					}

					if (starWars.darkSS !== 0) {					
						$("#specialBox").append("tiefighter inflicts "+ starWars.tiefighterSkills[randomNumber] + " for an additional " + starWars.darkSS + " damage");
					}
				}
			}
		},

		nextRoundHeroWin: function() {
			starWars.darkDisplay();
			darkHP = starWars.dark[0];
			darkCAP = starWars.dark[1];
			$("#darkHP").html(darkHP);
			$("#darkCAP").html(darkCAP);
			starWars.nextRoundBoth();
		},

		nextRoundDarkWin: function() {
			starWars.heroDisplay();
			heroHP = starWars.hero[0];
			heroAP = starWars.hero[1];
			$("#heroHP").html(heroHP);
			$("#heroAP").html(heroAP);	
			starWars.nextRoundBoth();		
		},

		nextRoundBoth: function() {
			$("#theButton").html("Attack");
			$("#skill1, #skill2, #skill3").addClass("faded");
			starWars.skillsCounter = 1;
		},

		wipeOut: function() {
			$("#arenaHero, #arenaDark, #heroRTstats, #darkRTStats").addClass("invisible");
			$(".statsTextHeroes, .statsTextDark").empty();
			$("#specialBox").html("Defeat the Empire using iconic ships!<br>");
			$("#specialBox").append("Attack Power(AP) is used to damage the Empire. Counter Attack Power(CAP) is the Empire's equivalent<br>");
			$("#specialBox").append("Using attack button damages the enemy and increments your AP<br>");
			$("#specialBox").append("An Empire ship randomly uses the force<br>");
			$("#specialBox").append("You can use a special skill every other turn");
			$("#heroHP, #darkHP, #heroAP, #darkCAP").html(00);
			$("#theButton").html("Fight");
			$("#theButton").removeClass("faded");
			$("#msgBox").html("Read guide below.<br>");
			$("#msgBox").append("Select a Rebel ship and an Empire ship then click Fight to start.");			

			starWars.hero = "";
			starWars.dark = "";
			starWars.fight = false;
			starWars.nextMatch = false;
			starWars.heroWin = false;
			starWars.darkWin = false;	
			starWars.endGame = false;
			starWars.skillsCounter = 1;
			starWars.poisonCounter = 0;

			starWars.falcon = [100, 4, "falcon", true, "Hyperdrive", false, "Where It Counts", false, "Bombardment", false];
			starWars.xwing = [120, 5, "xwing", true, "Poison", false, "Sneak Attack", false, "Red 5", false];
			starWars.interceptor = [200, 6, "interceptor", true];
			starWars.tiefighter = [250, 15, "tiefighter", true];

			$("#interceptor, #tiefighter, #falcon, #xwing").removeClass("faded");

			$("#skill1, #skill2, #skill3").addClass("faded");
		},

		goodGame: function() {
			$("#theButton").addClass("faded");
			starWars.endGame = true;
		},

		endGameFunc: function() {
			if (starWars.interceptor[3] === false && starWars.tiefighter[3] === false) {
				$("#msgBox").html("You have destroyed the Empire!");
				$("#darkHP").html("0");
				starWars.goodGame();
			}	
			else if (starWars.falcon[3] === false && starWars.xwing[3] === false) {
				$("#msgBox").html("You lost to the Empire");
				$("#heroHP").html("0");
				starWars.goodGame();
			}	
		},
	}

	$("#falcon").click(function() {		
		if (starWars.fight === false && starWars.falcon[3] === true) {
			starWars.hero = starWars.falcon;
			if (starWars.xwing[3] === true) {
				$("#xwing").removeClass("faded");
			}
			starWars.heroDisplay();	
		}
	});

	$("#xwing").click(function() {
		if (starWars.fight === false && starWars.xwing[3] === true) {
			starWars.hero = starWars.xwing;
			if (starWars.falcon[3] === true) {
				$("#falcon").removeClass("faded");
			}
			starWars.heroDisplay();	
		}
	});

	$("#interceptor").click(function() {
		if (starWars.fight === false && starWars.interceptor[3] === true) {
			starWars.dark = starWars.interceptor;
			if (starWars.interceptor[3] === true) {
				$("#darthvader").removeClass("faded");
			}
			starWars.darkDisplay();	
		}
	});

	$("#tiefighter").click(function() {
		if (starWars.fight === false && starWars.tiefighter[3] === true) {
			starWars.dark = starWars.tiefighter;
			if (starWars.interceptor[3] === true) {
				$("#interceptor").removeClass("faded");
			}
			starWars.darkDisplay();	
		}
	});	

	$("#theButton").click(function() {		
		if (starWars.endGame === false) {
			if (starWars.heroWin === false && starWars.darkWin === false ) {
				if (starWars.fight !== true) {
					starWars.fightStart();
				}
				else {
					starWars.attack();
					return;
				}
			}
			else if (starWars.heroWin === true && starWars.darkWin === false) {
				if (starWars.interceptor[3] === false) {
					starWars.dark = starWars.tiefighter;
					starWars.nextRoundHeroWin();
					$("#specialBox").empty();
					starWars.heroWin = false;	
				}
				else if (starWars.tiefighter[3] === false) {
					starWars.dark = starWars.interceptor;
					starWars.nextRoundHeroWin();
					$("#specialBox").empty();
					starWars.heroWin = false;
				}				
			}
			else if (starWars.heroWin === false && starWars.darkWin === true) {
				if (starWars.falcon[3] === false) {
					starWars.hero = starWars.xwing;
					starWars.nextRoundDarkWin();
					$("#specialBox").empty();
					starWars.darkWin = false;			
				}
				else if (starWars.xwing[3] === false) {	
					starWars.hero = starWars.falcon;
					starWars.nextRoundDarkWin();
					$("#specialBox").empty();
					starWars.darkWin = false;
				}
			}				
		}		
	});	

	$("#skill1").click(function() {
		if (starWars.endGame === false && starWars.fight === true && (starWars.skillsCounter % 2) === 0) {
			if (starWars.hero[2] === "xwing") {		
				starWars.poisonCounter = 1;
			}
			starWars.hero[5] = true;
			starWars.attack();
		}
	});

	$("#skill2").click(function() {
		if (starWars.endGame === false && starWars.fight === true && (starWars.skillsCounter % 2) === 0) {
			starWars.hero[7] = true;
			starWars.attack();			
		}
	});

	$("#skill3").click(function() {
		if (starWars.endGame === false && starWars.fight === true && (starWars.skillsCounter % 2) === 0) {
			starWars.hero[9] = true;
			starWars.attack();
		}
	});

	$("#restartButton").click(function() {
		starWars.wipeOut();	
	});	
});			