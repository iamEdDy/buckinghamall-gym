const sampleDataQuaterlyGym = [
    {
      orderId: 8
    },
  ]

  let quaterlyAmount;
  function setAmountQuaterlyGym() {
        quaterlyAmount = 65531;
        document.getElementById('gym-quaterly-amount').value = 65531;
    }
  
  
  
  // Function to fetch data from the API
  async function fetchDataQuaterlyGym() {
      try {
          const response = await fetch('https://example.com/api/products');
          return await response.json();
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    }
  
  
    // Function to get the value of an element by its ID
  function getValueByIdQuaterlyGym(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        return element.value;
    }
    return '';
  }
  
    // Function to retrieve billing details and order notes
    function getBillingDetailsQuaterlyGym(theOrderID) {
      const firstName = getValueByIdQuaterlyGym('gym-quaterly-first-name');
      const lastName = getValueByIdQuaterlyGym('gym-quaterly-last-name');
      const address = getValueByIdQuaterlyGym('gym-quaterly-req-st-address');
      const country = getValueByIdQuaterlyGym('gym-quaterly-select-country');
      const city = getValueByIdQuaterlyGym('gym-quaterly-town-city');
      const email = getValueByIdQuaterlyGym('gym-quaterly-email');
      const phone = getValueByIdQuaterlyGym('gym-quaterly-phone');
  
      let handler = PaystackPop.setup({
        key: 'pk_test_deac0f7a7e53ab5cccd213e3690a9dc84861655e', // Replace with your public key
        email: email,
        amount: quaterlyAmount * 100,
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
  
    async function checkoutButtonQuaterlyGym(productID) {
  
      getBillingDetailsQuaterlyGym(productID)
      try {
          const response = await fetch('https://example.com/api/products');
          return await response.json();
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    }
  
  
    
    // Function to create the HTML structure for a product
    function createProductHTMLQuaterlyGym(product) {
      return `
      <button type="button" onclick="checkoutButtonQuaterlyGym(${product.orderId})" class="button button-outline-secondary">Place Order</button>
      `;
    }
    
    // Function to populate the item container with fetched data
    function populateItemContainerQuaterlyGym(data) {
      const itemContainer = document.getElementById('gym-quaterly-button-container');
    
      data.forEach(product => {
        const productHTML = createProductHTMLQuaterlyGym(product);
        itemContainer.innerHTML += productHTML;
      });
    }


    
    // Fetch data and populate the item container on page load
    document.addEventListener('DOMContentLoaded', () => {
      populateItemContainerQuaterlyGym(sampleDataQuaterlyGym);
      setAmountQuaterlyGym()
    
          // fetchData()
          // .then(data => {
          //     populateItemContainer8(data);
          // });
    });
    