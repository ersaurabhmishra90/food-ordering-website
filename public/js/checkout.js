/*
=========================================================
 Checkout Module
---------------------------------------------------------
 Features
 ✔ Load Cart
 ✔ Show Order Summary
 ✔ Calculate Grand Total
 ✔ Razorpay Payment
=========================================================
*/

// =====================================
// Load Cart
// =====================================

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const orderSummary = document.getElementById("orderSummary");
const grandTotal = document.getElementById("grandTotal");

// =====================================
// Display Order Summary
// =====================================

function loadSummary() {

    if (cart.length === 0) {

        orderSummary.innerHTML = `
            <div class="alert alert-warning">
                Your Cart is Empty
            </div>
        `;

        grandTotal.innerText = "0";
        return;

    }

    let total = 0;

    orderSummary.innerHTML = "";

    cart.forEach(item => {

        const subTotal = item.price * item.quantity;

        total += subTotal;

        orderSummary.innerHTML += `
            <div class="d-flex justify-content-between border-bottom py-2">

                <div>

                    <strong>${item.name}</strong>

                    <br>

                    Qty : ${item.quantity}

                </div>

                <div>

                    ₹${subTotal}

                </div>

            </div>
        `;

    });

    grandTotal.innerText = total;

}

loadSummary();

// =====================================
// Checkout Form
// =====================================

const checkoutForm = document.getElementById("checkoutForm");

checkoutForm.addEventListener("submit", placeOrder);

// =====================================
// Place Order
// =====================================

async function placeOrder(e) {

    e.preventDefault();
    const customerName = document.getElementById("customerName").value.trim();

const phone = document.getElementById("phone").value.trim();

const address = document.getElementById("address").value.trim();

if (!customerName || !phone || !address) {

    showToast("Please fill all delivery details", "error");

    return;

}

// Mobile Number Validation

if (!/^[6-9]\d{9}$/.test(phone)) {

    showToast("Enter a valid 10-digit mobile number", "error");

    return;

}

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    const order = {

        customerName: document.getElementById("customerName").value.trim(),

        phone: document.getElementById("phone").value.trim(),

        address: document.getElementById("address").value.trim(),
        status: "Pending",

        items: cart.map(item => ({

            foodId: item._id,

            name: item.name,

            image: item.image,

            price: item.price,

            quantity: item.quantity

        })),

        total: Number(grandTotal.innerText)

    };

    try {

        // Get Razorpay Key

        const keyResponse = await fetch("/api/payment/key");

        const keyData = await keyResponse.json();

        // Create Razorpay Order

        const paymentResponse = await fetch("/api/payment/create-order", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                amount: order.total

            })

        });

        const paymentData = await paymentResponse.json();

        if (!paymentData.success) {

            alert("Unable to create payment.");

            return;

        }

        const options = {

            key: keyData.key,

            amount: paymentData.order.amount,

            currency: paymentData.order.currency,

            name: "Food Ordering",

            description: "Order Payment",

            order_id: paymentData.order.id,
            handler: async function (response) {

                try {

                    // Verify Payment

                    const verifyResponse = await fetch("/api/payment/verify", {

                        method: "POST",

                        headers: {

                            "Content-Type": "application/json"

                        },

                        body: JSON.stringify({

                            razorpay_order_id: response.razorpay_order_id,

                            razorpay_payment_id: response.razorpay_payment_id,

                            razorpay_signature: response.razorpay_signature

                        })

                    });

                    const verifyData = await verifyResponse.json();

                    if (!verifyData.success) {

                        showToast("Payment Verification Failed", "error");

                        return;

                    }

                    // Add Payment Details

                    order.paymentId = response.razorpay_payment_id;

                    order.razorpayOrderId = response.razorpay_order_id;

                    order.paymentStatus = "Paid";

                    // Save Order

                    const saveResponse = await fetch("/api/order", {

                        method: "POST",

                        headers: {

                            "Content-Type": "application/json",

                            "Authorization": "Bearer " + localStorage.getItem("token")

                        },

                        body: JSON.stringify(order)

                    });

                    const saveData = await saveResponse.json();

                    if (saveData.success) {

                        localStorage.removeItem("cart");

                        showToast("🎉 Payment Successful");

                        setTimeout(() => {

                            window.location.href = "/my-orders";

                        }, 1000);

                        window.location.href = "/my-orders";

                    }

                    else {
                        showToast(saveData.message, "error");

                    }

                }

                catch (error) {

                    console.log(error);

                    showToast("Server Error", "error");

                }

            },

            prefill: {

                name: order.customerName,

                contact: order.phone

            },

            theme: {

                color: "#198754"

            },

            modal: {

                ondismiss: function () {

                    showToast("Payment Cancelled", "warning");

                }

            }

        };

        const razorpay = new Razorpay(options);

        razorpay.open();
        

    }

    catch (error) {

        console.log(error);

        alert(error.message);

    }

}