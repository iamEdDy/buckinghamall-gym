    // Function to create the HTML structure for a product
    function createProductHTMLPaymentConfirmedGym(theMemberID) {
      return `
        <div class="page-intro">
          <h2>Payment Confirmed #${theMemberID}</h2>
          <p>Kindly show your subscription ID to the GYM Instructor(s) to activate your subscription</p>
          <ul class="bread-crumb">
              <li class="has-separator">
                  <i class="ion ion-md-home"></i>
                  <a href="/">Home</a>
              </li>
              <li class="is-marked">
                  <a href="payment-confirmed.html">#${theMemberID}</a>
              </li>
          </ul>
        </div>
      `;
    }

        // Function to create the HTML structure for a product
        function createProductHTMLPaymentConfirmedGym2() {
          return `
            <div class="page-intro">
              <h2>Membership Not Found</h2>
              <p>Kindly make a payment to activate your membership subscription</p>
              <ul class="bread-crumb">
                  <li class="has-separator">
                      <i class="ion ion-md-home"></i>
                      <a href="/">Home</a>
                  </li>
                  <li class="is-marked">
                      <a>Not Found</a>
                  </li>
              </ul>
            </div>
          `;
        }

    function getCookie(name) {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
          const [cookieName, cookieValue] = cookie.split('=');
          if (cookieName.trim() === name) {
              return cookieValue;
          }
      }
      return null;
    }
    
    // Function to populate the item container with fetched data
    function populateItemContainerPaymentConfirmedGym() {
      const itemContainer = document.getElementById('gym-payment-confirmed-container');
    
      const theMemberID = getCookie('membershipID');
      if(!theMemberID) {
        const productHTML2 = createProductHTMLPaymentConfirmedGym2();
        itemContainer.innerHTML += productHTML2;
      } else {
        const productHTML = createProductHTMLPaymentConfirmedGym(theMemberID);
        itemContainer.innerHTML += productHTML;
      }
    }


    
    // Fetch data and populate the item container on page load
    document.addEventListener('DOMContentLoaded', () => {
      populateItemContainerPaymentConfirmedGym();
    });
    