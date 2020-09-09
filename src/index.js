document.addEventListener("DOMContentLoaded", ()=> {

    const url = 'http://localhost:3000/beers';
    const beerUrl = 'http://localhost:3000/beers/1';
    const detailDiv = document.querySelector('.beer-details');
    const form = document.querySelector('.description');
    const customerReviews = document.querySelector('.reviews');
    const reviewForm = document.querySelector('.review-form');
    // console.log(reviewForm[0])
    // debugger
    // console.log(form)
    // console.log(reviews)
    // console.log(detailDiv)

    fetch(beerUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(beer){
        renderBeer(beer);
    })

    function renderBeer(beer){

        detailDiv.children[0].innerText = beer.name;
        detailDiv.children[1].src = beer.image_url;

        form.children[0].innerHTML = beer.description;
        
        const reviews = beer.reviews;
        customerReviews.innerHTML = " ";
        reviews.forEach(review => {
            const li = document.createElement('li');
            li.innerText = review
            customerReviews.appendChild(li)
        });
    }

    form.addEventListener('submit', function(){
        
        fetch(beerUrl, {
            method: 'PATCH',
            headers: 
            {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              "description": form[0].value,
            })
          }) 
    })

    reviewForm.addEventListener('submit', function(){
        const input = reviewForm[0].value
        const li = document.createElement('li')
        li.innerHTML = input;
        customerReviews.appendChild(li);
        console.log(li.innerText)
        
        // event.preventDefault();
        // fetch(beerUrl, {
        //     method: 'POST',
        //     headers: 
        //     {
        //       "Content-Type": "application/json",
        //       "Accept": "application/json"
        //     },
        //     body: JSON.stringify({
        //       "reviews": li.innerText
        //     })
        //   }) 
    })

})