document.addEventListener('DOMContentLoaded', load);

const imagePreview = () => {
  const input = document.getElementById("upload");
  const imagePreview = document.getElementById("image_preview");

  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (event) => {
      imagePreview.src = event.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    imagePreview.src = "";
  }
};

function load() {
const upload = document.getElementById('upload');
const Btn = document.getElementById('upload_button');
document.getElementById("image_preview").style.display='none';
upload.addEventListener('change', function(){
    document.getElementById("image_preview").style.display='block';

    Btn.textContent = this.files[0].name
    Btn.className='uploaded'
    imagePreview()
})
}