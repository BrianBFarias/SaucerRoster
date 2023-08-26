if(!localStorage.getItem('starting')){
    localStorage.setItem('starting',0)
}
if(!localStorage.getItem('filterS') || !localStorage.getItem('filterF')){
  localStorage.setItem('filterS',0)
  localStorage.setItem('filterF',0)
}
// Load posts 30 at a time, + 1 buffer
const quantity = 31;

document.addEventListener('DOMContentLoaded', reset_page);
document.addEventListener('DOMContentLoaded', load);

function reset_page(){
  localStorage.setItem('starting',0)
}

function load() {
    document.querySelector('.next-btn').style.display = 'none';
    document.querySelector('.previous-btn').style.display = 'none';
    document.querySelector('.selection-bar').style.display = 'none';
    document.querySelector('.open-selection-bar').style.display = 'block';

    // Set start and end post numbers, and update counter

    let start;

    if(localStorage.getItem('starting') != 0){
      start=localStorage.getItem('starting')-1;
    }
    else{
      start=localStorage.getItem('starting');
    }

    const end = start*1 + quantity;


    hotSauceList = document.getElementById("posts");
    hotSauceList.innerHTML='';

    fetch(`/posts?start=${start}&end=${end}&spice=${localStorage.getItem('filterS') }&flavor=${localStorage.getItem('filterF') }`)
    .then(response => response.json())
    .then(async data => {
        if(!data){
          document.querySelector('.invalid').style.display = 'block';
          document.querySelector('.post-section').style.display = 'none';
        }
        else{
          document.querySelector('.post-section').style.display = 'block';
          document.querySelector('.invalid').style.display = 'none';

          one_page= data.slice(0,(quantity-1));

          for (const hotSauce of one_page) {
            spice_rate=0,flavor_rate=0;
            const response = await fetch(`/rating/${hotSauce.id}`);
            const data = await response.json();
            spice_rate = data.spice_rank;
            flavor_rate = data.flavor_rank;

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
                symbol.className ='fas fa-star ';
                flavor.append(symbol);
            }

            const aTag = document.createElement("a");
            aTag.id='post';
            aTag.href = ` Sauce/${hotSauce.id} `;
            aTag.innerHTML = `
              <div class='prod_img'>
                <img src="${hotSauce.image}" alt="">
              </div>
              <div class='text_desc'>
                <div>
                  <h5 class="title">${hotSauce.product}</h5>
                </div>
                ${hotSauce.brand}
              </div>
              <div class="spice">
                ${spice.innerHTML}
              </div>
              <div class="flavor">
              ${flavor.innerHTML}
            </div>
            <div>
              <p>${hotSauce.num_reviews} Ratings </p>
            </div>
            `;
            hotSauceList.appendChild(aTag);
          }

        if(data.length > (quantity-1) && start==0){
            document.querySelector('.next-btn').style.display = 'block';
        }
        if(data.length >= (quantity-1) && start > 0){
            document.querySelector('.previous-btn').style.display = 'block';
            document.querySelector('.next-btn').style.display = 'block';
        }
        if(data.length <= (quantity-1) && start > 0){
            document.querySelector('.previous-btn').style.display = 'block';
        }
        }
      });
}

function next_post(){
  start = localStorage.getItem('starting');
  localStorage.setItem('starting',start*1+quantity)
  load();
}


function back_post(){
  start = localStorage.getItem('starting');
  localStorage.setItem('starting',start*1-quantity)
  load();
}

document.onreadystatechange = function() {
  if (document.readyState !== "complete") {
      document.querySelector("#loader").style.visibility = "visible";
      document.querySelector(".explore-page").style.visibility = "hidden";
  } else {
    document.querySelector("#loader").style.display = "none";
    document.querySelector(".explore-page").style.visibility = "visible";
  }
};

function toggle_menu(){
  if(document.querySelector(".selection-bar").style.display == "block" || document.querySelector(".open-selection-bar").style.display == "none"){
    document.querySelector(".open-selection-bar").style.display = "block";
    document.querySelector(".selection-bar").style.display = "none";
  }
  else{
    document.querySelector(".open-selection-bar").style.display = "none";
    document.querySelector(".selection-bar").style.display = "block";
  }
}

function clear_filter(){
  if(document.querySelector('input[type=radio][name=Srating]:checked')){
    var spice_rating = document.querySelector('input[type=radio][name=Srating]:checked');
    spice_rating.checked = false;

    spice_rating.parentElement.className='selection';
  }
  if(document.querySelector('input[type=radio][name=Frating]:checked')){
    var flavor_rating = document.querySelector('input[type=radio][name=Frating]:checked');
    flavor_rating.checked = false;

    flavor_rating.parentElement.className='selection';
  }

  localStorage.setItem('filterS',0)
  localStorage.setItem('filterF',0)
  localStorage.setItem('starting',0)

  toggle_menu()
  load()
}

function filter(){
  if(document.querySelector('input[type=radio][name=Srating]:checked')){
    var spice_rating = document.querySelector('input[type=radio][name=Srating]:checked');
    localStorage.setItem('filterS',spice_rating.value)

  }
  if(document.querySelector('input[type=radio][name=Frating]:checked')){
    var flavor_rating = document.querySelector('input[type=radio][name=Frating]:checked');
    localStorage.setItem('filterF',flavor_rating.value)
  }
  localStorage.setItem('starting',0)
  load()
}

function Select_spice(){  
  try {
    var all_spice = document.querySelector('.spice_filter');
    all_spice.getElementsByClassName('selected')[0].className='selection';

    var spice_rating = document.querySelector('input[type=radio][name=Srating]:checked');
    spice_rating.parentElement.className='selected';
  
  } catch (TypeError) {

    var spice_rating = document.querySelector('input[type=radio][name=Srating]:checked');
    spice_rating.parentElement.className='selected';
  }
}

function Select_flavor(){  
  try {
    var all_flavor = document.querySelector('.flavor_filter');
    all_flavor.getElementsByClassName('selected')[0].className='selection';

    var flavor_rating = document.querySelector('input[type=radio][name=Frating]:checked');
    flavor_rating.parentElement.className='selected';
  
  } catch (TypeError) {

    var flavor_rating = document.querySelector('input[type=radio][name=Frating]:checked');
    flavor_rating.parentElement.className='selected';
  }

}