if(!localStorage.getItem('starting')){
    localStorage.setItem('starting',0)
}
// Load posts 10 at a time
const quantity = 21;


document.addEventListener('DOMContentLoaded', load);

function load() {
    document.querySelector('.next-btn').style.display = 'none';
    document.querySelector('.previous-btn').style.display = 'none';

    // Set start and end post numbers, and update counter
    const start = localStorage.getItem('starting');
    const end = start*1 + quantity - 1;
    starting = end + 1;

    hotSauceList = document.getElementById("posts");
    hotSauceList.innerHTML='';

    fetch(`/posts?start=${start}&end=${end}`)
    .then(response => response.json())
    .then(async data => {
        for (const hotSauce of data) {
            spice_rate=0,flavor_rate=0;

            const response = await fetch(`/rating/${hotSauce.id}`);
            const data = await response.json();
            spice_rate = data.spice_rank;
            flavor_rate = data.flavor_rank;

            console.log(hotSauce)

            spice = document.createElement('div');
            spice.className='spice';
            flavor = document.createElement('div');
            flavor.className='flavor';

            for (var i = 0; i < 5; i++) {
                symbol = document.createElement('i');
                if(i<spice_rate){
                    symbol.className ='fas fa-pepper-hot';
                    spice.append(symbol);
                    continue;
                }
                symbol.className ='fas fa-pepper-hot';
                symbol.id='out'
                spice.append(symbol);
              }
            for (var i = 0; i < 5; i++) {
                symbol = document.createElement('i');
                if(i<flavor_rate){
                    symbol.className ='fas fa-star checked';
                    flavor.append(symbol);
                    continue;
                }
                symbol.className ='fa fa-star ';
                flavor.append(symbol);
            }

            const aTag = document.createElement("a");
            aTag.id='post';
            aTag.href = ` Sauce/${hotSauce.id} `;
            console.log(hotSauce.image)
            aTag.innerHTML = `
              <div>
                <img src="${hotSauce.image}" alt="">
              </div>
              <div>
                <span class="fas fa-solid">${hotSauce.product}</span>
              </div>
              ${hotSauce.brand}
              <div class="spice">
                ${spice.innerHTML}
              </div>
              <div class="flavor">
              ${flavor.innerHTML}
            </div>
            `;
            hotSauceList.appendChild(aTag);
          }

        if(data.length >= 10 && start==0){
            document.querySelector('.next-btn').style.display = 'block';
        }
        if(data.length >= 10 && start > 0){
            document.querySelector('.previous-btn').style.display = 'block';
            document.querySelector('.next-btn').style.display = 'block';
        }
        if(data.length <= 10 && start > 0){
            document.querySelector('.previous-btn').style.display = 'block';
        }
      });
}

function next_post(){
  start = localStorage.getItem('starting');
  localStorage.setItem('starting',start*1+10)
  localStorage.setItem('starting',start*1+10);
  load();
}


function back_post(){
  start = localStorage.getItem('starting');
  localStorage.setItem('starting',start*1-10)
  localStorage.setItem('starting',start*1-10);
  load();
}

document.onreadystatechange = function() {
  if (document.readyState !== "complete") {
      document.querySelector("#loader").style.visibility = "visible";
      document.querySelector("body").style.visibility = "none";
  } else {
    document.querySelector("#loader").style.display = "none";
    document.querySelector("body").style.visibility = "visible";
  }
};