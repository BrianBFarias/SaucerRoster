if(!localStorage.getItem('spice-rate') && !localStorage.getItem('flavor-rate')){
    localStorage.setItem('spice-rate',0)
    localStorage.setItem('flavor-rate',0)
}

document.addEventListener('DOMContentLoaded', load);

function load(){
    post_id =document.getElementById("info-post").className;

    fetch(`/rating/${post_id}`)
    .then(response => response.json())
    .then(data => {
        spice_rate = Math.round((data.spice_rank/5) *100);
        flavor_rate = Math.round((data.flavor_rank/5) *100);

        document.getElementById("info-post").querySelector(".spice").innerHTML = `<p>It has <strong>${spice_rate}%</strong> spicecness</p>`;
        document.getElementById("info-post").querySelector(".flavor").innerHTML = `<p>Flavor is ranked at <strong>${flavor_rate}%</strong></p>`;

      });
      
    fetch(`/post/${post_id}`)
    .then(response => response.json())
    .then( data => {
        if(data.reviewed){
            document.getElementById('feedback').style.display='none';
            document.getElementById('post_feedback').style.display='block';
        }
        else{
            document.getElementById('feedback').style.display='block';
            document.getElementById('post_feedback').style.display='none';
        }

      });



}

function spice_rating(value){

    localStorage.setItem('spice-rate',value);

    section = document.getElementById("spice_review");

    section.innerHTML=`
    <i id="1" class="fa-regular fa-pepper-hot" onclick="spice_rating(1)"></i>
    <i id="2" class="fa-regular fa-pepper-hot" onclick="spice_rating(2)"></i>
    <i id="3" class="fa-regular fa-pepper-hot" onclick="spice_rating(3)"></i>
    <i id="4" class="fa-regular fa-pepper-hot" onclick="spice_rating(4)"></i>
    <i id="5" class="fa-regular fa-pepper-hot" onclick="spice_rating(5)"></i>`

    for(let x=0; x<(value); x++){
        section.getElementsByClassName('fa-regular fa-pepper-hot')[x].className +=' checked';
    }

}

function flavor_rating(value){
    localStorage.setItem('flavor-rate',value);

    section = document.getElementById("flavor_review");;

    section.innerHTML=`
    <span id="1" class="fa-solid fa-bowl-food" onclick="flavor_rating(1)"></span>
    <span id="2" class="fa-solid fa-bowl-food" onclick="flavor_rating(2)"></span>
    <span id="3" class="fa-solid fa-bowl-food" onclick="flavor_rating(3)"></span>
    <span id="4" class="fa-solid fa-bowl-food" onclick="flavor_rating(4)"></span>
    <span id="5" class="fa-solid fa-bowl-food" onclick="flavor_rating(5)"></span>`

    for(let x=0; x<(value); x++){
        section.getElementsByClassName('fa-solid fa-bowl-food')[x].className +=' checked';
    }
}

function submit(){
    fetch(`/review/${document.getElementById("info-post").className}?spice=${localStorage.getItem('spice-rate')}&flavor=${localStorage.getItem('flavor-rate')}`, {
        method: 'POST',
        body: JSON.stringify({
        })
      })
      .then(response => response.json())
      .then(result => {
        flavor_rating(0)
        spice_rating(0)
          // Print result
          console.log(result);
          load()
      });
}