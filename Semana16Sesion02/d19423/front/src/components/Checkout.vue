<template>
    <div class="hello">
        <form>
            <div>
                <h5>ORDEN: {{order_id}}</h5>
            </div>
            <div>
                <h5>Precio:{{ currency_code }} {{ amount }}</h5>
            </div>
            <div>
                <h5>Detalle: {{ description }}</h5>
            </div>
            <div>
                <label for="">
                    <span>Correo Electronico</span>
                    <input type="text" size="50" v-model="email" name="" id="">
                </label>
            </div>
            <div>
                <label for="">
                    <span>Numero de Tarjeta</span>
                    <input type="text" size="50" v-model="creditcard" name="" id="">
                </label>
            </div>

            <div>
                <label for="">
                    <span>Fecha Expiracion</span>
                    <input type="text" size="2" v-model="month">
                    <span>/</span>
                    <input type="text" size="4" v-model="year">

                </label>
                
            </div>
            <div>
                <label for="">
                    <span>CVV</span>
                    <input type="text" size="3" v-model="cvv">
                </label>
            </div>

            <div>
                <label for="">
                    <span>Cuotas</span>
                    <input type="number" size="4" v-model="installments">
                </label>
            </div>
        </form>
        <div class="circles">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
  
    <div class="circles">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>

    <div class="container">
      <h1>Enter Your Card Details</h1>

      <!-- Card -->
      <div class="card">
        <img class="logo" src="https://pngimg.com/uploads/visa/visa_PNG31.png" />

        <!-- Card Number -->
        <label>Card Number</label>
        <input
          class="card-number"
          placeholder="1234 1234 1234 1234"
          type="text"
          v-model="creditcard"
          required
          maxlength="16" />

        <div class="container2">
          <!-- Card Holder -->
          <div class="name">
            <label>Card Holder</label>
            <input
              class="card-name"
              placeholder="ISRAEL ISRAELI"
              type="text"
              required />
          </div>

          <!-- Date -->
          <div class="expiration-date">
            <label>Exp. Date</label>
            <input
              class="card-name"
              placeholder="10/25"
              type="text"
              maxlength="5"
              required />
          </div>

          <!-- Cvv -->
          <div class="ccv">
            <label>CCV</label>
            <input
              class="card-name"
              placeholder="123"
              type="text"
              maxlength="3"
              required />
          </div>
        </div>
      </div>
    </div>
  	    <button id="btnPagar" @click="payment">Pagar</button>
    </div>
</template>
<script>
import axios from 'axios';
export default{
    name: 'Checkout',
    data(){
        return{
            order_id: 123,
            description: "Producto ABC",
            amount: 1200,
            installments: 2,
            telefono: 916730940,
            currency_code: 'PEN',
            email: 'rpineda@x-codec.net',

            creditcard: '4111111111111111',
            month: '09',
            year: '2025',
            cvv: '123'
        }
    },
    methods:{
        async payment(){
            const data = axios(
                {
                    method: 'post',
                    url: 'http://localhost:8000/api/process/pay',
                    data:{
                       order_id: this.order_id,
                       description: this.description,
                       amount:  this.amount,
                       installments: this.installments,
                       telefono: this.telefono,
                       email: this.email,
                       currency_code: this.currency_code,
                       creditcard: this.creditcard,
                       month: this.month,
                       year: this.year,
                       cvv: this.cvv
                    },
                    headers:{
                        'content-type':'application/json',
                        'Access-Control-Allow-Origin':"*"
                    }
                }
            ).then(respuesta=>{
                console.log(respuesta)
            });
        }
    }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

h1 {
  font-family: "Poppins", sans-serif;
  font-size: 30px;
  font-weight: 300;
  padding-left: 30px;
  padding-bottom: 20px;
  color: #ffffff;
  width: 420px;
  line-height: 1.5em;
  text-align: left;
}

textarea:focus,
input:focus {
  outline: none;
}

html,
body {
  height: 100%;
  width: 100%;
}

body {
  font-family: "Space Mono", monospace;
  background-color: rgb(240, 244, 247);
  background: linear-gradient(-70deg, #202020, #000000);

  margin: 0;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(120deg, #1d976c, #2c3e50);
}
.circles {
  position: absolute;
  height: 270px;
  width: 450px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
}
.circle-1 {
  height: 300px;
  width: 300px;
  top: 100px;
  left: -50px;
  opacity: 0.8;
}

.circle-2 {
  height: 240px;
  width: 240px;
  bottom: 40px;
  right: -100px;
  opacity: 0.8;
}

.card {
  display: flex;
  flex-direction: column;
  height: 280px;
  width: 420px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(35px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 80px rgba(0, 0, 0, 0.25);
  padding: 20px 30px 30px 30px;
  overflow: hidden;
}

.logo {
  height: 80px;
  width: 100px;
  margin-bottom: 20px;
}

.card-number {
  font-size: 30px;
  font-family: "Space Mono", monospace;
  width: 100%;
  height: 50px;
  margin-bottom: 40px;
}

.card-number::placeholder {
  color: #b5b5b5;
  font-size: 30px;
  font-family: "Space Mono", monospace;
}

input::placeholder {
  color: #b5b5b5;
  font-family: "Space Mono", monospace;
}

.name {
  font-family: "Space Mono", monospace;
  padding: 0px 80px 0px 0px;
  margin-right: 40px;
  width: 100px;
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.expiration-date {
  font-family: "Space Mono", monospace;
  padding: 0px 0px 0px 0px;
  margin-right: 60px;
  width: 80px;
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.ccv {
  font-family: "Space Mono", monospace;
  padding: 0px 0px 0px 0px;
  margin-right: 0px;
  width: 60px;
  position: relative;
  display: inline-block;
  overflow: hidden;
}

input {
  font-family: "Space Mono", monospace;
  border: none;
  font-size: 16px;
  height: 26px;
  color: #ffffff;
  background: 0;
  padding: 0;
  width: 0;
  border-bottom: 1px solid white;
  color: white;
}

label {
  color: white;
  font-size: 12px;
  font-weight: normal;
  font-family: "Space Mono", monospace;
  pointer-events: none;
  display: block;
  padding-bottom: 2px;
}

.card-name {
  color: white;
  font-size: 16px;
  height: 26px;
  width: 160px;
  border-bottom: 1px solid white;
  color: white;
}

.container2 {
  display: flex;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}




</style>