let allData = [];
const fetchData = async () => {
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(URL);
  const data = await res.json();
  displayData(data.data.tools, 6);
  allData = data.data.tools;
};
const displayData = (data, limit) => {
  console.log(data)
  const showBtn = document.getElementById("show-more-btn");

  if (limit && data.length > 6) {
    data = data.slice(0, 6);
    showBtn.classList.remove("d-none");
  } else {
    showBtn.classList.add("d-none");
  }
  const CardContainer = document.getElementById("card-container");
  CardContainer.innerHTML = "";
  data.forEach((singleData) => {
    // console.log(singleData)
    const { image, features, name, published_in, id } = singleData;

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col");
    cardDiv.innerHTML = `
        <div class="card p-3 h-100">
                <img src="${image}" style="height:200px" class="card-img-top rounded-lg" alt="...">
               
                <h5 class="card-title mt-2">Feature</h5>
                    
                  <ol class="mt-2 p-3 text-secondary">
                    <li>${features[0]}</li>
                    <li>${features[1]}</li>
                    <li>${features[2]}</li>
                  </ol>
                  <hr>

                  <div class= "d-flex align-items-center justify-content-between ">
                  <div >
                   <h5 class="card-title mt-2">${name}</h5>
                   <div class= "d-flex align-items-center justify-content-center gap-2 text-secondary"><i class="fa-solid d-block mb-3 fa-calendar-days"></i> <p>${published_in}</p></div>
                
                   </div>
                   <div style="cursor:pointer">
                   <i data-bs-toggle="modal" data-bs-target="#modalDetails" onclick="getSingleDataByID('${id}')" class="fa-solid text-primary fa-arrow-right"></i>
                   </div>
                  
                  
                  </div>
                 
        </div>
        
        
        `;
    CardContainer.appendChild(cardDiv);
    spinnerShow(false);
  });
};

const showMoreBtn = () => {
  displayData(allData);
};

const getSingleDataByID = async (id) => {
  const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(URL);
  const data = await res.json();
  showDataInModal(data.data);
};
const showDataInModal = (data) => {
  console.log(data);

  //  destructure data Start

  const {
    description,
    image_link,
    input_output_examples,
    features,
    integrations,
    pricing,
    accuracy,
  } = data;
  console.log(pricing);
  // features name
  const { 1: feature_name1, 2: feature_name2, 3: feature_name3 } = features;
  // integrations
//   const [integrations1, integrations2, integrations3] = integrations;
  // pricing
//   const BasePrice = pricing.filter((basePrice) => basePrice.plan === "Basic");
//   //    console.log(BasePrice);
//   const proPrice = pricing.filter((proPrice) => proPrice.plan == "Pro");
//   const enterPrice = pricing.filter(
//     (proPrice) => proPrice.plan == "Enterprise"
//   );
//   const { 0: basicPlan } = BasePrice;
//   const { 0: proPlan } = proPrice;
//   const { 0: enterPlan } = enterPrice;
//      console.log(basicPlan,proPlan,enterPlan);

  const { score } = accuracy;

  const accuracyPercent = score * 100;

  //  destructure data end
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML ='';
  modalContainer.innerHTML = `
    
    <div class="row p-5 gap-4">
    <div style="background-color: rgb(253, 231, 231);" class="col p-3 rounded">
        <h5 class="my-3">${description}</h5>
        <div class="d-md-flex flex-md-row gap-2 justify-content-center text-center rounded my-4">
            <div class="bg-white text-primary rounded fw-bold p-2  shadow-lg">
            ${pricing? pricing[0].price : "Free of Coast"} <br>   ${pricing? pricing[0].plan : "Basic"
  }
            </div>
            <div class="bg-white text-bg-warning rounded fw-bold p-2 shadow-lg">
            ${pricing? pricing[1].price : "Free of Coast"} <br>  ${pricing? pricing[1].plan : "Pro"
  }
            </div>
            <div class="bg-white text-danger rounded fw-bold p-2 shadow-lg">
            ${pricing? pricing[2].price: "Free of Coast"} <br>  ${pricing? pricing[2].plan: "Enterprise"} 
            </div>

        </div>
        <div class="my-3 row">
            <div class="col">
                <h5>Features</h5>
                <ul id="featuredUl" class="text-secondary">
                    <li>${feature_name1.feature_name}</li>
                    <li>${feature_name2.feature_name}</li>
                    <li>${feature_name3.feature_name}</li>
                </ul>

            </div>
            <div class="col">
                <h5>Integrations</h5>
                <ul class="text-secondary">
                    <li  id="integrations1">${integrations?.[0] ? integrations?.[0]:"No Data Found"}</li>
                    <li style="visibility: hidden;" id="integrations2">${integrations?.[1]?integrations?.[1] : "No Data Found"}</li>
                    <li style="visibility: hidden;" id="integrations3">${integrations?.[2]?integrations?.[2] : "No Data Found"}</li>
                </ul>

            </div>

        </div>
    </div>
    <div class="col p-5 text-center p-3 border border-1 rounded border-secondary">
    <div class="position-relative">
    <img style="width:100%; height:80%;" class="" src="${image_link[0]}" alt="">
    <button style="top:0;right:0;" id="accuracyPercentBtn"  type="button" class=" btn btn-danger position-absolute mt-2">${
      score ? accuracyPercent : ""
    }%
        accuracy</button>
   </div>
        <h5 class="my-2">${input_output_examples?input_output_examples[0]?.input:"Can you give any example?"}</h5>
        <p class="text-secondary">${input_output_examples?input_output_examples[0]?.output:"No! Not Yet! Take a break!!!"}</p>
    </div>
</div>

    `;
  // conditional rendering start
  if ( integrations?.[2]) {
    document.getElementById("integrations2").style.visibility = "visible";
  }
  if ( integrations?.[3]) {
    document.getElementById("integrations3").style.visibility = "visible";
  }

  if (accuracyPercent) {
    document.getElementById("accuracyPercentBtn").style.display = "block";
  } else {
    document.getElementById("accuracyPercentBtn").style.display = "none";
  }
  // conditional rendering start
};

const sortByDate = () => {
  let allDate = [];
  console.log(allData)
  allData.sort((a, b) =>{
    // console.log(a.published_in)
    return new Date(a.published_in) - new Date(b.published_in);
  });
  displayData(allData,6)


}
