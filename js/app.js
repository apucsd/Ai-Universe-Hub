let allData = [];
const fetchData = async () =>{
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(URL);
    const data = await res.json();
    displayData(data.data.tools,6)
    allData= data.data.tools;


}
const displayData = (data,limit) => {
    // console.log(data)
    const showBtn = document.getElementById('show-more-btn');
  
    if(limit && data.length > 6){
        data =  data.slice(0,6);
        showBtn.classList.remove('d-none');
       
    }
    else{
        showBtn.classList.add('d-none')
    }
    const CardContainer = document.getElementById('card-container')
    data.forEach(singleData => {
        console.log(singleData)
        const {image,features,name,published_in} = singleData;
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML =`
        <div class="card p-3 h-100">
                <img src="${image}" style="height:200px" class="card-img-top rounded-lg" alt="...">
               
                <h5 class="card-title mt-2">Feature</h5>
                    
                  <ol class="mt-2 text-secondary">
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
                   <i class="fa-solid text-primary fa-arrow-right"></i>
                   </div>
                  
                  
                  </div>
                 
        </div>
        
        
        `;
        CardContainer.appendChild(cardDiv);

    })
}

const showMoreBtn = () =>{
    displayData(allData)
    
   
}

