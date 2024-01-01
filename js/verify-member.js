  // Function to get the value of an element by its ID
  function getValueByIdMemberVerify(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        return element.value;
    }
    return '';
  }

  function getExistingMemberDetails() {
    const memberEmail = getValueByIdMemberVerify('verify-existing-member-email');
    console.log(memberEmail)
    axios.get('https://buckinghammall-gym-api.eddyspace.com/api/users/search/' + memberEmail)
    .then(response => {
      console.log('Response:', response.data);
      if(response.error == "User not found") {
        getValueByIdMemberVerify("verify-member-text1").style.color = "red"
        getValueByIdMemberVerify("verify-member-text1").innerHTML = "User Not Found."
        document.getElementById("verify-member-text1").innerHTML = ""
        // setTimeout(() => {
        //   window.location.href = "https://gym.buckinghammall.com/payment-confirmed.html";
        // }, 2000)
      } else if(response.data.is_active == "1") {
        document.getElementById("verify-member-text1").style.color = "blue"
        document.getElementById("verify-member-text1").innerHTML = "This Member already has an ongoing membership."
      } else if (response.data.is_active == "0") {
        document.getElementById("verify-member-text1").style.color = "blue"
        document.getElementById("verify-member-text1").innerHTML = "Welcome Back " + response.data.first_name + " " + response.data.last_name + ". Fill the form below to re-activate your membership."
        document.getElementById("verify-member-form").style.display = "block"
        document.cookie = `memberID=${response?.data?.id}; path=/;`;
      }
    })

  }

  function getCookieMember(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    return null;
  }
  
    // Function to retrieve billing details and order notes
    function getBillingDetailsMemberVerify() {
      const email = getValueByIdMemberVerify('verify-existing-member-email');
      const subscriptionType = getValueByIdMemberVerify('verify-member-subscription-type');

      const memberID = getCookieMember('memberID')

        let subAmount;
        if(subscriptionType == "daily") {
          subAmount = 2000;
        } else if(subscriptionType == "monthly") {
          subAmount = 15000;
        } else if (subscriptionType == "quarterly") {
          subAmount = 40000;
        } else if (subscriptionType == "annually") {
          subAmount = 155000;
        }
      
  
      let handler = PaystackPop.setup({
        key: 'pk_live_7e1a4cb8c8993649d3c9945479f39f8f8405679f', // Replace with your public key
        email: email,
        amount: subAmount * 100,
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
            console.log(response.data);
            // Handle success here
            if(response?.data?.data?.status == "success") {
              document.getElementById('verify-member-text').innerHTML = "Please wait while we confirm your payment..."
              // let message = 'Payment complete! Reference: ' + firstRes.reference;
              const data = {
                subscription_type: subscriptionType,
                tx_reference: firstRes.reference,
                email: email,
                is_active: 1,
              }

              axios.put('https://buckinghammall-gym-api.eddyspace.com/api/users/subscription/' + email, data)
              .then(response => {
                console.log('Response:', response.data);
                document.cookie = `gymID=${response?.data?.id}; path=/;`;
                document.cookie = `membershipID=${response?.data?.user_id}; path=/;`;
                setTimeout(() => {
                  window.location.href = "https://gym.buckinghammall.com/payment-confirmed.html";
                }, 2000)
              })
              .catch(error => {
                console.error('Error:', error);
              });
            }
          })
          .catch(function(error) {
            console.error('GET request failed:', error);
            // Handle error here
          });
  
        }
      })


      if((subscriptionType != "") && (email != "")) {
        handler.openIframe();
      }
  

  
      // use return in real context instead of console.log
    }
  
    async function checkoutButtonMemberVerify() {
      getBillingDetailsMemberVerify()
    }

    async function checkoutButtonMemberVerify2() {
      getExistingMemberDetails()
    }
  
  
    
    // Function to create the HTML structure for a product
    function createProductHTMLMemberVerify() {
      return `
      <button type="button" onclick="checkoutButtonMemberVerify()" class="button button-outline-secondary">Restart Membership</button>
      `;
    }

    // Function to create the HTML structure for a product
    function createProductHTMLMemberVerify2() {
      return `
      <button type="button" onclick="checkoutButtonMemberVerify2()" class="button button-outline-secondary w-100">VERIFY</button>
      `;
    }
    
    // Function to populate the item container with fetched data
    function populateItemContainerMemberVerify() {
      const itemContainer = document.getElementById('verify-button-container');
    
        const productHTML = createProductHTMLMemberVerify();
        itemContainer.innerHTML += productHTML;
    }

    // Function to populate the item container with fetched data
    function populateItemContainerMemberVerify2() {
      const itemContainer = document.getElementById('verify-member-button-container');
    
        const productHTML = createProductHTMLMemberVerify2();
        itemContainer.innerHTML += productHTML;
    }


    
    // Fetch data and populate the item container on page load
    document.addEventListener('DOMContentLoaded', () => {
      populateItemContainerMemberVerify();
      populateItemContainerMemberVerify2();
    
          // fetchData()
          // .then(data => {
          //     populateItemContainer8(data);
          // });
    });
    