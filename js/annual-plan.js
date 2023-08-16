const sampleDataAnnualGym = [
    {
      orderId: 8
    },
  ]

  let annualAmount;
  function setAmountAnnualGym() {
        annualAmount = 197431;
        document.getElementById('gym-annual-amount').value = 197431;
    }
  
  
  
  // Function to fetch data from the API
  async function fetchDataAnnualGym() {
      try {
          const response = await fetch('https://example.com/api/products');
          return await response.json();
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    }
  
  
    // Function to get the value of an element by its ID
  function getValueByIdAnnualGym(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        return element.value;
    }
    return '';
  }
  
    // Function to retrieve billing details and order notes
    function getBillingDetailsAnnualGym(theOrderID) {
      const firstName = getValueByIdAnnualGym('gym-annual-first-name');
      const lastName = getValueByIdAnnualGym('gym-annual-last-name');
      const address = getValueByIdAnnualGym('gym-annual-req-st-address');
      const country = getValueByIdAnnualGym('gym-annual-select-country');
      const city = getValueByIdAnnualGym('gym-annual-town-city');
      const email = getValueByIdAnnualGym('gym-annual-email');
      const phone = getValueByIdAnnualGym('gym-annual-phone');
  
      let handler = PaystackPop.setup({
        key: 'pk_test_deac0f7a7e53ab5cccd213e3690a9dc84861655e', // Replace with your public key
        email: email,
        amount: annualAmount * 100,
        // label: "Optional string that replaces customer email"
        onClose: function(){
          alert('Transaction was not completed, window closed.');
        },
        callback: function(resp){
          let firstRes = resp;
          axios.get('https://api.paystack.co/transaction/verify/' + resp.reference,
          {
            headers: {
              authorization: "Bearer sk_test_ee0f95dce9cc25ad79f964ffd11689013af57e2d"
            }
          }
          )
          .then(function(response) {
            console.log(response.data);
            // Handle success here
            if(response?.data?.data?.status == "success") {
              let message = 'Payment complete! Reference: ' + firstRes.reference;
              alert(message);
              setTimeout(() => {
                window.location.href = "http://127.0.0.1:5500/payment-confirmed.html?id=" + theOrderID;
              }, 2000)
            }
          })
          .catch(function(error) {
            console.error('GET request failed:', error);
            // Handle error here
          });
  
        }
      })


      if((firstName != "") && (lastName != "") && (address != "") && (country != "") && (city != "") && (email != "") && (phone != "")) {
        handler.openIframe();
      }
  
        console.log(
          firstName,
          lastName,
          address,
          country,
          city,
          email,
          phone,
      );
  
      // use return in real context instead of console.log
    }
  
    async function checkoutButtonAnnualGym(productID) {
  
      getBillingDetailsAnnualGym(productID)
      try {
          const response = await fetch('https://example.com/api/products');
          return await response.json();
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    }
  
  
    
    // Function to create the HTML structure for a product
    function createProductHTMLAnnualGym(product) {
      return `
      <button type="button" onclick="checkoutButtonAnnualGym(${product.orderId})" class="button button-outline-secondary">Place Order</button>
      `;
    }
    
    // Function to populate the item container with fetched data
    function populateItemContainerAnnualGym(data) {
      const itemContainer = document.getElementById('gym-annual-button-container');
    
      data.forEach(product => {
        const productHTML = createProductHTMLAnnualGym(product);
        itemContainer.innerHTML += productHTML;
      });
    }


    
    // Fetch data and populate the item container on page load
    document.addEventListener('DOMContentLoaded', () => {
      populateItemContainerAnnualGym(sampleDataAnnualGym);
      setAmountAnnualGym()
    
          // fetchData()
          // .then(data => {
          //     populateItemContainer8(data);
          // });
    });
    