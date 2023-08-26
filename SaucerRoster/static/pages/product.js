if(!localStorage.getItem('spice-rate') && !localStorage.getItem('flavor-rate')){
    localStorage.setItem('spice-rate',0)
    localStorage.setItem('flavor-rate',0)
}
if(!localStorage.getItem('Cend')){
  localStorage.setItem('Cend',7)
}

document.addEventListener('DOMContentLoaded', load);

function animateValue(spice, flavor, spice_val, flavor_val, duration) {
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;

      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeInOutQuad = function(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      };
      spice.innerHTML = `${Math.floor(easeInOutQuad(progress) * (spice_val - 0) + 0)}%`;
      flavor.innerHTML = `${Math.floor(easeInOutQuad(progress) * (flavor_val - 0) + 0)}%`;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  
function load(){
    localStorage.setItem('Cend',7)
    post_id =document.getElementById("info-post").className;

    fetch(`/rating/${post_id}`)
    .then(response => response.json())
    .then(data => {
        spice_rate = Math.round((data.spice_rank/5) *100);
        flavor_rate = Math.round((data.flavor_rank/5) *100);

        document.getElementById("info-post").querySelector(".spice").innerHTML = `<p><strong id='spicePercent'>${spice_rate}%</strong> Spice</p>`;
        document.getElementById("info-post").querySelector(".flavor").innerHTML = `<p><strong id='flavorPercent'>${flavor_rate}%</strong> Yummy!</p>`;

        const spice = document.getElementById("spicePercent");
        const flavor = document.getElementById("flavorPercent");

        animateValue(spice, flavor, spice_rate, flavor_rate, 5000);
      });
      
    fetch(`/post/${post_id}`)
    .then(response => response.json())
    .then( data => {
        if(data.reviewed){
            document.getElementById('feedback').style.display='none';
            document.getElementById('post_feedback').style.display='block';
            document.getElementById('just-submited').style.display='none';

        }
        else{
            document.getElementById('feedback').style.display='block';
            document.getElementById('post_feedback').style.display='none';
            document.getElementById('just-submited').style.display='none';
        }

      });
      comments()
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
      localStorage.setItem('spice-rate',0)
      localStorage.setItem('flavor-rate',0)

      document.getElementById('just-submited').style.display='block';
      document.getElementById('feedback').style.display='none';
      document.getElementById('post_feedback').style.display='none';
}

function comment_postable(){
  if(document.getElementById("new_comment").value == ''){
    document.querySelector(".postable").className='not_postable';
    document.querySelector(".postable").disabled=true;
  }
  else if(document.getElementById("new_comment").value != ''){
    document.querySelector(".not_postable").className='postable';
  }
}

function comments(){
  fetch(`/comments/${post_id}?start=${0}&end=${localStorage.getItem('Cend')}`)
  .then(response => response.json())
  .then(data => {

    console.log(data)

    all_comments = data.slice(0,localStorage.getItem('Cend')-1);

    if(data.length < localStorage.getItem('Cend')){
      document.querySelector('.vm').style.display='none';
    }

    if(data.length != 0){
      document.getElementById('no_comment').style.display='none';
    }

    comment_section = document.getElementById('posted_comments');
    comment_section.innerHTML='';

    for(var comment=0; comment<all_comments.length; comment++){
      com=all_comments[comment]

      var time;
      
      const postTime = new Date(com.timestamp);

      var seconds = Math.floor((new Date() - postTime) / 1000);
      var interval = seconds / 31536000;

      if (interval > 1) {
        time = `${Math.floor(interval)} year ago`;
      }
      else if ((seconds / 2592000) > 1) {
        interval = seconds / 2592000;
        time = `${Math.floor(interval)} month ago`;
      }
      else if ((seconds / 86400) > 1) {
        interval = seconds / 86400;
        time = `${Math.floor(interval)} day ago`;
      }
      else if ((seconds / 3600) > 1) {
        interval = seconds / 3600;
        time = `${Math.floor(interval)} hr ago`;
      }
      else if ((seconds / 60) > 1) {
        interval = seconds / 60;
        time = `${Math.floor(interval)} min ago`;
      }
      else{
        time =  'Just Now';
      }

      comment_box = document.createElement('div');
      comment_box.className='com_box';

      var className='fa-regular fa-heart';
      if(com.liked){
        className='fa-solid fa-heart';
      }
      
      comment_box.innerHTML=`
      <div>
        <span></span>
      </div>
      
      <div class='com_data' id='${com.id}'>
        <div>
          <p> ${com.poster}<strong> ${time}  </strong> </p>
        </div>
        <div>
          <h4> ${com.comment} </h4>
        </div>
          <div class='like_data'>
            <i class="${className}" onclick='toggle_like(${com.id})' value='${com.likes}'></i>
            <p>${com.likes}</p> 
          </div>
      </div>
      `;

      comment_section.appendChild(comment_box);
      comment_box.querySelector('i').style.animationPlayState='paused';
    }
    });
}

function view_more(){
  localStorage.setItem('Cend',localStorage.getItem('Cend')*1+6);

  comments()
}

function toggle_like(com_id){
  comment = document.getElementById(com_id);
  console.log(com_id)
  fetch(`/like/${com_id}`, {
    method: 'POST'
  })
  .then(response => response.json())
  .then(result => {
    console.log(comment.querySelector('i'))
    console.log(result)
    if(result){
      comment.querySelector('i').style.animationPlayState='running';
    }
    else{
      comment.querySelector('i').style.animationPlayState='running';
    }
    setTimeout(function(){
      comments()
    }, 500);
  });
}
