document.addEventListener("DOMContentLoaded",(()=>{!function(){const n=document.getElementById("gym-payment-confirmed-container"),i=function(n){const i=document.cookie.split(";");for(const n of i){const[i,e]=n.split("=");if("membershipID"===i.trim())return e}return null}();if(i){const e=function(n){return`\n        <div class="page-intro">\n          <h2>Payment Confirmed #${n}</h2>\n          <p>Kindly show your subscription ID to the GYM Instructor(s) to activate your subscription</p>\n          <ul class="bread-crumb">\n              <li class="has-separator">\n                  <i class="ion ion-md-home"></i>\n                  <a href="/">Home</a>\n              </li>\n              <li class="is-marked">\n                  <a href="payment-confirmed.html">#${n}</a>\n              </li>\n          </ul>\n        </div>\n      `}(i);n.innerHTML+=e}else{const i='\n            <div class="page-intro">\n              <h2>Membership Not Found</h2>\n              <p>Kindly make a payment to activate your membership subscription</p>\n              <ul class="bread-crumb">\n                  <li class="has-separator">\n                      <i class="ion ion-md-home"></i>\n                      <a href="/">Home</a>\n                  </li>\n                  <li class="is-marked">\n                      <a>Not Found</a>\n                  </li>\n              </ul>\n            </div>\n          ';n.innerHTML+=i}}()}));