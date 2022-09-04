
const loadAllCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => setAllCategories(data.data.news_category))
        .catch(error => console.log(error))
}


const setAllCategories = (catagories) => {
    const catagoryContainer = document.getElementById("catagories");
    const displayCatagories = catagories.forEach(catagory => {


        const newAdding = document.createElement("a");
        newAdding.classList.add("'btn','btn-danger'")
        newAdding.innerHTML = `<a class="btn" onclick="newsToday('${catagory.category_id}')">${catagory.category_name}</a>`
        catagoryContainer.appendChild(newAdding)
    });
}


loadAllCategories();




// Display Different Catagorys News

const newsToday = (category_id) => {
    toggleSpinner(true)

    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayAllNews(data.data))
            .catch(error => console.log(error))

}




// show News Clicked By catagory

const displayAllNews = news => {


    const newContainer = document.getElementById("newsContainer");
    newContainer.textContent = ''
    const newsAnalise = news.length;
    const newsAnaliseContainer = document.getElementById("newstotal");
    if (newsAnalise === 0) {
        newsAnaliseContainer.innerText = ` No News Found `
    }
    else {
        newsAnaliseContainer.innerText = `${newsAnalise} items found. `
    }
    news.forEach(element => {


        const newAdding = document.createElement("div");
        newAdding.classList.add("card", "mb-3");
        newAdding.style.maxWidth = '100';

        newAdding.innerHTML = `
        <div class="row g-0">
              <div class="col-md-4">
                <img src="${element.thumbnail_url}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">

                <div class="card-body ">
                  <h5 class="card-title">${element.title}</h5>
                  <p class="card-text"  style="text-overflow:hidden ; height:200px">${element.details.length > 280 ? element.details.slice(0, 280) + '...' : element.details}</p>

                  <div class="card-text d-flex justify-content-between align-items-center pe-2  ">

                    <div>
                        <small class="text-muted"><img src="${element.author.img}" class=" rounded pe-2" alt="" width="40" height="34"></small>
                        <small class="text-muted">${element.author.name ? element.author.name : "Not available"} <br></small>
                        <small class="text-muted">${element.author.published_date ? element.author.published_date : "not available"}</small>

                    </div>
                    <div>
                        <span><img  height="20px" src="images/eye-icon.png"></span> &nbsp;<small id="">${element.total_view ? element.total_view : "Not available"}</small>
                    </div>
                    <div>
                      <small>  <button class="btn btn-dark  " onclick ="more('${element._id}')"  data-toggle="modal" data-target="#exampleModalLong" >More</button>
                     
                      </small>
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
        `
        newContainer.appendChild(newAdding);



    });
    toggleSpinner(false)
    return news;


}


// sorts button clicked

const sort = () => {
    const catagories = document.getElementById("newsContainer")
    console.log(catagories)
};




// More Button in News  Clicked

const more = (news_id) => {
    url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMoreItem(data.data[0]))
        .catch(error => console.log(error))
}


const displayMoreItem = (newsObject) => {

    const modalTittle = document.getElementById("modalTittle");
    modalTittle.innerText = `${newsObject.title}`;
    const modalBody = document.getElementById("modalBody");
    console.log(newsObject)
    modalBody.innerText = `${newsObject.details}`
}


//  spinner function

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById("spinner");
    if (isLoading) {
        loaderSection.classList.remove("d-none");
    }
    else {
        loaderSection.classList.add("d-none")
    }
}

