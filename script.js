const damageRange = 0.3;
      criticalHitRate = 0.1;

let logIndex = 0,
    nowKilledNumbers = 0,
    targetKillsnumbers = 2;

const playerData = {
  name: "プレイヤー",
  hp: 100,
  attack: 5,
  defense: 2
}

const enemiesData = [
  {
    name: 'スライム',
    hp: 50,
    attack: 3,
    defense: 1
  },
  {
    name: 'フェアリー',
    hp: 60,
    attack: 4,
    defense: 2
  },
  {
    name: 'ガーコイル',
    hp: 100,
    attack: 5,
    defense: 1
  }
];

for (let i = 0; i < enemiesData.length; i++) {
  enemiesData[i].maxHp = enemiesData[i].hp;
}

let enemyData = enemiesData[Math.floor(Math.random() * enemiesData.length)];

playerData.maxHp = playerData.hp;
// enemyData.maxHp = enemyData.hp;

function insertText(id, text) {
  document.getElementById(id).textContent = text;
}

function damageCalculation(attack, defense) {
  const maxDamage = attack * (1 + damageRange);
  const minDamage = attack * (1 - damageRange);
  const attackDamage = Math.floor(Math.random() * (maxDamage - minDamage) + minDamage);
  
  const damage = attackDamage - defense;

  if (damage < 1) {
    return 0;
  } else {
    return damage;
  }
}

function insertLog(texts) {
  const logsElement = document.getElementById('logs'),
        createLog = document.createElement('li');
  logIndex ++
  createLog.innerHTML = logIndex + ":" + texts;
  logsElement.insertBefore(createLog, logsElement.firstChild)
}

function showModal(title, hiddenNextButton = false) {
  document.getElementById('mask').classList.add('active');
  document.getElementById('modal').classList.add('active');
  document.getElementById('modalTitle').textContent = title;

  if (hiddenNextButton) {
    document.getElementById('modalNextButton').classList.add('hidden');
  }
}


insertText('playerName', playerData.name);
insertText('currentPlayerHp', playerData.hp);
insertText('maxPlayerHp', playerData.hp);

insertText('enemyName', enemyData.name);
insertText('currentEnemyHp', enemyData.hp);
insertText('maxEnemyHp', enemyData.hp);

insertText('nowKilledNumbers', nowKilledNumbers);
insertText('targetKillsNumbers', targetKillsnumbers);


document.getElementById('attack').addEventListener('click', function() {
  let victory = false,
      defeat = false;


  //敵への攻撃処理
  let playerDamage = damageCalculation(playerData.attack, enemyData.defense);
  if (Math.random() < criticalHitRate) {
    playerDamage *= 2;
    insertLog('<span style="color: blue;">' + playerData.name + "</span>の攻撃！クリティカルヒット!" + enemyData.name + "に"　+ playerDamage + "のダメージ！")
  } else {
    insertLog('<span style="color: blue;">' + playerData.name + "</span>の攻撃！" + enemyData.name + "に"　+ playerDamage + "のダメージ！")
  }
  enemyData.hp -= playerDamage;
  insertText('currentEnemyHp', enemyData.hp);
  document.getElementById('currentEnemyHpGuageValue').style.width = (enemyData.hp / enemyData.maxHp * 100) + "%";
  
  
  if (enemyData.hp <= 0) {
    victory = true;

    enemyData.hp = 0;
    insertText('currentEnemyHp', enemyData.hp);
    document.getElementById('currentEnemyHpGuageValue').style.width = "0%";

    showModal(enemyData.name + "を倒した！");
  } 

  
  if (!victory) {
    let enemyDamage = damageCalculation(enemyData.attack, enemyData.defense);
    if (Math.random() < criticalHitRate) {
      enemyDamage *= 2;
      insertLog('<span style="color: red;">' + enemyData.name + "</span>の攻撃！クリティカルヒット！" + playerData.name + "に"　+ enemyDamage + "のダメージ！")
    } else {
      insertLog('<span style="color: red;">' + enemyData.name + "</span>の攻撃！" + playerData.name + "に"　+ enemyDamage + "のダメージ！")
    }
    playerData.hp -= enemyDamage;
    insertText('currentPlayerHp', playerData.hp);
    document.getElementById('currentPlayerHpGuageValue').style.width = (playerData.hp / playerData.maxHp * 100) + "%";
    
  
    if (playerData.hp <= 0) {
      defeat = true;
  
      playerData.hp = 0;
      insertText('currentPlayerHp', playerData.hp);
      document.getElementById('currentPlayerHpGuageValue').style.width = "0%";

      showModal(enemyData.name + "に負けた...", true);
    }
  }
  

  if (victory || defeat) {
    this.classList.add('deactive');
  }

  if (victory) {
    nowKilledNumbers++;
    insertText('nowKilledNumbers', nowKilledNumbers);

    if (nowKilledNumbers === targetKillsnumbers) {
      showModal("おめでとう！ゲームクリア!", true);
    }
  }
  
});


document.getElementById('modalNextButton').addEventListener('click', function() {
  enemyData.hp = enemyData.maxHp;
  enemyData = enemiesData[Math.floor(Math.random() * enemiesData.length)];

  insertText('enemyName', enemyData.name);
  insertText('currentEnemyHp', enemyData.hp);
  insertText('maxEnemyHp', enemyData.hp);
  document.getElementById('currentEnemyHpGuageValue').style.width = "100%";

  document.getElementById('mask').classList.remove('active');
  document.getElementById('modal').classList.remove('active');
  document.getElementById('attack').classList.remove('deactive');
}) 

