let annualAmount;
function setAmountAnnualGym() {
    annualAmount = 160000;
    document.getElementById('gym-annual-amount').value = 160000;
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
  function getBillingDetailsAnnualGym() {
    const firstName = getValueByIdAnnualGym('gym-annual-first-name');
    const lastName = getValueByIdAnnualGym('gym-annual-last-name');
    const address = getValueByIdAnnualGym('gym-annual-req-st-address');
    const country = getValueByIdAnnualGym('gym-annual-select-country');
    const city = getValueByIdAnnualGym('gym-annual-town-city');
    const email = getValueByIdAnnualGym('gym-annual-email');
    const phone = getValueByIdAnnualGym('gym-annual-phone');

    let handler = PaystackPop.setup({
      key: 'pk_live_7e1a4cb8c8993649d3c9945479f39f8f8405679f', // Replace with your public key
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
            authorization: "Bearer sk_live_cf988a7190414e20bfd5f8c017ad1626f79a6380"
          }
        }
        )
        .then(function(response) {
          // console.log(response.data);
          // Handle success here
          if(response?.data?.data?.status == "success") {
            document.getElementById('gym-annual-text').innerHTML = "Please wait while we confirm your payment..."
            // let message = 'Payment complete! Reference: ' + firstRes.reference;
            const data = {
              subscription_type: "annually",
              new: 0,
              tx_reference: firstRes.reference,
              first_name: firstName,
              last_name: lastName,
              address: address,
              email: email,
              phone_number: phone,
              is_active: 1,
            }
            axios.post('https://buckinghammall-gym-api.eddyspace.com/api/users', data)
            .then(response => {
              // console.log('Response:', response.data);
              document.cookie = `gymID=${response?.data?.id}; path=/;`;
              document.cookie = `membershipID=${response?.data?.user_id}; path=/;`;
              setTimeout(() => {
                window.location.href = "https://gym.buckinghammall.com/payment-confirmed.html";
              }, 2000)
            })
            .catch(error => {
              // console.error('Error:', error);
            });
            // setTimeout(() => {
            //   window.location.href = "http://gym.buckinghammall.com/payment-confirmed.html?id=" + theOrderID;
            // }, 2000)
          }
        })
        .catch(function(error) {
          // console.error('GET request failed:', error);
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

  async function checkoutButtonAnnualGym() {

    getBillingDetailsAnnualGym()
  }


  
  // Function to create the HTML structure for a product
  function createProductHTMLAnnualGym() {
    return `
    <button type="button" onclick="checkoutButtonAnnualGym()" class="button button-outline-secondary">Place Order</button>
    `;
  }
  
  // Function to populate the item container with fetched data
  function populateItemContainerAnnualGym() {
    const itemContainer = document.getElementById('gym-annual-button-container');
  
      const productHTML = createProductHTMLAnnualGym();
      itemContainer.innerHTML += productHTML;
  }


  
  // Fetch data and populate the item container on page load
  document.addEventListener('DOMContentLoaded', () => {
    populateItemContainerAnnualGym();
    setAmountAnnualGym()
  
        // fetchData()
        // .then(data => {
        //     populateItemContainer8(data);
        // });
  });
  