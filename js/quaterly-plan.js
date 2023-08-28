let quaterlyAmount;
function setAmountQuaterlyGym() {
    quaterlyAmount = 33432;
    document.getElementById('gym-quaterly-amount').value = 65531;
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
  function getBillingDetailsQuaterlyGym() {
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
            document.getElementById('gym-quaterly-text').innerHTML = "Please wait while we confirm your payment..."
            // let message = 'Payment complete! Reference: ' + firstRes.reference;
            const data = {
              subscription_type: "quarterly",
              new: 0,
              tx_reference: firstRes.reference,
              first_name: firstName,
              last_name: lastName,
              address: address,
              email: email,
              phone_number: phone,
              is_active: 1,
            }
            axios.post('https://buckinghammall-gym-api/api/users', data)
            .then(response => {
              console.log('Response:', response.data);
              document.cookie = `gymID=${response?.data?.id}; path=/;`;
              setTimeout(() => {
                window.location.href = "https://gym.buckinghammall.com/payment-confirmed.html";
              }, 2000)
            })
            .catch(error => {
              console.error('Error:', error);
            });
            // setTimeout(() => {
            //   window.location.href = "http://gym.buckinghammall.com/payment-confirmed.html?id=" + theOrderID;
            // }, 2000)
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

  async function checkoutButtonQuaterlyGym() {

    getBillingDetailsQuaterlyGym()
  }


  
  // Function to create the HTML structure for a product
  function createProductHTMLQuaterlyGym() {
    return `
    <button type="button" onclick="checkoutButtonQuaterlyGym()" class="button button-outline-secondary">Place Order</button>
    `;
  }
  
  // Function to populate the item container with fetched data
  function populateItemContainerQuaterlyGym() {
    const itemContainer = document.getElementById('gym-quaterly-button-container');
  
      const productHTML = createProductHTMLQuaterlyGym();
      itemContainer.innerHTML += productHTML;
  }


  
  // Fetch data and populate the item container on page load
  document.addEventListener('DOMContentLoaded', () => {
    populateItemContainerQuaterlyGym();
    setAmountQuaterlyGym()
  
        // fetchData()
        // .then(data => {
        //     populateItemContainer8(data);
        // });
  });
  