
const phoneLode = async (searchText = "iphone", isShow) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phone = data.data;
    if (data && data.data && data.data.length > 0) {
        displyPhone(phone, isShow);
    } else {
        const phoneContainer = document.getElementById('phone-continer');
        phoneContainer.textContent = 'No matching phones found.';
    }
}


const displyPhone =( phone,isShow) => {
    const phoneContainer = document.getElementById('phone-continer');
phoneContainer.textContent = '';

const showAll = document.getElementById('showall-btn');
if(phone.length >12 && !isShow){

    showAll.classList.remove('hidden');
}else{
    showAll.classList.add('hidden');
}
// showall condition

if(!isShow){
    phone = phone.slice(0,12)
}

    phone.forEach( (phone ,isShow) => {
        // console.log(phone ,isShow);
       const phoneCard = document.createElement('div');
       phoneCard.classList = `card bg-gray-100 shadow-xl border mt-4 p-4`;
       phoneCard.innerHTML = `
       <figure><img src="${phone.image}" alt="Shoes" /></figure>
       <div class="card-body">
         <h2 class="card-title">${phone.phone_name}</h2>
         <p>If a dog chews shoes whose shoes does he choose?</p>
         <div class="card-actions justify-center">
           <button onclick="showDetelsHandel('${phone.slug}')" class="btn btn-secondary  w-full">Show Details</button>
         </div>
       </div>
       `
       phoneContainer.appendChild(phoneCard);

    });
    tgoololoadingSpinner(false);
}
// search section

const searchHendel = (isShow) => {
   const searchField = document.getElementById('text-field');
   const searchText = searchField.value;
   tgoololoadingSpinner(true);
//    console.log(searchText);


phoneLode(searchText,isShow);

}



const tgoololoadingSpinner = (isloding) => {
    const loadingSpinner = document.getElementById('loading-Spinner');
    if(isloding){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}


const showAllHandel = () => {

    searchHendel(true);
}

// show Detels

const showDetelsHandel =async (id) => {
// console.log(id);
const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
const data = await res.json();
const phone = data.data;
show_my_modal.showModal();
showDetels(phone);

}

const showDetels = (phone) => {
    // console.log(phone);
    const showDetelsContiner = document.getElementById('show-detels-continer');
    showDetelsContiner.innerHTML=`
    <div class="grid bg-sky-50 py-5 rounded-lg justify-center my-5">
    <img src="${phone.image}" alt="Shoes" />
</div>
    <h2 class="text-xl my-3 font-bold">${phone.name}</h2>
    <p class="text-sm"><samp class="text-lg font-bold">Storage :</samp>${phone.mainFeatures.storage}</p>
    <p class="text-sm"><samp class="text-lg font-bold">Display Size :</samp>${phone.mainFeatures.displaySize
    }</p>
    <p class="text-sm"><samp class="text-lg font-bold">Chipset :</samp>${phone?.mainFeatures?.chipSet}</p>
    <p class="text-sm"><samp class="text-lg font-bold">Memory :</samp>${phone?.mainFeatures?.memory}</p>
    <p class="text-sm"><samp class="text-lg font-bold">Slug :</samp>${phone?.slug}</p>
    <p class="text-sm"><samp class="text-lg font-bold">Release data :</samp>${phone?.releaseDate}</p>
    <p class="text-sm"><samp class="text-lg font-bold">Brand :</samp>${phone.brand}</p>
    <p class="text-sm"><samp class="text-lg font-bold">GPS :</samp>${phone?.others?.GPS}</p>

    `
}

phoneLode();