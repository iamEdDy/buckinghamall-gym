  let dailyAmount;
  function setAmountDailyGym() {
      dailyAmount = 2000;
      document.getElementById('gym-daily-amount').value = 2000;
  }
  
  
    // Function to get the value of an element by its ID
  function getValueByIdDailyGym(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        return element.value;
    }
    return '';
  }

  function generateRandomEmail() {
    const usernameLength = Math.floor(Math.random() * 10) + 5; // Random username length between 5 and 14 characters
    const username = `buck${Array.from({ length: usernameLength - 4 }, () => getRandomCharacter()).join("")}`;
    
    return `${username}@buckinghammall.live`;
  }
  
  function getRandomCharacter() {
    const characters = "abcdefghijklmnopqrstuvwxyz1234567890";
    return characters[Math.floor(Math.random() * characters.length)];
  }

  
  
    // Function to retrieve billing details and order notes
    function getBillingDetailsDailyGym() {
      // const firstName = getValueByIdDailyGym('gym-daily-first-name');
      // const lastName = getValueByIdDailyGym('gym-daily-last-name');
      // const address = getValueByIdDailyGym('gym-daily-req-st-address');
      // const country = getValueByIdDailyGym('gym-daily-select-country');
      // const city = getValueByIdDailyGym('gym-daily-town-city');
      // const email = getValueByIdDailyGym('gym-daily-email');
      // const phone = getValueByIdDailyGym('gym-daily-phone');

      const firstName = getValueByIdDailyGym('gym-daily-first-name');
      const lastName = getValueByIdDailyGym('gym-daily-last-name');
      const address = "Funaab";
      const country = "Nigeria";
      const city = "Abeokuta";
      const email = "buckinghammall14@gmail.com";
      const phone = "null";
  
      let handler = PaystackPop.setup({
        key: 'pk_live_7e1a4cb8c8993649d3c9945479f39f8f8405679f', // Replace with your public key
        email: email,
        amount: dailyAmount * 100,
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
              document.getElementById('overlay-loader').style.display = "block";
              document.getElementById('gym-daily-text').innerHTML = "Please wait while we confirm your payment..."
              // let message = 'Payment complete! Reference: ' + firstRes.reference;
              const randomEmail = generateRandomEmail();
              const data = {
                subscription_type: "daily",
                new: 0,
                tx_reference: firstRes.reference,
                first_name: firstName,
                last_name: lastName,
                address: address,
                email: randomEmail,
                phone_number: phone,
                is_active: 1,
              }
              axios.post('https://buckinghammall-gym-api.eddyspace.com/api/users', data)
              .then(response => {
                // console.log('Response:', response.data);
                document.cookie = `gymID=${response?.data?.id}; path=/;`;
                document.cookie = `membershipID=${response?.data?.user_id}; path=/;`;
                document.getElementById('overlay-loader').style.display = "none";
                setTimeout(() => {
                  window.location.href = "https://gym.buckinghammall.live/payment-confirmed.html";
                }, 1000)
              })
              .catch(error => {
                // console.error('Error:', error);
              });
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
  
    async function checkoutButtonDailyGym() {
  
      getBillingDetailsDailyGym()
    }
  
  
    
    // Function to create the HTML structure for a product
    function createProductHTMLDailyGym() {
      return `
      <button type="button" onclick="checkoutButtonDailyGym()" class="button button-outline-secondary">Place Order</button>
      `;
    }
    
    // Function to populate the item container with fetched data
    function populateItemContainerDailyGym() {
      const itemContainer = document.getElementById('gym-daily-button-container');
    
        const productHTML = createProductHTMLDailyGym();
        itemContainer.innerHTML += productHTML;
    }


    
    // Fetch data and populate the item container on page load
    document.addEventListener('DOMContentLoaded', () => {
      populateItemContainerDailyGym();
      setAmountDailyGym()
    
          // fetchData()
          // .then(data => {
          //     populateItemContainer8(data);
          // });
    });
    