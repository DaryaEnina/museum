const progress = document.querySelector('.progress', '.progress_volume');
  
progress.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #24809e 0%, #24809e ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
})
const progressValue = document.querySelector('.progress_volume');
  
progressValue.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #24809e 0%, #24809e ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
})
