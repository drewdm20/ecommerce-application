/**
 * Function to invoke GET API to get all the orders
 * @returns {Promise<void>}
 */
async function viewOrders() {
    let ordersTable = document.getElementById('tableOrdersBody');
    ordersTable.innerHTML = "";
    // Web API URL
    let URL = "https://localhost:44328/api/Order/GetOrders";
    // API request options
    const requestOptions  = {
        method: 'GET',
        headers: {'Accept':'application/json', 'Content-Type': 'application/json'},
    }
    try {
        // Fetch API
        const response = await fetch(URL, requestOptions);
        const data = await response.json();
        if (!response.ok){
            console.log(data);
        } else {
            // Deserialize each item from the response and dynamically display the invoice on the table
            let lines = data.split('\n').filter(element => element);
            lines.forEach(line => {
                let elements = line.split(',').filter(e => e);
                let amount = elements.pop();
                let date = elements.splice(0,1)
                let orderNo = elements.splice(0,1);
                let user = elements.splice(0,1);

                ordersTable.innerHTML += "<tr class='border-b'>" +
                    "<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>" + date +"</td>" +
                    "<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>" + orderNo + "</td>" +
                    "<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>" + user + "</td>" +
                    "<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>" + elements.map(element => "<p>" + element.replace(/[{}]/g, '').replace(/['"]/g,'') + "</p>") + "</td>" +
                    "<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>R " + amount + "</td>" +
                    "</tr>";
            })
        }
    }catch (error){
        console.error(error)
    }
}
