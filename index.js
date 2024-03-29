let net;
const preview = document.getElementById("preview");
const predictButton = document.getElementById("predict");
const clearButton = document.getElementById("clear");
const img_output =  document.getElementById('img-output');

const predict =async function app(img_output) {
  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Sucessfully loaded model');

  // Make a prediction through the model on our image.
  //const imgEl = document.getElementById('img');
  const result = await net.classify(img_output);
  renderImageLabel(result);
  console.log(result);
};

const renderImageLabel = (label) => {
        probability=Number(label[0].probability).toFixed(2)
        preview.innerHTML += `<div class="label-block">
                              <h2 class="label-block__classname">Class Name : ${label[0].className}</h2>
                              <h2 class="label-block__probability">Probability : ${probability}</h2>
                              </div>`;
};


function loadFile(event){
  img_output.src = URL.createObjectURL(event.target.files[0]);
}


predictButton.addEventListener("click", () => predict(img_output));
clearButton.addEventListener("click", () => preview.innerHTML = "");
